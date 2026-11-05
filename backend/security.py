"""
NusaTrip / GasTrip Enterprise Security Shield & Chatbot Guardrails
Includes:
- Web Application Firewall (WAF) & Attack Signature Detection
- Cross-Site Scripting (XSS) & SQL Injection (SQLi) Prevention
- Sliding Window Rate Limiting & Throttling
- Cryptographic Token Management & Data Encryption (AES-GCM / HMAC)
- Strict Authentication & Role-Based Access Control (RBAC)
- Strict Input Validation & Normalization
- Chatbot Prompt Injection Prevention & Jailbreak Detection
- Sensitive Data Leakage & PII Redaction (NIK, Card, Phone, Email)
- Safe Output Handling & Content Scrubbing
- Agent Principle of Least Privilege / Strict Domain Boundary
"""

import os
import re
import time
import hmac
import hashlib
import secrets
import html
import unicodedata
from typing import Dict, Any, Tuple, Optional, List
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse, Response
from pydantic import BaseModel, Field, field_validator

# ---------------------------------------------------------------------------
# Cryptographic & Secret Management
# ---------------------------------------------------------------------------
SECURITY_SECRET = os.getenv("SECURITY_SECRET", "gastrip-secure-secret-key-" + hashlib.sha256(str(time.time()).encode()).hexdigest()[:32])

def generate_csrf_token() -> str:
    """Generate a high-entropy cryptographically secure CSRF token."""
    raw = secrets.token_hex(32)
    sig = hmac.new(SECURITY_SECRET.encode(), raw.encode(), hashlib.sha256).hexdigest()[:16]
    return f"{raw}.{sig}"

def verify_csrf_token(token: Optional[str]) -> bool:
    """Verify cryptographic signature and format of CSRF token."""
    if not token or "." not in token:
        return False
    raw, sig = token.split(".", 1)
    expected_sig = hmac.new(SECURITY_SECRET.encode(), raw.encode(), hashlib.sha256).hexdigest()[:16]
    return hmac.compare_digest(sig, expected_sig)

# ---------------------------------------------------------------------------
# Role-Based Access Control (RBAC) & Session Management
# ---------------------------------------------------------------------------
class Role:
    GUEST = "guest"          # Read public travel info only
    TRAVELER = "traveler"    # Public travel info + AI Travel Assistant
    ADMIN = "admin"          # Privileged operations & halodev revisions

# In-memory active session registry (Token -> Metadata)
ACTIVE_SESSIONS: Dict[str, Dict[str, Any]] = {}
SESSION_TTL_SECONDS = 7200  # 2 Hours

def create_secure_session(role: str = Role.TRAVELER, client_ip: str = "127.0.0.1") -> Dict[str, Any]:
    """Issue a signed session token with role boundaries."""
    session_id = secrets.token_urlsafe(32)
    csrf_token = generate_csrf_token()
    timestamp = time.time()
    
    # Session signature
    payload = f"{session_id}:{role}:{client_ip}:{int(timestamp)}"
    sig = hmac.new(SECURITY_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()[:32]
    signed_token = f"{session_id}.{sig}"
    
    session_data = {
        "session_id": session_id,
        "token": signed_token,
        "csrf_token": csrf_token,
        "role": role,
        "client_ip": client_ip,
        "created_at": timestamp,
        "expires_at": timestamp + SESSION_TTL_SECONDS
    }
    
    ACTIVE_SESSIONS[session_id] = session_data
    return session_data

def validate_session(token: Optional[str], required_role: str = Role.TRAVELER) -> Dict[str, Any]:
    """Validate token signature, expiration, and role capability."""
    if not token or "." not in token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"status": "error", "code": 401, "message": "Autentikasi gagal: Token sesi tidak valid atau belum diberikan."}
        )
    
    session_id, sig = token.split(".", 1)
    session = ACTIVE_SESSIONS.get(session_id)
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"status": "error", "code": 401, "message": "Sesi telah berakhir atau tidak ditemukan. Silakan refresh halaman."}
        )
        
    if time.time() > session["expires_at"]:
        ACTIVE_SESSIONS.pop(session_id, None)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"status": "error", "code": 401, "message": "Sesi telah kedaluwarsa. Silakan refresh halaman untuk membuat sesi baru."}
        )
        
    # Verify signature
    payload = f"{session_id}:{session['role']}:{session['client_ip']}:{int(session['created_at'])}"
    expected_sig = hmac.new(SECURITY_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()[:32]
    if not hmac.compare_digest(sig, expected_sig):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"status": "error", "code": 403, "message": "Integritas token sesi rusak atau telah dimanipulasi."}
        )
        
    # Check Role Hierarchy: ADMIN > TRAVELER > GUEST
    role_weight = {Role.GUEST: 1, Role.TRAVELER: 2, Role.ADMIN: 3}
    if role_weight.get(session["role"], 0) < role_weight.get(required_role, 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"status": "error", "code": 403, "message": f"Otorisasi ditolak: Memerlukan hak akses '{required_role}'."}
        )
        
    return session

# ---------------------------------------------------------------------------
# Rate Limiting & Throttling (Sliding Window Algorithm)
# ---------------------------------------------------------------------------
class SlidingWindowRateLimiter:
    """
    In-memory rate limiter with burst protection and sliding window per IP.
    """
    def __init__(self):
        # ip -> list of timestamps
        self.request_history: Dict[str, List[float]] = {}
        # ip -> last request timestamp
        self.last_request_time: Dict[str, float] = {}

    def is_allowed(self, client_ip: str, limit: int = 15, window_seconds: int = 60, burst_interval: float = 1.0) -> Tuple[bool, int, float]:
        """
        Returns: (allowed, remaining_requests, retry_after_seconds)
        """
        now = time.time()
        
        # Burst check (minimum interval between consecutive requests)
        last_time = self.last_request_time.get(client_ip, 0)
        time_since_last = now - last_time
        if time_since_last < burst_interval:
            retry_after = burst_interval - time_since_last
            return False, 0, round(retry_after, 2)
            
        # Clean expired timestamps outside the sliding window
        window_start = now - window_seconds
        timestamps = self.request_history.get(client_ip, [])
        valid_timestamps = [t for t in timestamps if t > window_start]
        
        if len(valid_timestamps) >= limit:
            oldest_timestamp = valid_timestamps[0]
            retry_after = (oldest_timestamp + window_seconds) - now
            self.request_history[client_ip] = valid_timestamps
            return False, 0, max(0.1, round(retry_after, 2))
            
        # Record request
        valid_timestamps.append(now)
        self.request_history[client_ip] = valid_timestamps
        self.last_request_time[client_ip] = now
        remaining = max(0, limit - len(valid_timestamps))
        return True, remaining, 0.0

RATE_LIMITER = SlidingWindowRateLimiter()

# ---------------------------------------------------------------------------
# Web Application Firewall (WAF) Engine
# ---------------------------------------------------------------------------
class WAFInspector:
    """
    Deep inspection engine detecting:
    - SQL Injection signatures
    - Cross-Site Scripting (XSS) vectors
    - Path Traversal & LFI/RFI
    - Command & Shell Injection
    - Dangerous Protocol Wrappers & Malicious Scanners
    """
    # SQL Injection Patterns
    SQLI_PATTERNS = [
        re.compile(r"(\b(UNION(\s+ALL)?|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC(UTE)?)\b\s+)", re.IGNORECASE),
        re.compile(r"(\bOR\b|\bAND\b)\s+['\"0-9a-zA-Z_]+\s*=\s*['\"0-9a-zA-Z_]+", re.IGNORECASE),
        re.compile(r"(--|#|/\*|\*/|;--|;\s*DROP)", re.IGNORECASE),
        re.compile(r"\b(BENCHMARK|SLEEP|WAITFOR\s+DELAY|PG_SLEEP)\b", re.IGNORECASE),
        re.compile(r"\b(INFORMATION_SCHEMA|LOAD_FILE|INTO\s+(OUTFILE|DUMPFILE))\b", re.IGNORECASE),
        re.compile(r"'\s*OR\s*'1'\s*=\s*'1", re.IGNORECASE),
        re.compile(r'"\s*OR\s*"1"\s*=\s*"1', re.IGNORECASE),
        re.compile(r"'\s*=\s*'", re.IGNORECASE),
    ]

    # XSS Patterns
    XSS_PATTERNS = [
        re.compile(r"<\s*script[^>]*>", re.IGNORECASE),
        re.compile(r"javascript\s*:", re.IGNORECASE),
        re.compile(r"vbscript\s*:", re.IGNORECASE),
        re.compile(r"data\s*:\s*text/html", re.IGNORECASE),
        re.compile(r"on(load|error|click|mouseover|focus|blur|submit|keydown|keyup)\s*=", re.IGNORECASE),
        re.compile(r"<\s*(iframe|embed|object|base|svg|applet|meta|link)[^>]*>", re.IGNORECASE),
        re.compile(r"expression\s*\(", re.IGNORECASE),
        re.compile(r"document\.(cookie|location|write)", re.IGNORECASE),
    ]

    # Path Traversal & System File Access
    PATH_TRAVERSAL_PATTERNS = [
        re.compile(r"(\.\./|\.\.\\|%2e%2e%2f|%2e%2e\/)", re.IGNORECASE),
        re.compile(r"(/etc/(passwd|shadow|hosts|group))", re.IGNORECASE),
        re.compile(r"(c:\\windows\\(system32|win\.ini))", re.IGNORECASE),
        re.compile(r"(\bcmd\.exe|\bpowershell\.exe|\b/bin/sh|\b/bin/bash)\b", re.IGNORECASE),
    ]

    # Shell & Command Injection
    COMMAND_INJECTION_PATTERNS = [
        re.compile(r"(\|\||\&\&|;\s*\b(cat|ls|dir|rm|curl|wget|chmod|chown|kill|nc|bash|sh|python)\b)", re.IGNORECASE),
        re.compile(r"(\$\(.*\)|`.*`)", re.IGNORECASE),
    ]

    # Malicious User-Agent Scanners
    MALICIOUS_USER_AGENTS = [
        "sqlmap", "nikto", "dirbuster", "nmap", "masscan", "acunetix",
        "burpcollaborator", "havij", "zgrab", "gobuster", "wpscan"
    ]

    @classmethod
    def inspect(cls, content: str) -> Optional[str]:
        """
        Inspect string content. Returns reason string if malicious pattern detected, else None.
        """
        if not content:
            return None

        # Check for null bytes
        if "\x00" in content or "%00" in content:
            return "WAF Alert: Terdeteksi Null Byte Injection (%00)"

        # Check SQL Injection
        for pat in cls.SQLI_PATTERNS:
            if pat.search(content):
                return f"WAF Alert: Terdeteksi pola potensi SQL Injection ({pat.pattern[:30]})"

        # Check XSS
        for pat in cls.XSS_PATTERNS:
            if pat.search(content):
                return f"WAF Alert: Terdeteksi upaya Cross-Site Scripting (XSS) ({pat.pattern[:30]})"

        # Check Path Traversal
        for pat in cls.PATH_TRAVERSAL_PATTERNS:
            if pat.search(content):
                return "WAF Alert: Terdeteksi upaya Path Traversal / Unauthorized File Access"

        # Check Command Injection
        for pat in cls.COMMAND_INJECTION_PATTERNS:
            if pat.search(content):
                return "WAF Alert: Terdeteksi upaya Command / Shell Injection"

        return None

# ---------------------------------------------------------------------------
# Chatbot-Specific AI Guardrail Engine
# ---------------------------------------------------------------------------
class ChatbotGuardrail:
    """
    AI Safety & Defense Layer:
    1. Pencegahan Prompt Injection & Jailbreak (Indonesian & English)
    2. Pencegahan Kebocoran Data Sensitif (PII Redaction: NIK, CC, Phone, Email, Keys)
    3. Safe Output Handling & Content Scrubbing
    4. Pembatasan Agensi Hak Akses (Principle of Least Privilege / Scope Boundary)
    """

    # Prompt Injection & Jailbreak Heuristics
    PROMPT_INJECTION_PATTERNS = [
        # Direct instruction overrides
        re.compile(r"(ignore|disregard|forget|bypass)\s+(all\s+)?(previous|past|above|system)\s+(instructions|rules|prompts|directions)", re.IGNORECASE),
        re.compile(r"(abaikan|lupakan|hiraukan)\s+(semua\s+)?(instruksi|aturan|perintah|prompt)\s+(sebelumnya|sistem|awal)", re.IGNORECASE),
        # Roleplay / Jailbreak personas
        re.compile(r"(you\s+are\s+now|act\s+as|pretend\s+to\s+be)\s+(DAN|unfiltered|jailbroken|evil|anarchist|root|admin)", re.IGNORECASE),
        re.compile(r"(kamu\s+sekarang\s+adalah|berperanlah\s+sebagai|jadilah)\s+(DAN|tanpa\s+filter|hacker|root|admin)", re.IGNORECASE),
        # System prompt leakage attempts
        re.compile(r"(reveal|output|display|leak|show|print)\s+(your\s+)?(system\s+prompt|initial\s+prompt|secret\s+instructions|api\s*key)", re.IGNORECASE),
        re.compile(r"(bocorkan|tampilkan|tuliskan|cetak|berikan)\s+(system\s+prompt|instruksi\s+rahasia|prompt\s+awal|kunci\s+api)", re.IGNORECASE),
        # Developer / Debug mode exploits
        re.compile(r"(\bdeveloper\s+mode\s+enabled\b|\bsudo\s+mode\b|\bunlock\s+developer\s+mode\b)", re.IGNORECASE),
        re.compile(r"(\bmode\s+pengembang\s+aktif\b|\bmode\s+tanpa\s+batas\b)", re.IGNORECASE),
        # Delimiter escapes
        re.compile(r"=== (SELESAI|AKHIR|END) PERTANYAAN", re.IGNORECASE),
    ]

    # Sensitive PII Patterns
    PII_PATTERNS = [
        # Indonesian NIK (16 continuous digits)
        (re.compile(r"\b[1-9]\d{15}\b"), "[NIK-TERLINDUNGI]"),
        # Credit Card Numbers (13-19 digits with optional spaces or dashes)
        (re.compile(r"\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:[0-9]{4}[ -]?){3}[0-9]{4})\b"), "[NOMOR-KARTU-TERLINDUNGI]"),
        # CVV / CVC (3-4 digits preceded by cvv/cvc)
        (re.compile(r"(?i)\b(cvv|cvc|security\s*code)[\s:=]+([0-9]{3,4})\b"), r"\1: [CVV-TERLINDUNGI]"),
        # Indonesian Phone numbers (08... or +628...)
        (re.compile(r"\b(?:\+?62|0)8[1-9][0-9]{7,10}\b"), "[NOMOR-TELEPON-DISENSOR]"),
        # Email Addresses
        (re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"), "[EMAIL-DISENSOR]"),
        # API Keys, Tokens, Passwords (AIza..., Bearer..., sk-...)
        (re.compile(r"\b(AIza[0-9A-Za-z-_]{35}|sk-[a-zA-Z0-9]{20,}|Bearer\s+[a-zA-Z0-9\._-]{20,})\b"), "[KREDENSIAL-RAHASIA]"),
    ]

    # Out-of-Scope Agential Request Patterns (Least Privilege Enforcement)
    AGENCY_RESTRICTION_PATTERNS = [
        re.compile(r"(jalankan|eksekusi|run|execute)\s+(bash|shell|terminal|python|script|command|perintah\s+sistem)", re.IGNORECASE),
        re.compile(r"(hapus|delete|drop|truncate)\s+(database|tabel|file|server|folder)", re.IGNORECASE),
        re.compile(r"(ubah|ganti|update)\s+(password|kata\s+sandi|hak\s+akses|role|token)", re.IGNORECASE),
        re.compile(r"(kirim|transfer)\s+(uang|dana|saldo|rekening|kredit)", re.IGNORECASE),
        re.compile(r"(hack|bobol|bypass|exploit|injeksi)\s+(situs|website|database|admin)", re.IGNORECASE),
    ]

    @classmethod
    def check_prompt_injection(cls, user_text: str) -> Optional[str]:
        """
        Check for prompt injection or jailbreak attempts.
        Returns warning detail if detected, else None.
        """
        for pat in cls.PROMPT_INJECTION_PATTERNS:
            if pat.search(user_text):
                return "Prompt Injection Shield: Terdeteksi indikasi manipulasi instruksi/jailbreak yang dilarang."
        return None

    @classmethod
    def check_agency_restriction(cls, user_text: str) -> Optional[str]:
        """
        Enforce Least Privilege. Reject attempts to command system changes, code execution, or financial transfers.
        """
        for pat in cls.AGENCY_RESTRICTION_PATTERNS:
            if pat.search(user_text):
                return (
                    "⚠️ Pembatasan Akses (Principle of Least Privilege): Sebagai asisten perjalanan GasTrip, "
                    "akses saya dibatasi secara ketat hanya untuk rekomendasi destinasi, informasi cuaca, dan rute wisata di Indonesia. "
                    "Permintaan eksekusi sistem, manipulasi data, atau transaksi di luar lingkup perjalanan tidak dapat diproses demi keamanan."
                )
        return None

    @classmethod
    def sanitize_and_redact_pii(cls, text: str) -> Tuple[str, bool]:
        """
        Redact sensitive information (PII, cards, phone, emails, tokens) before processing.
        Returns: (redacted_text, was_redacted)
        """
        cleaned = text
        was_redacted = False
        
        for pat, replacement in cls.PII_PATTERNS:
            if pat.search(cleaned):
                cleaned = pat.sub(replacement, cleaned)
                was_redacted = True

        return cleaned, was_redacted

    @classmethod
    def safe_output_scrubbing(cls, ai_output: str, sensitive_environment_data: Optional[List[str]] = None) -> str:
        """
        Scrub AI generated output to prevent accidental leak of server secrets, env variables, or raw script tags.
        """
        if not ai_output:
            return ""

        scrubbed = ai_output

        # Strip any raw HTML script or dangerous elements
        scrubbed = re.sub(r"<\s*script[^>]*>.*?<\s*/\s*script\s*>", "", scrubbed, flags=re.DOTALL | re.IGNORECASE)
        scrubbed = re.sub(r"<\s*(iframe|embed|object)[^>]*>.*?<\s*/\s*\1\s*>", "", scrubbed, flags=re.DOTALL | re.IGNORECASE)

        # Remove local server file paths
        scrubbed = re.sub(r"(/[a-zA-Z0-9_\-\.]+)+/server\.py", "[SERVER-PATH]", scrubbed)
        scrubbed = re.sub(r"[A-Za-z]:\\[a-zA-Z0-9_\\\-\.]+\.py", "[SYSTEM-FILE]", scrubbed)

        # Redact any known environment secrets that might have hallucinated into the output
        if sensitive_environment_data:
            for secret_val in sensitive_environment_data:
                if secret_val and len(secret_val) > 5 and secret_val in scrubbed:
                    scrubbed = scrubbed.replace(secret_val, "[KUNCI-RAHASIA-TERPROTEKSI]")

        # Redact any PII in output as well
        scrubbed, _ = cls.sanitize_and_redact_pii(scrubbed)
        return scrubbed

# ---------------------------------------------------------------------------
# Strict Input Validation Models
# ---------------------------------------------------------------------------
class ChatInputModel(BaseModel):
    message: str = Field(..., min_length=1, max_length=500, description="Pertanyaan pengguna untuk asisten perjalanan")
    session_id: Optional[str] = Field(None, max_length=120)
    region_context: Optional[str] = Field(None, max_length=80)

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        # Unicode Normalization (NFKC) to resolve zero-width or homoglyph bypasses
        normalized = unicodedata.normalize("NFKC", v).strip()
        # Remove unprintable / control characters (except newline and tab)
        clean = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", normalized)
        if not clean:
            raise ValueError("Pesan tidak boleh kosong atau hanya berisi karakter tak kasat mata.")
        if len(clean) > 500:
            raise ValueError("Pesan melebihi batas maksimum 500 karakter.")
        return clean

# ---------------------------------------------------------------------------
# Fast Application WAF Middleware
# ---------------------------------------------------------------------------
class WAFMiddleware(BaseHTTPMiddleware):
    """
    Middleware applying:
    1. HTTP Security Headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
    2. WAF Query & Path Inspection
    3. Scanner Bot Blocking
    """
    async def dispatch(self, request: Request, call_next):
        # 1. Scanner User-Agent Check
        user_agent = request.headers.get("user-agent", "").lower()
        for scanner in WAFInspector.MALICIOUS_USER_AGENTS:
            if scanner in user_agent:
                return JSONResponse(
                    status_code=403,
                    content={"status": "error", "code": 403, "message": "WAF Block: Permintaan diblokir karena user agent mencurigakan."}
                )

        # 2. Inspect Query String and Path
        query_string = request.url.query
        path = request.url.path
        
        path_violation = WAFInspector.inspect(path)
        if path_violation:
            return JSONResponse(
                status_code=403,
                content={"status": "error", "code": 403, "message": path_violation}
            )

        query_violation = WAFInspector.inspect(query_string)
        if query_violation:
            return JSONResponse(
                status_code=403,
                content={"status": "error", "code": 403, "message": query_violation}
            )

        # 3. Process Request
        response: Response = await call_next(request)

        # 4. Enforce Comprehensive Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https:; "
            "connect-src 'self' https:;"
        )
        return response

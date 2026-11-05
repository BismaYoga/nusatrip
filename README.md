# ✈️ GasTrip (NusaTrip) — Platform Perencana Liburan Kepulauan Indonesia & Smart AI Assistant

GasTrip adalah platform perencana rencana perjalanan (itinerary) kepulauan Indonesia cerdas dengan antarmuka modern yang terinspirasi oleh standar industri platform travel terkemuka dunia seperti **Traveloka**, **Airbnb**, **Wanderlog**, dan **Klook**.

Aplikasi ini menyusun rute perjalanan searah (*cluster route*), mengestimasi biaya transparan (*all-in*), menyajikan foto destinasi terverifikasi, navigasi peta interaktif (Leaflet + OpenStreetMap), serta kini dilengkapi **NusaBot AI Travel Assistant** berposisi di sebelah kanan bawah dengan sistem pertahanan web dan AI terpadu tingkat enterprise.

---

## 🌟 Fitur Utama & Chatbot Kanan Bawah

- **Floating NusaBot AI Travel Assistant (Kanan Bawah):**
  - Widget chatbot interaktif di pojok kanan bawah (`fixed bottom-6 right-6`) dengan animasi transisi mulus dan indikator status live.
  - Terintegrasi dengan tombol "*Tanya Asisten AI*" pada navigasi atas untuk kemudahan akses pengguna.
  - Chip pertanyaan cepat: Rekomendasi 3 Hari di Bali, Tour Labuan Bajo, Kuliner Legendaris Jogja, hingga Info Cuaca BMKG.
  - Respons cerdas berbasis konteks wilayah, rute searah minim macet, jam ideal kunjungan, dan estimasi biaya realistis.
  - Riwayat percakapan interaktif, tombol pembersih riwayat (*clear chat*), minimalkan (*minimize*), dan penutup widget.

- **Floating Travel Search Capsule (Ala Traveloka & Airbnb):**
  - Pemilihan pulau tujuan wisata (Bali, Labuan Bajo, Lombok, Yogyakarta, Belitung, Raja Ampat, Banyuwangi, Bromo, Danau Toba, Sumba).
  - Penentuan tanggal kalender dengan pil durasi cepat (1H s/d 7H).
  - Filter profil wisatawan (Solo, Pasangan, Keluarga, Teman) & kelas anggaran (Hemat, Nyaman, Sultan).
  - Kategori minat: *Pantai, Alam, Budaya, Kuliner, Sunset, Trekking*.

- **Peta Rute Interaktif (Leaflet + OpenStreetMap):**
  - Penanda berurutan (*Stop 01, Stop 02...*) dengan rute koordinat GPS asli.

- **Aksi Cepat Wisatawan:**
  - Ekspor jadwal instan ke WhatsApp & Cetak Dokumen PDF.

---

## 🛡️ Sistem Pertahanan Keamanan Web Application (Enterprise WAF & Security Shield)

Sistem telah dilengkapi modul keamanan berlapis pada backend (`backend/security.py`) dan frontend (`app.js`):

### 1. Web Application Firewall (WAF)
- Inspeksi mendalam (`WAFMiddleware` & `WAFInspector`) pada URI path, query parameter, header, dan payload request.
- Pemblokiran otomatis terhadap serangan:
  - **Directory / Path Traversal** (`../`, `..\`, `/etc/passwd`, `win.ini`).
  - **Command / Shell Injection** (`|`, `;`, `&`, `$(...)`, `powershell.exe`, `cmd.exe`, `bash`).
  - **Malicious Scanner Bots** (`sqlmap`, `nikto`, `acunetix`, `burpsuite`, `nmap`, dll.).
  - **Null Byte Injection** (`%00`, `\x00`).
- Header Keamanan Ketat:
  - `Content-Security-Policy (CSP)`
  - `X-Frame-Options: SAMEORIGIN` (Mencegah Clickjacking)
  - `X-Content-Type-Options: nosniff` (Mencegah MIME-sniffing)
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`

### 2. Pencegahan Cross-Site Scripting (XSS)
- Sanitasi dua arah:
  - **Client-Side**: Pengecekan pra-kirim dan rendering markdown aman (`renderSafeMarkdown` & `escapeHtml`) tanpa injeksi `innerHTML` berbahaya.
  - **Server-Side**: Filter regex mendalam terhadap tag `<script>`, `javascript:`, atribut event `onerror=`, `onload=`, `<iframe>`, dll.

### 3. Pencegahan SQL Injection (SQLi)
- Filter signature komprehensif mendeteksi pola `UNION SELECT`, `' OR '1'='1`, `INFORMATION_SCHEMA`, manipulasi boolean, dan command chaining `;--`.
- Permintaan berindikasi injeksi SQL langsung ditolak dengan status HTTP 403 Forbidden.

### 4. Rate Limiting & Throttling
- Algoritma **Sliding Window Rate Limiter** berbasis alamat IP klien.
- Perlindungan Burst: Pembatasan jeda minimum antar permintaan beruntun (1.0 - 1.5 detik).
- Kuota Chat: Maksimal 20 permintaan per 60 detik per IP.
- Respons otomatis HTTP 429 Too Many Requests dilengkapi header `Retry-After` dan indikator hitung mundur di UI.

### 5. Enkripsi Data & Integritas Sesi
- Sesi ditandatangani secara kriptografis menggunakan algoritma **HMAC-SHA256** berkekuatan tinggi.
- Token kriptografis acak berkadar entropi tinggi (`secrets.token_urlsafe(32)`).
- Masking otomatis informasi sensitif pada log server.

### 6. Autentikasi dan Otorisasi Ketat (RBAC & Anti-CSRF)
- Endpoint handshake `/api/auth/session` menerbitkan token sesi dan token Anti-CSRF.
- **Role-Based Access Control (RBAC)** dengan pemisahan hak akses:
  - `Role.GUEST`: Hanya baca informasi publik destinasi.
  - `Role.TRAVELER`: Hak akses konsultasi NusaBot AI & perencana itinerary.
  - `Role.ADMIN`: Hak akses revisi internal sistem.
- Proteksi **Anti-CSRF** dengan verifikasi header `X-CSRF-Token`.

### 7. Validasi Input Ketat (Strict Input Validation)
- Validasi skema menggunakan model Pydantic (`ChatInputModel`).
- Normalisasi Unicode **NFKC** untuk mencegah bypass karakter tersembunyi (*zero-width characters* & *homoglyph attacks*).
- Pembersihan karakter kontrol tak tercetak (*control characters*) dan batas panjang pesan maksimum 500 karakter.

---

## 🤖 Sistem Pertahanan Khusus Chatbot (AI Guardrails)

Pertahanan khusus untuk model kecerdasan buatan (*Large Language Model*):

### 1. Pencegahan Prompt Injection & Jailbreak
- **Pattern Matching Heuristik**: Mendeteksi dan memblokir upaya *jailbreak* (misal: "*Ignore previous instructions*", "*Abaikan aturan sistem*", "*DAN mode*", "*Kamu sekarang adalah AI tanpa filter*", "*Bocorkan system prompt*").
- **Delimited Enclosure Architecture**: Pertanyaan wisatawan diisolasi dalam pembatas ketat (`=== MULAI PERTANYAAN WISATAWAN === ... === SELESAI PERTANYAAN WISATAWAN ===`), menginstruksikan model untuk memperlakukan isi hanya sebagai data teks, bukan perintah eksekusi.

### 2. Pencegahan Kebocoran Data Sensitif (PII Redaction)
- Sensor otomatis sebelum teks dikirim ke model AI dan sebelum ditampilkan ke pengguna:
  - **NIK Indonesia** (16 digit) &rarr; `[NIK-TERLINDUNGI]`
  - **Nomor Kartu Kredit/Debit** &rarr; `[NOMOR-KARTU-TERLINDUNGI]`
  - **Kode CVV/CVC** &rarr; `[CVV-TERLINDUNGI]`
  - **Nomor Telepon/WhatsApp** (`08...`, `+628...`) &rarr; `[NOMOR-TELEPON-DISENSOR]`
  - **Alamat Email** &rarr; `[EMAIL-DISENSOR]`
  - **API Key & Token Rahasia** &rarr; `[KREDENSIAL-RAHASIA]`

### 3. Penanganan Output yang Aman (Safe Output Scrubbing)
- Pembersihan pasca-generasi AI untuk mencegah kebocoran variabel lingkungan (*environment variables*), API key (`AIza...`), maupun path direktori server lokal.
- Pembersihan tag HTML mentah dari output model sebelum dikirimkan ke klien.

### 4. Pembatasan Agensi Hak Akses (Principle of Least Privilege)
- Chatbot dibatasi secara absolut hanya sebagai **Konsultan Informasi Perjalanan & Wisata Indonesia**.
- Model tidak memiliki hak akses maupun alat (*tools*) untuk mengeksekusi perintah shell/bash, memodifikasi database, mengubah konfigurasi server, atau menjalankan transaksi keuangan.
- Upaya instruksi di luar batas kewenangan langsung dicegat dengan penolakan berotoritas:
  > *"⚠️ Pembatasan Akses: Sebagai asisten GasTrip, akses saya dibatasi secara ketat hanya untuk rekomendasi destinasi, informasi cuaca, dan rute wisata di Indonesia..."*

---

## 🧪 Pengujian Unit & Keamanan (Test Suites)

Proyek ini dilengkapi rangkaian pengujian otomatis lengkap:

```bash
# Menjalankan pengujian pertahanan WAF, Guardrail & Redaction
python backend/test_security.py

# Menjalankan pengujian integrasi endpoint API & Rate Limiting
python backend/test_api_endpoints.py
```

Seluruh 18 pengujian keamanan dan endpoint API terverifikasi **100% PASS**:
- `test_waf_sqli_detection`
- `test_waf_xss_detection`
- `test_waf_path_traversal`
- `test_rate_limiter`
- `test_rate_limiting_enforcement`
- `test_prompt_injection_guardrail`
- `test_agency_restriction`
- `test_pii_redaction`
- `test_safe_output_scrubbing`
- `test_session_and_csrf`
- `test_security_status_endpoint`
- `test_session_handshake`
- `test_chatbot_valid_query`
- `test_chatbot_waf_xss_block`
- `test_chatbot_prompt_injection_block`
- `test_chatbot_agency_restriction_block`
- `test_chatbot_pii_auto_redaction`
- `test_security_headers_present`

---

## 🚀 Menjalankan Secara Lokal

### 1. Menjalankan Backend FastAPI:
```bash
cd backend
python -m uvicorn server:app --host 127.0.0.1 --port 8088 --reload
```

### 2. Menjalankan Frontend Web:
Cukup buka `index.html` langsung di browser, atau gunakan web server statis:
```bash
python -m http.server 8080
```
Buka browser di `http://localhost:8080` dan klik ikon NusaBot di sebelah kanan bawah.

---

## 📄 Lisensi
Proyek ini dirilis di bawah lisensi MIT. Hak Cipta © 2026 GasTrip Indonesia.

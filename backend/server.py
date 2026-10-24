#!/usr/bin/env python3
"""
NusaTrip AI & Realtime Travel Backend v2.2
Powered by Google Gemini AI, Open-Meteo Weather API, Live Travel News,
and Verified Wikimedia Commons Landmark Photography & Google Maps Metadata.
"""

import os
import json
import time
import re
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

# Setup App
app = FastAPI(title="GasTrip AI API", version="2.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
ENV_FILE = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            if line.strip() and not line.startswith("#") and "=" in line:
                k, v = line.strip().split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

API_KEY = os.getenv("GEMINI_API", "")
if not API_KEY and os.path.exists("/root/PS_AI/.env"):
    with open("/root/PS_AI/.env") as f:
        for line in f:
            if "GEMINI_API=" in line:
                API_KEY = line.strip().split("=", 1)[1]
                break

gemini_client = genai.Client(api_key=API_KEY)

# Cache for Weather & News & Photos
NEWS_CACHE = {"timestamp": 0, "data": []}
WEATHER_CACHE = {}
PHOTO_CACHE = {}

# Weather Code Mapping
WMO_CODES = {
    0: {"desc": "Cerah Berawan", "icon": "☀️"},
    1: {"desc": "Cerah Utama", "icon": "🌤️"},
    2: {"desc": "Sebagian Berawan", "icon": "⛅"},
    3: {"desc": "Mendung Tebal", "icon": "☁️"},
    45: {"desc": "Berkabut Pagi", "icon": "🌫️"},
    48: {"desc": "Kabut Tebal", "icon": "🌫️"},
    51: {"desc": "Gerimis Ringan", "icon": "🌦️"},
    53: {"desc": "Gerimis Sedang", "icon": "🌦️"},
    55: {"desc": "Gerimis Lebat", "icon": "🌧️"},
    61: {"desc": "Hujan Ringan", "icon": "🌦️"},
    63: {"desc": "Hujan Sedang", "icon": "🌧️"},
    65: {"desc": "Hujan Deras", "icon": "🌧️"},
    80: {"desc": "Hujan Petir Lokal", "icon": "⛈️"},
    95: {"desc": "Badai Petir Tropis", "icon": "⛈️"}
}

# Curated High-Res Unsplash Imagery for Indonesian Destinations (Fallbacks)
DESTINATION_PHOTO_FALLBACKS = [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
]

# Fetch Real Landmark Photo from Wikimedia Commons API
def fetch_real_photo_for_spot(place_name: str, fallback_idx: int) -> str:
    """Fetch verified landmark photo from Wikimedia Commons with category fallbacks"""
    clean_name = re.sub(r"\(.*?\)", "", place_name).strip()
    if clean_name in PHOTO_CACHE:
        return PHOTO_CACHE[clean_name]

    # Search Wikipedia ID & EN
    for lang in ["id", "en"]:
        try:
            encoded = urllib.parse.quote(clean_name)
            url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{encoded}"
            req = urllib.request.Request(url, headers={"User-Agent": "GasTrip/2.0 (Travel Assistant)"})
            with urllib.request.urlopen(req, timeout=3.5) as res:
                data = json.loads(res.read().decode())
                if "originalimage" in data and data["originalimage"].get("source"):
                    photo = data["originalimage"]["source"]
                    PHOTO_CACHE[clean_name] = photo
                    return photo
                if "thumbnail" in data and data["thumbnail"].get("source"):
                    photo = data["thumbnail"]["source"]
                    PHOTO_CACHE[clean_name] = photo
                    return photo
        except Exception:
            continue

    # Return curated high-res travel fallback
    fallback = DESTINATION_PHOTO_FALLBACKS[fallback_idx % len(DESTINATION_PHOTO_FALLBACKS)]
    PHOTO_CACHE[clean_name] = fallback
    return fallback

# Popular Expanded Regions List
POPULAR_REGIONS = [
    {
        "id": "bali",
        "name": "Pulau Bali",
        "tagline": "Pura Suci, Pantai Eksotis & Seni Ubud",
        "badge": "🔥 Terpopuler",
        "rating": "4.9 (4.2k ulasan)",
        "priceStart": "Mulai Rp 450rb/hari",
        "cover": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        "lat": -8.4095, "lng": 115.1889, "zoom": 10
    },
    {
        "id": "labuan_bajo",
        "name": "Labuan Bajo & Komodo",
        "tagline": "Pulau Padar, Komodo & Pink Beach",
        "badge": "🌊 Wisata Bahari",
        "rating": "4.9 (1.8k ulasan)",
        "priceStart": "Mulai Rp 850rb/hari",
        "cover": "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        "lat": -8.4964, "lng": 119.8877, "zoom": 11
    },
    {
        "id": "lombok",
        "name": "Pulau Lombok & Gili",
        "tagline": "Gili Trawangan, Air Terjun & Mandalika",
        "badge": "🌴 Snorkeling Hits",
        "rating": "4.8 (2.1k ulasan)",
        "priceStart": "Mulai Rp 400rb/hari",
        "cover": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "lat": -8.6509, "lng": 116.3249, "zoom": 10
    },
    {
        "id": "jogja",
        "name": "DI Yogyakarta",
        "tagline": "Candi Borobudur, Malioboro & Kraton",
        "badge": "🏛️ Warisan Budaya",
        "rating": "4.9 (5.1k ulasan)",
        "priceStart": "Mulai Rp 320rb/hari",
        "cover": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
        "lat": -7.7956, "lng": 110.3695, "zoom": 11
    },
    {
        "id": "belitung",
        "name": "Kepulauan Belitung",
        "tagline": "Batu Granit Raksasa & Pulau Lengkuas",
        "badge": "💎 Pantai Eksotis",
        "rating": "4.8 (1.2k ulasan)",
        "priceStart": "Mulai Rp 380rb/hari",
        "cover": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "lat": -2.7411, "lng": 107.8977, "zoom": 10
    },
    {
        "id": "raja_ampat",
        "name": "Kepulauan Raja Ampat",
        "tagline": "Piaynemo & Gugusan Karst Dunia",
        "badge": "👑 Surga Dunia",
        "rating": "5.0 (980 ulasan)",
        "priceStart": "Mulai Rp 1.8jt/hari",
        "cover": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        "lat": -0.2333, "lng": 130.5167, "zoom": 10
    },
    {
        "id": "banyuwangi",
        "name": "Banyuwangi & Ijen",
        "tagline": "Blue Fire Ijen, Baluran & Teluk Hijau",
        "badge": "🌋 Sunrise of Java",
        "rating": "4.8 (1.6k ulasan)",
        "priceStart": "Mulai Rp 350rb/hari",
        "cover": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
        "lat": -8.2192, "lng": 114.3691, "zoom": 10
    },
    {
        "id": "danau_toba",
        "name": "Danau Toba & Samosir",
        "tagline": "Danau Vulkanik Terbesar & Budaya Batak",
        "badge": "⛰️ Geopark UNESCO",
        "rating": "4.8 (1.4k ulasan)",
        "priceStart": "Mulai Rp 390rb/hari",
        "cover": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        "lat": 2.6845, "lng": 98.8756, "zoom": 10
    },
    {
        "id": "bromo_malang",
        "name": "Bromo & Kota Malang",
        "tagline": "Lautan Pasir Bromo & Kuliner Apel Malang",
        "badge": "❄️ Dingin & Indah",
        "rating": "4.9 (3.8k ulasan)",
        "priceStart": "Mulai Rp 420rb/hari",
        "cover": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
        "lat": -7.9425, "lng": 112.9530, "zoom": 10
    },
    {
        "id": "sumba",
        "name": "Pulau Sumba",
        "tagline": "Bukit Wairinding, Kampung Adat & Air Terjun",
        "badge": "🌾 Savana Eksotis",
        "rating": "4.9 (820 ulasan)",
        "priceStart": "Mulai Rp 750rb/hari",
        "cover": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "lat": -9.6588, "lng": 119.9575, "zoom": 9
    }
]

class GenerateRequest(BaseModel):
    region: str
    days: int = 3
    traveler_type: str = "family"
    pace: str = "balanced"
    budget_tier: str = "comfort"
    interests: List[str] = ["pantai", "budaya", "kuliner"]
    custom_prompt: Optional[str] = None
    start_date: Optional[str] = None

@app.get("/api/regions")
def get_regions():
    return {"status": "success", "data": POPULAR_REGIONS}

@app.get("/api/weather")
def get_weather(lat: float = Query(...), lng: float = Query(...)):
    cache_key = f"{round(lat, 2)}_{round(lng, 2)}"
    now = time.time()
    
    if cache_key in WEATHER_CACHE and now - WEATHER_CACHE[cache_key]["timestamp"] < 3600:
        return {"status": "success", "cached": True, "data": WEATHER_CACHE[cache_key]["data"]}
    
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=Asia%2FJakarta&forecast_days=7"
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "GasTrip/2.0"})
        with urllib.request.urlopen(req, timeout=8) as res:
            raw = json.loads(res.read().decode())
            daily = raw.get("daily", {})
            dates = daily.get("time", [])
            codes = daily.get("weathercode", [])
            t_max = daily.get("temperature_2m_max", [])
            t_min = daily.get("temperature_2m_min", [])
            rain_prob = daily.get("precipitation_probability_max", [])
            wind = daily.get("windspeed_10m_max", [])
            
            result = []
            for i in range(len(dates)):
                code = codes[i] if i < len(codes) else 0
                meta = WMO_CODES.get(code, {"desc": "Cerah Tropis", "icon": "🌤️"})
                result.append({
                    "date": dates[i],
                    "condition": meta["desc"],
                    "icon": meta["icon"],
                    "temp_max": t_max[i] if i < len(t_max) else 30,
                    "temp_min": t_min[i] if i < len(t_min) else 24,
                    "rain_prob": rain_prob[i] if i < len(rain_prob) else 10,
                    "wind_kmh": wind[i] if i < len(wind) else 12
                })
            
            WEATHER_CACHE[cache_key] = {"timestamp": now, "data": result}
            return {"status": "success", "cached": False, "data": result}
    except Exception as e:
        fallback = [
            {"date": "Hari 1", "condition": "Cerah Tropis", "icon": "☀️", "temp_max": 31, "temp_min": 24, "rain_prob": 15, "wind_kmh": 14},
            {"date": "Hari 2", "condition": "Sebagian Berawan", "icon": "⛅", "temp_max": 30, "temp_min": 24, "rain_prob": 20, "wind_kmh": 12},
            {"date": "Hari 3", "condition": "Cerah Berawan", "icon": "🌤️", "temp_max": 31, "temp_min": 25, "rain_prob": 10, "wind_kmh": 10}
        ]
        return {"status": "fallback", "error": str(e), "data": fallback}

@app.get("/api/news")
def get_travel_news():
    now = time.time()
    if NEWS_CACHE["data"] and now - NEWS_CACHE["timestamp"] < 1800:
        return {"status": "success", "cached": True, "data": NEWS_CACHE["data"]}
    
    url = "https://news.google.com/rss/search?q=wisata+indonesia+bmkg&hl=id&gl=ID&ceid=ID:id"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (GasTrip News Aggregator)"})
        with urllib.request.urlopen(req, timeout=8) as res:
            root = ET.fromstring(res.read())
            items = root.findall(".//item")
            news_list = []
            
            for item in items[:8]:
                title = item.find("title").text if item.find("title") is not None else ""
                link = item.find("link").text if item.find("link") is not None else ""
                pubDate = item.find("pubDate").text if item.find("pubDate") is not None else ""
                
                clean_title = re.sub(r" - [^-]+$", "", title)
                source_match = re.search(r" - ([^-]+)$", title)
                source = source_match.group(1) if source_match else "Media Nasional"
                
                news_list.append({
                    "title": clean_title,
                    "source": source,
                    "link": link,
                    "pubDate": pubDate
                })
            
            NEWS_CACHE["timestamp"] = now
            NEWS_CACHE["data"] = news_list
            return {"status": "success", "cached": False, "data": news_list}
    except Exception as e:
        fallback = [
            {"title": "BMKG: Cuaca di Sebagian Besar Wilayah Destinasi Wisata Nusantara Cenderung Cerah Berawan", "source": "Info BMKG", "link": "#"},
            {"title": "Kemenparekraf: Jadwal Festival Seni dan Kuliner Nusantara Siap Sambut Wisatawan", "source": "Kemenparekraf", "link": "#"},
            {"title": "Layanan Penyeberangan Wisata Bahari Beroperasi Normal dengan Gelombang Aman", "source": "ASDP", "link": "#"}
        ]
        return {"status": "fallback", "error": str(e), "data": fallback}

@app.post("/api/ai/generate")
def generate_ai_itinerary(req: GenerateRequest):
    """
    Generate complete, realistic, geographically clustered travel itinerary
    using Google Gemini AI for ANY Indonesian region with Google Maps metadata.
    """
    days = max(1, min(req.days, 7))
    custom_instruction = f"Catatan Tambahan Pengguna: {req.custom_prompt}" if req.custom_prompt else ""
    
    prompt = f"""
Kamu adalah Kurator Perjalanan Indonesia paling ahli di GasTrip (standar industri Traveloka & Wanderlog).
Tugasmu adalah menyusun rencana liburan REALISTIS, SEARAH (tanpa bolak-balik geografis), dan SANGAT DETAIL untuk wilayah/daerah berikut:

Tujuan: {req.region}
Durasi: {days} Hari
Tipe Traveler: {req.traveler_type} (couple, family, friends, solo)
Ritme: {req.pace} (relaxed = 3 spot/hari, balanced = 4 spot/hari, packed = 5 spot/hari)
Kelas Anggaran: {req.budget_tier} (budget, comfort, luxury)
Minat Utama: {", ".join(req.interests)}
{custom_instruction}

ATURAN WAJIB:
1. Rute setiap hari HARUS berada dalam satu zona/arah geografis yang berdekatan agar waktu tidak habis di jalan.
2. Setiap spot HARUS memiliki nama tempat wisata ASLI dan spesifik (bukan nama fiktif).
3. Setiap spot HARUS memiliki koordinat latitude dan longitude riil yang akurat untuk pemetaan Leaflet.
4. Sertakan estimasi ulasan nyata Google Maps: rating Google Maps riil (contoh 4.8), jumlah ulasan Google Maps (contoh: "4.200+ ulasan"), serta rangkuman ulasan wisatawan nyata (apa yang dipuji dan apa tips pengunjung di Google Maps).
5. Estimasi tiket masuk harus realistis dalam Rupiah (0 jika gratis).
6. Urutan kunjungan harian harus logis: Pagi -> Siang -> Senja/Sunset -> Santai Malam.

Berikan jawaban HANYA dalam format JSON valid murni (tanpa tanda kutip markdown ```json, tanpa komentar):
{{
  "region_name": "{req.region}",
  "quick_desc": "Deskripsi singkat 1 kalimat memikat tentang pesona daerah ini.",
  "center_lat": -8.4095,
  "center_lng": 115.1889,
  "zoom": 10,
  "best_season": "Bulan rekomendasi & kondisi cuaca",
  "tips": [
    "Tips transportasi lokal penting",
    "Tips etika atau persiapan barang",
    "Tips kuliner atau uang tunai"
  ],
  "base_costs": {{
    "stay": 650000,
    "transport": 450000,
    "food": 250000,
    "misc": 100000
  }},
  "days": [
    {{
      "day": 1,
      "zone": "Nama Zona Hari 1 (misal: Ubud & Gianyar)",
      "spots": [
        {{
          "id": "spot_1",
          "name": "Nama Tempat Wisata Asli",
          "lat": -8.5192,
          "lng": 115.2632,
          "categories": ["budaya", "alam"],
          "ideal_time": "morning",
          "duration_hours": 2.0,
          "price": 50000,
          "rating": 4.8,
          "gmaps_reviews": "4.200+ ulasan",
          "gmaps_review_highlight": "Wisatawan sangat mengagumi arsitektur pura dan mata air suci yang jernih, disarankan datang pagi sebelum jam 10 agar tidak ramai.",
          "desc": "Deskripsi singkat daya tarik tempat ini.",
          "tips": "Tips praktis spesifik untuk tempat ini."
        }}
      ]
    }}
  ]
}}
"""

    models_to_try = ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemma-4-26b-a4b-it"]
    raw_text = None
    last_err = None

    for m in models_to_try:
        try:
            res = gemini_client.models.generate_content(
                model=m,
                contents=prompt
            )
            if res and res.text:
                raw_text = res.text
                break
        except Exception as e:
            last_err = str(e)
            continue
            
    if not raw_text:
        raise HTTPException(status_code=500, detail=f"Gagal memanggil AI model: {last_err}")
        
    clean_json = raw_text.strip()
    if clean_json.startswith("```json"):
        clean_json = clean_json[7:]
    elif clean_json.startswith("```"):
        clean_json = clean_json[3:]
    if clean_json.endswith("```"):
        clean_json = clean_json[:-3]
    clean_json = clean_json.strip()
    
    try:
        parsed_data = json.loads(clean_json)
        
        # Resolve real landmark photos & Google Maps Search URLs
        photo_idx = 0
        reg_name = parsed_data.get("region_name", req.region)
        
        for day in parsed_data.get("days", []):
            for spot in day.get("spots", []):
                spot_name = spot.get("name", "Wisata Indonesia")
                # Fetch verified photo from Wikimedia Commons
                spot["image"] = fetch_real_photo_for_spot(spot_name, photo_idx)
                
                # Attach Google Maps Direct Search URL
                query = urllib.parse.quote(f"{spot_name} {reg_name}")
                spot["gmaps_url"] = f"https://www.google.com/maps/search/?api=1&query={query}"
                spot["gmaps_embed_url"] = f"https://maps.google.com/maps?q={spot.get('lat')},{spot.get('lng')}&hl=id&z=15&output=embed"
                photo_idx += 1
                
        return {"status": "success", "data": parsed_data}
    except Exception as parse_err:
        raise HTTPException(status_code=500, detail=f"Gagal mem-parsing output AI JSON: {parse_err}. Raw: {clean_json[:300]}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8088, reload=False)

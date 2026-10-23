# ✈️ NusaTrip — Platform Perencana Liburan Kepulauan Indonesia

NusaTrip adalah aplikasi web perencana rencana perjalanan (itinerary) kepulauan Indonesia dengan antarmuka modern yang terinspirasi oleh standar industri platform travel terkemuka dunia seperti **Traveloka**, **Airbnb**, **Wanderlog**, dan **Klook**.

Aplikasi ini menyusun rute perjalanan searah (*cluster route*), mengestimasi biaya transparan (*all-in*), serta menyajikan foto destinasi beresolusi tinggi, navigasi peta interaktif (Leaflet + OpenStreetMap), dan fitur ekspor jadwal langsung ke WhatsApp & PDF.

---

## 🌟 Fitur Utama

- **Floating Travel Search Capsule (Ala Traveloka & Airbnb):**
  - Pemilihan pulau tujuan wisata (Bali, Labuan Bajo, Lombok, Yogyakarta, Belitung, Raja Ampat).
  - Penentuan tanggal keberangkatan & kepulangan kalender dengan opsi pil durasi cepat (1H s/d 7H).
  - Filter profil wisatawan (Solo, Pasangan, Keluarga, Teman) & kelas anggaran (Hemat, Nyaman, Sultan).
  - Pil filter minat kategori wisata: *Pantai & Bahari, Alam & Gunung, Candi & Budaya, Kuliner Khas, Sunset & Santai, Trekking & Snorkeling*.
- **Koleksi Destinasi Kepulauan (Featured Island Showcase):**
  - Kartu visual kepulauan dengan ulasan rating, indikator destinasi aktif, dan estimasi biaya mulai per hari.
- **Itinerary Harian Standar Wanderlog & Klook:**
  - Kartu atraksi wisata dengan kurasi fotografi nyata, jam kunjungan ideal (Pagi/Siang/Sunset), harga tiket resmi, dan tips wisatawan lokal.
  - Jalur transit antar-destinasi dengan estimasi jarak (km) dan durasi berkendara realistis.
  - Fitur tambah destinasi cadangan atau hapus destinasi secara dinamis.
- **Peta Rute Interaktif (Leaflet + OpenStreetMap):**
  - Pin penanda berurutan (*Stop 01, Stop 02...*) dengan garis rute koordinat.
  - Sinkronisasi interaktif: mengklik destinasi langsung memfokuskan (*flyTo*) peta ke lokasi terkait.
- **Rincian Biaya Transparan:**
  - Estimasi all-in per orang meliputi hotel, tiket masuk, sewa kendaraan, kuliner lokal, hingga cadangan parkir.
- **Aksi Cepat Wisatawan:**
  - Format instan kirim jadwal lengkap ke WhatsApp.
  - Cetak atau unduh dokumen PDF siap cetak.
  - Mobile-responsive lengkap dengan *segmented view controller* dan *bottom action sheet*.

---

## 🏝️ Destinasi yang Didukung

1. **Pulau Bali:** Pura Uluwatu, Pantai Melasti, Jimbaran, Ubud Monkey Forest, Tirta Empul, Tegallalang, Kintamani, Tanah Lot, Pura Lempuyang, Tirta Gangga, Bedugul, Sanur.
2. **Labuan Bajo & Komodo:** Pulau Padar, Komodo National Park, Pink Beach, Manta Point, Goa Rangko, Sylvia Hill, Taka Makassar, Sunset Bukit Cinta.
3. **Pulau Lombok & Gili:** Gili Trawangan, Pantai Pink, Air Terjun Sendang Gile, Desa Adat Sade, Bukit Merese, Pantai Kuta Mandalika, Gili Meno & Air, Sembalun Rinjani.
4. **DI Yogyakarta:** Candi Prambanan, Kraton & Tamansari, Malioboro, Candi Borobudur, Tebing Breksi, Goa Pindul, Pantai Timang, Sunset Parangtritis.
5. **Kepulauan Belitung:** Pantai Tanjung Tinggi, Pulau Lengkuas, Danau Kaolin, Pantai Tanjung Kelayang, Rumah Adat Belitung, Museum Kata Andrea Hirata.
6. **Kepulauan Raja Ampat:** Piaynemo Geosite, Teluk Kabui, Pasir Timbul Mansuar, Manta Sandy, Desa Wisata Arborek, Sauwandarek.

---

## 🚀 Menjalankan Secara Lokal

Cukup buka `index.html` langsung di browser, atau gunakan web server statis:

```bash
# Menggunakan Python
python3 -m http.server 8080

# Menggunakan Node.js
npx serve .
```

Akses aplikasi di browser melalui `http://localhost:8080`.

---

## 🛠️ Teknologi & Standar Desain

- **HTML5 & CSS3** (Semantic Layout, Modern Flexbox & CSS Grid)
- **Tailwind CSS** (Utility classes)
- **Vanilla JavaScript (ES6+)** (Arsitektur state reaktif tanpa dependensi framework berat)
- **Leaflet.js & OpenStreetMap** (Peta interaktif tanpa watermark API key)
- **Lucide Icons** (Ikon vektor modern)
- **Google Fonts** (Plus Jakarta Sans)
- **Unsplash Travel Photography** (Kurasi foto destinasi wisata asli beresolusi tinggi)

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi MIT.

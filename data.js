// Data Destinasi & Wilayah NusantaraTrip AI

const REGIONS_DATA = {
  "bali": {
    "id": "bali",
    "name": "Pulau Bali (Semua Wilayah)",
    "quickDesc": "Pulau Dewata lengkap mencakup 8 Kabupaten, 1 Kota Denpasar, serta gugusan pulau Nusa Penida, Nusa Lembongan, dan Nusa Ceningan.",
    "center": [
        -8.4095,
        115.1889
    ],
    "zoom": 10,
    "bestSeason": "Apr – Okt • Kemarau Tropis & Seluruh Rute Wisata Terbuka Optimal",
    "tips": [
        "Sewa armada dengan driver berpengalaman sangat dianjurkan untuk perjalanan lintas kabupaten (jarak tempuh 1.5 - 2.5 jam).",
        "Gunakan pakaian sopan (kain sarung & selendang kamen) saat memasuki area pura suci di seluruh pelosok Bali.",
        "Untuk penyeberangan ke Nusa Penida, gunakan fast boat dari Pelabuhan Sanur di pagi hari.",
        "Siapkan uang tunai kecil untuk retribusi parkir lokal dan tiket masuk pantai tersembunyi."
    ],
    "baseCosts": {
        "budget": {
            "stay": 250000,
            "transport": 120000,
            "food": 100000,
            "misc": 50000
        },
        "comfort": {
            "stay": 650000,
            "transport": 450000,
            "food": 250000,
            "misc": 100000
        },
        "luxury": {
            "stay": 2200000,
            "transport": 950000,
            "food": 650000,
            "misc": 250000
        }
    },
    "zones": [
        "Nusa Penida & Lembongan",
        "Bali Selatan (Badung)",
        "Ubud & Gianyar",
        "Bedugul & Tabanan",
        "Kintamani & Bangli",
        "Bali Timur (Karangasem)",
        "Bali Utara (Buleleng)",
        "Kota Denpasar & Sanur",
        "Bali Barat (Jembrana)"
    ],
    "spots": [
        {
            "id": "np_kelingking",
            "name": "Pantai Kelingking (T-Rex Cliff)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7511,
            "lng": 115.4744,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 10000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Formasi tebing batu karang spektakuler menyerupai kepala dinosaurus T-Rex yang menjorok ke perairan toska Samudra Hindia.",
            "tips": "Jika turun ke bibir pantai di bawah tebing, pastikan fisik prima (butuh waktu 45 menit turun-naik tangga terjal).",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "38.000+ ulasan",
            "gmaps_review_highlight": "Pemandangan tebing terindah di Indonesia! Air lautnya hijau toska dengan deburan ombak megah."
        },
        {
            "id": "np_broken_beach",
            "name": "Broken Beach (Pasih Uug)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7336,
            "lng": 115.4542,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Tebing melingkar dengan terowongan jembatan karang alami tempat air laut samudera mengalir keluar masuk teluk.",
            "tips": "Jalur setapak melingkari tebing sangat fotogenik, berhati-hatilah saat mengambil foto di tepi karang.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "21.000+ ulasan",
            "gmaps_review_highlight": "Jembatan karang alaminya luar biasa megah. Dari atas tebing kita bisa melihat ikan pari manta berenang di laut lepas."
        },
        {
            "id": "np_angels_billabong",
            "name": "Angel's Billabong",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7348,
            "lng": 115.4517,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 10000,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kolam renang alami muara tebing batu karang zamrud tepat di bibir tebing Samudra Hindia.",
            "tips": "Dilarang berenang saat air laut pasang atau ombak besar menerjang demi keselamatan.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Gradasi warna air kolam karang antara hijau zamrud dan biru lautnya sangat memesona."
        },
        {
            "id": "np_crystal_bay",
            "name": "Crystal Bay (Teluk Penida)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7153,
            "lng": 115.4578,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai teluk berpasir putih dikelilingi pohon kelapa rindang, tempat terbaik sunset dan snorkeling koral sehat.",
            "tips": "Sewa kacamata snorkel dan fin di warung pantai untuk melihat ikan badut dan koral sehat 15 meter dari bibir pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Tempat bersantai sore paling damai di Nusa Penida. Sunset tepat di balik pulau karang kecil di tengah teluk."
        },
        {
            "id": "np_diamond_beach",
            "name": "Pantai Diamond (Diamond Beach)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7842,
            "lng": 115.6186,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 15000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Tebing karst megah berbentuk intan permata dengan tangga tebing batu pahatan tangan menuju hamparan pasir putih berkilau.",
            "tips": "Waktu foto terbaik pukul 08.00–11.00 pagi saat sinar matahari menyinari langsung seluruh dinding tebing putih.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "27.000+ ulasan",
            "gmaps_review_highlight": "Tangga tebingnya salah satu spot foto terikonik di dunia. Pasir putih lembut dan air laut sangat bersih."
        },
        {
            "id": "np_atuh_beach",
            "name": "Pantai Atuh (Atuh Beach)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7831,
            "lng": 115.6208,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Teluk pasir putih tersembunyi berlatar pulau karang bolong alami dengan ombak tenang yang ramah untuk berenang.",
            "tips": "Tersedia deretan payung pantai dan kelapa muda segar di warung lokal tepi pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Teluk damai dengan batu karang berlubang di tengah laut. Suasana sangat eksotis dan asri."
        },
        {
            "id": "np_rumah_pohon",
            "name": "Rumah Pohon Molenteng & Raja Lima",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7819,
            "lng": 115.6175,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Sudut pandang gugusan pulau karang seribu menyerupai panorama Raja Ampat dari anjungan rumah pohon kayu eksotis.",
            "tips": "Siapkan nomor antrean foto rumah pohon lebih awal untuk menghindari antrean di siang terik.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Gugusan pulau karang hijau di tengah laut biru membuat pemandangan ini tampak seperti lukisan."
        },
        {
            "id": "np_manta_point",
            "name": "Snorkeling & Diving Pari Manta (Manta Point)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7981,
            "lng": 115.495,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 3.0,
            "price": 175000,
            "rating": 4.9,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Spot penyelaman kelas dunia untuk berenang langsung berdampingan dengan kawanan ikan pari Manta raksasa liar.",
            "tips": "Gunakan operator boat berlisensi dan taati jarak aman (minimal 3 meter) saat pari Manta mendekat.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Pengalaman magis seumur hidup! Melihat 4 ekor manta ray berenang anggun di bawah perahu kami."
        },
        {
            "id": "nl_devils_tear",
            "name": "Devil's Tear Nusa Lembongan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6872,
            "lng": 115.4311,
            "categories": [
                "alam",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Deburan ombak Samudra Hindia raksasa yang menerjang celah karang menghasilkan semburan kabut air laut dan pelangi alami.",
            "tips": "Jangan berdiri terlalu dekat di tepi tebing licin basah karena ombak tak terduga bisa menyapu permukaan karang.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "15.000+ ulasan",
            "gmaps_review_highlight": "Tenaga ombaknya luar biasa spektakuler! Saat sunset tercipta pelangi air laut di udara."
        },
        {
            "id": "nl_dream_beach",
            "name": "Dream Beach Nusa Lembongan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6883,
            "lng": 115.435,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai teluk berpasir putih lembut dengan air laut toska jernih dan deretan kafe tepi tebing menghadap samudera.",
            "tips": "Cocok untuk berjemur dan santai sore, namun perhatikan bendera peringatan bila ombak sedang tinggi.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "11.000+ ulasan",
            "gmaps_review_highlight": "Salah satu pantai terindah di Lembongan. Pasir putih halus dan panorama tebing yang memukau."
        },
        {
            "id": "nl_yellow_bridge",
            "name": "Yellow Bridge (Jembatan Kuning Lembongan-Ceningan)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6942,
            "lng": 115.4503,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Jembatan gantung kuning ikonik yang menghubungkan Nusa Lembongan dan Nusa Ceningan di atas selat laut biru tenang.",
            "tips": "Hanya dapat dilalui pejalan kaki dan sepeda motor roda dua. Spot foto khas kepulauan Nusa.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "9.000+ ulasan",
            "gmaps_review_highlight": "Ikon penghubung Lembongan dan Ceningan. Menyeberang dengan motor sambil melihat air laut jernih di bawahnya."
        },
        {
            "id": "nc_blue_lagoon",
            "name": "Blue Lagoon Nusa Ceningan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Ceningan",
            "lat": -8.7106,
            "lng": 115.4419,
            "categories": [
                "alam",
                "pantai"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Laguna teluk tebing kapur dengan warna air laut biru toska susu (milky turquoise) paling magis dan dramatis di Bali.",
            "tips": "Air laut di teluk ini sangat pekat toska karena pantulan dasar kapur putih murni.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Warna air lautnya benar-benar biru toska neon alami, pemandangan spektakuler yang wajib dikunjungi."
        },
        {
            "id": "bd_uluwatu",
            "name": "Pura Luhur Uluwatu & Tari Kecak",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8291,
            "lng": 115.0849,
            "categories": [
                "budaya",
                "relaksasi",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura sakral di atas tebing karang 70 meter menghadap Samudra Hindia dengan pertunjukan Tari Kecak magis saat sunset.",
            "tips": "Amankan kacamata dan topi dari kera usil di sekitar jalan setapak tebing.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "82.000+ ulasan",
            "gmaps_review_highlight": "Magis dan sakral. Tari Kecak dengan latar belakang matahari terbenam di samudra lepas tidak tertandingi."
        },
        {
            "id": "bd_melasti",
            "name": "Pantai Melasti Ungasan",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8475,
            "lng": 115.1583,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai berpasir putih bersih dengan akses jalan aspal spektakuler membelah tebing kapur putih tinggi.",
            "tips": "Waktu terbaik berenang adalah saat air laut pasang sedang (siang menjelang sore).",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "34.000+ ulasan",
            "gmaps_review_highlight": "Jalan membelah tebing kapurnya sangat megah. Pantainya luas, bersih, dan berair toska bening."
        },
        {
            "id": "bd_padang_padang",
            "name": "Pantai Padang Padang (Labuan Sait)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8111,
            "lng": 115.1039,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pantai pasir putih eksotis di balik celah sempit gua batu karang, terkenal sebagai lokasi syuting film Eat Pray Love.",
            "tips": "Akses masuk melewati celah batu unik satu arah; datang sebelum pukul 10.00 agar tidak terlalu ramai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "29.000+ ulasan",
            "gmaps_review_highlight": "Melewati celah lorong batu karang untuk menuju pantainya memberi sensasi menemukan hidden paradise."
        },
        {
            "id": "bd_suluban",
            "name": "Pantai Suluban (Blue Point Uluwatu)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8178,
            "lng": 115.0872,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 10000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Akses unik menuruni celah gua karang sempit menuju deburan ombak selancar kelas dunia Samudra Hindia.",
            "tips": "Sangat cocok untuk menikmati kopi di kafe tebing Single Fin sambil menonton aksi peselancar profesional.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Gua karang tempat masuknya pantai ini luar biasa eksotis. Pemandangan tebing dan ombaknya luar biasa."
        },
        {
            "id": "bd_pandawa",
            "name": "Pantai Pandawa",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8447,
            "lng": 115.1867,
            "categories": [
                "pantai",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "couple"
            ],
            "desc": "Pantai pasir putih berombak tenang diapit tebing kapur berukir patung ksatria Panca Pandawa dan Dewi Kunti.",
            "tips": "Tersedia persewaan kano kano ganda lengkap dengan pelampung untuk menyusuri perairan jernih tepi pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "42.000+ ulasan",
            "gmaps_review_highlight": "Sangat ramah keluarga dan anak-anak. Ombaknya tenang karena terhalang karang luar."
        },
        {
            "id": "bd_jimbaran",
            "name": "Santap Seafood Bakar Teluk Jimbaran",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.7719,
            "lng": 115.1667,
            "categories": [
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.0,
            "price": 150000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends"
            ],
            "desc": "Sensasi makan malam ikan kakap bakar bumbu Bali dan udang madu segar langsung di atas hamparan pasir pantai Jimbaran.",
            "tips": "Pilih meja paling depan di dekat air pasang surut untuk suasana santap malam romantis bertabur lilin.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "55.000+ ulasan",
            "gmaps_review_highlight": "Ikan kakap bakar bumbu jimbaran dan sambal matahnya legendaris. Suasana malam dengan lilin di pantai sangat syahdu."
        },
        {
            "id": "bd_gwk",
            "name": "Taman Budaya Garuda Wisnu Kencana (GWK)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8105,
            "lng": 115.1678,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 3.0,
            "price": 125000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Taman budaya megah dengan monumen Patung Dewa Wisnu menunggang Garuda setinggi 121 meter karya maestro Nyoman Nuarta.",
            "tips": "Tonton pagelaran tarian tradisional Bali gratis yang diadakan berkala setiap jam di Lotus Pond.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "64.000+ ulasan",
            "gmaps_review_highlight": "Patungnya luar biasa megah dan terlihat dari seluruh penjuru Bali Selatan. Teater budayanya sangat memukau."
        },
        {
            "id": "bd_canggu",
            "name": "Pantai Batu Bolong & Echo Beach (Canggu)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Utara",
            "zone": "Canggu & Kuta Utara",
            "lat": -8.6592,
            "lng": 115.1306,
            "categories": [
                "pantai",
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "friends",
                "couple",
                "solo"
            ],
            "desc": "Sentra gaya hidup selancar, kafe kopi artisan, dan sunset beat pantai Canggu yang berdenyut dinamis.",
            "tips": "Sewa papan selancar pemula bersama instruktur lokal berlisensi saat air surut di pagi hari.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Pusat nomad dan surfer. Sunset di pinggir pantai sambil mendengarkan musik akustik sangat menyenangkan."
        },
        {
            "id": "bd_taman_ayun",
            "name": "Pura Taman Ayun Mengwi (UNESCO)",
            "kabupaten": "Badung",
            "kecamatan": "Mengwi",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.5414,
            "lng": 115.1725,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pura peninggalan Kerajaan Mengwi abad ke-17 yang dikelilingi kolam parit teratai indah dan deretan pelinggih meru bertingkat tinggi.",
            "tips": "Jelajahi jembatan taman melingkar untuk memotret jajaran meru bertingkat sebelas dari sudut terbaik.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Pura peninggalan kerajaan yang terawat dengan sangat asri. Kolam teratai yang mengelilingi pura memberi ketenangan."
        },
        {
            "id": "bd_sangeh",
            "name": "Hutan Kera Sangeh (Sangeh Monkey Forest)",
            "kabupaten": "Badung",
            "kecamatan": "Abiansemal",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.4808,
            "lng": 115.2078,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 30000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Cagar alam hutan pohon pala raksasa berusia ratusan tahun yang dihuni kawanan kera abu-abu ekor panjang yang ramah.",
            "tips": "Beli pisang di loket resmi dan didampingi pemandu lokal jika ingin berfoto bersama kera.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Pohon-pohon pala raksasanya sangat teduh dan sakral. Kera di sini lebih tenang dibandingkan di tempat lain."
        },
        {
            "id": "bd_nungnung",
            "name": "Air Terjun Nungnung Petang",
            "kabupaten": "Badung",
            "kecamatan": "Petang",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.3297,
            "lng": 115.23,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.8,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Air terjun megah setinggi 50 meter dengan debit air deras di lembah hutan tropis sejuk dataran tinggi Badung Utara.",
            "tips": "Siapkan stamina untuk menuruni dan menaiki sekitar 500 anak tangga beton yang tertata rapi.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "8.500+ ulasan",
            "gmaps_review_highlight": "Gemuruh air terjunnya luar biasa bertenaga! Hawanya sejuk segar dan pemandangan lembahnya masih alami."
        },
        {
            "id": "gy_monkey_forest",
            "name": "Hutan Monyet Ubud (Sacred Monkey Forest)",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5194,
            "lng": 115.2631,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 80000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Cagar alam hutan hujan tropis lebat di jantung Ubud yang dihuni ribuan kera ekor panjang dan pura kuno abad ke-14.",
            "tips": "Hindari menatap mata kera langsung dan jangan membawa plastik kresek atau botol minuman terbuka.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "58.000+ ulasan",
            "gmaps_review_highlight": "Hutan purba dengan pohon beringin raksasa berakar gantung. Sangat magis dan asri di tengah kota Ubud."
        },
        {
            "id": "gy_puri_ubud",
            "name": "Puri Saren Agung & Pasar Seni Ubud",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5069,
            "lng": 115.2625,
            "categories": [
                "budaya",
                "kuliner"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Istana peninggalan Kerajaan Ubud dengan arsitektur ukiran klasik Bali dan sentra cinderamata seni tepat di seberangnya.",
            "tips": "Di malam hari, halaman istana menggelar pertunjukan tari legong dan tari barong tradisional berkarcis.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "32.000+ ulasan",
            "gmaps_review_highlight": "Arsitektur gerbang batu bata merah khas Bali yang sangat otentik. Pusat denyut seni dan sejarah Ubud."
        },
        {
            "id": "gy_campuhan",
            "name": "Campuhan Ridge Walk (Bukit Cinta)",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5036,
            "lng": 115.2558,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "solo",
                "friends"
            ],
            "desc": "Jalur setapak pedestrian di atas punggungan bukit berilalang sejuk diapit dua lembah sungai asri Ubud.",
            "tips": "Datang pukul 06.00–07.00 pagi untuk menikmati kabut pagi tipis dan embun sejuk tanpa keramaian.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "24.000+ ulasan",
            "gmaps_review_highlight": "Jalur trekking paling damai. Pemandangan bukit hijau dan lembah sungainya menyegarkan mata dan pikiran."
        },
        {
            "id": "gy_tegallalang",
            "name": "Terasering Sawah Ceking Tegallalang",
            "kabupaten": "Gianyar",
            "kecamatan": "Tegallalang",
            "zone": "Tegallalang & Payangan",
            "lat": -8.4319,
            "lng": 115.2792,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Undakan sawah terasering beririgasi subak terdaftar warisan dunia UNESCO dengan pemandangan lembah hijau asri.",
            "tips": "Susuri pematang sawah di seberang jurang untuk mendapatkan sudut foto terasering sawah tanpa terhalang kafe.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "46.000+ ulasan",
            "gmaps_review_highlight": "Sistem subak terasering yang luar biasa jenius dan fotogenik. Pemandangan hijau zamrud tiada duanya."
        },
        {
            "id": "gy_tirta_empul",
            "name": "Pura Tirta Empul Tampaksiring",
            "kabupaten": "Gianyar",
            "kecamatan": "Tampaksiring",
            "zone": "Tampaksiring Budaya",
            "lat": -8.415,
            "lng": 115.315,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura mata air suci tempat ritual melukat (penyucian diri spiritual) dengan 30 pancuran air jernih alami sejak abad ke-10.",
            "tips": "Ganti pakaian dengan kain sarung khusus melukat di loket locker sebelum masuk ke kolam pancuran suci.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "39.000+ ulasan",
            "gmaps_review_highlight": "Pengalaman spiritual melukat yang sangat menenangkan. Air pancurannya sangat segar bersumber langsung dari mata air dasar bumi."
        },
        {
            "id": "gy_gunung_kawi",
            "name": "Candi Tebing Gunung Kawi Tampaksiring",
            "kabupaten": "Gianyar",
            "kecamatan": "Tampaksiring",
            "zone": "Tampaksiring Budaya",
            "lat": -8.4233,
            "lng": 115.3125,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kompleks monumen candi purba abad ke-11 setinggi 7 meter yang dipahat langsung di dinding tebing batu cadas Sungai Pakerisan.",
            "tips": "Menuruni sekitar 300 anak tangga berpagar sawah dan lembah sungai yang sangat menenangkan.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Candi pahatan tebing batu purba yang sangat megah. Berada di dasar lembah sungai yang rindang dan sunyi."
        },
        {
            "id": "gy_tegenungan",
            "name": "Air Terjun Tegenungan Kemenuh",
            "kabupaten": "Gianyar",
            "kecamatan": "Sukawati",
            "zone": "Sukawati & Blahbatuh",
            "lat": -8.5753,
            "lng": 115.2889,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "couple"
            ],
            "desc": "Air terjun berdebit deras di lembah hijau asri Kemenuh yang memiliki akses tangga semen paling mudah dijangkau dari Denpasar.",
            "tips": "Banyak kafe dan warung dengan dek ayunan bambu berlatar pemandangan air terjun.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "31.000+ ulasan",
            "gmaps_review_highlight": "Air terjun yang aksesnya paling mudah dan tertata rapi. Pemandangannya indah dan banyak spot foto menarik."
        },
        {
            "id": "gy_goa_gajah",
            "name": "Situs Cagar Budaya Goa Gajah",
            "kabupaten": "Gianyar",
            "kecamatan": "Blahbatuh",
            "zone": "Sukawati & Blahbatuh",
            "lat": -8.5233,
            "lng": 115.2872,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 50000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Gua meditasi bersejarah abad ke-11 dengan mulut gua berukir kepala raksasa Kala dan kolam pemandian kuno berpatung widyadara.",
            "tips": "Kunjungi lembah sungai di bagian belakang gua tempat reruntuhan stupa batu purba terbaring alami di antara aliran air.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "22.000+ ulasan",
            "gmaps_review_highlight": "Nilai sejarahnya sangat tinggi. Perpaduan peninggalan Hindu dan Buddha dalam satu kompleks suci."
        },
        {
            "id": "tb_ulun_danu",
            "name": "Pura Ulun Danu Beratan Bedugul",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.275,
            "lng": 115.1656,
            "categories": [
                "budaya",
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 40000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Ikon kebanggaan Indonesia di pecahan uang kertas Rp 50.000, pura terapung sakral di Danau Beratan berlatar perbukitan berkabut.",
            "tips": "Sewa perahu angsa kayuh atau boat cepat keliling danau untuk memotret pura dari sisi perairan.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "68.000+ ulasan",
            "gmaps_review_highlight": "Pura paling indah dan sejuk di Bali. Kabut tipis di atas danau memberikan suasana magis yang sangat tenang."
        },
        {
            "id": "tb_kebun_raya",
            "name": "Kebun Raya Bali (Eka Karya Bedugul)",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.2833,
            "lng": 115.1558,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Taman botani konservasi terluas di Indonesia (157 hektar) dengan koleksi anggrek liar, hutan pakis raksasa, dan bukit rumput piknik.",
            "tips": "Sewa sepeda listrik atau skuter di gerbang utama untuk berkeliling area kebun raya yang sangat luas.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "25.000+ ulasan",
            "gmaps_review_highlight": "Tempat piknik keluarga nomor satu di Bali. Udaranya sangat dingin dan pohon-pohon purbanya menakjubkan."
        },
        {
            "id": "tb_jatiluwih",
            "name": "Terasering Sawah Jatiluwih (UNESCO)",
            "kabupaten": "Tabanan",
            "kecamatan": "Penebel",
            "zone": "Jatiluwih & Batukaru",
            "lat": -8.3686,
            "lng": 115.1311,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 40000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Hamparan sawah terasering berundak seluas 600 hektar di lereng Gunung Batukaru yang menerapkan sistem irigasi subak UNESCO.",
            "tips": "Pilih rute jalan setapak jalur merah (jalur pendek 1.5 km) atau jalur biru untuk pemandangan terbaik tanpa lelah berlebih.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "29.000+ ulasan",
            "gmaps_review_highlight": "Lansekap persawahan terindah yang pernah saya lihat di dunia. Skala sawah berundaknya sangat masif dan menakjubkan."
        },
        {
            "id": "tb_tanah_lot",
            "name": "Pura Tanah Lot & Batu Bolong",
            "kabupaten": "Tabanan",
            "kecamatan": "Kediri",
            "zone": "Tanah Lot & Kediri",
            "lat": -8.6211,
            "lng": 115.0864,
            "categories": [
                "budaya",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 60000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura sakral pemujaan dewa laut di atas bongkahan batu karang samudera dengan siluet matahari terbenam paling legendaris di Pulau Bali.",
            "tips": "Saat air laut surut sore hari, Anda dapat menyeberang mendekat ke kaki pura dan membasuh muka di sumber air tawar suci.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "92.000+ ulasan",
            "gmaps_review_highlight": "Matahari terbenam di balik Pura Tanah Lot adalah pemandangan ikonik yang wajib dilihat sekali seumur hidup."
        },
        {
            "id": "tb_leke_leke",
            "name": "Air Terjun Leke Leke Baturiti",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.3183,
            "lng": 115.2056,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Air terjun ramping anggun yang jatuh di celah tebing batu berlumut hijau diapit kanopi hutan tropis lebat yang sunyi.",
            "tips": "Jalur trekking melewati jembatan bambu dan perkebunan kopi yang tertata sangat bersih dan alami.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "11.000+ ulasan",
            "gmaps_review_highlight": "Air terjun tersembunyi yang sangat cantik dan fotogenik. Jalur jalan kakinya menyenangkan dan tidak terlalu melelahkan."
        },
        {
            "id": "bg_penglipuran",
            "name": "Desa Tradisional Penglipuran",
            "kabupaten": "Bangli",
            "kecamatan": "Bangli",
            "zone": "Penglipuran & Bangli Kota",
            "lat": -8.4528,
            "lng": 115.3589,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 25000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Desa adat tercantik dan terbersih di dunia dengan tata ruang desa linear seragam berpagar bambu dan bebas dari polusi kendaraan bermotor.",
            "tips": "Coba minuman khas loloh cemcem herbal segar berkhasiat yang dibuat langsung oleh ibu-ibu warga desa.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "41.000+ ulasan",
            "gmaps_review_highlight": "Desa adat yang luar biasa bersih, tertib, dan harmonis. Warga sangat ramah menyambut tamu di pekarangan rumahnya."
        },
        {
            "id": "bg_hutan_bambu",
            "name": "Hutan Bambu Penglipuran",
            "kabupaten": "Bangli",
            "kecamatan": "Bangli",
            "zone": "Penglipuran & Bangli Kota",
            "lat": -8.4489,
            "lng": 115.3594,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Hutan lindung bambu alami seluas 45 hektar di ujung utara Desa Penglipuran dengan kanopi teduh dan udara sejuk berhembus.",
            "tips": "Jalur aspal mulus di tengah rimbunnya rumpun bambu sangat fotogenik dan tenang.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Lorong kanopi bambunya sangat rindang dan meneduhkan hati. Udara pegunungan yang sangat segar."
        },
        {
            "id": "bg_kintamani_view",
            "name": "Gardu Pandang & Kafe Kopi Kintamani",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2778,
            "lng": 115.3458,
            "categories": [
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "family",
                "solo"
            ],
            "desc": "Menikmati seduhan kopi Arabika Kintamani di deretan kafe berarsitektur modern dengan lanskap megah kaldera Gunung Batur dan Danau Batur.",
            "tips": "Datang antara pukul 08.00–10.00 pagi untuk pemandangan terjelas sebelum kabut gunung turun menyelimuti kaldera.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "36.000+ ulasan",
            "gmaps_review_highlight": "Pemandangan ngarai kaldera dan Gunung Batur terbentang sempurna di depan meja kopi. Tempat sarapan terbaik di Bali."
        },
        {
            "id": "bg_batur_sunrise",
            "name": "Sunrise Trekking & Kaldera Gunung Batur",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2417,
            "lng": 115.3789,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 4.0,
            "price": 250000,
            "rating": 4.9,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Pendakian dini hari menuju puncak 1.717 mdpl untuk menyaksikan matahari terbit emas spektakuler di atas lautan awan kaldera.",
            "tips": "Mulai mendaki pukul 03.30 dini hari dipandu pemandu lokal; nikmati sarapan telur rebus uap belerang alami di puncak.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Lautan awan saat matahari terbit adalah keajaiban visual. Kerja keras mendaki 2 jam terbayar lunas seketika."
        },
        {
            "id": "bg_toya_devasya",
            "name": "Pemandian Air Panas Alami Toya Devasya",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2611,
            "lng": 115.3956,
            "categories": [
                "relaksasi",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.5,
            "price": 100000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Kolam renang air panas belerang alami hangat tepat di bibir Danau Batur berlatar dinding kaldera raksasa Gunung Abang.",
            "tips": "Sangat ideal untuk merelaksasi otot setelah mendaki Gunung Batur atau lelah berkendara jauh.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Berendam air hangat di tepi danau berhawa sejuk sambil memandangi danau dan gunung adalah relaksasi paripurna."
        },
        {
            "id": "bg_tukad_cepung",
            "name": "Air Terjun Tukad Cepung Tembuku",
            "kabupaten": "Bangli",
            "kecamatan": "Tembuku",
            "zone": "Tembuku & Susut",
            "lat": -8.4406,
            "lng": 115.3872,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Air terjun tersembunyi di dalam gua tebing batu karang melingkar dengan berkas cahaya surga (sun rays) tembus dari atas gua.",
            "tips": "Datang pukul 09.30–11.30 saat posisi matahari tepat tegak lurus menyinari gua untuk berkas cahaya terindah.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "17.000+ ulasan",
            "gmaps_review_highlight": "Berkas cahaya matahari yang masuk ke dalam gua tebing air terjun sangat magis menyerupai pemandangan film fantasi."
        },
        {
            "id": "kr_besakih",
            "name": "Pura Agung Besakih (The Mother Temple of Bali)",
            "kabupaten": "Karangasem",
            "kecamatan": "Rendang",
            "zone": "Besakih & Rendang",
            "lat": -8.3739,
            "lng": 115.4517,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 60000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kompleks pura terbesar dan paling disucikan di seluruh Bali, berdiri megah di lereng Gunung Agung dengan 86 pura bertingkat.",
            "tips": "Tiket sudah termasuk peminjaman kain sarung kamen dan jasa pengantaran mobil golf listrik menuju pelataran utama.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "42.000+ ulasan",
            "gmaps_review_highlight": "Pura Ibu paling sakral dan megah di Bali. Berdiri di kaki Gunung Agung yang menjulang tinggi memberikan aura kekaguman."
        },
        {
            "id": "kr_lempuyang",
            "name": "Pura Penataran Agung Lempuyang (Gates of Heaven)",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Lempuyang & Abang",
            "lat": -8.3917,
            "lng": 115.6292,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 55000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Candi Bentar legendaris gerbang surga dengan panorama bingkai simetris Gunung Agung yang menjulang megah di antara awan.",
            "tips": "Ambil nomor antrean foto di gerbang surga sejak pukul 06.30 pagi untuk pencahayaan terbaik bebas awan tebal.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "36.000+ ulasan",
            "gmaps_review_highlight": "Candi bentar berlatar Gunung Agung adalah pemandangan paling spektakuler di Bali Timur."
        },
        {
            "id": "kr_tirta_gangga",
            "name": "Istana Air Tirta Gangga",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Lempuyang & Abang",
            "lat": -8.4122,
            "lng": 115.5873,
            "categories": [
                "budaya",
                "alam",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Taman air peninggalan Raja Karangasem dengan kolam air mata air alami bertingkat, patung dewa klasik, dan ribuan ikan koi jinak.",
            "tips": "Beli pelet pakan ikan di warung luar loket untuk pengalaman memberi makan kawanan koi raksasa di batu pijakan kolam.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "48.000+ ulasan",
            "gmaps_review_highlight": "Kolam ikan koi dengan batu pijakan melingkarnya sangat cantik dan menyejukkan. Sangat terawat dan fotogenik."
        },
        {
            "id": "kr_taman_ujung",
            "name": "Taman Ujung Soekasada",
            "kabupaten": "Karangasem",
            "kecamatan": "Karangasem",
            "zone": "Ujung & Candidasa",
            "lat": -8.4631,
            "lng": 115.6306,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 35000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Istana peristirahatan raja berpadu arsitektur kolonial Eropa dan Bali dengan jembatan pilar megah menghadap ke Selat Lombok.",
            "tips": "Naiki tangga pilar pilar tanpa atap di bukit untuk mendapatkan sudut pandang 360 derajat istana air dan laut.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "23.000+ ulasan",
            "gmaps_review_highlight": "Perpaduan arsitektur istana air yang luar biasa megah dan tenang. Jauh dari hiruk pikuk keramaian kota."
        },
        {
            "id": "kr_amed",
            "name": "Pantai Amed (Snorkeling & Siluet Gunung Agung)",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Amed & Tulamben Bahari",
            "lat": -8.3486,
            "lng": 115.6569,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Teluk pasir hitam vulkanik dengan jajaran perahu jukung warna-warni, terumbu karang pesisir dangkal, dan siluet sunset Gunung Agung.",
            "tips": "Bisa langsung snorkeling 10 meter dari bibir pantai di Jemeluk Bay untuk melihat patung bawah air dan terumbu karang.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Suasana pantai santai paling damai. Duduk di kafe tepi bukit sambil melihat sunset di balik Gunung Agung tak terlupakan."
        },
        {
            "id": "kr_sidemen",
            "name": "Lembah Asri & Sawah Sidemen",
            "kabupaten": "Karangasem",
            "kecamatan": "Sidemen",
            "zone": "Lembah Sidemen",
            "lat": -8.4722,
            "lng": 115.4472,
            "categories": [
                "alam",
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "solo"
            ],
            "desc": "Pedesaan Bali autentik di lembah berhawa sejuk yang dikelilingi petak sawah hijau, sungai jernih, dan sentra kerajinan tenun endek tradisional.",
            "tips": "Sewa sepeda atau berjalan kaki di sepanjang jalur pedesaan Bukit Ceeng saat pagi berkabut.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Seperti Ubud di masa 30 tahun lalu. Sangat asri, tenang, dengan pemandangan sawah dan Gunung Agung yang menyejukkan hati."
        },
        {
            "id": "bl_lovina",
            "name": "Pantai Lovina (Dolphin Tour Fajar)",
            "kabupaten": "Buleleng",
            "kecamatan": "Buleleng",
            "zone": "Lovina & Singaraja",
            "lat": -8.1583,
            "lng": 115.025,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 100000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Menyusuri perairan laut tenang Bali Utara dengan jukung tradisional untuk melihat kawanan lumba-lumba liar melompat di fajar matahari terbit.",
            "tips": "Datang ke dermaga pukul 05.30 pagi; setelah lumba-lumba Anda bisa berenang snorkeling koral karang Lovina.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "34.000+ ulasan",
            "gmaps_review_highlight": "Melihat puluhan lumba-lumba melompat bebas tepat di samping perahu saat matahari terbit adalah momen magis!"
        },
        {
            "id": "bl_sekumpul",
            "name": "Air Terjun Sekumpul & Air Terjun Fiji",
            "kabupaten": "Buleleng",
            "kecamatan": "Sawan",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.1747,
            "lng": 115.1814,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 3.0,
            "price": 30000,
            "rating": 4.9,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Gugusan air terjun tertinggi dan terindah di Bali (80 meter) dengan 7 tirai air jatuh megah diapit dinding tebing hijau hutan perawan.",
            "tips": "Tersedia pilihan trekking pendek (viewpoint) atau trekking lengkap turun ke dasar kolam air terjun.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "22.000+ ulasan",
            "gmaps_review_highlight": "Air terjun terindah di seluruh pulau Bali tanpa tanding. Kemegahan 7 air terjun bertingkatnya luar biasa spektakuler."
        },
        {
            "id": "bl_banyumala",
            "name": "Air Terjun Banyumala Twin Waterfalls",
            "kabupaten": "Buleleng",
            "kecamatan": "Sukasada",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.2178,
            "lng": 115.1486,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 30000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Dua tirai air terjun kembar mengalir lembut menuruni dinding tebing bebatuan berselimut lumut ke dalam kolam alami jernih sejuk.",
            "tips": "Kolam alaminya sangat tenang dan aman untuk berenang menyegarkan diri di air pegunungan alami.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Air terjun kembar yang sangat menenangkan. Kolamnya jernih kebiruan dan airnya sangat menyegarkan."
        },
        {
            "id": "bl_gitgit",
            "name": "Air Terjun Gitgit Sukasada",
            "kabupaten": "Buleleng",
            "kecamatan": "Sukasada",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.1917,
            "lng": 115.1389,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Air terjun legendaris setinggi 35 meter di jalur lintas Bedugul-Singaraja dengan jalur jalan setapak rindang perkebunan cengkih.",
            "tips": "Jalur jalan kaki berundak tertata rapi di antara deretan pohon cengkih dan warung kerajinan lokal.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Air terjun bersejarah yang sangat mudah diakses saat perjalanan dari Bedugul menuju Singaraja."
        },
        {
            "id": "bl_air_panas_banjar",
            "name": "Pemandian Air Panas Alami Banjar",
            "kabupaten": "Buleleng",
            "kecamatan": "Banjar",
            "zone": "Lovina & Singaraja",
            "lat": -8.2106,
            "lng": 114.9667,
            "categories": [
                "relaksasi",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Tiga kolam air panas belerang alami yang memancar dari mulut patung naga batu di tengah rimbunnya taman tropis perbukitan Banjar.",
            "tips": "Pancuran air hangat bertingkat di kolam atas sangat nikmat untuk memijat punggung dan pundak yang pegal.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Air panas belerangnya sangat alami dan manjur untuk merelaksasi badan. Suasana taman tropisnya sangat damai."
        },
        {
            "id": "bl_menjangan",
            "name": "Taman Nasional Bali Barat & Pulau Menjangan",
            "kabupaten": "Buleleng",
            "kecamatan": "Gerokgak",
            "zone": "Gerokgak & Menjangan",
            "lat": -8.0933,
            "lng": 114.5167,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 4.0,
            "price": 200000,
            "rating": 4.9,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Surga dinding terumbu karang (wall diving) terbaik di Indonesia dengan kejernihan air laut hingga kedalaman 30 meter dan habitat rusa jinak.",
            "tips": "Naik boat carter dari Labuhan Lalang (30 menit menyeberang) lengkap dengan sewa alat snorkeling dan pelampung.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "15.000+ ulasan",
            "gmaps_review_highlight": "Terumbu karang paling sehat dan air paling jernih di seluruh Bali! Berenang bersama kawanan penyu dan ikan karang warna-warni."
        },
        {
            "id": "dp_sanur",
            "name": "Pantai Sanur & Pelabuhan Fast Boat",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Selatan",
            "zone": "Sanur Bahari",
            "lat": -8.6833,
            "lng": 115.2639,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pantai berpasir putih dengan ombak tenang yang terkenal sebagai spot sunrise terbaik dan pelabuhan penyeberangan kapal cepat ke Nusa Penida.",
            "tips": "Sewa sepeda santai di pinggir pantai seharga Rp 20.000/jam untuk menikmati jalan setapak tepi laut.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "46.000+ ulasan",
            "gmaps_review_highlight": "Tempat terbaik melihat matahari terbit di Bali. Suasana pagi sangat damai dengan perahu jukung tradisional mengapung tenang."
        },
        {
            "id": "dp_bajra_sandhi",
            "name": "Monumen Bajra Sandhi Renon",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Timur",
            "zone": "Renon & Denpasar Pusat",
            "lat": -8.6717,
            "lng": 115.2339,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Monumen megah berarsitektur genta pendeta suci Hindu (Bajra) dengan 33 diorama sejarah perjuangan rakyat Bali dari zaman purba hingga kemerdekaan.",
            "tips": "Naiki tangga melingkar di ruang tengah monumen untuk mencapai puncak gardu pandang lantai 3 dengan pemandangan 360 derajat Kota Denpasar.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Arsitektur batunya sangat megah dan berkarakter kuat. Diorama sejarah di dalamnya sangat informatif dan mendidik."
        },
        {
            "id": "dp_pasar_badung",
            "name": "Pasar Badung & Pasar Seni Kumbasari Heritage",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Barat",
            "zone": "Renon & Denpasar Pusat",
            "lat": -8.6575,
            "lng": 115.215,
            "categories": [
                "kuliner",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pusat heritage pasar tradisional terbesar di Bali di tepi bantaran Sungai Tukad Badung yang tertata bersih dengan jembatan lampu malam.",
            "tips": "Datang malam hari untuk menikmati street food kuliner khas Bali di bantaran sungai Tukad Badung (Korea-nya Denpasar).",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Pasar tradisional yang sangat modern dan bersih. Belanja oleh-oleh seni di Kumbasari harganya jauh lebih ramah di kantong."
        },
        {
            "id": "jb_medewi",
            "name": "Pantai Medewi (Left-Hand Point Break)",
            "kabupaten": "Jembrana",
            "kecamatan": "Pekutatan",
            "zone": "Pekutatan & Medewi",
            "lat": -8.4183,
            "lng": 114.9083,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Pantai berbatu hitam eksotis yang terkenal di kalangan peselancar internasional karena memiliki ombak kiri yang panjang dan konsisten.",
            "tips": "Nikmati kelapa muda bakar dan santap ikan laut segar di warung tebing tepi pantai sambil menikmati sunset tenang.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Tempat selancar legendaris dengan suasana pedesaan yang tenang. Jauh dari kebisingan kota dan sunsetnya sangat indah."
        },
        {
            "id": "jb_bunut_bolong",
            "name": "Pohon Suci Bunut Bolong Pekutatan",
            "kabupaten": "Jembrana",
            "kecamatan": "Pekutatan",
            "zone": "Pekutatan & Medewi",
            "lat": -8.3611,
            "lng": 114.8875,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pohon beringin purba raksasa suci dengan lubang terowongan alami di bagian dasarnya yang dilewati jalan raya aspal.",
            "tips": "Kendaraan roda empat dapat melintas tepat di bawah rongga akar pohon yang dinaungi kanopi hijau rindang.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "7.500+ ulasan",
            "gmaps_review_highlight": "Fenomena alam yang sangat unik dan sakral. Jalan aspal yang menembus batang pohon raksasa sungguh luar biasa."
        },
        {
            "id": "jb_rambut_siwi",
            "name": "Pura Dang Kahyangan Rambut Siwi",
            "kabupaten": "Jembrana",
            "kecamatan": "Mendoyo",
            "zone": "Negara & Gilimanuk",
            "lat": -8.3889,
            "lng": 114.7611,
            "categories": [
                "budaya"
            ],
            "idealTime": "sunset",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Pura tebing karang megah peninggalan Dang Hyang Nirartha menghadap langsung ke Samudra Hindia dengan panorama pantai pasir hitam membentang.",
            "tips": "Suasana saat senja sangat damai dengan deburan ombak membentur tebing karang di bawah pelataran pura.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "9.000+ ulasan",
            "gmaps_review_highlight": "Salah satu pura tebing tepi laut terindah di Bali Barat. Pemandangan samudera dan siluet puranya sangat mengesankan."
        }
    ]
},

  "nusa-penida": {
    "id": "nusa-penida",
    "name": "Nusa Penida, Lembongan & Ceningan",
    "quickDesc": "Trio pulau eksotis di tenggara Bali dengan tebing karst purba megah Samudra Hindia, laguna toska, dan habitat pari Manta raksasa.",
    "center": [
        -8.7275,
        115.5444
    ],
    "zoom": 11,
    "bestSeason": "Mei – Sep • Gelombang Tenang & Kejernihan Laut Maksimal",
    "tips": [
        "Gunakan fast boat dari Pantai Sanur (35–45 menit penyeberangan menuju Pelabuhan Banjar Nyuh/Sampalan).",
        "Sewa mobil dengan driver lokal di Nusa Penida karena jalanan perbukitan cukup menantang.",
        "Bawa uang tunai secukupnya karena mesin ATM di pulau Nusa masih terbatas.",
        "Gunakan alas kaki anti-selip saat menuruni tangga tebing Kelingking atau Diamond Beach."
    ],
    "baseCosts": {
        "budget": {
            "stay": 280000,
            "transport": 150000,
            "food": 120000,
            "misc": 60000
        },
        "comfort": {
            "stay": 750000,
            "transport": 500000,
            "food": 280000,
            "misc": 120000
        },
        "luxury": {
            "stay": 2400000,
            "transport": 1100000,
            "food": 700000,
            "misc": 300000
        }
    },
    "zones": [
        "Nusa Penida Barat",
        "Nusa Penida Timur",
        "Nusa Lembongan",
        "Nusa Ceningan"
    ],
    "spots": [
        {
            "id": "np_kelingking",
            "name": "Pantai Kelingking (T-Rex Cliff)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7511,
            "lng": 115.4744,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 10000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Formasi tebing batu karang spektakuler menyerupai kepala dinosaurus T-Rex yang menjorok ke perairan toska Samudra Hindia.",
            "tips": "Jika turun ke bibir pantai di bawah tebing, pastikan fisik prima (butuh waktu 45 menit turun-naik tangga terjal).",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "38.000+ ulasan",
            "gmaps_review_highlight": "Pemandangan tebing terindah di Indonesia! Air lautnya hijau toska dengan deburan ombak megah."
        },
        {
            "id": "np_broken_beach",
            "name": "Broken Beach (Pasih Uug)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7336,
            "lng": 115.4542,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Tebing melingkar dengan terowongan jembatan karang alami tempat air laut samudera mengalir keluar masuk teluk.",
            "tips": "Jalur setapak melingkari tebing sangat fotogenik, berhati-hatilah saat mengambil foto di tepi karang.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "21.000+ ulasan",
            "gmaps_review_highlight": "Jembatan karang alaminya luar biasa megah. Dari atas tebing kita bisa melihat ikan pari manta berenang di laut lepas."
        },
        {
            "id": "np_angels_billabong",
            "name": "Angel's Billabong",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7348,
            "lng": 115.4517,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 10000,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kolam renang alami muara tebing batu karang zamrud tepat di bibir tebing Samudra Hindia.",
            "tips": "Dilarang berenang saat air laut pasang atau ombak besar menerjang demi keselamatan.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Gradasi warna air kolam karang antara hijau zamrud dan biru lautnya sangat memesona."
        },
        {
            "id": "np_crystal_bay",
            "name": "Crystal Bay (Teluk Penida)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7153,
            "lng": 115.4578,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai teluk berpasir putih dikelilingi pohon kelapa rindang, tempat terbaik sunset dan snorkeling koral sehat.",
            "tips": "Sewa kacamata snorkel dan fin di warung pantai untuk melihat ikan badut dan koral sehat 15 meter dari bibir pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Tempat bersantai sore paling damai di Nusa Penida. Sunset tepat di balik pulau karang kecil di tengah teluk."
        },
        {
            "id": "np_diamond_beach",
            "name": "Pantai Diamond (Diamond Beach)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7842,
            "lng": 115.6186,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 15000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Tebing karst megah berbentuk intan permata dengan tangga tebing batu pahatan tangan menuju hamparan pasir putih berkilau.",
            "tips": "Waktu foto terbaik pukul 08.00–11.00 pagi saat sinar matahari menyinari langsung seluruh dinding tebing putih.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "27.000+ ulasan",
            "gmaps_review_highlight": "Tangga tebingnya salah satu spot foto terikonik di dunia. Pasir putih lembut dan air laut sangat bersih."
        },
        {
            "id": "np_atuh_beach",
            "name": "Pantai Atuh (Atuh Beach)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7831,
            "lng": 115.6208,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 10000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Teluk pasir putih tersembunyi berlatar pulau karang bolong alami dengan ombak tenang yang ramah untuk berenang.",
            "tips": "Tersedia deretan payung pantai dan kelapa muda segar di warung lokal tepi pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Teluk damai dengan batu karang berlubang di tengah laut. Suasana sangat eksotis dan asri."
        },
        {
            "id": "np_rumah_pohon",
            "name": "Rumah Pohon Molenteng & Raja Lima",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Timur",
            "lat": -8.7819,
            "lng": 115.6175,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Sudut pandang gugusan pulau karang seribu menyerupai panorama Raja Ampat dari anjungan rumah pohon kayu eksotis.",
            "tips": "Siapkan nomor antrean foto rumah pohon lebih awal untuk menghindari antrean di siang terik.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Gugusan pulau karang hijau di tengah laut biru membuat pemandangan ini tampak seperti lukisan."
        },
        {
            "id": "np_manta_point",
            "name": "Snorkeling & Diving Pari Manta (Manta Point)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Penida Barat",
            "lat": -8.7981,
            "lng": 115.495,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 3.0,
            "price": 175000,
            "rating": 4.9,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Spot penyelaman kelas dunia untuk berenang langsung berdampingan dengan kawanan ikan pari Manta raksasa liar.",
            "tips": "Gunakan operator boat berlisensi dan taati jarak aman (minimal 3 meter) saat pari Manta mendekat.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Pengalaman magis seumur hidup! Melihat 4 ekor manta ray berenang anggun di bawah perahu kami."
        },
        {
            "id": "nl_devils_tear",
            "name": "Devil's Tear Nusa Lembongan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6872,
            "lng": 115.4311,
            "categories": [
                "alam",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Deburan ombak Samudra Hindia raksasa yang menerjang celah karang menghasilkan semburan kabut air laut dan pelangi alami.",
            "tips": "Jangan berdiri terlalu dekat di tepi tebing licin basah karena ombak tak terduga bisa menyapu permukaan karang.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "15.000+ ulasan",
            "gmaps_review_highlight": "Tenaga ombaknya luar biasa spektakuler! Saat sunset tercipta pelangi air laut di udara."
        },
        {
            "id": "nl_dream_beach",
            "name": "Dream Beach Nusa Lembongan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6883,
            "lng": 115.435,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai teluk berpasir putih lembut dengan air laut toska jernih dan deretan kafe tepi tebing menghadap samudera.",
            "tips": "Cocok untuk berjemur dan santai sore, namun perhatikan bendera peringatan bila ombak sedang tinggi.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "11.000+ ulasan",
            "gmaps_review_highlight": "Salah satu pantai terindah di Lembongan. Pasir putih halus dan panorama tebing yang memukau."
        },
        {
            "id": "nl_yellow_bridge",
            "name": "Yellow Bridge (Jembatan Kuning Lembongan-Ceningan)",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Lembongan",
            "lat": -8.6942,
            "lng": 115.4503,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Jembatan gantung kuning ikonik yang menghubungkan Nusa Lembongan dan Nusa Ceningan di atas selat laut biru tenang.",
            "tips": "Hanya dapat dilalui pejalan kaki dan sepeda motor roda dua. Spot foto khas kepulauan Nusa.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "9.000+ ulasan",
            "gmaps_review_highlight": "Ikon penghubung Lembongan dan Ceningan. Menyeberang dengan motor sambil melihat air laut jernih di bawahnya."
        },
        {
            "id": "nc_blue_lagoon",
            "name": "Blue Lagoon Nusa Ceningan",
            "kabupaten": "Klungkung",
            "kecamatan": "Nusa Penida",
            "zone": "Nusa Ceningan",
            "lat": -8.7106,
            "lng": 115.4419,
            "categories": [
                "alam",
                "pantai"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Laguna teluk tebing kapur dengan warna air laut biru toska susu (milky turquoise) paling magis dan dramatis di Bali.",
            "tips": "Air laut di teluk ini sangat pekat toska karena pantulan dasar kapur putih murni.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Warna air lautnya benar-benar biru toska neon alami, pemandangan spektakuler yang wajib dikunjungi."
        }
    ]
},

  "badung": {
    "id": "badung",
    "name": "Kabupaten Badung (Kuta, Seminyak, Canggu & Uluwatu)",
    "quickDesc": "Sentra pariwisata utama Bali selatan: deretan pantai tebing spektakuler, pura sakral di atas tebing samudera, dan sentra gaya hidup modern.",
    "center": [
        -8.7,
        115.17
    ],
    "zoom": 11,
    "bestSeason": "Sepanjang Tahun • Sunset Emas & Ombak Selancar Kelas Dunia",
    "tips": [
        "Gunakan rute pintas (shortcut) untuk menghindari kemacetan di area Canggu dan Seminyak pada sore hari.",
        "Waktu terbaik menonton Tari Kecak Uluwatu adalah sesi pertama pukul 18.00 WIB (beli tiket online sebelum kehabisan).",
        "Makan malam seafood di Jimbaran paling pas dimulai pukul 17.30 menjelang matahari terbenam."
    ],
    "baseCosts": {
        "budget": {
            "stay": 300000,
            "transport": 130000,
            "food": 120000,
            "misc": 50000
        },
        "comfort": {
            "stay": 850000,
            "transport": 450000,
            "food": 300000,
            "misc": 100000
        },
        "luxury": {
            "stay": 3200000,
            "transport": 1200000,
            "food": 850000,
            "misc": 350000
        }
    },
    "zones": [
        "Kuta Selatan & Bukit",
        "Kuta & Seminyak",
        "Canggu & Kuta Utara",
        "Mengwi & Badung Utara"
    ],
    "spots": [
        {
            "id": "bd_uluwatu",
            "name": "Pura Luhur Uluwatu & Tari Kecak",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8291,
            "lng": 115.0849,
            "categories": [
                "budaya",
                "relaksasi",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura sakral di atas tebing karang 70 meter menghadap Samudra Hindia dengan pertunjukan Tari Kecak magis saat sunset.",
            "tips": "Amankan kacamata dan topi dari kera usil di sekitar jalan setapak tebing.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "82.000+ ulasan",
            "gmaps_review_highlight": "Magis dan sakral. Tari Kecak dengan latar belakang matahari terbenam di samudra lepas tidak tertandingi."
        },
        {
            "id": "bd_melasti",
            "name": "Pantai Melasti Ungasan",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8475,
            "lng": 115.1583,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pantai berpasir putih bersih dengan akses jalan aspal spektakuler membelah tebing kapur putih tinggi.",
            "tips": "Waktu terbaik berenang adalah saat air laut pasang sedang (siang menjelang sore).",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "34.000+ ulasan",
            "gmaps_review_highlight": "Jalan membelah tebing kapurnya sangat megah. Pantainya luas, bersih, dan berair toska bening."
        },
        {
            "id": "bd_padang_padang",
            "name": "Pantai Padang Padang (Labuan Sait)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8111,
            "lng": 115.1039,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pantai pasir putih eksotis di balik celah sempit gua batu karang, terkenal sebagai lokasi syuting film Eat Pray Love.",
            "tips": "Akses masuk melewati celah batu unik satu arah; datang sebelum pukul 10.00 agar tidak terlalu ramai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "29.000+ ulasan",
            "gmaps_review_highlight": "Melewati celah lorong batu karang untuk menuju pantainya memberi sensasi menemukan hidden paradise."
        },
        {
            "id": "bd_suluban",
            "name": "Pantai Suluban (Blue Point Uluwatu)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8178,
            "lng": 115.0872,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 10000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Akses unik menuruni celah gua karang sempit menuju deburan ombak selancar kelas dunia Samudra Hindia.",
            "tips": "Sangat cocok untuk menikmati kopi di kafe tebing Single Fin sambil menonton aksi peselancar profesional.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Gua karang tempat masuknya pantai ini luar biasa eksotis. Pemandangan tebing dan ombaknya luar biasa."
        },
        {
            "id": "bd_pandawa",
            "name": "Pantai Pandawa",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8447,
            "lng": 115.1867,
            "categories": [
                "pantai",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 15000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "couple"
            ],
            "desc": "Pantai pasir putih berombak tenang diapit tebing kapur berukir patung ksatria Panca Pandawa dan Dewi Kunti.",
            "tips": "Tersedia persewaan kano kano ganda lengkap dengan pelampung untuk menyusuri perairan jernih tepi pantai.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "42.000+ ulasan",
            "gmaps_review_highlight": "Sangat ramah keluarga dan anak-anak. Ombaknya tenang karena terhalang karang luar."
        },
        {
            "id": "bd_jimbaran",
            "name": "Santap Seafood Bakar Teluk Jimbaran",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.7719,
            "lng": 115.1667,
            "categories": [
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.0,
            "price": 150000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends"
            ],
            "desc": "Sensasi makan malam ikan kakap bakar bumbu Bali dan udang madu segar langsung di atas hamparan pasir pantai Jimbaran.",
            "tips": "Pilih meja paling depan di dekat air pasang surut untuk suasana santap malam romantis bertabur lilin.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "55.000+ ulasan",
            "gmaps_review_highlight": "Ikan kakap bakar bumbu jimbaran dan sambal matahnya legendaris. Suasana malam dengan lilin di pantai sangat syahdu."
        },
        {
            "id": "bd_gwk",
            "name": "Taman Budaya Garuda Wisnu Kencana (GWK)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Selatan",
            "zone": "Kuta Selatan & Bukit",
            "lat": -8.8105,
            "lng": 115.1678,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 3.0,
            "price": 125000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Taman budaya megah dengan monumen Patung Dewa Wisnu menunggang Garuda setinggi 121 meter karya maestro Nyoman Nuarta.",
            "tips": "Tonton pagelaran tarian tradisional Bali gratis yang diadakan berkala setiap jam di Lotus Pond.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "64.000+ ulasan",
            "gmaps_review_highlight": "Patungnya luar biasa megah dan terlihat dari seluruh penjuru Bali Selatan. Teater budayanya sangat memukau."
        },
        {
            "id": "bd_canggu",
            "name": "Pantai Batu Bolong & Echo Beach (Canggu)",
            "kabupaten": "Badung",
            "kecamatan": "Kuta Utara",
            "zone": "Canggu & Kuta Utara",
            "lat": -8.6592,
            "lng": 115.1306,
            "categories": [
                "pantai",
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "friends",
                "couple",
                "solo"
            ],
            "desc": "Sentra gaya hidup selancar, kafe kopi artisan, dan sunset beat pantai Canggu yang berdenyut dinamis.",
            "tips": "Sewa papan selancar pemula bersama instruktur lokal berlisensi saat air surut di pagi hari.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Pusat nomad dan surfer. Sunset di pinggir pantai sambil mendengarkan musik akustik sangat menyenangkan."
        },
        {
            "id": "bd_taman_ayun",
            "name": "Pura Taman Ayun Mengwi (UNESCO)",
            "kabupaten": "Badung",
            "kecamatan": "Mengwi",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.5414,
            "lng": 115.1725,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pura peninggalan Kerajaan Mengwi abad ke-17 yang dikelilingi kolam parit teratai indah dan deretan pelinggih meru bertingkat tinggi.",
            "tips": "Jelajahi jembatan taman melingkar untuk memotret jajaran meru bertingkat sebelas dari sudut terbaik.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Pura peninggalan kerajaan yang terawat dengan sangat asri. Kolam teratai yang mengelilingi pura memberi ketenangan."
        },
        {
            "id": "bd_sangeh",
            "name": "Hutan Kera Sangeh (Sangeh Monkey Forest)",
            "kabupaten": "Badung",
            "kecamatan": "Abiansemal",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.4808,
            "lng": 115.2078,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 30000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Cagar alam hutan pohon pala raksasa berusia ratusan tahun yang dihuni kawanan kera abu-abu ekor panjang yang ramah.",
            "tips": "Beli pisang di loket resmi dan didampingi pemandu lokal jika ingin berfoto bersama kera.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Pohon-pohon pala raksasanya sangat teduh dan sakral. Kera di sini lebih tenang dibandingkan di tempat lain."
        },
        {
            "id": "bd_nungnung",
            "name": "Air Terjun Nungnung Petang",
            "kabupaten": "Badung",
            "kecamatan": "Petang",
            "zone": "Mengwi & Badung Utara",
            "lat": -8.3297,
            "lng": 115.23,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.8,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Air terjun megah setinggi 50 meter dengan debit air deras di lembah hutan tropis sejuk dataran tinggi Badung Utara.",
            "tips": "Siapkan stamina untuk menuruni dan menaiki sekitar 500 anak tangga beton yang tertata rapi.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "8.500+ ulasan",
            "gmaps_review_highlight": "Gemuruh air terjunnya luar biasa bertenaga! Hawanya sejuk segar dan pemandangan lembahnya masih alami."
        }
    ]
},

  "gianyar": {
    "id": "gianyar",
    "name": "Kabupaten Gianyar (Ubud, Tegallalang & Tampaksiring)",
    "quickDesc": "Jantung kebudayaan, seni lukis, pahat kayu, terasering sawah subak bertingkat, serta pura pembersihan diri mata air suci kuno.",
    "center": [
        -8.5069,
        115.2625
    ],
    "zoom": 12,
    "bestSeason": "Sepanjang Tahun • Paling Asri & Hijau Saat Awal Musim Kemarau",
    "tips": [
        "Pagi hari pukul 06.30 adalah waktu terbaik berjalan di Campuhan Ridge Walk agar sejuk dan bebas terik.",
        "Saat melukat di Tirta Empul, bawa baju ganti dan kenakan kain sarung khusus melukat yang disediakan.",
        "Tawar dengan ramah dan sopan saat berbelanja oleh-oleh seni di Pasar Ubud atau Pasar Seni Sukawati."
    ],
    "baseCosts": {
        "budget": {
            "stay": 250000,
            "transport": 120000,
            "food": 100000,
            "misc": 50000
        },
        "comfort": {
            "stay": 650000,
            "transport": 400000,
            "food": 250000,
            "misc": 100000
        },
        "luxury": {
            "stay": 2500000,
            "transport": 950000,
            "food": 650000,
            "misc": 250000
        }
    },
    "zones": [
        "Ubud Sentral",
        "Tegallalang & Payangan",
        "Tampaksiring Budaya",
        "Sukawati & Blahbatuh"
    ],
    "spots": [
        {
            "id": "gy_monkey_forest",
            "name": "Hutan Monyet Ubud (Sacred Monkey Forest)",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5194,
            "lng": 115.2631,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 80000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Cagar alam hutan hujan tropis lebat di jantung Ubud yang dihuni ribuan kera ekor panjang dan pura kuno abad ke-14.",
            "tips": "Hindari menatap mata kera langsung dan jangan membawa plastik kresek atau botol minuman terbuka.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "58.000+ ulasan",
            "gmaps_review_highlight": "Hutan purba dengan pohon beringin raksasa berakar gantung. Sangat magis dan asri di tengah kota Ubud."
        },
        {
            "id": "gy_puri_ubud",
            "name": "Puri Saren Agung & Pasar Seni Ubud",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5069,
            "lng": 115.2625,
            "categories": [
                "budaya",
                "kuliner"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Istana peninggalan Kerajaan Ubud dengan arsitektur ukiran klasik Bali dan sentra cinderamata seni tepat di seberangnya.",
            "tips": "Di malam hari, halaman istana menggelar pertunjukan tari legong dan tari barong tradisional berkarcis.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "32.000+ ulasan",
            "gmaps_review_highlight": "Arsitektur gerbang batu bata merah khas Bali yang sangat otentik. Pusat denyut seni dan sejarah Ubud."
        },
        {
            "id": "gy_campuhan",
            "name": "Campuhan Ridge Walk (Bukit Cinta)",
            "kabupaten": "Gianyar",
            "kecamatan": "Ubud",
            "zone": "Ubud Sentral",
            "lat": -8.5036,
            "lng": 115.2558,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "solo",
                "friends"
            ],
            "desc": "Jalur setapak pedestrian di atas punggungan bukit berilalang sejuk diapit dua lembah sungai asri Ubud.",
            "tips": "Datang pukul 06.00–07.00 pagi untuk menikmati kabut pagi tipis dan embun sejuk tanpa keramaian.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "24.000+ ulasan",
            "gmaps_review_highlight": "Jalur trekking paling damai. Pemandangan bukit hijau dan lembah sungainya menyegarkan mata dan pikiran."
        },
        {
            "id": "gy_tegallalang",
            "name": "Terasering Sawah Ceking Tegallalang",
            "kabupaten": "Gianyar",
            "kecamatan": "Tegallalang",
            "zone": "Tegallalang & Payangan",
            "lat": -8.4319,
            "lng": 115.2792,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Undakan sawah terasering beririgasi subak terdaftar warisan dunia UNESCO dengan pemandangan lembah hijau asri.",
            "tips": "Susuri pematang sawah di seberang jurang untuk mendapatkan sudut foto terasering sawah tanpa terhalang kafe.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "46.000+ ulasan",
            "gmaps_review_highlight": "Sistem subak terasering yang luar biasa jenius dan fotogenik. Pemandangan hijau zamrud tiada duanya."
        },
        {
            "id": "gy_tirta_empul",
            "name": "Pura Tirta Empul Tampaksiring",
            "kabupaten": "Gianyar",
            "kecamatan": "Tampaksiring",
            "zone": "Tampaksiring Budaya",
            "lat": -8.415,
            "lng": 115.315,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura mata air suci tempat ritual melukat (penyucian diri spiritual) dengan 30 pancuran air jernih alami sejak abad ke-10.",
            "tips": "Ganti pakaian dengan kain sarung khusus melukat di loket locker sebelum masuk ke kolam pancuran suci.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "39.000+ ulasan",
            "gmaps_review_highlight": "Pengalaman spiritual melukat yang sangat menenangkan. Air pancurannya sangat segar bersumber langsung dari mata air dasar bumi."
        },
        {
            "id": "gy_gunung_kawi",
            "name": "Candi Tebing Gunung Kawi Tampaksiring",
            "kabupaten": "Gianyar",
            "kecamatan": "Tampaksiring",
            "zone": "Tampaksiring Budaya",
            "lat": -8.4233,
            "lng": 115.3125,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kompleks monumen candi purba abad ke-11 setinggi 7 meter yang dipahat langsung di dinding tebing batu cadas Sungai Pakerisan.",
            "tips": "Menuruni sekitar 300 anak tangga berpagar sawah dan lembah sungai yang sangat menenangkan.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Candi pahatan tebing batu purba yang sangat megah. Berada di dasar lembah sungai yang rindang dan sunyi."
        },
        {
            "id": "gy_tegenungan",
            "name": "Air Terjun Tegenungan Kemenuh",
            "kabupaten": "Gianyar",
            "kecamatan": "Sukawati",
            "zone": "Sukawati & Blahbatuh",
            "lat": -8.5753,
            "lng": 115.2889,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "couple"
            ],
            "desc": "Air terjun berdebit deras di lembah hijau asri Kemenuh yang memiliki akses tangga semen paling mudah dijangkau dari Denpasar.",
            "tips": "Banyak kafe dan warung dengan dek ayunan bambu berlatar pemandangan air terjun.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "31.000+ ulasan",
            "gmaps_review_highlight": "Air terjun yang aksesnya paling mudah dan tertata rapi. Pemandangannya indah dan banyak spot foto menarik."
        },
        {
            "id": "gy_goa_gajah",
            "name": "Situs Cagar Budaya Goa Gajah",
            "kabupaten": "Gianyar",
            "kecamatan": "Blahbatuh",
            "zone": "Sukawati & Blahbatuh",
            "lat": -8.5233,
            "lng": 115.2872,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 50000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Gua meditasi bersejarah abad ke-11 dengan mulut gua berukir kepala raksasa Kala dan kolam pemandian kuno berpatung widyadara.",
            "tips": "Kunjungi lembah sungai di bagian belakang gua tempat reruntuhan stupa batu purba terbaring alami di antara aliran air.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "22.000+ ulasan",
            "gmaps_review_highlight": "Nilai sejarahnya sangat tinggi. Perpaduan peninggalan Hindu dan Buddha dalam satu kompleks suci."
        }
    ]
},

  "tabanan": {
    "id": "tabanan",
    "name": "Kabupaten Tabanan (Bedugul, Tanah Lot & Jatiluwih)",
    "quickDesc": "Lumbung beras Bali berhawa sejuk berkabut, danau kaldera tenang berlatar pura terapung, dan siluet pura karang samudera Tanah Lot.",
    "center": [
        -8.45,
        115.12
    ],
    "zoom": 11,
    "bestSeason": "Apr – Okt • Sawah Menguning Emas & Danau Bebas Kabut Tebal",
    "tips": [
        "Bawa jaket atau sweater tipis saat mengunjungi Danau Beratan dan Kebun Raya Bedugul karena suhu berkisar 18–22°C.",
        "Waktu terbaik berkunjung ke Tanah Lot adalah pukul 16.30 untuk mendapatkan momen air surut dan sunset spektakuler.",
        "Coba santap siang Nasi Beras Merah organik khas Jatiluwih sambil menatap terasering sawah terluas di Bali."
    ],
    "baseCosts": {
        "budget": {
            "stay": 240000,
            "transport": 120000,
            "food": 90000,
            "misc": 50000
        },
        "comfort": {
            "stay": 600000,
            "transport": 400000,
            "food": 220000,
            "misc": 90000
        },
        "luxury": {
            "stay": 2100000,
            "transport": 900000,
            "food": 600000,
            "misc": 220000
        }
    },
    "zones": [
        "Bedugul & Baturiti",
        "Jatiluwih & Batukaru",
        "Tanah Lot & Kediri"
    ],
    "spots": [
        {
            "id": "tb_ulun_danu",
            "name": "Pura Ulun Danu Beratan Bedugul",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.275,
            "lng": 115.1656,
            "categories": [
                "budaya",
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 40000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Ikon kebanggaan Indonesia di pecahan uang kertas Rp 50.000, pura terapung sakral di Danau Beratan berlatar perbukitan berkabut.",
            "tips": "Sewa perahu angsa kayuh atau boat cepat keliling danau untuk memotret pura dari sisi perairan.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "68.000+ ulasan",
            "gmaps_review_highlight": "Pura paling indah dan sejuk di Bali. Kabut tipis di atas danau memberikan suasana magis yang sangat tenang."
        },
        {
            "id": "tb_kebun_raya",
            "name": "Kebun Raya Bali (Eka Karya Bedugul)",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.2833,
            "lng": 115.1558,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 30000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Taman botani konservasi terluas di Indonesia (157 hektar) dengan koleksi anggrek liar, hutan pakis raksasa, dan bukit rumput piknik.",
            "tips": "Sewa sepeda listrik atau skuter di gerbang utama untuk berkeliling area kebun raya yang sangat luas.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "25.000+ ulasan",
            "gmaps_review_highlight": "Tempat piknik keluarga nomor satu di Bali. Udaranya sangat dingin dan pohon-pohon purbanya menakjubkan."
        },
        {
            "id": "tb_jatiluwih",
            "name": "Terasering Sawah Jatiluwih (UNESCO)",
            "kabupaten": "Tabanan",
            "kecamatan": "Penebel",
            "zone": "Jatiluwih & Batukaru",
            "lat": -8.3686,
            "lng": 115.1311,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 40000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Hamparan sawah terasering berundak seluas 600 hektar di lereng Gunung Batukaru yang menerapkan sistem irigasi subak UNESCO.",
            "tips": "Pilih rute jalan setapak jalur merah (jalur pendek 1.5 km) atau jalur biru untuk pemandangan terbaik tanpa lelah berlebih.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "29.000+ ulasan",
            "gmaps_review_highlight": "Lansekap persawahan terindah yang pernah saya lihat di dunia. Skala sawah berundaknya sangat masif dan menakjubkan."
        },
        {
            "id": "tb_tanah_lot",
            "name": "Pura Tanah Lot & Batu Bolong",
            "kabupaten": "Tabanan",
            "kecamatan": "Kediri",
            "zone": "Tanah Lot & Kediri",
            "lat": -8.6211,
            "lng": 115.0864,
            "categories": [
                "budaya",
                "pantai"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 60000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pura sakral pemujaan dewa laut di atas bongkahan batu karang samudera dengan siluet matahari terbenam paling legendaris di Pulau Bali.",
            "tips": "Saat air laut surut sore hari, Anda dapat menyeberang mendekat ke kaki pura dan membasuh muka di sumber air tawar suci.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "92.000+ ulasan",
            "gmaps_review_highlight": "Matahari terbenam di balik Pura Tanah Lot adalah pemandangan ikonik yang wajib dilihat sekali seumur hidup."
        },
        {
            "id": "tb_leke_leke",
            "name": "Air Terjun Leke Leke Baturiti",
            "kabupaten": "Tabanan",
            "kecamatan": "Baturiti",
            "zone": "Bedugul & Baturiti",
            "lat": -8.3183,
            "lng": 115.2056,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Air terjun ramping anggun yang jatuh di celah tebing batu berlumut hijau diapit kanopi hutan tropis lebat yang sunyi.",
            "tips": "Jalur trekking melewati jembatan bambu dan perkebunan kopi yang tertata sangat bersih dan alami.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "11.000+ ulasan",
            "gmaps_review_highlight": "Air terjun tersembunyi yang sangat cantik dan fotogenik. Jalur jalan kakinya menyenangkan dan tidak terlalu melelahkan."
        }
    ]
},

  "bangli": {
    "id": "bangli",
    "name": "Kabupaten Bangli (Kintamani, Gunung Batur & Penglipuran)",
    "quickDesc": "Negeri di atas awan Bali: kaldera purba megah Gunung Batur, danau bulan sabit, kopi Arabika dataran tinggi, dan desa adat terbersih di dunia.",
    "center": [
        -8.2778,
        115.3458
    ],
    "zoom": 11,
    "bestSeason": "Mei – Sep • Langit Cerah Bebas Kabut & Pagi Hari Sejuk Menggigit",
    "tips": [
        "Bawa jaket hangat tebal saat mendaki atau sarapan di kafe Kintamani karena suhu pagi berkisar 14–17°C.",
        "Ikuti tur Jeep 4x4 Black Lava Kintamani bila tidak ingin mendaki kaki untuk menjelajahi hamparan pasir hitam vulkanik.",
        "Hormati tata krama adat saat memasuki pekarangan rumah warga tradisional Desa Penglipuran."
    ],
    "baseCosts": {
        "budget": {
            "stay": 250000,
            "transport": 130000,
            "food": 100000,
            "misc": 50000
        },
        "comfort": {
            "stay": 650000,
            "transport": 450000,
            "food": 250000,
            "misc": 100000
        },
        "luxury": {
            "stay": 2200000,
            "transport": 1000000,
            "food": 650000,
            "misc": 250000
        }
    },
    "zones": [
        "Kintamani & Batur",
        "Penglipuran & Bangli Kota",
        "Tembuku & Susut"
    ],
    "spots": [
        {
            "id": "bg_penglipuran",
            "name": "Desa Tradisional Penglipuran",
            "kabupaten": "Bangli",
            "kecamatan": "Bangli",
            "zone": "Penglipuran & Bangli Kota",
            "lat": -8.4528,
            "lng": 115.3589,
            "categories": [
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 25000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Desa adat tercantik dan terbersih di dunia dengan tata ruang desa linear seragam berpagar bambu dan bebas dari polusi kendaraan bermotor.",
            "tips": "Coba minuman khas loloh cemcem herbal segar berkhasiat yang dibuat langsung oleh ibu-ibu warga desa.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "41.000+ ulasan",
            "gmaps_review_highlight": "Desa adat yang luar biasa bersih, tertib, dan harmonis. Warga sangat ramah menyambut tamu di pekarangan rumahnya."
        },
        {
            "id": "bg_hutan_bambu",
            "name": "Hutan Bambu Penglipuran",
            "kabupaten": "Bangli",
            "kecamatan": "Bangli",
            "zone": "Penglipuran & Bangli Kota",
            "lat": -8.4489,
            "lng": 115.3594,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Hutan lindung bambu alami seluas 45 hektar di ujung utara Desa Penglipuran dengan kanopi teduh dan udara sejuk berhembus.",
            "tips": "Jalur aspal mulus di tengah rimbunnya rumpun bambu sangat fotogenik dan tenang.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Lorong kanopi bambunya sangat rindang dan meneduhkan hati. Udara pegunungan yang sangat segar."
        },
        {
            "id": "bg_kintamani_view",
            "name": "Gardu Pandang & Kafe Kopi Kintamani",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2778,
            "lng": 115.3458,
            "categories": [
                "kuliner",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "family",
                "solo"
            ],
            "desc": "Menikmati seduhan kopi Arabika Kintamani di deretan kafe berarsitektur modern dengan lanskap megah kaldera Gunung Batur dan Danau Batur.",
            "tips": "Datang antara pukul 08.00–10.00 pagi untuk pemandangan terjelas sebelum kabut gunung turun menyelimuti kaldera.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "36.000+ ulasan",
            "gmaps_review_highlight": "Pemandangan ngarai kaldera dan Gunung Batur terbentang sempurna di depan meja kopi. Tempat sarapan terbaik di Bali."
        },
        {
            "id": "bg_batur_sunrise",
            "name": "Sunrise Trekking & Kaldera Gunung Batur",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2417,
            "lng": 115.3789,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 4.0,
            "price": 250000,
            "rating": 4.9,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Pendakian dini hari menuju puncak 1.717 mdpl untuk menyaksikan matahari terbit emas spektakuler di atas lautan awan kaldera.",
            "tips": "Mulai mendaki pukul 03.30 dini hari dipandu pemandu lokal; nikmati sarapan telur rebus uap belerang alami di puncak.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Lautan awan saat matahari terbit adalah keajaiban visual. Kerja keras mendaki 2 jam terbayar lunas seketika."
        },
        {
            "id": "bg_toya_devasya",
            "name": "Pemandian Air Panas Alami Toya Devasya",
            "kabupaten": "Bangli",
            "kecamatan": "Kintamani",
            "zone": "Kintamani & Batur",
            "lat": -8.2611,
            "lng": 115.3956,
            "categories": [
                "relaksasi",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.5,
            "price": 100000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Kolam renang air panas belerang alami hangat tepat di bibir Danau Batur berlatar dinding kaldera raksasa Gunung Abang.",
            "tips": "Sangat ideal untuk merelaksasi otot setelah mendaki Gunung Batur atau lelah berkendara jauh.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Berendam air hangat di tepi danau berhawa sejuk sambil memandangi danau dan gunung adalah relaksasi paripurna."
        },
        {
            "id": "bg_tukad_cepung",
            "name": "Air Terjun Tukad Cepung Tembuku",
            "kabupaten": "Bangli",
            "kecamatan": "Tembuku",
            "zone": "Tembuku & Susut",
            "lat": -8.4406,
            "lng": 115.3872,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Air terjun tersembunyi di dalam gua tebing batu karang melingkar dengan berkas cahaya surga (sun rays) tembus dari atas gua.",
            "tips": "Datang pukul 09.30–11.30 saat posisi matahari tepat tegak lurus menyinari gua untuk berkas cahaya terindah.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "17.000+ ulasan",
            "gmaps_review_highlight": "Berkas cahaya matahari yang masuk ke dalam gua tebing air terjun sangat magis menyerupai pemandangan film fantasi."
        }
    ]
},

  "karangasem": {
    "id": "karangasem",
    "name": "Kabupaten Karangasem (Besakih, Amed, Lempuyang & Sidemen)",
    "quickDesc": "Pura Ibu paling agung di lereng Gunung Agung, istana air peninggalan raja Bali Timur, terumbu karang Amed, dan tenun sidemen otentik.",
    "center": [
        -8.45,
        115.61
    ],
    "zoom": 11,
    "bestSeason": "Apr – Okt • Langit Bersih & Siluet Gunung Agung Terlihat Sempurna",
    "tips": [
        "Datang lebih awal (sebelum 07.00 pagi) ke Pura Lempuyang untuk nomor antrean foto di gerbang Candi Bentar.",
        "Gunakan alas kaki pantai saat berenang di Amed karena pantainya berupa kerikil hitam vulkanik.",
        "Beli pakan ikan koi sebelum masuk ke area kolam utama Tirta Gangga."
    ],
    "baseCosts": {
        "budget": {
            "stay": 240000,
            "transport": 130000,
            "food": 95000,
            "misc": 50000
        },
        "comfort": {
            "stay": 650000,
            "transport": 450000,
            "food": 240000,
            "misc": 90000
        },
        "luxury": {
            "stay": 2300000,
            "transport": 1000000,
            "food": 650000,
            "misc": 250000
        }
    },
    "zones": [
        "Besakih & Rendang",
        "Lempuyang & Abang",
        "Amed & Tulamben Bahari",
        "Ujung & Candidasa",
        "Lembah Sidemen"
    ],
    "spots": [
        {
            "id": "kr_besakih",
            "name": "Pura Agung Besakih (The Mother Temple of Bali)",
            "kabupaten": "Karangasem",
            "kecamatan": "Rendang",
            "zone": "Besakih & Rendang",
            "lat": -8.3739,
            "lng": 115.4517,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 60000,
            "rating": 4.8,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Kompleks pura terbesar dan paling disucikan di seluruh Bali, berdiri megah di lereng Gunung Agung dengan 86 pura bertingkat.",
            "tips": "Tiket sudah termasuk peminjaman kain sarung kamen dan jasa pengantaran mobil golf listrik menuju pelataran utama.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "42.000+ ulasan",
            "gmaps_review_highlight": "Pura Ibu paling sakral dan megah di Bali. Berdiri di kaki Gunung Agung yang menjulang tinggi memberikan aura kekaguman."
        },
        {
            "id": "kr_lempuyang",
            "name": "Pura Penataran Agung Lempuyang (Gates of Heaven)",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Lempuyang & Abang",
            "lat": -8.3917,
            "lng": 115.6292,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 55000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Candi Bentar legendaris gerbang surga dengan panorama bingkai simetris Gunung Agung yang menjulang megah di antara awan.",
            "tips": "Ambil nomor antrean foto di gerbang surga sejak pukul 06.30 pagi untuk pencahayaan terbaik bebas awan tebal.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "36.000+ ulasan",
            "gmaps_review_highlight": "Candi bentar berlatar Gunung Agung adalah pemandangan paling spektakuler di Bali Timur."
        },
        {
            "id": "kr_tirta_gangga",
            "name": "Istana Air Tirta Gangga",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Lempuyang & Abang",
            "lat": -8.4122,
            "lng": 115.5873,
            "categories": [
                "budaya",
                "alam",
                "relaksasi"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 50000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Taman air peninggalan Raja Karangasem dengan kolam air mata air alami bertingkat, patung dewa klasik, dan ribuan ikan koi jinak.",
            "tips": "Beli pelet pakan ikan di warung luar loket untuk pengalaman memberi makan kawanan koi raksasa di batu pijakan kolam.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "48.000+ ulasan",
            "gmaps_review_highlight": "Kolam ikan koi dengan batu pijakan melingkarnya sangat cantik dan menyejukkan. Sangat terawat dan fotogenik."
        },
        {
            "id": "kr_taman_ujung",
            "name": "Taman Ujung Soekasada",
            "kabupaten": "Karangasem",
            "kecamatan": "Karangasem",
            "zone": "Ujung & Candidasa",
            "lat": -8.4631,
            "lng": 115.6306,
            "categories": [
                "budaya",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 35000,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "family",
                "friends",
                "solo"
            ],
            "desc": "Istana peristirahatan raja berpadu arsitektur kolonial Eropa dan Bali dengan jembatan pilar megah menghadap ke Selat Lombok.",
            "tips": "Naiki tangga pilar pilar tanpa atap di bukit untuk mendapatkan sudut pandang 360 derajat istana air dan laut.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "23.000+ ulasan",
            "gmaps_review_highlight": "Perpaduan arsitektur istana air yang luar biasa megah dan tenang. Jauh dari hiruk pikuk keramaian kota."
        },
        {
            "id": "kr_amed",
            "name": "Pantai Amed (Snorkeling & Siluet Gunung Agung)",
            "kabupaten": "Karangasem",
            "kecamatan": "Abang",
            "zone": "Amed & Tulamben Bahari",
            "lat": -8.3486,
            "lng": 115.6569,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Teluk pasir hitam vulkanik dengan jajaran perahu jukung warna-warni, terumbu karang pesisir dangkal, dan siluet sunset Gunung Agung.",
            "tips": "Bisa langsung snorkeling 10 meter dari bibir pantai di Jemeluk Bay untuk melihat patung bawah air dan terumbu karang.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "19.000+ ulasan",
            "gmaps_review_highlight": "Suasana pantai santai paling damai. Duduk di kafe tepi bukit sambil melihat sunset di balik Gunung Agung tak terlupakan."
        },
        {
            "id": "kr_sidemen",
            "name": "Lembah Asri & Sawah Sidemen",
            "kabupaten": "Karangasem",
            "kecamatan": "Sidemen",
            "zone": "Lembah Sidemen",
            "lat": -8.4722,
            "lng": 115.4472,
            "categories": [
                "alam",
                "budaya",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "family",
                "solo"
            ],
            "desc": "Pedesaan Bali autentik di lembah berhawa sejuk yang dikelilingi petak sawah hijau, sungai jernih, dan sentra kerajinan tenun endek tradisional.",
            "tips": "Sewa sepeda atau berjalan kaki di sepanjang jalur pedesaan Bukit Ceeng saat pagi berkabut.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "12.000+ ulasan",
            "gmaps_review_highlight": "Seperti Ubud di masa 30 tahun lalu. Sangat asri, tenang, dengan pemandangan sawah dan Gunung Agung yang menyejukkan hati."
        }
    ]
},

  "buleleng": {
    "id": "buleleng",
    "name": "Kabupaten Buleleng (Lovina, Sekumpul & Menjangan)",
    "quickDesc": "Pesona Bali Utara: atraksi lumba-lumba liar berenang di laut fajar, deretan air terjun tertinggi di Bali, dan dinding bawah laut surga selam Pulau Menjangan.",
    "center": [
        -8.1583,
        115.025
    ],
    "zoom": 11,
    "bestSeason": "Mei – Okt • Ombak Laut Utara Tenang & Air Terjun Sangat Jernih",
    "tips": [
        "Pesan perahu jukung tradisional ke Pantai Lovina pukul 05.30 pagi untuk momen lumba-lumba melompat di laut lepas saat fajar.",
        "Gunakan jasa pemandu lokal terverifikasi saat trekking ke Air Terjun Sekumpul untuk keselamatan menyusuri sungai berbatu.",
        "Bawa baju ganti dan pakaian renang saat mengunjungi Pemandian Air Panas Alami Banjar."
    ],
    "baseCosts": {
        "budget": {
            "stay": 230000,
            "transport": 130000,
            "food": 90000,
            "misc": 50000
        },
        "comfort": {
            "stay": 600000,
            "transport": 420000,
            "food": 220000,
            "misc": 90000
        },
        "luxury": {
            "stay": 2000000,
            "transport": 950000,
            "food": 600000,
            "misc": 240000
        }
    },
    "zones": [
        "Lovina & Singaraja",
        "Sekumpul & Air Terjun Utara",
        "Gerokgak & Menjangan"
    ],
    "spots": [
        {
            "id": "bl_lovina",
            "name": "Pantai Lovina (Dolphin Tour Fajar)",
            "kabupaten": "Buleleng",
            "kecamatan": "Buleleng",
            "zone": "Lovina & Singaraja",
            "lat": -8.1583,
            "lng": 115.025,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 2.5,
            "price": 100000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Menyusuri perairan laut tenang Bali Utara dengan jukung tradisional untuk melihat kawanan lumba-lumba liar melompat di fajar matahari terbit.",
            "tips": "Datang ke dermaga pukul 05.30 pagi; setelah lumba-lumba Anda bisa berenang snorkeling koral karang Lovina.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "34.000+ ulasan",
            "gmaps_review_highlight": "Melihat puluhan lumba-lumba melompat bebas tepat di samping perahu saat matahari terbit adalah momen magis!"
        },
        {
            "id": "bl_sekumpul",
            "name": "Air Terjun Sekumpul & Air Terjun Fiji",
            "kabupaten": "Buleleng",
            "kecamatan": "Sawan",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.1747,
            "lng": 115.1814,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 3.0,
            "price": 30000,
            "rating": 4.9,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Gugusan air terjun tertinggi dan terindah di Bali (80 meter) dengan 7 tirai air jatuh megah diapit dinding tebing hijau hutan perawan.",
            "tips": "Tersedia pilihan trekking pendek (viewpoint) atau trekking lengkap turun ke dasar kolam air terjun.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "22.000+ ulasan",
            "gmaps_review_highlight": "Air terjun terindah di seluruh pulau Bali tanpa tanding. Kemegahan 7 air terjun bertingkatnya luar biasa spektakuler."
        },
        {
            "id": "bl_banyumala",
            "name": "Air Terjun Banyumala Twin Waterfalls",
            "kabupaten": "Buleleng",
            "kecamatan": "Sukasada",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.2178,
            "lng": 115.1486,
            "categories": [
                "alam",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 30000,
            "rating": 4.8,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Dua tirai air terjun kembar mengalir lembut menuruni dinding tebing bebatuan berselimut lumut ke dalam kolam alami jernih sejuk.",
            "tips": "Kolam alaminya sangat tenang dan aman untuk berenang menyegarkan diri di air pegunungan alami.",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "16.000+ ulasan",
            "gmaps_review_highlight": "Air terjun kembar yang sangat menenangkan. Kolamnya jernih kebiruan dan airnya sangat menyegarkan."
        },
        {
            "id": "bl_gitgit",
            "name": "Air Terjun Gitgit Sukasada",
            "kabupaten": "Buleleng",
            "kecamatan": "Sukasada",
            "zone": "Sekumpul & Air Terjun Utara",
            "lat": -8.1917,
            "lng": 115.1389,
            "categories": [
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Air terjun legendaris setinggi 35 meter di jalur lintas Bedugul-Singaraja dengan jalur jalan setapak rindang perkebunan cengkih.",
            "tips": "Jalur jalan kaki berundak tertata rapi di antara deretan pohon cengkih dan warung kerajinan lokal.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Air terjun bersejarah yang sangat mudah diakses saat perjalanan dari Bedugul menuju Singaraja."
        },
        {
            "id": "bl_air_panas_banjar",
            "name": "Pemandian Air Panas Alami Banjar",
            "kabupaten": "Buleleng",
            "kecamatan": "Banjar",
            "zone": "Lovina & Singaraja",
            "lat": -8.2106,
            "lng": 114.9667,
            "categories": [
                "relaksasi",
                "alam"
            ],
            "idealTime": "afternoon",
            "durationHours": 2.0,
            "price": 20000,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends"
            ],
            "desc": "Tiga kolam air panas belerang alami yang memancar dari mulut patung naga batu di tengah rimbunnya taman tropis perbukitan Banjar.",
            "tips": "Pancuran air hangat bertingkat di kolam atas sangat nikmat untuk memijat punggung dan pundak yang pegal.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Air panas belerangnya sangat alami dan manjur untuk merelaksasi badan. Suasana taman tropisnya sangat damai."
        },
        {
            "id": "bl_menjangan",
            "name": "Taman Nasional Bali Barat & Pulau Menjangan",
            "kabupaten": "Buleleng",
            "kecamatan": "Gerokgak",
            "zone": "Gerokgak & Menjangan",
            "lat": -8.0933,
            "lng": 114.5167,
            "categories": [
                "pantai",
                "alam"
            ],
            "idealTime": "morning",
            "durationHours": 4.0,
            "price": 200000,
            "rating": 4.9,
            "suitableFor": [
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Surga dinding terumbu karang (wall diving) terbaik di Indonesia dengan kejernihan air laut hingga kedalaman 30 meter dan habitat rusa jinak.",
            "tips": "Naik boat carter dari Labuhan Lalang (30 menit menyeberang) lengkap dengan sewa alat snorkeling dan pelampung.",
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "15.000+ ulasan",
            "gmaps_review_highlight": "Terumbu karang paling sehat dan air paling jernih di seluruh Bali! Berenang bersama kawanan penyu dan ikan karang warna-warni."
        }
    ]
},

  "denpasar": {
    "id": "denpasar",
    "name": "Kota Denpasar (Sanur, Renon & Kumbasari)",
    "quickDesc": "Pusat pemerintahan dan denyut sejarah ibu kota Bali: keindahan fajar Pantai Sanur, monumen perjuangan rakyat, dan sentra kuliner heritage.",
    "center": [
        -8.67,
        115.23
    ],
    "zoom": 12,
    "bestSeason": "Sepanjang Tahun • Akses Fast Boat Terlengkap ke Nusa Penida",
    "tips": [
        "Jalur pedestrian paving tepi Pantai Sanur sepanjang 5 km sangat cocok untuk bersepeda santai saat sunrise.",
        "Nikmati kuliner legendaris Nasi Ayam Kedewatan atau Nasi Campur Men Weti di Sanur sebelum menyeberang pulau.",
        "Kunjungi Monumen Bajra Sandhi Renon di pagi hari untuk menjelajahi museum diorama dan berolahraga di lapangan hijau Renon."
    ],
    "baseCosts": {
        "budget": {
            "stay": 250000,
            "transport": 100000,
            "food": 90000,
            "misc": 40000
        },
        "comfort": {
            "stay": 650000,
            "transport": 350000,
            "food": 220000,
            "misc": 80000
        },
        "luxury": {
            "stay": 2200000,
            "transport": 800000,
            "food": 600000,
            "misc": 200000
        }
    },
    "zones": [
        "Sanur Bahari",
        "Renon & Denpasar Pusat"
    ],
    "spots": [
        {
            "id": "dp_sanur",
            "name": "Pantai Sanur & Pelabuhan Fast Boat",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Selatan",
            "zone": "Sanur Bahari",
            "lat": -8.6833,
            "lng": 115.2639,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "morning",
            "durationHours": 2.0,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pantai berpasir putih dengan ombak tenang yang terkenal sebagai spot sunrise terbaik dan pelabuhan penyeberangan kapal cepat ke Nusa Penida.",
            "tips": "Sewa sepeda santai di pinggir pantai seharga Rp 20.000/jam untuk menikmati jalan setapak tepi laut.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "46.000+ ulasan",
            "gmaps_review_highlight": "Tempat terbaik melihat matahari terbit di Bali. Suasana pagi sangat damai dengan perahu jukung tradisional mengapung tenang."
        },
        {
            "id": "dp_bajra_sandhi",
            "name": "Monumen Bajra Sandhi Renon",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Timur",
            "zone": "Renon & Denpasar Pusat",
            "lat": -8.6717,
            "lng": 115.2339,
            "categories": [
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 25000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Monumen megah berarsitektur genta pendeta suci Hindu (Bajra) dengan 33 diorama sejarah perjuangan rakyat Bali dari zaman purba hingga kemerdekaan.",
            "tips": "Naiki tangga melingkar di ruang tengah monumen untuk mencapai puncak gardu pandang lantai 3 dengan pemandangan 360 derajat Kota Denpasar.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "28.000+ ulasan",
            "gmaps_review_highlight": "Arsitektur batunya sangat megah dan berkarakter kuat. Diorama sejarah di dalamnya sangat informatif dan mendidik."
        },
        {
            "id": "dp_pasar_badung",
            "name": "Pasar Badung & Pasar Seni Kumbasari Heritage",
            "kabupaten": "Kota Denpasar",
            "kecamatan": "Denpasar Barat",
            "zone": "Renon & Denpasar Pusat",
            "lat": -8.6575,
            "lng": 115.215,
            "categories": [
                "kuliner",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.5,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "friends",
                "solo"
            ],
            "desc": "Pusat heritage pasar tradisional terbesar di Bali di tepi bantaran Sungai Tukad Badung yang tertata bersih dengan jembatan lampu malam.",
            "tips": "Datang malam hari untuk menikmati street food kuliner khas Bali di bantaran sungai Tukad Badung (Korea-nya Denpasar).",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "18.000+ ulasan",
            "gmaps_review_highlight": "Pasar tradisional yang sangat modern dan bersih. Belanja oleh-oleh seni di Kumbasari harganya jauh lebih ramah di kantong."
        }
    ]
},

  "jembrana": {
    "id": "jembrana",
    "name": "Kabupaten Jembrana (Medewi, Bunut Bolong & Bali Barat)",
    "quickDesc": "Bali barat yang tenang dan belum terjamah: ombak kidal legendaris peselancar dunia di Medewi, pohon suci berlubang jalan raya, dan sabana pesisir.",
    "center": [
        -8.35,
        114.75
    ],
    "zoom": 11,
    "bestSeason": "Mei – Okt • Musim Angin Lepas Terbaik untuk Selancar Medewi",
    "tips": [
        "Medewi terkenal sebagai salah satu spot point break kiri terpanjang di Indonesia; cocok bagi surfer intermediate hingga pro.",
        "Saat melintasi Bunut Bolong, sempatkan berhenti sejenak untuk memotret terowongan jalan unik yang menembus akar pohon beringin raksasa.",
        "Coba kuliner khas Ayam Betutu Gilimanuk autentik dengan kuah pedas rempah base genep yang membakar lidah."
    ],
    "baseCosts": {
        "budget": {
            "stay": 220000,
            "transport": 120000,
            "food": 85000,
            "misc": 45000
        },
        "comfort": {
            "stay": 550000,
            "transport": 400000,
            "food": 200000,
            "misc": 80000
        },
        "luxury": {
            "stay": 1900000,
            "transport": 900000,
            "food": 550000,
            "misc": 220000
        }
    },
    "zones": [
        "Pekutatan & Medewi",
        "Negara & Gilimanuk"
    ],
    "spots": [
        {
            "id": "jb_medewi",
            "name": "Pantai Medewi (Left-Hand Point Break)",
            "kabupaten": "Jembrana",
            "kecamatan": "Pekutatan",
            "zone": "Pekutatan & Medewi",
            "lat": -8.4183,
            "lng": 114.9083,
            "categories": [
                "pantai",
                "relaksasi"
            ],
            "idealTime": "sunset",
            "durationHours": 2.5,
            "price": 0,
            "rating": 4.7,
            "suitableFor": [
                "friends",
                "solo",
                "couple"
            ],
            "desc": "Pantai berbatu hitam eksotis yang terkenal di kalangan peselancar internasional karena memiliki ombak kiri yang panjang dan konsisten.",
            "tips": "Nikmati kelapa muda bakar dan santap ikan laut segar di warung tebing tepi pantai sambil menikmati sunset tenang.",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "14.000+ ulasan",
            "gmaps_review_highlight": "Tempat selancar legendaris dengan suasana pedesaan yang tenang. Jauh dari kebisingan kota dan sunsetnya sangat indah."
        },
        {
            "id": "jb_bunut_bolong",
            "name": "Pohon Suci Bunut Bolong Pekutatan",
            "kabupaten": "Jembrana",
            "kecamatan": "Pekutatan",
            "zone": "Pekutatan & Medewi",
            "lat": -8.3611,
            "lng": 114.8875,
            "categories": [
                "alam",
                "budaya"
            ],
            "idealTime": "morning",
            "durationHours": 1.0,
            "price": 0,
            "rating": 4.6,
            "suitableFor": [
                "family",
                "couple",
                "friends",
                "solo"
            ],
            "desc": "Pohon beringin purba raksasa suci dengan lubang terowongan alami di bagian dasarnya yang dilewati jalan raya aspal.",
            "tips": "Kendaraan roda empat dapat melintas tepat di bawah rongga akar pohon yang dinaungi kanopi hijau rindang.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "7.500+ ulasan",
            "gmaps_review_highlight": "Fenomena alam yang sangat unik dan sakral. Jalan aspal yang menembus batang pohon raksasa sungguh luar biasa."
        },
        {
            "id": "jb_rambut_siwi",
            "name": "Pura Dang Kahyangan Rambut Siwi",
            "kabupaten": "Jembrana",
            "kecamatan": "Mendoyo",
            "zone": "Negara & Gilimanuk",
            "lat": -8.3889,
            "lng": 114.7611,
            "categories": [
                "budaya"
            ],
            "idealTime": "sunset",
            "durationHours": 1.5,
            "price": 20000,
            "rating": 4.7,
            "suitableFor": [
                "family",
                "couple",
                "solo"
            ],
            "desc": "Pura tebing karang megah peninggalan Dang Hyang Nirartha menghadap langsung ke Samudra Hindia dengan panorama pantai pasir hitam membentang.",
            "tips": "Suasana saat senja sangat damai dengan deburan ombak membentur tebing karang di bawah pelataran pura.",
            "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
            "gmaps_reviews": "9.000+ ulasan",
            "gmaps_review_highlight": "Salah satu pura tebing tepi laut terindah di Bali Barat. Pemandangan samudera dan siluet puranya sangat mengesankan."
        }
    ]
},

  "lombok": {
    id: "lombok",
    name: "Pulau Lombok & Gili",
    quickDesc: "Pulau eksotis dengan pantai berpasir merica, kemegahan Gunung Rinjani, budaya suku Sasak, serta pesona bahari Kepulauan Gili.",
    center: [-8.5833, 116.3333],
    zoom: 10,
    bestSeason: "Mei – Okt • Angin Teduh & Laut Tenang",
    tips: [
      "Penyeberangan ke Gili Trawangan/Meno/Air paling nyaman dari Pelabuhan Bangsal atau Teluk Kodek.",
      "Di Gili tidak ada kendaraan bermotor; transportasi hanya menggunakan sepeda atau kereta kuda Cidomo.",
      "Cicipi kuliner khas Ayam Taliwang dan Plecing Kangkung lombok pedas segar.",
      "Kondisi jalanan Lombok Selatan sangat mulus (area sirkuit Mandalika)."
    ],
    baseCosts: {
      budget: { stay: 200000, transport: 100000, food: 85000, misc: 40000 },
      comfort: { stay: 550000, transport: 400000, food: 220000, misc: 80000 },
      luxury: { stay: 1800000, transport: 850000, food: 550000, misc: 200000 }
    },
    zones: ["Lombok Selatan & Mandalika", "Kepulauan Gili (Trawangan & Air)", "Sembalun & Kaki Rinjani", "Senggigi & Mataram"],
    spots: [
      {
        id: "lombok_tanjung_aan",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Pantai Tanjung Aan & Bukit Merese",
        zone: "Lombok Selatan & Mandalika",
        lat: -8.9103,
        lng: 116.3211,
        categories: ["pantai", "alam", "relaksasi"],
        idealTime: "sunset",
        durationHours: 2.5,
        price: 10000,
        rating: 4.9,
        suitableFor: ["couple", "friends", "solo", "family"],
        desc: "Pantai dengan butiran pasir seperti merica dan panorama tebing Bukit Merese dengan pemandangan sunset 360 derajat.",
        tips: "Daki bukit Merese 10 menit sebelum maghrib untuk mendapatkan cahaya golden hour."
      },
      {
        id: "lombok_sade",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80",
        name: "Desa Adat Tradisional Sasak Sade",
        zone: "Lombok Selatan & Mandalika",
        lat: -8.8398,
        lng: 116.2921,
        categories: ["budaya"],
        idealTime: "morning",
        durationHours: 1.5,
        price: 20000,
        rating: 4.6,
        suitableFor: ["family", "couple", "friends", "solo"],
        desc: "Desa suku asli Sasak dengan arsitektur rumah tradisional beratapkan ijuk dan kearifan tenun songket khas.",
        tips: "Akan ada guide lokal yang menjelaskan adat; siapkan tip sukarela."
      },
      {
        id: "lombok_selong_belanak",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Pantai Selong Belanak & Belajar Surfing",
        zone: "Lombok Selatan & Mandalika",
        lat: -8.8687,
        lng: 116.1601,
        categories: ["pantai", "petualangan"],
        idealTime: "afternoon",
        durationHours: 2.5,
        price: 10000,
        rating: 4.7,
        suitableFor: ["friends", "family", "couple"],
        desc: "Teluk melengkung indah dengan dasar pasir lembut tanpa karang, lokasi paling ideal untuk pemula belajar berselancar.",
        tips: "Banyak instruktur surf lokal ramah dengan tarif sewa papan terjangkau."
      },
      {
        id: "lombok_mandalika_circuit",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
        name: "Sirkuit Internasional Mandalika & Kuta Beach",
        zone: "Lombok Selatan & Mandalika",
        lat: -8.8925,
        lng: 116.2975,
        categories: ["kuliner", "relaksasi"],
        idealTime: "morning",
        durationHours: 2.0,
        price: 0,
        rating: 4.6,
        suitableFor: ["friends", "family", "solo"],
        desc: "Kawasan modern Kuta Mandalika dengan deretan cafe tepi pantai dan spot foto ikonik di depan sirkuit MotoGP.",
        tips: "Sore hari sangat cocok untuk jogging santai di promenade Kuta Beach."
      },
      {
        id: "gili_snorkeling_turtle",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        name: "Snorkeling Turtle Point & Patung Bawah Laut Gili Meno",
        zone: "Kepulauan Gili (Trawangan & Air)",
        lat: -8.3510,
        lng: 116.0580,
        categories: ["petualangan", "pantai", "alam"],
        idealTime: "morning",
        durationHours: 3.0,
        price: 175000,
        rating: 4.9,
        suitableFor: ["couple", "friends", "solo", "family"],
        desc: "Berenang bersama penyu laut liar di habitat aslinya dan melihat formasi patung manusia karang bawah laut karya Jason deCaires.",
        tips: "Gunakan drybag untuk perlengkapan elektronik dan bawa kamera aksi anti-air."
      },
      {
        id: "gili_sunset_swing",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Ayunan Ombak Sunset & Night Market Gili T",
        zone: "Kepulauan Gili (Trawangan & Air)",
        lat: -8.3535,
        lng: 116.0350,
        categories: ["relaksasi", "kuliner", "pantai"],
        idealTime: "sunset",
        durationHours: 2.5,
        price: 75000,
        rating: 4.7,
        suitableFor: ["couple", "friends", "solo"],
        desc: "Menikmati langit jingga dari ayunan pantai sisi barat Gili Trawangan dilanjutkan makan malam seafood segar di pasar malam rakyat.",
        tips: "Sewa sepeda seharga Rp 40-50rb per hari untuk mobilitas keliling pulau."
      },
      {
        id: "lombok_sembalun_pergasingan",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        name: "Bukit Pergasingan & Hamparan Petak Sawah",
        zone: "Sembalun & Kaki Rinjani",
        lat: -8.3575,
        lng: 116.5332,
        categories: ["alam", "petualangan"],
        idealTime: "morning",
        durationHours: 3.5,
        price: 25000,
        rating: 4.8,
        suitableFor: ["friends", "solo", "couple"],
        desc: "Pemandangan magis desa Sembalun dari ketinggian bukit dengan petak sawah warna-warni berlatar Gunung Rinjani yang perkasa.",
        tips: "Kenakan sepatu trekking dengan grip baik karena jalur tanah menanjak."
      },
      {
        id: "lombok_pusuk_sembalun",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        name: "Taman Wisata Pusuk Sembalun & Stroberi Petik Sendiri",
        zone: "Sembalun & Kaki Rinjani",
        lat: -8.3967,
        lng: 116.5167,
        categories: ["alam", "kuliner", "family"],
        idealTime: "afternoon",
        durationHours: 2.0,
        price: 15000,
        rating: 4.6,
        suitableFor: ["family", "couple", "friends"],
        desc: "Kawasan dataran tinggi berhawa sejuk dengan kebun stroberi organik di mana pengunjung bisa memetik buah langsung dari pohon.",
        tips: "Coba olahan selai stroberi segar lokal yang manis legit."
      },
      {
        id: "lombok_sendang_gile",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80",
        name: "Air Terjun Sendang Gile & Tiu Kelep Senaru",
        zone: "Sembalun & Kaki Rinjani",
        lat: -8.3032,
        lng: 116.4087,
        categories: ["alam", "petualangan"],
        idealTime: "morning",
        durationHours: 3.0,
        price: 30000,
        rating: 4.8,
        suitableFor: ["friends", "couple", "solo"],
        desc: "Air terjun kembar di tengah hutan tropis lebat Rinjani dengan aliran air deras yang luar biasa sejuk dan jernih.",
        tips: "Gunakan alas kaki anti-selip dan siapkan baju ganti karena pasti basah terhempas percikan air."
      },
      {
        id: "lombok_taliwang_kuliner",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        name: "Sentra Kuliner Ayam Taliwang Asli Cakranegara",
        zone: "Senggigi & Mataram",
        lat: -8.5867,
        lng: 116.1311,
        categories: ["kuliner"],
        idealTime: "night",
        durationHours: 1.5,
        price: 65000,
        rating: 4.8,
        suitableFor: ["family", "friends", "couple", "solo"],
        desc: "Ayam kampung muda bakar dengan bumbu cabai rawit pedas meresap, terasi lombok, dan jeruk limau yang menggugah selera.",
        tips: "Minta tingkat kepedasan 'sedang' jika tidak terbiasa dengan cabai rawit Lombok yang sangat pedas."
      }
    ]
  },

  "labuan-bajo": {
    id: "labuan-bajo",
    name: "Labuan Bajo & TN Komodo",
    quickDesc: "Gerbang menuju habitat kadal purba Komodo, perbukitan savana Pulau Padar, pantai pasir merah muda, dan terumbu karang kelas dunia.",
    center: [-8.4900, 119.8800],
    zoom: 11,
    bestSeason: "Jul – Nov • Cuaca Cerah & Manta Ray Season",
    tips: [
      "Sewa speed boat atau kapal Phinisi Liveaboard adalah cara utama menjelajah pulau-pulau di Taman Nasional Komodo.",
      "Selalu dengarkan instruksi Ranger saat berada di dekat satwa Komodo.",
      "Bawa tabir surya aman untuk terumbu karang (reef-safe sunscreen) dan topi rimba lebar.",
      "Tiket konservasi TN Komodo dibeli resmi di loket pelabuhan atau melalui agen terpercaya."
    ],
    baseCosts: {
      budget: { stay: 300000, transport: 500000, food: 120000, misc: 100000 },
      comfort: { stay: 850000, transport: 1200000, food: 280000, misc: 200000 },
      luxury: { stay: 3500000, transport: 3000000, food: 800000, misc: 500000 }
    },
    zones: ["Taman Nasional Komodo (Island Hopping)", "Labuan Bajo Pesisir & Sunset", "Daratan Flores & Gua Eksotis"],
    spots: [
      {
        id: "bajo_padar",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        name: "Trekking Puncak Pulau Padar",
        zone: "Taman Nasional Komodo (Island Hopping)",
        lat: -8.6533,
        lng: 119.5744,
        categories: ["alam", "petualangan"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 150000,
        rating: 5.0,
        suitableFor: ["couple", "friends", "solo"],
        desc: "Trekking 800 anak tangga menuju puncak bukit dengan panorama ikonik tiga teluk dengan warna pasir berbeda (putih, pink, dan hitam).",
        tips: "Mulai mendaki pukul 06:00 pagi sebelum matahari terik membakar savana bukit."
      },
      {
        id: "bajo_pink_beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Snorkeling di Pink Beach (Pantai Merah)",
        zone: "Taman Nasional Komodo (Island Hopping)",
        lat: -8.6011,
        lng: 119.5208,
        categories: ["pantai", "relaksasi", "petualangan"],
        idealTime: "morning",
        durationHours: 2.0,
        price: 50000,
        rating: 4.9,
        suitableFor: ["couple", "family", "friends", "solo"],
        desc: "Pantai unik berwarna merah muda alami dari pecahan karang merah Foraminifera dengan terumbu karang indah tepat di tepi pantai.",
        tips: "Dilarang keras membawa pulang pasir atau karang merah sebagai cinderamata."
      },
      {
        id: "bajo_komodo_island",
        image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80",
        name: "Jelajah Satwa Purba Pulau Komodo / Rinca",
        zone: "Taman Nasional Komodo (Island Hopping)",
        lat: -8.5910,
        lng: 119.4920,
        categories: ["alam", "budaya", "petualangan"],
        idealTime: "morning",
        durationHours: 2.0,
        price: 200000,
        rating: 4.8,
        suitableFor: ["family", "friends", "couple", "solo"],
        desc: "Melihat langsung kadal terbesar di dunia di habitat liarnya dipandu langsung oleh Naturalist Guide / Ranger berpengalaman.",
        tips: "Jangan membuat gerakan tiba-tiba atau bersuara gaduh saat berjarak dekat dengan Komodo."
      },
      {
        id: "bajo_manta_point",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        name: "Berenang Bersama Pari Manta di Manta Point & Taka Makassar",
        zone: "Taman Nasional Komodo (Island Hopping)",
        lat: -8.5772,
        lng: 119.5933,
        categories: ["petualangan", "pantai"],
        idealTime: "afternoon",
        durationHours: 2.5,
        price: 100000,
        rating: 4.9,
        suitableFor: ["friends", "couple", "solo"],
        desc: "Pengalaman langka melayang di atas pari Manta raksasa (hingga 4 meter) di perairan pulau karang timbul berpasir putih Taka Makassar.",
        tips: "Arus di Manta Point cukup kuat (drift snorkeling); pastikan memakai pelampung dan fin."
      },
      {
        id: "bajo_kalong",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        name: "Pulau Kalong & Senja Siluet Kelelawar",
        zone: "Taman Nasional Komodo (Island Hopping)",
        lat: -8.6811,
        lng: 119.7911,
        categories: ["alam", "relaksasi"],
        idealTime: "sunset",
        durationHours: 1.5,
        price: 0,
        rating: 4.8,
        suitableFor: ["couple", "family", "friends"],
        desc: "Menatap jutaan kelelawar raksasa beterbangan keluar dari hutan bakau menutupi langit jingga saat senja tiba.",
        tips: "Kapal akan mematikan mesin dan berlabuh tenang di perairan teluk."
      },
      {
        id: "bajo_rangko",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        name: "Berenang di Kolam Asin Alami Gua Rangko",
        zone: "Daratan Flores & Gua Eksotis",
        lat: -8.4411,
        lng: 119.9056,
        categories: ["alam", "petualangan"],
        idealTime: "afternoon",
        durationHours: 2.5,
        price: 60000,
        rating: 4.7,
        suitableFor: ["friends", "couple", "solo"],
        desc: "Gua batu kapur stalaktit dengan kolam air asin jernih kebiruan di dalamnya yang tersinari matahari siang seperti kolam pribadi bercahaya.",
        tips: "Waktu terbaik berkunjung adalah pukul 12:00 - 14:00 saat sinar matahari menembus mulut gua."
      },
      {
        id: "bajo_puncak_waringin",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        name: "Sunset Viewpoint Puncak Waringin & Kuliner Ikan Bakar",
        zone: "Labuan Bajo Pesisir & Sunset",
        lat: -8.4967,
        lng: 119.8833,
        categories: ["kuliner", "relaksasi"],
        idealTime: "sunset",
        durationHours: 2.0,
        price: 30000,
        rating: 4.7,
        suitableFor: ["couple", "family", "friends", "solo"],
        desc: "Pusat observasi arsitektur modern beratap tenun Manggarai dengan pemandangan kapal-kapal Phinisi di dermaga saat matahari terbenam.",
        tips: "Lanjutkan makan malam di Pasar Kuliner Kampung Ujung untuk santapan ikan kakap bakar segar."
      }
    ]
  },

  "jogja": {
    id: "jogja",
    name: "D.I. Yogyakarta",
    quickDesc: "Kota budaya dan pelajar nan istimewa dengan candi-candi megah peninggalan Mataram Kuno, pantai tebing karst, serta gudeg legendaris.",
    center: [-7.7956, 110.3695],
    zoom: 11,
    bestSeason: "Sepanjang Tahun • Eksplorasi Budaya",
    tips: [
      "Gunakan transportasi sewa mobil untuk rute pantai Gunungkidul karena medan jalan naik turun dan jarak cukup jauh (~2 jam).",
      "Patuhi aturan pakaian dan tata karma saat mengunjungi area sakral Keraton Yogyakarta.",
      "Untuk wisata candi Prambanan & Borobudur, pesan tiket online sebelumnya untuk menghindari antrean."
    ],
    baseCosts: {
      budget: { stay: 180000, transport: 90000, food: 75000, misc: 35000 },
      comfort: { stay: 450000, transport: 350000, food: 180000, misc: 75000 },
      luxury: { stay: 1500000, transport: 750000, food: 450000, misc: 180000 }
    },
    zones: ["Pusat Kota & Keraton", "Gunungkidul (Karst & Pantai)", "Sleman & Merapi Heritage", "Bantul & Kulon Progo"],
    spots: [
      {
        id: "jogja_keraton",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80",
        name: "Keraton Ngayogyakarta Hadiningrat & Tamansari",
        zone: "Pusat Kota & Keraton",
        lat: -7.8053,
        lng: 110.3642,
        categories: ["budaya"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 25000,
        rating: 4.7,
        suitableFor: ["family", "couple", "solo", "friends"],
        desc: "Pusat kebudayaan Jawa yang masih aktif dengan museum pusaka, arsitektur istana air Tamansari dan lorong bawah tanah Masjid Sumur Gumuling.",
        tips: "Keraton tutup loket sekitar pukul 14:00, datang lebih pagi sangat direkomendasikan."
      },
      {
        id: "jogja_malioboro",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        name: "Nostalgia Kawasan Malioboro & Kuliner Gudeg Wijilan",
        zone: "Pusat Kota & Keraton",
        lat: -7.7925,
        lng: 110.3658,
        categories: ["kuliner", "budaya"],
        idealTime: "night",
        durationHours: 2.0,
        price: 50000,
        rating: 4.6,
        suitableFor: ["family", "friends", "couple", "solo"],
        desc: "Jalan pedestrian bersejarah penuh atraksi seniman jalanan, pusat oleh-oleh bakpia, dan kuliner gudeg nangka gurih manis khas Yogya.",
        tips: "Gunakan andong delman atau becak kayuh untuk merasakan sensasi tempo dulu."
      },
      {
        id: "jogja_prambanan",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
        name: "Kompleks Candi Prambanan & Sendratari Ramayana",
        zone: "Sleman & Merapi Heritage",
        lat: -7.7520,
        lng: 110.4915,
        categories: ["budaya", "relaksasi"],
        idealTime: "sunset",
        durationHours: 3.0,
        price: 50000,
        rating: 4.8,
        suitableFor: ["family", "couple", "friends", "solo"],
        desc: "Candi Hindu tercantik di Asia Tenggara setinggi 47 meter yang didedikasikan untuk Trimurti dengan relief epos Ramayana.",
        tips: "Sore hari sangat indah untuk berfoto siluet candi menjelang matahari terbenam."
      },
      {
        id: "jogja_merapi_lava",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        name: "Merapi Lava Tour Jeep Offroad",
        zone: "Sleman & Merapi Heritage",
        lat: -7.5992,
        lng: 110.4461,
        categories: ["petualangan", "alam"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 350000,
        rating: 4.8,
        suitableFor: ["friends", "family", "solo"],
        desc: "Menyusuri bekas aliran lahar dingin Gunung Merapi menggunakan jeep Willis terbuka, mengunjungi bunker Kaliadem dan manuver air Sungai Kuning.",
        tips: "Gunakan masker dan kacamata pelindung dari debu pasir Merapi."
      },
      {
        id: "jogja_pindul",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        name: "Cave Tubing Goa Pindul & Sungai Oya",
        zone: "Gunungkidul (Karst & Pantai)",
        lat: -7.9308,
        lng: 110.6481,
        categories: ["petualangan", "alam"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 60000,
        rating: 4.6,
        suitableFor: ["family", "friends", "couple"],
        desc: "Menyusuri sungai bawah tanah di dalam gua karst menggunakan ban pelampung dengan sorotan sinar cahaya surga dari celah langit-langit gua.",
        tips: "Tersedia pemandu lokal bersertifikat dan baju pelampung yang aman untuk semua umur."
      },
      {
        id: "jogja_pantai_timang",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Gondola Ekstrem & Lobster Pantai Timang",
        zone: "Gunungkidul (Karst & Pantai)",
        lat: -8.1752,
        lng: 110.6622,
        categories: ["petualangan", "pantai", "kuliner"],
        idealTime: "afternoon",
        durationHours: 3.0,
        price: 150000,
        rating: 4.7,
        suitableFor: ["friends", "couple", "solo"],
        desc: "Menyeberangi samudra berombak ganas menuju pulau karang menggunakan kereta gantung tali tradisional nelayan penangkap lobster.",
        tips: "Akses jalan dari pos ojek berupa bebatuan; gunakan jasa sewa jeep lokal."
      },
      {
        id: "jogja_heha_ocean",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "HeHa Ocean View Cliff Sunset",
        zone: "Gunungkidul (Karst & Pantai)",
        lat: -8.1256,
        lng: 110.5183,
        categories: ["relaksasi", "kuliner", "pantai"],
        idealTime: "sunset",
        durationHours: 2.0,
        price: 35000,
        rating: 4.5,
        suitableFor: ["couple", "friends", "family"],
        desc: "Destinasi wisata tepi tebing laut selatan dengan puluhan spot foto modern berlatar deburan ombak dan senja menawan.",
        tips: "Datang sekitar pukul 16:30 agar tidak kepanasan dan dapat momen sunset optimal."
      }
    ]
  },

  "belitung": {
    id: "belitung",
    name: "Pulau Belitung",
    quickDesc: "Negeri Laskar Pelangi dengan pantai batu granit raksasa purba, air laut sebening kristal, dan danau kaolin toska menawan.",
    center: [-2.7410, 107.6366],
    zoom: 10,
    bestSeason: "Maret – Okt • Laut Tenang & Bebas Gelombang",
    tips: [
      "Island hopping pulau-pulau kecil wajib dilakukan dari Pantai Tanjung Kelayang.",
      "Cicipi kuliner khas Mie Belitung kuah udang kental dengan daun simpor dan Es Jeruk Kunci segar.",
      "Kondisi lalu lintas di Belitung sangat lengang dan nyaman untuk berkendara."
    ],
    baseCosts: {
      budget: { stay: 220000, transport: 100000, food: 80000, misc: 40000 },
      comfort: { stay: 550000, transport: 400000, food: 200000, misc: 90000 },
      luxury: { stay: 1600000, transport: 800000, food: 500000, misc: 200000 }
    },
    zones: ["Belitung Barat & Island Hopping", "Belitung Timur (Laskar Pelangi)", "Tanjung Pandan & Kuliner"],
    spots: [
      {
        id: "beli_tanjung_tinggi",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Pantai Tanjung Tinggi (Batu Granit Raksasa)",
        zone: "Belitung Barat & Island Hopping",
        lat: -2.5714,
        lng: 107.7128,
        categories: ["pantai", "alam", "relaksasi"],
        idealTime: "afternoon",
        durationHours: 2.5,
        price: 10000,
        rating: 4.9,
        suitableFor: ["family", "couple", "friends", "solo"],
        desc: "Lokasi syuting legendaris film Laskar Pelangi dengan formasi batu granit raksasa setinggi rumah di bibir pantai pasir putih halus.",
        tips: "Berenang di sela-sela batu granit sangat tenang karena ombak terhalang bebatuan."
      },
      {
        id: "beli_lengkuas",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Pulau Lengkuas & Mercusuar Kuno 1882",
        zone: "Belitung Barat & Island Hopping",
        lat: -2.5333,
        lng: 107.6167,
        categories: ["pantai", "budaya", "petualangan"],
        idealTime: "morning",
        durationHours: 3.0,
        price: 150000,
        rating: 4.9,
        suitableFor: ["family", "couple", "friends", "solo"],
        desc: "Pulau kecil berpasir putih dengan mercusuar peninggalan Belanda tahun 1882 dan spot snorkeling ikan badut (Nemo) di sekelilingnya.",
        tips: "Sewa kapal tradisional boat hopping dari dermaga Tanjung Kelayang seharga ~Rp 500rb per kapal."
      },
      {
        id: "beli_danau_kaolin",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
        name: "Danau Kaolin (Kawah Putih Biru Toska)",
        zone: "Tanjung Pandan & Kuliner",
        lat: -2.7681,
        lng: 107.6711,
        categories: ["alam", "relaksasi"],
        idealTime: "morning",
        durationHours: 1.5,
        price: 0,
        rating: 4.6,
        suitableFor: ["couple", "friends", "solo", "family"],
        desc: "Bekas tambang kaolin dengan air danau biru kehijauan cerah kontras dengan dinding tanah putih bersih bak salju.",
        tips: "Hindari jam tengah hari karena tidak ada peneduh di sekitar danau."
      },
      {
        id: "beli_sd_laskar",
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80",
        name: "Replika SD Muhammadiyah Gantong & Museum Kata Andrea Hirata",
        zone: "Belitung Timur (Laskar Pelangi)",
        lat: -2.9733,
        lng: 108.1889,
        categories: ["budaya"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 50000,
        rating: 4.7,
        suitableFor: ["family", "friends", "solo", "couple"],
        desc: "Napak tilas perjuangan anak-anak Laskar Pelangi dan museum sastra kata pertama di Indonesia yang penuh warna artistik.",
        tips: "Cicipi Kopi Manggar (Kopi Tarik khas kota 1001 warung kopi) di dekat lokasi."
      }
    ]
  },

  "raja-ampat": {
    id: "raja-ampat",
    name: "Kepulauan Raja Ampat",
    quickDesc: "Jantung segitiga karang dunia (Coral Triangle) dengan gugusan pulau karang karst zamrud, laguna toska, dan keanekaragaman hayati tertinggi di bumi.",
    center: [-0.2333, 130.5167],
    zoom: 9,
    bestSeason: "Okt – Apr • Laut Teduh & Visibilitas Menyelam Sempurna",
    tips: [
      "Kartu Tarif Layanan Pemeliharaan Lingkungan (TLPL / PIN Konservasi) wajib dimiliki sebelum memasuki kawasan.",
      "Kebutuhan BBM kapal cukup tinggi; rute per hari harus direncanakan searah per gugusan pulau.",
      "Bawa uang tunai rupiah secukupnya karena mesin ATM hanya tersedia di Waisai.",
      "Jaga kelestarian karang: jangan pernah menginjak atau memegang terumbu karang hidup."
    ],
    baseCosts: {
      budget: { stay: 450000, transport: 1200000, food: 180000, misc: 150000 },
      comfort: { stay: 1400000, transport: 2500000, food: 400000, misc: 300000 },
      luxury: { stay: 6000000, transport: 7000000, food: 1200000, misc: 800000 }
    },
    zones: ["Gugusan Piaynemo & Fam", "Teluk Kabui & Selat Dampier", "Waigeo & Waisai"],
    spots: [
      {
        id: "raja_piaynemo",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        name: "Puncak Piaynemo & Telaga Bintang",
        zone: "Gugusan Piaynemo & Fam",
        lat: -0.5639,
        lng: 130.2694,
        categories: ["alam", "petualangan", "relaksasi"],
        idealTime: "morning",
        durationHours: 3.0,
        price: 300000,
        rating: 5.0,
        suitableFor: ["couple", "friends", "solo"],
        desc: "Ikon mahakarya Raja Ampat: gugusan bukit karst menyerupai miniatur Wayag dengan telaga berbentuk bintang laut alami berwarna toska.",
        tips: "Tangga kayu sudah rapi sebanyak 320 anak tangga, sediakan air mineral saat naik."
      },
      {
        id: "raja_pasir_timbul",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        name: "Gosong Pasir Timbul Mansuar",
        zone: "Teluk Kabui & Selat Dampier",
        lat: -0.5833,
        lng: 130.6000,
        categories: ["pantai", "relaksasi"],
        idealTime: "morning",
        durationHours: 1.5,
        price: 0,
        rating: 4.9,
        suitableFor: ["couple", "family", "friends", "solo"],
        desc: "Pulau pasir putih sehalus tepung yang hanya muncul saat air laut surut di tengah lautan toska bening tak bertepi.",
        tips: "Waktu kunjungan harus disesuaikan dengan jadwal pasang surut air laut harian."
      },
      {
        id: "raja_friwen",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        name: "Pantai Friwen Wall & Makan Ikan Bakar Tradisional",
        zone: "Teluk Kabui & Selat Dampier",
        lat: -0.4833,
        lng: 130.6833,
        categories: ["pantai", "kuliner", "relaksasi"],
        idealTime: "afternoon",
        durationHours: 2.5,
        price: 50000,
        rating: 4.8,
        suitableFor: ["family", "couple", "friends", "solo"],
        desc: "Dinding karang curam bawah laut penuh gerombolan ikan warna-warni dipadu pantai teduh dengan ayunan tali di pohon pantai.",
        tips: "Warga lokal menyajikan ikan tenggiri bakar segar dengan sambal colo-colo yang sangat nikmat."
      },
      {
        id: "raja_batu_pensil",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        name: "Teluk Kabui & Formasi Karst Batu Pensil",
        zone: "Teluk Kabui & Selat Dampier",
        lat: -0.3833,
        lng: 130.5500,
        categories: ["alam", "petualangan"],
        idealTime: "morning",
        durationHours: 2.0,
        price: 0,
        rating: 4.8,
        suitableFor: ["couple", "friends", "solo"],
        desc: "Menyusuri labirin karst tenang menyerupai ngarai laut dengan monolit batu karang menjulang tinggi menyerupai pensil tegak.",
        tips: "Air di teluk ini sangat tenang menyerupai cermin alami raksasa."
      },
      {
        id: "raja_cendrawasih",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80",
        name: "Observasi Burung Cendrawasih Merah Sawinggrai",
        zone: "Waigeo & Waisai",
        lat: -0.4667,
        lng: 130.5833,
        categories: ["alam", "budaya"],
        idealTime: "morning",
        durationHours: 2.5,
        price: 150000,
        rating: 4.9,
        suitableFor: ["solo", "couple", "friends", "family"],
        desc: "Menyaksikan tarian ritual kawin burung surga Cendrawasih Merah (Red Bird of Paradise) di pucuk kanopi hutan perawan Papua.",
        tips: "Harus berada di lokasi sebelum jam 06:00 pagi saat burung mulai bernyanyi dan menari."
      }
    ]
  }
};

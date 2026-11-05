// ==========================================================================
// NusaTrip — Realtime AI Travel Intelligence Engine v2.0
// Powered by Google Gemini AI, BMKG/Open-Meteo Weather, & Live Travel News
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    regionId: "bali",
    regionName: "Pulau Bali",
    startDate: "",
    endDate: "",
    totalDays: 3,
    travelerType: "family",
    pace: "balanced",
    budgetTier: "comfort",
    interests: new Set(["pantai", "alam", "budaya", "kuliner"]),
    itinerary: [],
    selectedDayFilter: "all",
    weatherForecast: [],
    map: null,
    mapMarkers: [],
    mapPolylines: [],
    currentMobileTab: "timeline"
  };

  const API_BASE = window.location.pathname.includes("/gastrip")
    ? "/gastrip/api"
    : (window.location.pathname.includes("/nusatrip") ? "/nusatrip/api" : "/api");

  // Curated Region Photos for Featured Island Cards
  const REGION_META = {
    "bali": {
      cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      tagline: "Pura Suci, Pantai Eksotis & Seni Ubud",
      rating: "4.9 (4.2k ulasan)",
      priceStart: "Mulai Rp 450rb/hari",
      badge: "🔥 Terpopuler"
    },
    "labuan_bajo": {
      cover: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
      tagline: "Pulau Padar, Komodo & Pink Beach",
      rating: "4.9 (1.8k ulasan)",
      priceStart: "Mulai Rp 850rb/hari",
      badge: "🌊 Wisata Bahari"
    },
    "lombok": {
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tagline: "Gili Trawangan, Air Terjun & Mandalika",
      rating: "4.8 (2.1k ulasan)",
      priceStart: "Mulai Rp 400rb/hari",
      badge: "🌴 Snorkeling Hits"
    },
    "jogja": {
      cover: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
      tagline: "Candi Borobudur, Malioboro & Kraton",
      rating: "4.9 (5.1k ulasan)",
      priceStart: "Mulai Rp 320rb/hari",
      badge: "🏛️ Warisan Budaya"
    },
    "belitung": {
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tagline: "Batu Granit Raksasa & Pulau Lengkuas",
      rating: "4.8 (1.2k ulasan)",
      priceStart: "Mulai Rp 380rb/hari",
      badge: "💎 Pantai Eksotis"
    },
    "raja_ampat": {
      cover: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      tagline: "Piaynemo & Gugusan Karst Dunia",
      rating: "5.0 (980 ulasan)",
      priceStart: "Mulai Rp 1.8jt/hari",
      badge: "👑 Surga Dunia"
    },
    "banyuwangi": {
      cover: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
      tagline: "Blue Fire Ijen, Baluran & Teluk Hijau",
      rating: "4.8 (1.6k ulasan)",
      priceStart: "Mulai Rp 350rb/hari",
      badge: "🌋 Sunrise of Java"
    },
    "danau_toba": {
      cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      tagline: "Danau Vulkanik Terbesar & Budaya Batak",
      rating: "4.8 (1.4k ulasan)",
      priceStart: "Mulai Rp 390rb/hari",
      badge: "⛰️ Geopark UNESCO"
    },
    "bromo_malang": {
      cover: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
      tagline: "Lautan Pasir Bromo & Kuliner Apel Malang",
      rating: "4.9 (3.8k ulasan)",
      priceStart: "Mulai Rp 420rb/hari",
      badge: "❄️ Dingin & Indah"
    },
    "sumba": {
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tagline: "Bukit Wairinding, Kampung Adat & Air Terjun",
      rating: "4.9 (820 ulasan)",
      priceStart: "Mulai Rp 750rb/hari",
      badge: "🌾 Savana Eksotis"
    }
  };

  // Route Day Colors
  const DAY_COLORS = [
    { name: "Ocean", hex: "#0284c7", bg: "bg-sky-600", text: "text-sky-700" },
    { name: "Teal", hex: "#0f766e", bg: "bg-teal-700", text: "text-teal-800" },
    { name: "Emerald", hex: "#059669", bg: "bg-emerald-600", text: "text-emerald-700" },
    { name: "Coral", hex: "#ea580c", bg: "bg-orange-600", text: "text-orange-700" },
    { name: "Indigo", hex: "#4f46e5", bg: "bg-indigo-600", text: "text-indigo-700" },
    { name: "Rose", hex: "#e11d48", bg: "bg-rose-600", text: "text-rose-700" }
  ];

  // DOM Elements
  const elNewsTickerContent = document.getElementById("newsTickerContent");
  const elInputCustomRegion = document.getElementById("inputCustomRegion");
  const elInputAiPrompt = document.getElementById("inputAiPrompt");
  const elBtnSubmitCustomWish = document.getElementById("btnSubmitCustomWish");
  const elBtnGenerateAI = document.getElementById("btnGenerateAI");
  const elModalAiLoading = document.getElementById("modalAiLoading");
  const elAiLoadingTitle = document.getElementById("aiLoadingTitle");
  const elAiLoadingDesc = document.getElementById("aiLoadingDesc");
  const elIslandGallery = document.getElementById("islandGallery");
  const elActiveTripTitle = document.getElementById("activeTripTitle");
  const elIslandHeaderDesc = document.getElementById("islandHeaderDesc");
  const elStartDate = document.getElementById("inputStartDate");
  const elEndDate = document.getElementById("inputEndDate");
  const elBadgeDuration = document.getElementById("badgeDuration");
  const elSelectTravelerType = document.getElementById("selectTravelerType");
  const elSelectBudgetTier = document.getElementById("selectBudgetTier");
  const elSelectPace = document.getElementById("selectPace");
  const elInterestChips = document.querySelectorAll(".travel-cat-pill");

  // Weather & Overview Stats
  const elWeatherLiveBadge = document.getElementById("weatherLiveBadge");
  const elWeatherIcon = document.getElementById("weatherIcon");
  const elWeatherText = document.getElementById("weatherText");
  const elStatTotalSpots = document.getElementById("statTotalSpots");
  const elStatTotalDistance = document.getElementById("statTotalDistance");
  const elStatTotalCost = document.getElementById("statTotalCost");
  const elStatBestSeason = document.getElementById("statBestSeason");

  // Workspace Elements
  const elDayFilterTabs = document.getElementById("dayFilterTabs");
  const elItineraryContainer = document.getElementById("itineraryContainer");
  const elBtnAddSpotModal = document.getElementById("btnAddSpotModal");
  const elBtnResetMapBounds = document.getElementById("btnResetMapBounds");
  const elBudgetTierBadge = document.getElementById("budgetTierBadge");
  const elBudgetBreakdownList = document.getElementById("budgetBreakdownList");
  const elBudgetTotalBottom = document.getElementById("budgetTotalBottom");
  const elRegionTipsList = document.getElementById("regionTipsList");

  // Mobile & Share Elements
  const elBtnCopyWa = document.getElementById("btnCopyWa");
  const elBtnMobileCopy = document.getElementById("btnMobileCopy");
  const elMobSummaryDays = document.getElementById("mobSummaryDays");
  const elMobSummaryCost = document.getElementById("mobSummaryCost");
  const elBtnViewTimeline = document.getElementById("btnViewTimeline");
  const elBtnViewMap = document.getElementById("btnViewMap");
  const elColTimeline = document.getElementById("colTimeline");
  const elColMap = document.getElementById("colMap");

  // Modal Spot Picker
  const elModalSpotPicker = document.getElementById("modalSpotPicker");
  const elBtnCloseSpotPicker = document.getElementById("btnCloseSpotPicker");
  const elSelectTargetDay = document.getElementById("selectTargetDay");
  const elAvailableSpotsList = document.getElementById("availableSpotsList");

  // Haversine Distance (km)
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Format IDR Currency
  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  }

  function addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  function formatIndoDate(dateStr) {
    if (!dateStr) return "";
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', options);
  }

  // Initialize Dates
  function initDates() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const startStr = today.toISOString().split("T")[0];
    const endStr = addDays(startStr, state.totalDays - 1);

    state.startDate = startStr;
    state.endDate = endStr;

    if (elStartDate) elStartDate.value = startStr;
    if (elEndDate) elEndDate.value = endStr;
    updateDurationBadge();
  }

  function updateDurationBadge() {
    const s = new Date(state.startDate);
    const e = new Date(state.endDate);
    const diffTime = e - s;
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);

    state.totalDays = diffDays;
    const nights = Math.max(1, diffDays - 1);
    if (elBadgeDuration) elBadgeDuration.textContent = `${diffDays} Hari (${nights} Malam)`;

    document.querySelectorAll(".day-pill").forEach(btn => {
      const d = parseInt(btn.dataset.days);
      if (d === diffDays) {
        btn.className = "day-pill active px-3 py-1 rounded-full bg-white text-sky-900 font-bold transition shadow-xs";
      } else {
        btn.className = "day-pill px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition";
      }
    });
  }

  // Fetch Live Travel News & BMKG Advisories
  async function fetchLiveNews() {
    try {
      const res = await fetch(`${API_BASE}/news`);
      const json = await res.json();
      if (json.status === "success" && json.data && json.data.length > 0) {
        elNewsTickerContent.innerHTML = json.data.map(item => {
          return `
            <a href="${item.link}" target="_blank" rel="noopener" class="hover:text-amber-300 transition flex items-center gap-1.5 shrink-0">
              <span class="px-1.5 py-0.2 bg-slate-800 rounded text-[10px] text-sky-400 font-bold">${item.source}</span>
              <span>${item.title}</span>
            </a>
          `;
        }).join('<span class="text-slate-600">•</span>');
      }
    } catch (e) {
      console.warn("Notice: Live news stream unavailable:", e);
    }
  }

  // Fetch Real-time Weather for Current Coordinates
  async function fetchRealtimeWeather(lat, lng) {
    try {
      if (elWeatherText) elWeatherText.textContent = "Mengecek prakiraan BMKG...";
      const res = await fetch(`${API_BASE}/weather?lat=${lat}&lng=${lng}`);
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        state.weatherForecast = json.data;
        const todayWeather = json.data[0];
        if (elWeatherIcon) elWeatherIcon.textContent = todayWeather.icon;
        if (elWeatherText) {
          elWeatherText.textContent = `${todayWeather.temp_max}°C ${todayWeather.condition} • Peluang Hujan ${todayWeather.rain_prob}%`;
        }
        renderDayTabs();
      }
    } catch (e) {
      console.warn("Weather API fallback:", e);
      if (elWeatherText) elWeatherText.textContent = "Tropis Cerah • Suhu ~29°C";
    }
  }

  window.selectQuickRegion = function(name) {
    if (elInputCustomRegion) elInputCustomRegion.value = name;
    state.regionName = name;
    if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${name}`;
    document.querySelectorAll(".explorer-trip-card").forEach(c => {
      const match = c.textContent.toLowerCase().includes(name.toLowerCase());
      c.classList.toggle("active", match);
    });
    // Trigger generation immediately for the selected region
    triggerAIGeneration();
  };

  // Initialize Island Gallery (With expanded 10+ regions)
  async function initIslandGallery() {
    if (!elIslandGallery) return;
    elIslandGallery.innerHTML = "";

    let regionsToRender = [];
    try {
      const res = await fetch(`${API_BASE}/regions`);
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        regionsToRender = json.data;
      }
    } catch (e) {
      // Fallback to local REGIONS_DATA
      regionsToRender = Object.keys(REGIONS_DATA).map(k => {
        const r = REGIONS_DATA[k];
        const m = REGION_META[k] || {};
        return {
          id: r.id,
          name: r.name,
          tagline: m.tagline || r.quickDesc,
          cover: m.cover || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
          rating: m.rating || "4.8 (1.2k)",
          priceStart: m.priceStart || "Mulai Rp 400rb/hari",
          badge: m.badge || "Pilihan",
          lat: r.center[0],
          lng: r.center[1]
        };
      });
    }

    regionsToRender.forEach(reg => {
      const isSelected = reg.id === state.regionId || reg.name.toLowerCase().includes(state.regionName.toLowerCase());
      const card = document.createElement("div");
      card.className = `explorer-trip-card ${isSelected ? 'active' : ''}`;
      card.innerHTML = `
        <div class="relative w-full h-40 overflow-hidden bg-slate-100">
          <img src="${reg.cover}" alt="${reg.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              ${reg.badge.includes('🔥') ? 'Best Seller' : 'Pasti Berangkat'}
            </span>
          </div>
          <div class="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-amber-300 font-extrabold text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
            <span>⭐</span>
            <span>${reg.rating}</span>
          </div>
        </div>
        <div class="p-3.5 space-y-1">
          <h3 class="font-extrabold text-sm text-slate-900 leading-snug line-clamp-1">${reg.name}</h3>
          <p class="text-xs text-slate-500 line-clamp-1 font-medium">${reg.tagline}</p>
          <div class="pt-2 flex items-center justify-between border-t border-slate-100">
            <div>
              <span class="text-[9.5px] text-slate-400 block font-semibold leading-none">Mulai dari</span>
              <span class="text-sm font-extrabold text-sky-700">${reg.priceStart}</span>
            </div>
            <button type="button" class="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 border border-sky-200 transition">
              Pilih &rarr;
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (elInputCustomRegion) elInputCustomRegion.value = reg.name;
        state.regionName = reg.name;
        state.regionId = reg.id;
        document.querySelectorAll(".explorer-trip-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${reg.name}`;
      });

      elIslandGallery.appendChild(card);
    });

    lucide.createIcons();
  }

  // Trigger Dynamic AI Generation via Gemini Backend (Optimized with Client & Server Caching)
  async function triggerAIGeneration(customWish = null) {
    const regionQuery = elInputCustomRegion ? elInputCustomRegion.value.trim() : state.regionName;
    if (!regionQuery) return;

    state.regionName = regionQuery;
    if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${regionQuery}`;

    const customPromptVal = customWish || (elInputAiPrompt ? elInputAiPrompt.value.trim() : "");
    const clientCacheKey = `gastrip_cache_${regionQuery.toLowerCase()}_${state.totalDays}_${state.travelerType}_${state.pace}_${state.budgetTier}_${customPromptVal}`;

    // 1. Instant Client-Side Cache Check (0ms immediate rendering)
    try {
      const clientCached = sessionStorage.getItem(clientCacheKey);
      if (clientCached) {
        const cachedData = JSON.parse(clientCached);
        applyAIGeneratedItinerary(cachedData);
        const itSec = document.getElementById("sectionItinerary");
        if (itSec) itSec.scrollIntoView({ behavior: "smooth" });
        return;
      }
    } catch (e) {
      console.warn("Session cache read skipped", e);
    }

    // 2. Show Dynamic Progress Feedback Modal
    let progressTimer = null;
    let stepCount = 0;
    const progressMsgs = [
      "Menganalisis klaster geografis destinasi...",
      "Menyusun rute searah & memverifikasi ulasan Google Maps...",
      "Menghitung estimasi biaya & mengintegrasikan prakiraan BMKG..."
    ];

    if (elModalAiLoading) {
      if (elAiLoadingTitle) elAiLoadingTitle.textContent = `Asisten AI Merancang Rute ${regionQuery}...`;
      if (elAiLoadingDesc) elAiLoadingDesc.textContent = progressMsgs[0];
      elModalAiLoading.classList.remove("hidden");
      progressTimer = setInterval(() => {
        stepCount++;
        if (elAiLoadingDesc && progressMsgs[stepCount % progressMsgs.length]) {
          elAiLoadingDesc.textContent = progressMsgs[stepCount % progressMsgs.length];
        }
      }, 1200);
    }

    const payload = {
      region: regionQuery,
      days: state.totalDays,
      traveler_type: state.travelerType,
      pace: state.pace,
      budget_tier: state.budgetTier,
      interests: Array.from(state.interests),
      custom_prompt: customPromptVal
    };

    try {
      const res = await fetch(`${API_BASE}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.status === "success" && json.data) {
        // Cache in browser session
        try {
          sessionStorage.setItem(clientCacheKey, JSON.stringify(json.data));
        } catch (e) {}
        applyAIGeneratedItinerary(json.data);
      } else {
        throw new Error(json.detail || "Gagal mendapatkan respon AI");
      }
    } catch (err) {
      console.warn("AI generation fallback to local heuristic:", err);
      // Fallback to local heuristic engine if offline/network timeout
      generateLocalHeuristic();
    } finally {
      if (progressTimer) clearInterval(progressTimer);
      if (elModalAiLoading) elModalAiLoading.classList.add("hidden");
      // Smooth scroll to itinerary
      const itSec = document.getElementById("sectionItinerary");
      if (itSec) itSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Apply Structured AI Output to Application State
  function applyAIGeneratedItinerary(aiData) {
    if (aiData.region_name) {
      state.regionName = aiData.region_name;
      if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${aiData.region_name}`;
      if (elInputCustomRegion) elInputCustomRegion.value = aiData.region_name;
      document.querySelectorAll(".explorer-trip-card").forEach(c => {
        const match = c.textContent.toLowerCase().includes(aiData.region_name.toLowerCase());
        c.classList.toggle("active", match);
      });
    }

    if (elIslandHeaderDesc) elIslandHeaderDesc.textContent = aiData.quick_desc || "";
    if (elStatBestSeason) elStatBestSeason.textContent = aiData.best_season || "Apr - Okt • Musim Terbaik";

    // Update Tips
    if (elRegionTipsList && aiData.tips) {
      elRegionTipsList.innerHTML = "";
      aiData.tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        elRegionTipsList.appendChild(li);
      });
    }

    // Set Map Center
    const center = [aiData.center_lat || -8.4095, aiData.center_lng || 115.1889];
    const zoom = aiData.zoom || 10;
    if (state.map) state.map.setView(center, zoom);

    // Fetch Weather for this new region
    fetchRealtimeWeather(center[0], center[1]);

    // Build Days
    const newItinerary = [];
    (aiData.days || []).forEach((d, idx) => {
      const dayDate = addDays(state.startDate, idx);
      let totalDist = 0;
      const spots = d.spots || [];
      for (let i = 0; i < spots.length - 1; i++) {
        totalDist += getDistanceKm(spots[i].lat, spots[i].lng, spots[i + 1].lat, spots[i + 1].lng);
      }
      newItinerary.push({
        day: d.day || (idx + 1),
        date: dayDate,
        zone: d.zone || `Zona Hari ${idx + 1}`,
        spots: spots,
        totalDistanceKm: Math.round(totalDist * 10) / 10
      });
    });

    state.itinerary = newItinerary;
    state.selectedDayFilter = "all";
    renderAll();
  }

  // Verified real spots dictionary for instant client fallback
  const CLIENT_VERIFIED_SPOTS = {
    karangasem: [
      { name: "Pura Lempuyang Luhur", lat: -8.3917, lng: 115.6292, categories: ["budaya", "alam"], ideal_time: "morning", duration_hours: 2.5, price: 55000, rating: 4.8, gmaps_reviews: "24.000+ ulasan", gmaps_review_highlight: "Candi Bentar ikonik 'Gate of Heaven' berlatar siluet megah Gunung Agung.", desc: "Pura suci lereng Gunung Lempuyang dengan gapura megah menghadap langsung Gunung Agung.", tips: "Ambil nomor antrean foto sejak pagi hari.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
      { name: "Tirta Gangga", lat: -8.4122, lng: 115.5873, categories: ["budaya", "alam"], ideal_time: "afternoon", duration_hours: 2.0, price: 50000, rating: 4.7, gmaps_reviews: "36.000+ ulasan", gmaps_review_highlight: "Taman air peninggalan Raja Karangasem dengan kolam ikan mas koi dan batu pijakan melingkar.", desc: "Istana air peninggalan Kerajaan Karangasem dengan kolam mata air alami bertingkat dan patung klasik.", tips: "Beli pelet ikan di luar loket untuk memberi makan kawanan koi raksasa.", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80" },
      { name: "Taman Ujung Soekasada", lat: -8.4631, lng: 115.6306, categories: ["budaya", "alam"], ideal_time: "sunset", duration_hours: 2.0, price: 35000, rating: 4.7, gmaps_reviews: "14.500+ ulasan", gmaps_review_highlight: "Kombinasi arsitektur Bali, Belanda, dan Tiongkok dengan jembatan dan kolam air luas menghadap laut.", desc: "Kompleks istana tetirah raja dengan kolam-kolam luas, paviliun terapung, dan pemandangan laut Selat Lombok.", tips: "Naik ke pilar reruntuhan di puncak bukit taman untuk sudut foto panorama terbaik.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80" },
      { name: "Pura Agung Besakih", lat: -8.3742, lng: 115.4508, categories: ["budaya"], ideal_time: "morning", duration_hours: 3.0, price: 60000, rating: 4.8, gmaps_reviews: "22.000+ ulasan", gmaps_review_highlight: "Pura terbesar dan tersuci di Pulau Bali (The Mother Temple) di lereng barat daya Gunung Agung.", desc: "Kompleks pura induk terbesar di Bali dengan puluhan pura pedharman dan arsitektur meru bertingkat megah.", tips: "Tiket masuk sudah mencakup mobil buggy dan kain sarung resmi.", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
      { name: "Desa Adat Tenganan Pegringsingan", lat: -8.4739, lng: 115.5658, categories: ["budaya"], ideal_time: "afternoon", duration_hours: 2.0, price: 20000, rating: 4.6, gmaps_reviews: "7.800+ ulasan", gmaps_review_highlight: "Desa kuno suku Bali Aga penghasil kain tenun ikat ganda Gringsing yang langka di dunia.", desc: "Salah satu desa adat tertua di Bali yang masih mempertahankan tata ruang tradisional kuno dan budaya perang pandan.", tips: "Lihat proses menenun kain gringsing asli di rumah-rumah warga lokal.", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80" },
      { name: "Virgin Beach (Pantai Perasi)", lat: -8.5008, lng: 115.6111, categories: ["pantai", "sunset"], ideal_time: "sunset", duration_hours: 2.5, price: 15000, rating: 4.7, gmaps_reviews: "9.200+ ulasan", gmaps_review_highlight: "Pantai pasir putih tersembunyi di balik tebing bukit dengan ombak tenang untuk berenang.", desc: "Pantai pasir putih alami yang tenang dengan warung tepi pantai penjual kelapa muda dan ikan bakar segar.", tips: "Waktu terbaik menikmati suasana pantai mulai pukul 15.00 hingga matahari terbenam.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
      { name: "Pantai Amed (Teluk Jemeluk)", lat: -8.3375, lng: 115.6569, categories: ["pantai", "alam"], ideal_time: "morning", duration_hours: 3.0, price: 10000, rating: 4.8, gmaps_reviews: "11.000+ ulasan", gmaps_review_highlight: "Surga snorkeling dengan terumbu karang warna-warni dan pura bawah laut yang memesona.", desc: "Kawasan pesisir berpasir hitam vulkanik dengan keanekaragaman biota laut dan perahu jukung tradisional.", tips: "Bawa atau sewa kacamata snorkel dan sepatu karang di warung tepi pantai.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" }
    ],
    buleleng: [
      { name: "Pantai Lovina (Dolphin Watching)", lat: -8.1567, lng: 115.0267, categories: ["pantai", "alam"], ideal_time: "morning", duration_hours: 3.0, price: 100000, rating: 4.7, gmaps_reviews: "19.000+ ulasan", gmaps_review_highlight: "Melihat kawanan lumba-lumba melompat di laut lepas saat matahari terbit.", desc: "Pantai pasir hitam tenang tempat berkumpulnya kawanan lumba-lumba hidung botol setiap fajar.", tips: "Pesan perahu jukung nelayan sehari sebelumnya.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
      { name: "Air Terjun Sekumpul", lat: -8.1750, lng: 115.1833, categories: ["alam"], ideal_time: "morning", duration_hours: 3.5, price: 40000, rating: 4.9, gmaps_reviews: "12.000+ ulasan", gmaps_review_highlight: "Air terjun tercantik di Bali dengan gugusan 7 aliran air di lembah hijau rimbun.", desc: "Kumpulan air terjun megah di tengah hutan hujan tropis yang masih alami.", tips: "Gunakan pemandu lokal resmi untuk keamanan jalur trekking.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80" },
      { name: "Brahma Vihara Arama", lat: -8.2083, lng: 114.9750, categories: ["budaya"], ideal_time: "afternoon", duration_hours: 2.0, price: 20000, rating: 4.8, gmaps_reviews: "6.200+ ulasan", gmaps_review_highlight: "Wihara Buddha terbesar di Bali dengan replika mini Candi Borobudur yang hening.", desc: "Pusat meditasi dan wihara megah di perbukitan Banjar berarsitektur paduan Bali dan Buddha.", tips: "Jaga ketenangan selama berada di area meditasi.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80" },
      { name: "Danau Tamblingan", lat: -8.2500, lng: 115.0833, categories: ["alam", "budaya"], ideal_time: "sunset", duration_hours: 2.0, price: 15000, rating: 4.7, gmaps_reviews: "8.100+ ulasan", gmaps_review_highlight: "Danau purba yang mistis dan tenang dikelilingi hutan lindung serta pura air kuno.", desc: "Danau kaldera yang asri dan bebas motor boat, cocok untuk sewa perahu kano tradisional.", tips: "Nikmati udara dingin kabut sore dengan kopi hangat tepi danau.", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80" }
    ]
  };

  // Fallback Dynamic Heuristic Generator (Guaranteed to match the requested region)
  function generateLocalHeuristic() {
    const regName = state.regionName || "Pulau Bali";
    const regLower = regName.toLowerCase();
    if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${regName}`;
    if (elIslandHeaderDesc) elIslandHeaderDesc.textContent = `Menikmati pesona lanskap alam eksotis, kehangatan budaya lokal, dan ragam kuliner khas di ${regName}.`;
    if (elStatBestSeason) elStatBestSeason.textContent = "Mei - Okt • Musim Kemarau & Cuaca Bersahabat";

    if (elRegionTipsList) {
      elRegionTipsList.innerHTML = `
        <li>Sewa transportasi lokal untuk fleksibilitas menjelajah spot hits di ${regName}</li>
        <li>Siapkan uang tunai rupiah untuk kuliner dan tiket masuk wisata</li>
        <li>Kunjungi spot wisata populer lebih awal saat pagi hari untuk udara sejuk</li>
      `;
    }

    const fallbacks = [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
    ];

    // Check verified client spots
    let matchedSpots = null;
    for (const [key, spots] of Object.entries(CLIENT_VERIFIED_SPOTS)) {
      if (regLower.includes(key)) {
        matchedSpots = spots;
        break;
      }
    }

    const newItinerary = [];
    for (let day = 1; day <= state.totalDays; day++) {
      let daySpots = [];
      if (matchedSpots && matchedSpots.length > 0) {
        const spotsPerDay = 3;
        const startIdx = ((day - 1) * spotsPerDay) % matchedSpots.length;
        for (let s = 0; s < spotsPerDay; s++) {
          const sp = matchedSpots[(startIdx + s) % matchedSpots.length];
          daySpots.push({
            id: `spot_${day}_${s + 1}`,
            ...sp
          });
        }
      } else {
        daySpots = [
          {
            id: `spot_${day}_1`,
            name: `Pantai & Pesisir Eksotis ${regName}`,
            lat: -8.4 + (day * 0.05),
            lng: 115.5 + (day * 0.05),
            categories: ["alam"],
            ideal_time: "morning",
            duration_hours: 2.5,
            price: 25000,
            rating: 4.8,
            gmaps_reviews: "4.800+ ulasan",
            gmaps_review_highlight: `Pemandangan memukau dan salah satu tempat paling direkomendasikan di ${regName}.`,
            desc: `Spot pesisir eksotis wajib dikunjungi untuk menikmati keindahan ${regName}.`,
            tips: "Datang pagi hari sebelum jam 09.30 untuk foto bebas keramaian.",
            image: fallbacks[(day - 1) % fallbacks.length]
          },
          {
            id: `spot_${day}_2`,
            name: `Taman Wisata Alam & Lembah ${regName}`,
            lat: -8.43 + (day * 0.05),
            lng: 115.54 + (day * 0.05),
            categories: ["alam", "budaya"],
            ideal_time: "afternoon",
            duration_hours: 2.0,
            price: 20000,
            rating: 4.7,
            gmaps_reviews: "3.200+ ulasan",
            gmaps_review_highlight: "Udara sejuk dengan pemandangan terbuka yang sangat asri.",
            desc: `Kawasan santai menikmati alam bebas dan vegetasi hijau di ${regName}.`,
            tips: "Gunakan alas kaki yang nyaman untuk berjalan.",
            image: fallbacks[day % fallbacks.length]
          },
          {
            id: `spot_${day}_3`,
            name: `Pusat Kerajinan & Kuliner Khas ${regName}`,
            lat: -8.46 + (day * 0.05),
            lng: 115.58 + (day * 0.05),
            categories: ["kuliner", "sunset"],
            ideal_time: "sunset",
            duration_hours: 2,
            price: 0,
            rating: 4.9,
            gmaps_reviews: "6.500+ ulasan",
            gmaps_review_highlight: "Suasana senja syahdu dengan aneka ragam kuliner khas lokal yang lezat.",
            desc: `Pusat kuliner lokal terbaik untuk bersantai saat matahari terbenam.`,
            tips: "Waktu terbaik datang pukul 16.45.",
            image: fallbacks[(day + 1) % fallbacks.length]
          }
        ];
      }

      newItinerary.push({
        day: day,
        date: addDays(state.startDate, day - 1),
        zone: `Zona Ikonik ${regName} - Hari ${day}`,
        totalDistanceKm: 14.5,
        spots: daySpots
      });
    }

    state.itinerary = newItinerary;
    state.selectedDayFilter = "all";
    renderAll();
  }

  function getTimeSlot(index, total, idealTime) {
    if (idealTime === "night") return "19:00 – 21:00 • Malam";
    if (idealTime === "sunset") return "16:30 – 18:30 • Senja / Sunset";
    const slots = [
      "08:30 – 10:30 • Pagi",
      "10:45 – 12:30 • Siang",
      "13:30 – 15:30 • Siang",
      "15:45 – 17:30 • Sore"
    ];
    if (index === 0) return slots[0];
    if (index === 1) return slots[1];
    if (index === 2) return slots[2];
    if (index === 3) return slots[3];
    return "18:00 – 20:00 • Petang";
  }

  // Render Day Filter Tabs (With Weather Badges)
  function renderDayTabs() {
    if (!elDayFilterTabs) return;
    elDayFilterTabs.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.className = `day-tab-btn ${state.selectedDayFilter === "all" ? "active" : ""}`;
    allBtn.textContent = `Semua Hari (${state.totalDays}H)`;
    allBtn.addEventListener("click", () => {
      state.selectedDayFilter = "all";
      renderDayTabs();
      renderItineraryCards();
      renderMap();
    });
    elDayFilterTabs.appendChild(allBtn);

    state.itinerary.forEach((d, idx) => {
      const isSelected = state.selectedDayFilter === d.day;
      const weather = state.weatherForecast[idx] || { icon: "🌤️", temp_max: 29 };
      const btn = document.createElement("button");
      btn.className = `day-tab-btn ${isSelected ? "active" : ""}`;
      btn.innerHTML = `
        <span>Hari ${d.day}</span>
        <span class="text-[11px] opacity-90">${weather.icon} ${weather.temp_max}°C</span>
      `;
      btn.addEventListener("click", () => {
        state.selectedDayFilter = d.day;
        renderDayTabs();
        renderItineraryCards();
        renderMap();
      });
      elDayFilterTabs.appendChild(btn);
    });
  }

  // Render Itinerary Cards (Wanderlog / Klook Travel Style)
  function renderItineraryCards() {
    if (!elItineraryContainer) return;
    elItineraryContainer.innerHTML = "";

    const daysToRender = state.selectedDayFilter === "all"
      ? state.itinerary
      : state.itinerary.filter(d => d.day === state.selectedDayFilter);

    if (daysToRender.length === 0) {
      elItineraryContainer.innerHTML = `
        <div class="p-8 sm:p-12 text-center travel-card border-2 border-dashed border-sky-200 bg-gradient-to-b from-sky-50/40 to-white">
          <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
            <i data-lucide="sparkles" class="w-7 h-7 text-sky-600"></i>
          </div>
          <h3 class="text-base sm:text-lg font-extrabold text-slate-800 mb-1.5">Siap Merancang Liburan ${state.regionName}?</h3>
          <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
            Tentukan destinasi, tanggal, dan preferensi perjalanan di atas, lalu tekan tombol <strong>Susun AI</strong> untuk mulai merancang rencana perjalanan otomatis.
          </p>
          <button id="btnEmptyStateGenerate" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md transition">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-300"></i>
            <span>Susun Rute Liburan Sekarang</span>
          </button>
        </div>
      `;
      const btnEmpty = document.getElementById("btnEmptyStateGenerate");
      if (btnEmpty) btnEmpty.addEventListener("click", () => triggerAIGeneration());
      lucide.createIcons();
      return;
    }

    daysToRender.forEach((dayPlan, dayIdx) => {
      const weather = state.weatherForecast[dayIdx] || { icon: "☀️", condition: "Cerah Tropis", temp_max: 30, rain_prob: 10 };
      const card = document.createElement("div");
      card.className = "travel-card overflow-hidden";

      // Day Header with Weather
      const headerHtml = `
        <div class="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              H${dayPlan.day}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-lg font-extrabold text-slate-900">Hari ke-${dayPlan.day}: ${dayPlan.zone}</h3>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  ${dayPlan.spots.length} Destinasi
                </span>
              </div>
              <p class="text-xs text-slate-500 font-medium">${formatIndoDate(dayPlan.date)}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold">
            <span class="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-100 flex items-center gap-1.5">
              <span>${weather.icon} ${weather.condition} (~${weather.temp_max}°C)</span>
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              🚗 ~${dayPlan.totalDistanceKm} km
            </span>
          </div>
        </div>
      `;

      // Spots List
      let spotsHtml = `<div class="p-4 sm:p-5 space-y-4">`;

      dayPlan.spots.forEach((spot, idx) => {
        const timeSlotStr = getTimeSlot(idx, dayPlan.spots.length, spot.ideal_time || spot.idealTime);
        const prevSpot = idx > 0 ? dayPlan.spots[idx - 1] : null;
        let transitHtml = "";

        if (prevSpot) {
          const d = Math.round(getDistanceKm(prevSpot.lat, prevSpot.lng, spot.lat, spot.lng) * 10) / 10;
          const mins = Math.max(10, Math.round((d / 32) * 60));
          transitHtml = `
            <div class="transit-route-connector">
              <i data-lucide="car" class="w-4 h-4 text-sky-600 shrink-0"></i>
              <span>Rute perjalanan: <strong class="text-slate-900 font-bold">~${d} km</strong> (${mins} menit berkendara)</span>
            </div>
          `;
        }

        const categoryBadges = (spot.categories || ["wisata"]).map(c => {
          return `<span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 uppercase">${c}</span>`;
        }).join(" ");

        const photoUrl = spot.image || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80";

        spotsHtml += `
          ${transitHtml}
          <div class="travel-spot-card" id="spotCard_${spot.id}" data-lat="${spot.lat}" data-lng="${spot.lng}">
            <div class="flex flex-col sm:flex-row">
              <div class="w-full sm:w-52 h-44 sm:h-auto shrink-0 spot-img-container">
                <img src="${photoUrl}" alt="${spot.name}" loading="lazy" />
                <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <span>Stop ${String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-xs">
                  ⏱️ ~${spot.duration_hours || spot.durationHours || 2} Jam
                </div>
              </div>

              <div class="p-4 sm:p-5 flex-1 min-w-0 space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 flex items-center gap-1">
                      <i data-lucide="clock" class="w-3 h-3"></i>
                      <span>${timeSlotStr}</span>
                    </span>
                    <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <i data-lucide="star" class="w-3 h-3 fill-amber-500 text-amber-500"></i>
                      <span>${spot.rating || 4.8}</span>
                      <span class="text-slate-400 font-normal">(${spot.gmaps_reviews || "3.5k+ ulasan"})</span>
                    </span>
                  </div>
                  <span class="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ${spot.price === 0 ? "Gratis Tiket Masuk" : formatRupiah(spot.price) + " / org"}
                  </span>
                </div>

                <div>
                  <h4 class="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight hover:text-sky-600 transition cursor-pointer spot-title-link" data-lat="${spot.lat}" data-lng="${spot.lng}">
                    ${spot.name}
                  </h4>
                  <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                    ${spot.desc}
                  </p>
                </div>

                <!-- Google Maps Visitor Review Highlight -->
                ${spot.gmaps_review_highlight ? `
                  <div class="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200/70 text-xs text-sky-950 flex items-start gap-2">
                    <i data-lucide="message-square" class="w-4 h-4 text-sky-600 shrink-0 mt-0.5"></i>
                    <div>
                      <strong class="font-bold text-sky-900">Ulasan Pengunjung di Google Maps:</strong> ${spot.gmaps_review_highlight}
                    </div>
                  </div>
                ` : ''}

                <!-- Tips Lapangan -->
                <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                  <i data-lucide="lightbulb" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
                  <div>
                    <strong class="font-bold text-amber-900">Tips Wisatawan:</strong> ${spot.tips}
                  </div>
                </div>

                <!-- Action Footer with GMaps Review & Photos Link -->
                <div class="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    ${categoryBadges}
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="btn-pan-spot text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 py-1 px-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 transition" data-lat="${spot.lat}" data-lng="${spot.lng}">
                      <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                      <span>Peta Rute</span>
                    </button>
                    <a href="${spot.gmaps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + state.regionName)}`}" target="_blank" rel="noopener" class="text-xs font-bold text-slate-700 hover:text-sky-700 flex items-center gap-1 py-1 px-2.5 rounded-lg border border-slate-200 hover:border-sky-300 bg-white hover:bg-slate-50 transition shadow-2xs" title="Buka foto 360°, ulasan & foto Google Maps">
                      <i data-lucide="external-link" class="w-3.5 h-3.5 text-sky-600"></i>
                      <span>Foto & Review GMaps</span>
                    </a>
                    <button class="btn-remove-spot text-xs p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition" data-day="${dayPlan.day}" data-spot-id="${spot.id}" title="Hapus dari jadwal">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        `;
      });

      spotsHtml += `</div>`;
      card.innerHTML = headerHtml + spotsHtml;
      elItineraryContainer.appendChild(card);
    });

    // Attach Pan to Spot on Map
    document.querySelectorAll(".btn-pan-spot, .spot-title-link").forEach(el => {
      el.addEventListener("click", () => {
        const lat = parseFloat(el.dataset.lat);
        const lng = parseFloat(el.dataset.lng);
        if (state.map && !isNaN(lat) && !isNaN(lng)) {
          if (window.innerWidth < 1024 && elBtnViewMap) {
            elBtnViewMap.click();
          }
          state.map.flyTo([lat, lng], 13, { duration: 1.2 });
        }
      });
    });

    // Attach Remove Spot Listeners
    document.querySelectorAll(".btn-remove-spot").forEach(btn => {
      btn.addEventListener("click", () => {
        const dayNum = parseInt(btn.dataset.day);
        const spotId = btn.dataset.spotId;
        removeSpotFromDay(dayNum, spotId);
      });
    });

    lucide.createIcons();
  }

  function removeSpotFromDay(dayNum, spotId) {
    const dayObj = state.itinerary.find(d => d.day === dayNum);
    if (!dayObj) return;
    dayObj.spots = dayObj.spots.filter(s => s.id !== spotId);

    let dist = 0;
    for (let i = 0; i < dayObj.spots.length - 1; i++) {
      dist += getDistanceKm(dayObj.spots[i].lat, dayObj.spots[i].lng, dayObj.spots[i + 1].lat, dayObj.spots[i + 1].lng);
    }
    dayObj.totalDistanceKm = Math.round(dist * 10) / 10;
    renderAll();
  }

  // Initialize Map
  function initMap() {
    const initialCenter = [-8.4095, 115.1889];
    state.map = L.map("map", {
      zoomControl: true,
      attributionControl: false
    }).setView(initialCenter, 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.map);
  }

  // Render Map Markers & Polylines
  function renderMap() {
    if (!state.map) return;

    state.mapMarkers.forEach(m => state.map.removeLayer(m));
    state.mapPolylines.forEach(p => state.map.removeLayer(p));
    state.mapMarkers = [];
    state.mapPolylines = [];

    const bounds = L.latLngBounds([]);
    const legendEl = document.getElementById("mapLegend");
    if (legendEl) legendEl.innerHTML = "";

    const daysToMap = state.selectedDayFilter === "all"
      ? state.itinerary
      : state.itinerary.filter(d => d.day === state.selectedDayFilter);

    daysToMap.forEach(dayPlan => {
      const dayColor = DAY_COLORS[(dayPlan.day - 1) % DAY_COLORS.length];

      if (legendEl) {
        const legItem = document.createElement("div");
        legItem.className = "flex items-center gap-1.5 text-xs text-slate-700 font-semibold";
        legItem.innerHTML = `
          <span class="w-3 h-3 rounded-full inline-block" style="background:${dayColor.hex}"></span>
          <span>Hari ${dayPlan.day} (${dayPlan.spots.length} titik)</span>
        `;
        legendEl.appendChild(legItem);
      }

      const latlngs = [];

      dayPlan.spots.forEach((spot, idx) => {
        const pos = [spot.lat, spot.lng];
        bounds.extend(pos);
        latlngs.push(pos);

        const pinIcon = L.divIcon({
          className: "custom-travel-pin",
          html: `<div class="travel-map-pin" style="background:${dayColor.hex}">${idx + 1}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(pos, { icon: pinIcon }).addTo(state.map);
        marker.bindPopup(`
          <div style="font-family:'Plus Jakarta Sans',sans-serif; max-width:240px; padding:4px;">
            <div style="font-size:11px; font-weight:700; color:${dayColor.hex}; margin-bottom:2px;">
              HARI ${dayPlan.day} • TITIK ${idx + 1}
            </div>
            <div style="font-weight:800; font-size:14px; color:#0f172a; margin-bottom:4px;">
              ${spot.name}
            </div>
            <div style="font-size:12px; color:#475569; margin-bottom:6px; line-height:1.4;">
              ${spot.desc}
            </div>
            <div style="font-size:12px; font-weight:700; color:#0f766e; margin-bottom:4px;">
              ${spot.price === 0 ? "Gratis" : formatRupiah(spot.price)} • Rating ${spot.rating || 4.8}★
            </div>
            <a href="${spot.gmaps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + state.regionName)}`}" target="_blank" rel="noopener" style="font-size:11px; font-weight:700; color:#0284c7; text-decoration:none; display:inline-block; margin-top:2px;">
              📍 Buka Review & Foto di Google Maps &rarr;
            </a>
          </div>
        `);
        state.mapMarkers.push(marker);
      });

      if (latlngs.length > 1) {
        const polyline = L.polyline(latlngs, {
          color: dayColor.hex,
          weight: 4,
          opacity: 0.85,
          dashArray: "6, 8"
        }).addTo(state.map);
        state.mapPolylines.push(polyline);
      }
    });

    if (bounds.isValid()) {
      state.map.fitBounds(bounds, { padding: [40, 40] });
    }
  }

  // Render Budget Breakdown & KPIs
  function renderBudgetAndStats() {
    const days = state.totalDays;
    const nights = Math.max(1, days - 1);
    const tierRates = {
      budget: { stay: 250000, transport: 150000, food: 120000, misc: 50000 },
      comfort: { stay: 650000, transport: 450000, food: 250000, misc: 100000 },
      luxury: { stay: 2200000, transport: 950000, food: 650000, misc: 250000 }
    };
    const costs = tierRates[state.budgetTier] || tierRates.comfort;

    let totalTicketCost = 0;
    let totalSpotsCount = 0;
    let totalDistanceKm = 0;

    state.itinerary.forEach(d => {
      totalDistanceKm += d.totalDistanceKm;
      d.spots.forEach(s => {
        totalTicketCost += (s.price || 0);
        totalSpotsCount++;
      });
    });

    const stayCost = nights * costs.stay;
    const transportCost = days * costs.transport;
    const foodCost = days * costs.food;
    const miscCost = days * costs.misc;
    const totalTripCost = stayCost + transportCost + foodCost + miscCost + totalTicketCost;

    if (elStatTotalSpots) elStatTotalSpots.textContent = `${totalSpotsCount} Destinasi`;
    if (elStatTotalDistance) elStatTotalDistance.textContent = `${Math.round(totalDistanceKm * 10) / 10} km`;
    if (elStatTotalCost) elStatTotalCost.textContent = formatRupiah(totalTripCost);
    if (elBudgetTotalBottom) elBudgetTotalBottom.textContent = formatRupiah(totalTripCost);

    if (elMobSummaryDays) elMobSummaryDays.textContent = `${days} Hari • ${totalSpotsCount} Destinasi (${Math.round(totalDistanceKm)} km)`;
    if (elMobSummaryCost) elMobSummaryCost.textContent = formatRupiah(totalTripCost);

    const tierLabels = {
      budget: "Tier: Hemat (Hostel & Motor)",
      comfort: "Tier: Nyaman (Hotel 3-4★ & Mobil)",
      luxury: "Tier: Sultan (Resort 5★ & VIP)"
    };
    if (elBudgetTierBadge) elBudgetTierBadge.textContent = tierLabels[state.budgetTier] || "Tier: Nyaman";

    if (elBudgetBreakdownList) {
      elBudgetBreakdownList.innerHTML = `
        <div class="flex items-center justify-between py-2 border-b border-slate-100">
          <span class="text-slate-600">Penginapan & Hotel (${nights} malam)</span>
          <span class="font-bold text-slate-900">${formatRupiah(stayCost)}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-slate-100">
          <span class="text-slate-600">Tiket Masuk & Retribusi Wisata</span>
          <span class="font-bold text-sky-700">${formatRupiah(totalTicketCost)}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-slate-100">
          <span class="text-slate-600">Sewa Transportasi & BBM (${days} hari)</span>
          <span class="font-bold text-slate-900">${formatRupiah(transportCost)}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-slate-100">
          <span class="text-slate-600">Konsumsi & Kuliner Lokal (${days} hari)</span>
          <span class="font-bold text-slate-900">${formatRupiah(foodCost)}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-slate-100">
          <span class="text-slate-600">Cadangan Parkir & Logistik</span>
          <span class="font-bold text-slate-900">${formatRupiah(miscCost)}</span>
        </div>
      `;
    }
  }

  function renderAll() {
    renderDayTabs();
    renderItineraryCards();
    renderMap();
    renderBudgetAndStats();
  }

  // Copy Itinerary Text (Clean WhatsApp format)
  function copyWhatsAppItinerary() {
    let txt = `*JADWAL LIBURAN: ${state.regionName.toUpperCase()}*\n`;
    txt += `📅 Durasi: ${state.totalDays} Hari (${formatIndoDate(state.startDate)} s/d ${formatIndoDate(state.endDate)})\n`;
    txt += `👥 Tipe: ${state.travelerType.toUpperCase()} | Ritme: ${state.pace}\n`;
    txt += `------------------------------------\n\n`;

    state.itinerary.forEach(d => {
      txt += `*HARI ${d.day} — ${d.zone}* (${formatIndoDate(d.date)})\n`;
      d.spots.forEach((s, idx) => {
        txt += ` ${idx + 1}. ${s.name} [${s.price === 0 ? 'Gratis' : formatRupiah(s.price)}]\n`;
      });
      txt += ` 🚗 Est. Rute: ~${d.totalDistanceKm} km\n\n`;
    });

    txt += `💰 *Total Estimasi Biaya:* ${elStatTotalCost ? elStatTotalCost.textContent : ''} / orang\n`;
    txt += `🌐 Disusun otomatis dengan GasTrip AI (Platform Liburan Bebas & Cerdas)\n`;

    navigator.clipboard.writeText(txt).then(() => {
      alert("✅ Jadwal liburan lengkap berhasil disalin! Siap dikirim ke WhatsApp teman atau keluarga.");
    }).catch(() => {
      prompt("Salin teks rencana perjalanan berikut:", txt);
    });
  }

  // Event Listeners Setup
  function initEventListeners() {
    // Generate AI Buttons
    if (elBtnGenerateAI) elBtnGenerateAI.addEventListener("click", () => triggerAIGeneration());
    if (elBtnSubmitCustomWish) {
      elBtnSubmitCustomWish.addEventListener("click", () => {
        const wish = elInputAiPrompt ? elInputAiPrompt.value.trim() : "";
        triggerAIGeneration(wish);
      });
    }

    // Custom Region Input Enter Key
    if (elInputCustomRegion) {
      elInputCustomRegion.addEventListener("keydown", (e) => {
        if (e.key === "Enter") triggerAIGeneration();
      });
    }

    if (elInputAiPrompt) {
      elInputAiPrompt.addEventListener("keydown", (e) => {
        if (e.key === "Enter") triggerAIGeneration(elInputAiPrompt.value.trim());
      });
    }

    // Dates Change
    if (elStartDate) {
      elStartDate.addEventListener("change", (e) => {
        state.startDate = e.target.value;
        state.endDate = addDays(state.startDate, state.totalDays - 1);
        if (elEndDate) elEndDate.value = state.endDate;
        updateDurationBadge();
        triggerAIGeneration();
      });
    }

    if (elEndDate) {
      elEndDate.addEventListener("change", (e) => {
        state.endDate = e.target.value;
        updateDurationBadge();
        triggerAIGeneration();
      });
    }

    // Quick Days Buttons
    document.querySelectorAll(".day-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        const days = parseInt(btn.dataset.days);
        if (!days) return;
        state.totalDays = days;
        state.endDate = addDays(state.startDate, days - 1);
        if (elEndDate) elEndDate.value = state.endDate;
        updateDurationBadge();
        triggerAIGeneration();
      });
    });

    // Traveler Type & Budget Tier & Pace
    if (elSelectTravelerType) {
      elSelectTravelerType.addEventListener("change", (e) => {
        state.travelerType = e.target.value;
        triggerAIGeneration();
      });
    }

    if (elSelectBudgetTier) {
      elSelectBudgetTier.addEventListener("change", (e) => {
        state.budgetTier = e.target.value;
        renderBudgetAndStats();
      });
    }

    if (elSelectPace) {
      elSelectPace.addEventListener("change", (e) => {
        state.pace = e.target.value;
        triggerAIGeneration();
      });
    }

    // Category Filter Chips
    elInterestChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const cat = chip.dataset.interest;
        if (state.interests.has(cat)) {
          if (state.interests.size > 1) {
            state.interests.delete(cat);
            chip.classList.remove("active");
          }
        } else {
          state.interests.add(cat);
          chip.classList.add("active");
        }
        triggerAIGeneration();
      });
    });

    // Reset Map Zoom
    if (elBtnResetMapBounds) {
      elBtnResetMapBounds.addEventListener("click", () => renderMap());
    }

    // WhatsApp Copy
    if (elBtnCopyWa) elBtnCopyWa.addEventListener("click", copyWhatsAppItinerary);
    if (elBtnMobileCopy) elBtnMobileCopy.addEventListener("click", copyWhatsAppItinerary);

    // Mobile View Toggle
    if (elBtnViewTimeline && elBtnViewMap) {
      elBtnViewTimeline.addEventListener("click", () => {
        elBtnViewTimeline.classList.add("active");
        elBtnViewMap.classList.remove("active");
        if (elColTimeline) elColTimeline.classList.remove("hidden");
        if (elColMap) elColMap.classList.add("hidden");
        state.currentMobileTab = "timeline";
      });

      elBtnViewMap.addEventListener("click", () => {
        elBtnViewMap.classList.add("active");
        elBtnViewTimeline.classList.remove("active");
        if (elColTimeline) elColTimeline.classList.add("hidden");
        if (elColMap) elColMap.classList.remove("hidden");
        state.currentMobileTab = "map";
        if (state.map) setTimeout(() => state.map.invalidateSize(), 150);
      });
    }

    // Responsive setup check
    function checkResponsiveView() {
      if (window.innerWidth < 1024) {
        if (state.currentMobileTab === "timeline") {
          if (elColTimeline) elColTimeline.classList.remove("hidden");
          if (elColMap) elColMap.classList.add("hidden");
        } else {
          if (elColTimeline) elColTimeline.classList.add("hidden");
          if (elColMap) elColMap.classList.remove("hidden");
        }
      } else {
        if (elColTimeline) elColTimeline.classList.remove("hidden");
        if (elColMap) elColMap.classList.remove("hidden");
      }
    }
    window.addEventListener("resize", checkResponsiveView);
    checkResponsiveView();
  }

  // ==========================================================================
  // NusaBot — Enterprise Guarded AI Travel Assistant Widget
  // Positioned at Bottom-Right with WAF, Rate Limiting & Prompt Defense
  // ==========================================================================
  const chatState = {
    isOpen: false,
    sessionId: null,
    sessionToken: null,
    csrfToken: null,
    isLoading: false,
    quotaRemaining: 20,
    cooldownUntil: 0
  };

  const elChatContainer = document.getElementById("chatbotContainer");
  const elChatWindow = document.getElementById("chatbotWindow");
  const elBtnChatToggle = document.getElementById("btnChatToggle");
  const elBtnCloseChat = document.getElementById("btnCloseChat");
  const elBtnMinimizeChat = document.getElementById("btnMinimizeChat");
  const elBtnClearChat = document.getElementById("btnClearChat");
  const elChatMessages = document.getElementById("chatMessages");
  const elChatTypingIndicator = document.getElementById("chatTypingIndicator");
  const elChatSecurityNotice = document.getElementById("chatSecurityNotice");
  const elChatSecurityNoticeText = document.getElementById("chatSecurityNoticeText");
  const elChatForm = document.getElementById("chatForm");
  const elChatInput = document.getElementById("chatInput");
  const elBtnSendChat = document.getElementById("btnSendChat");
  const elChatCharCounter = document.getElementById("chatCharCounter");
  const elChatQuotaBadge = document.getElementById("chatQuotaBadge");
  const elBtnOpenAiModal = document.getElementById("btnOpenAiModal");

  // Initial welcome message HTML template for reset
  const INITIAL_WELCOME_HTML = `
    <div class="flex items-start gap-2.5">
      <div class="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <i data-lucide="bot" class="w-4 h-4"></i>
      </div>
      <div class="space-y-2 max-w-[85%]">
        <div class="p-3 bg-white rounded-2xl rounded-tl-sm border border-slate-200 shadow-2xs leading-relaxed text-slate-700">
          <p class="font-bold text-slate-900 mb-1">Halo! Saya NusaBot 👋</p>
          <p>Asisten perjalanan cerdas GasTrip. Saya siap membantu menyusun rencana liburan searah, estimasi biaya, rekomendasi kuliner, dan tips cuaca BMKG di seluruh Indonesia.</p>
          <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-slate-400 font-medium">
            <i data-lucide="check-check" class="w-3 h-3 text-emerald-500"></i>
            <span>Telah diverifikasi aman oleh Security Shield</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-1" id="chatQuickChips">
          <button type="button" class="chat-chip px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 text-[11px] font-medium transition shadow-2xs">
            🏖️ Wisata 3 Hari di Bali
          </button>
          <button type="button" class="chat-chip px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 text-[11px] font-medium transition shadow-2xs">
            🌊 Speedboat Labuan Bajo
          </button>
          <button type="button" class="chat-chip px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 text-[11px] font-medium transition shadow-2xs">
            🍜 Kuliner Legendaris Jogja
          </button>
          <button type="button" class="chat-chip px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 text-[11px] font-medium transition shadow-2xs">
            🌦️ Cuaca &amp; Gelombang BMKG
          </button>
        </div>
      </div>
    </div>
  `;

  // Safe HTML Escaper to Prevent Cross-Site Scripting (XSS)
  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Safe Markdown Parser (Converts bold, lists, paragraphs safely without innerHTML XSS risk)
  function renderSafeMarkdown(rawText) {
    if (!rawText) return "";
    
    // First escape all raw HTML
    let safe = escapeHtml(rawText);

    // Replace bold **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>');
    
    // Replace italic *text*
    safe = safe.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    // Parse bullet points
    const lines = safe.split("\n");
    let inList = false;
    let outputLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
        if (!inList) {
          outputLines.push('<ul class="my-1.5 pl-4 list-disc space-y-1">');
          inList = true;
        }
        const itemContent = trimmed.substring(2);
        outputLines.push(`<li>${itemContent}</li>`);
      } else {
        if (inList) {
          outputLines.push('</ul>');
          inList = false;
        }
        if (trimmed) {
          outputLines.push(`<p class="mb-1.5 leading-relaxed">${line}</p>`);
        } else {
          outputLines.push('<div class="h-1"></div>');
        }
      }
    }
    if (inList) {
      outputLines.push('</ul>');
    }

    return outputLines.join("");
  }

  // Fetch Cryptographic Session Token & CSRF from Backend
  async function fetchChatSession() {
    try {
      const res = await fetch(`${API_BASE}/auth/session`);
      if (res.ok) {
        const json = await res.json();
        if (json.status === "success" && json.data) {
          chatState.sessionId = json.data.session_id;
          chatState.sessionToken = json.data.token;
          chatState.csrfToken = json.data.csrf_token;
        }
      }
    } catch (err) {
      console.warn("Session handshake note:", err);
    }
  }

  // Toggle Chatbot Window Visibility
  function toggleChatbot(forceState) {
    chatState.isOpen = typeof forceState === "boolean" ? forceState : !chatState.isOpen;
    if (elChatWindow) {
      if (chatState.isOpen) {
        elChatWindow.classList.remove("hidden");
        elChatWindow.classList.add("flex");
        if (elBtnChatToggle) elBtnChatToggle.setAttribute("aria-expanded", "true");
        if (elChatInput) elChatInput.focus();
        scrollChatToBottom();
      } else {
        elChatWindow.classList.add("hidden");
        elChatWindow.classList.remove("flex");
        if (elBtnChatToggle) elBtnChatToggle.setAttribute("aria-expanded", "false");
      }
    }
  }

  function scrollChatToBottom() {
    if (elChatMessages) {
      elChatMessages.scrollTo({
        top: elChatMessages.scrollHeight,
        behavior: "smooth"
      });
    }
  }

  // Append User Message Bubble
  function appendUserMessage(text) {
    if (!elChatMessages) return;
    const timeStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const bubble = document.createElement("div");
    bubble.className = "flex flex-col items-end space-y-1";
    bubble.innerHTML = `
      <div class="chat-bubble-user text-xs">
        ${escapeHtml(text)}
      </div>
      <span class="text-[9px] text-slate-400 px-1">${timeStr}</span>
    `;
    elChatMessages.appendChild(bubble);
    scrollChatToBottom();
  }

  // Append Bot Message Bubble
  function appendBotMessage(replyHtml, options = {}) {
    if (!elChatMessages) return;
    const timeStr = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const isSecurityEvent = options.securityEvent || false;
    const wasRedacted = options.wasRedacted || false;
    const badgeText = options.badgeText || "🛡️ WAF & Guardrail Verified";

    const bubble = document.createElement("div");
    bubble.className = "flex items-start gap-2.5";
    
    let badgeClass = isSecurityEvent ? "chat-warning-badge" : "chat-security-badge";
    let iconName = isSecurityEvent ? "alert-shield" : "bot";
    let avatarBg = isSecurityEvent ? "bg-amber-600" : "bg-sky-600";

    let redactedNoticeHtml = wasRedacted ? `
      <div class="mt-2 px-2 py-1 bg-sky-50 border border-sky-100 rounded text-[10px] text-sky-800 flex items-center gap-1 font-medium">
        <i data-lucide="lock" class="w-3 h-3 text-sky-600 shrink-0"></i>
        <span>Data pribadi (NIK / No. Telp) otomatis disensor demi keamanan privasi Anda.</span>
      </div>
    ` : "";

    bubble.innerHTML = `
      <div class="w-7 h-7 rounded-lg ${avatarBg} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <i data-lucide="${iconName}" class="w-4 h-4"></i>
      </div>
      <div class="space-y-1.5 max-w-[85%]">
        <div class="chat-bubble-bot text-xs">
          ${replyHtml}
          ${redactedNoticeHtml}
        </div>
        <div class="flex items-center justify-between px-1">
          <span class="${badgeClass}">${escapeHtml(badgeText)}</span>
          <span class="text-[9px] text-slate-400">${timeStr}</span>
        </div>
      </div>
    `;

    elChatMessages.appendChild(bubble);
    if (window.lucide) lucide.createIcons();
    scrollChatToBottom();
  }

  // Client-Side Input Sanitization & Threat Check
  function inspectClientInput(raw) {
    const text = raw.trim();
    if (!text) {
      return { valid: false, error: "Pesan tidak boleh kosong." };
    }
    if (text.length > 500) {
      return { valid: false, error: "Pesan terlalu panjang (maksimum 500 karakter)." };
    }
    // Check for raw script tag
    if (/<\s*script[^>]*>/i.test(text)) {
      return { valid: false, error: "Karakter tag script terdeteksi dan diblokir oleh pelindung XSS." };
    }
    return { valid: true, clean: text };
  }

  // Send Message Handler
  async function handleSendMessage(messageText) {
    const check = inspectClientInput(messageText);
    if (!check.valid) {
      if (elChatSecurityNotice && elChatSecurityNoticeText) {
        elChatSecurityNoticeText.textContent = check.error;
        elChatSecurityNotice.classList.remove("hidden");
        setTimeout(() => elChatSecurityNotice.classList.add("hidden"), 4000);
      }
      return;
    }

    const cleanMessage = check.clean;

    // Check Client-Side Cooldown / Rate Limiting (Burst Protection)
    const now = Date.now();
    if (now < chatState.cooldownUntil) {
      const waitSec = Math.ceil((chatState.cooldownUntil - now) / 1000);
      if (elChatSecurityNotice && elChatSecurityNoticeText) {
        elChatSecurityNoticeText.textContent = `Mohon tunggu ${waitSec} detik (Rate Limiter Aktif).`;
        elChatSecurityNotice.classList.remove("hidden");
      }
      return;
    }

    // Set 1.5s client cooldown
    chatState.cooldownUntil = now + 1500;

    // Clear input
    if (elChatInput) elChatInput.value = "";
    if (elChatCharCounter) elChatCharCounter.textContent = "0/500";
    if (elChatSecurityNotice) elChatSecurityNotice.classList.add("hidden");

    // Display user message
    appendUserMessage(cleanMessage);

    // Show typing indicator & disable button
    if (elChatTypingIndicator) elChatTypingIndicator.classList.remove("hidden");
    if (elBtnSendChat) elBtnSendChat.disabled = true;
    chatState.isLoading = true;

    try {
      const headers = {
        "Content-Type": "application/json"
      };
      if (chatState.csrfToken) {
        headers["X-CSRF-Token"] = chatState.csrfToken;
      }
      if (chatState.sessionToken) {
        headers["Authorization"] = `Bearer ${chatState.sessionToken}`;
      }

      const payload = {
        message: cleanMessage,
        session_id: chatState.sessionToken || null,
        region_context: state.regionName || "Indonesia"
      };

      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (res.status === 429) {
        const errJson = await res.json().catch(() => ({}));
        const retryAfter = res.headers.get("Retry-After") || "5";
        appendBotMessage(
          `<p class="text-rose-600 font-bold">⚠️ Terlalu Banyak Permintaan (Rate Limit Exceeded)</p><p>Sistem keamanan membatasi pengiriman pesan sementara waktu. Silakan tunggu ${retryAfter} detik.</p>`,
          { securityEvent: true, badgeText: "🛡️ Rate Limit Throttled" }
        );
        return;
      }

      const data = await res.json();

      if (data.status === "blocked") {
        appendBotMessage(
          renderSafeMarkdown(data.reply),
          { securityEvent: true, badgeText: data.security_badge || "🛡️ WAF Intercepted" }
        );
      } else if (data.status === "restricted") {
        appendBotMessage(
          renderSafeMarkdown(data.reply),
          { securityEvent: true, badgeText: data.security_badge || "🔒 Least Privilege Enforced" }
        );
      } else if (data.status === "success") {
        appendBotMessage(
          renderSafeMarkdown(data.reply),
          {
            securityEvent: false,
            wasRedacted: data.was_redacted,
            badgeText: data.security_badge || "🛡️ WAF & Guardrail Verified"
          }
        );
        if (typeof data.remaining_quota === "number" && elChatQuotaBadge) {
          elChatQuotaBadge.textContent = `${data.remaining_quota} kuota/mnt`;
        }
      } else {
        appendBotMessage(
          `<p>Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali sesaat lagi.</p>`,
          { securityEvent: true, badgeText: "Sistem Error" }
        );
      }
    } catch (err) {
      appendBotMessage(
        `<p class="text-rose-600 font-semibold">Gagal terhubung dengan server NusaBot.</p><p class="text-[11px] text-slate-500">Pastikan koneksi internet stabil dan server GasTrip aktif.</p>`,
        { securityEvent: true, badgeText: "Koneksi Terputus" }
      );
    } finally {
      if (elChatTypingIndicator) elChatTypingIndicator.classList.add("hidden");
      if (elBtnSendChat) elBtnSendChat.disabled = false;
      chatState.isLoading = false;
    }
  }

  // Initialize Chatbot Event Listeners & State
  function initChatbot() {
    fetchChatSession();

    // Toggle button bottom right
    if (elBtnChatToggle) {
      elBtnChatToggle.addEventListener("click", () => toggleChatbot());
    }

    // Top Header Navbar Button ("Tanya Asisten AI")
    if (elBtnOpenAiModal) {
      elBtnOpenAiModal.addEventListener("click", (e) => {
        e.preventDefault();
        toggleChatbot(true);
      });
    }

    // Close & Minimize buttons
    if (elBtnCloseChat) {
      elBtnCloseChat.addEventListener("click", () => toggleChatbot(false));
    }
    if (elBtnMinimizeChat) {
      elBtnMinimizeChat.addEventListener("click", () => toggleChatbot(false));
    }

    // Clear chat conversation
    if (elBtnClearChat) {
      elBtnClearChat.addEventListener("click", () => {
        if (elChatMessages) {
          elChatMessages.innerHTML = INITIAL_WELCOME_HTML;
          if (window.lucide) lucide.createIcons();
          attachChipListeners();
        }
      });
    }

    // Form submission
    if (elChatForm) {
      elChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (elChatInput) {
          const val = elChatInput.value;
          handleSendMessage(val);
        }
      });
    }

    // Character counter
    if (elChatInput && elChatCharCounter) {
      elChatInput.addEventListener("input", () => {
        const len = elChatInput.value.length;
        elChatCharCounter.textContent = `${len}/500`;
        if (len > 450) {
          elChatCharCounter.classList.add("text-rose-500");
        } else {
          elChatCharCounter.classList.remove("text-rose-500");
        }
      });
    }

    // Quick chips click handler
    function attachChipListeners() {
      const chips = document.querySelectorAll(".chat-chip");
      chips.forEach((btn) => {
        btn.addEventListener("click", () => {
          const text = btn.textContent.trim();
          handleSendMessage(text);
        });
      });
    }
    attachChipListeners();
  }

  // ==========================================================================
  // Foxico Interactive Hero Slider System
  // ==========================================================================
  const foxicoSlideData = [
    {
      country: "INDONESIA",
      desc: "As the largest archipelagic country in the world, Indonesia is blessed with so many different people, cultures, customs, traditions, artworks, food, animals, plants, landscapes, and everything that made it almost like 100 (or even 200) countries melted beautifully into one.",
      step: "1",
      counter: "01/04",
      faint: "Thailand",
      bg: "assets/foxico_volcano_bg.jpg",
      progressFill: "25%",
      curNum: "01",
      targetRegion: "Pulau Bali"
    },
    {
      country: "BALI & NUSA",
      desc: "Surga tropis dengan tebing karang dramatis Broken Beach di Nusa Penida, hamparan pantai pasir putih, sunset legendaris di Uluwatu, dan ketenangan spiritual pura air suci.",
      step: "2",
      counter: "02/04",
      faint: "INDONESIA",
      bg: "assets/foxico_broken_beach_bali.jpg",
      progressFill: "50%",
      curNum: "02",
      targetRegion: "Pulau Bali"
    },
    {
      country: "THAILAND & ASIA",
      desc: "Pesona kuil suci megah berkilau emas, keanggunan refleksi air Ayutthaya, serta keramahan budaya dan keajaiban arsitektur timur yang memikat dunia.",
      step: "3",
      counter: "03/04",
      faint: "KERALA",
      bg: "assets/foxico_temple_thailand.jpg",
      progressFill: "75%",
      curNum: "03",
      targetRegion: "DI Yogyakarta"
    },
    {
      country: "LABUAN BAJO",
      desc: "Habitat kadal purba terbesar di dunia dengan panorama spektakuler puncak Pulau Padar berteluk tricolor, pantai pasir pink lembut, dan titik diving manta ray kelas dunia.",
      step: "4",
      counter: "04/04",
      faint: "BROMO",
      bg: "assets/foxico_labuan_bajo.jpg",
      progressFill: "100%",
      curNum: "04",
      targetRegion: "Labuan Bajo & Komodo"
    },
    {
      country: "BROMO SEMERU",
      desc: "Lautan pasir vulkanik eksotis dengan pemandangan mentari terbit keemasan di Penanjakan, kawah aktif bergemuruh magis, dan bukit savana hijau Teletubbies.",
      step: "5",
      counter: "05/05",
      faint: "SUMBA",
      bg: "assets/foxico_bromo.jpg",
      progressFill: "100%",
      curNum: "05",
      targetRegion: "Bromo & Kota Malang"
    }
  ];

  let currentFoxicoIndex = 0;

  window.selectFoxicoCard = function(idx) {
    if (idx < 0 || idx >= foxicoSlideData.length) return;
    currentFoxicoIndex = idx;
    const slide = foxicoSlideData[idx];

    // Update Text & Meta
    const elTitle = document.getElementById("foxicoMainTitle");
    const elDesc = document.getElementById("foxicoMainDesc");
    const elStep = document.getElementById("foxicoStepNum");
    const elCounter = document.getElementById("foxicoSlideCounter");
    const elFaint = document.getElementById("foxicoFaintLabel");
    const elHero = document.getElementById("heroFoxico");
    const elProgCur = document.getElementById("foxicoProgressCurrent");
    const elProgFill = document.getElementById("foxicoProgressFill");

    if (elTitle) elTitle.textContent = slide.country;
    if (elDesc) elDesc.textContent = slide.desc;
    if (elStep) elStep.textContent = slide.step;
    if (elCounter) elCounter.textContent = slide.counter;
    if (elFaint) elFaint.textContent = slide.faint;
    if (elProgCur) elProgCur.textContent = slide.curNum;
    if (elProgFill) elProgFill.style.width = slide.progressFill;
    if (elHero) {
      elHero.style.backgroundImage = `url('${slide.bg}')`;
    }

    // Update active card class
    const cardItems = document.querySelectorAll(".foxico-card-item");
    cardItems.forEach((c, cIdx) => {
      if (cIdx === idx) {
        c.classList.add("active-card");
        c.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } else {
        c.classList.remove("active-card");
      }
    });

    // Sync with planner destination input if target exists
    if (slide.targetRegion && elInputCustomRegion) {
      elInputCustomRegion.value = slide.targetRegion;
      state.regionName = slide.targetRegion;
      if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${slide.targetRegion}`;
    }
  };

  window.foxicoNextSlide = function() {
    const nextIdx = (currentFoxicoIndex + 1) % foxicoSlideData.length;
    window.selectFoxicoCard(nextIdx);
  };

  window.foxicoPrevSlide = function() {
    const prevIdx = (currentFoxicoIndex - 1 + foxicoSlideData.length) % foxicoSlideData.length;
    window.selectFoxicoCard(prevIdx);
  };

  // Bootstrap Application
  initDates();
  initIslandGallery();
  initMap();
  initEventListeners();
  initChatbot();
  fetchLiveNews();
  renderAll();
  lucide.createIcons();
});

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
      card.className = `island-showcase-card ${isSelected ? 'active' : ''}`;
      card.innerHTML = `
        <img src="${reg.cover}" alt="${reg.name}" loading="lazy" />
        <div class="scrim-overlay"></div>
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-sm">${reg.badge}</span>
        </div>
        ${isSelected ? '<div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs shadow-md"><i data-lucide="check" class="w-4 h-4"></i></div>' : ''}
        <div class="absolute bottom-3.5 inset-x-3.5 text-white space-y-1">
          <div class="text-[11px] text-amber-300 font-bold flex items-center gap-1">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
            <span>${reg.rating}</span>
          </div>
          <div class="text-base font-extrabold text-white leading-tight">${reg.name}</div>
          <div class="text-xs text-sky-100 line-clamp-1">${reg.tagline}</div>
          <div class="text-xs text-white/90 font-bold pt-0.5">${reg.priceStart}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (elInputCustomRegion) elInputCustomRegion.value = reg.name;
        state.regionName = reg.name;
        state.regionId = reg.id;
        triggerAIGeneration();
      });

      elIslandGallery.appendChild(card);
    });

    lucide.createIcons();
  }

  // Trigger Dynamic AI Generation via Gemini Backend
  async function triggerAIGeneration(customWish = null) {
    const regionQuery = elInputCustomRegion ? elInputCustomRegion.value.trim() : state.regionName;
    if (!regionQuery) return;

    state.regionName = regionQuery;
    if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${regionQuery}`;

    // Show Loading Modal
    if (elModalAiLoading) {
      if (elAiLoadingTitle) elAiLoadingTitle.textContent = `Asisten AI Merancang Rute ${regionQuery}...`;
      elModalAiLoading.classList.remove("hidden");
    }

    const payload = {
      region: regionQuery,
      days: state.totalDays,
      traveler_type: state.travelerType,
      pace: state.pace,
      budget_tier: state.budgetTier,
      interests: Array.from(state.interests),
      custom_prompt: customWish || (elInputAiPrompt ? elInputAiPrompt.value.trim() : "")
    };

    try {
      const res = await fetch(`${API_BASE}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.status === "success" && json.data) {
        applyAIGeneratedItinerary(json.data);
      } else {
        throw new Error(json.detail || "Gagal mendapatkan respon AI");
      }
    } catch (err) {
      console.warn("AI generation fallback to local heuristic:", err);
      // Fallback to local heuristic engine if offline/network timeout
      generateLocalHeuristic();
    } finally {
      if (elModalAiLoading) elModalAiLoading.classList.add("hidden");
      // Smooth scroll to itinerary
      const itSec = document.getElementById("sectionItinerary");
      if (itSec) itSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Apply Structured AI Output to Application State
  function applyAIGeneratedItinerary(aiData) {
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
    aiData.days.forEach((d, idx) => {
      const dayDate = addDays(state.startDate, idx);
      let totalDist = 0;
      for (let i = 0; i < d.spots.length - 1; i++) {
        totalDist += getDistanceKm(d.spots[i].lat, d.spots[i].lng, d.spots[i + 1].lat, d.spots[i + 1].lng);
      }
      newItinerary.push({
        day: d.day || (idx + 1),
        date: dayDate,
        zone: d.zone || `Zona Hari ${idx + 1}`,
        spots: d.spots || [],
        totalDistanceKm: Math.round(totalDist * 10) / 10
      });
    });

    state.itinerary = newItinerary;
    state.selectedDayFilter = "all";
    renderAll();
  }

  // Fallback Local Heuristic Generator (if offline)
  function generateLocalHeuristic() {
    const regKey = Object.keys(REGIONS_DATA).find(k => 
      REGIONS_DATA[k].name.toLowerCase().includes(state.regionName.toLowerCase()) ||
      k === state.regionId
    ) || "bali";

    const reg = REGIONS_DATA[regKey];
    if (!reg) return;

    if (elIslandHeaderDesc) elIslandHeaderDesc.textContent = reg.quickDesc;
    if (elStatBestSeason) elStatBestSeason.textContent = reg.bestSeason;
    fetchRealtimeWeather(reg.center[0], reg.center[1]);

    if (elRegionTipsList) {
      elRegionTipsList.innerHTML = "";
      reg.tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        elRegionTipsList.appendChild(li);
      });
    }

    const spotsPool = JSON.parse(JSON.stringify(reg.spots));
    let targetPerDay = state.pace === "relaxed" ? 3 : (state.pace === "packed" ? 5 : 4);
    const newItinerary = [];
    let spotIdx = 0;

    for (let day = 1; day <= state.totalDays; day++) {
      const daySpots = [];
      for (let i = 0; i < targetPerDay; i++) {
        daySpots.push(spotsPool[spotIdx % spotsPool.length]);
        spotIdx++;
      }
      let dist = 0;
      for (let i = 0; i < daySpots.length - 1; i++) {
        dist += getDistanceKm(daySpots[i].lat, daySpots[i].lng, daySpots[i + 1].lat, daySpots[i + 1].lng);
      }
      newItinerary.push({
        day: day,
        date: addDays(state.startDate, day - 1),
        zone: daySpots[0].zone || `Zona Wisata ${day}`,
        spots: daySpots,
        totalDistanceKm: Math.round(dist * 10) / 10
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
        <div class="p-8 text-center travel-card">
          <p class="text-slate-500 text-sm">Tidak ada jadwal untuk hari yang dipilih.</p>
        </div>
      `;
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

  // Bootstrap Application
  initDates();
  initIslandGallery();
  initMap();
  initEventListeners();
  fetchLiveNews();
  triggerAIGeneration();
  lucide.createIcons();
});

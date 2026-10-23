// ==========================================================================
// NusaTrip — Real Travel Platform Experience (Airbnb / Wanderlog / Traveloka)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // App State
  const state = {
    regionId: "bali",
    startDate: "",
    endDate: "",
    totalDays: 3,
    travelerType: "family", // couple, family, friends, solo
    pace: "balanced", // relaxed, balanced, packed
    budgetTier: "comfort", // budget, comfort, luxury
    interests: new Set(["pantai", "alam", "budaya", "kuliner"]),
    itinerary: [], // Array of days: [{ day: 1, date: "...", zone: "...", spots: [...], totalDistanceKm: 0 }]
    selectedDayFilter: "all",
    map: null,
    mapMarkers: [],
    mapPolylines: [],
    currentMobileTab: "timeline"
  };

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
      tagline: "Piaynemo, Gugusan Karst & Terumbu Dunia",
      rating: "5.0 (980 ulasan)",
      priceStart: "Mulai Rp 1.8jt/hari",
      badge: "👑 Surga Dunia"
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
  const elSelectRegion = document.getElementById("selectRegion");
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
  const elBtnGenerate = document.getElementById("btnGenerate");

  // Overview Stats
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

  // Initialize Dates (Default 3 days from tomorrow)
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

  // Initialize Island Showcase Cards (Klook / Traveloka Style)
  function initIslandGallery() {
    if (!elIslandGallery) return;
    elIslandGallery.innerHTML = "";

    Object.keys(REGIONS_DATA).forEach(regKey => {
      const reg = REGIONS_DATA[regKey];
      const meta = REGION_META[regKey] || {
        cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
        tagline: "Destinasi Tropis Terpilih",
        rating: "4.9 (1.5k ulasan)",
        priceStart: "Mulai Rp 400rb/hari",
        badge: "Pilihan Favorit"
      };

      const isSelected = reg.id === state.regionId;
      const card = document.createElement("div");
      card.className = `island-showcase-card ${isSelected ? 'active' : ''}`;
      card.innerHTML = `
        <img src="${meta.cover}" alt="${reg.name}" loading="lazy" />
        <div class="scrim-overlay"></div>
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 text-slate-800 shadow-sm">${meta.badge}</span>
        </div>
        ${isSelected ? '<div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs shadow-md"><i data-lucide="check" class="w-4 h-4"></i></div>' : ''}
        <div class="absolute bottom-3.5 inset-x-3.5 text-white space-y-1">
          <div class="text-[11px] text-amber-300 font-bold flex items-center gap-1">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
            <span>${meta.rating}</span>
          </div>
          <div class="text-base font-extrabold text-white leading-tight">${reg.name}</div>
          <div class="text-xs text-sky-100 line-clamp-1">${meta.tagline}</div>
          <div class="text-xs text-white/90 font-bold pt-0.5">${meta.priceStart}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        selectRegion(reg.id);
      });

      elIslandGallery.appendChild(card);
    });

    updateRegionInfo();
  }

  function selectRegion(regionId) {
    state.regionId = regionId;
    if (elSelectRegion) elSelectRegion.value = regionId;

    // Refresh island cards visual active state
    initIslandGallery();
    updateRegionInfo();
    generateItinerary();
  }

  function updateRegionInfo() {
    const reg = REGIONS_DATA[state.regionId];
    if (!reg) return;

    if (elActiveTripTitle) elActiveTripTitle.textContent = `Liburan ${reg.name}`;
    if (elIslandHeaderDesc) elIslandHeaderDesc.textContent = reg.quickDesc;
    if (elStatBestSeason) elStatBestSeason.textContent = reg.bestSeason;

    if (elRegionTipsList) {
      elRegionTipsList.innerHTML = "";
      reg.tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        elRegionTipsList.appendChild(li);
      });
    }
  }

  // Initialize Clean Minimalist Leaflet Map
  function initMap() {
    const reg = REGIONS_DATA[state.regionId] || REGIONS_DATA["bali"];
    state.map = L.map("map", {
      zoomControl: true,
      attributionControl: false
    }).setView(reg.center, reg.zoom);

    // OpenStreetMap Clean Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.map);
  }

  // Scoring Formula for Spot Matching
  function scoreSpot(spot) {
    let score = 0;

    let matchCount = 0;
    spot.categories.forEach(cat => {
      if (state.interests.has(cat)) matchCount++;
    });
    const interestRatio = spot.categories.length > 0 ? (matchCount / spot.categories.length) : 0;
    score += interestRatio * 45;

    if (spot.suitableFor && spot.suitableFor.includes(state.travelerType)) {
      score += 25;
    } else {
      score += 10;
    }

    score += (spot.rating / 5.0) * 20;

    if (state.budgetTier === "budget") {
      if (spot.price <= 50000) score += 10;
      else if (spot.price <= 150000) score += 5;
    } else if (state.budgetTier === "comfort") {
      score += 8;
    } else {
      score += 10;
    }

    return score;
  }

  // Multi-Day Itinerary Generator with Realistic Clustering
  function generateItinerary() {
    const reg = REGIONS_DATA[state.regionId];
    if (!reg) return;

    let targetPerDay = 4;
    if (state.pace === "relaxed") targetPerDay = 3;
    if (state.pace === "packed") targetPerDay = 5;

    const spotsPool = JSON.parse(JSON.stringify(reg.spots));
    spotsPool.forEach(s => s.score = scoreSpot(s));

    const zoneGroups = {};
    spotsPool.forEach(s => {
      if (!zoneGroups[s.zone]) zoneGroups[s.zone] = [];
      zoneGroups[s.zone].push(s);
    });

    Object.keys(zoneGroups).forEach(z => {
      zoneGroups[z].sort((a, b) => b.score - a.score);
    });

    const sortedZones = Object.keys(zoneGroups).sort((a, b) => {
      const avgA = zoneGroups[a].reduce((acc, c) => acc + c.score, 0) / zoneGroups[a].length;
      const avgB = zoneGroups[b].reduce((acc, c) => acc + c.score, 0) / zoneGroups[b].length;
      return avgB - avgA;
    });

    const newItinerary = [];
    const usedSpotIds = new Set();

    for (let day = 1; day <= state.totalDays; day++) {
      const dayDate = addDays(state.startDate, day - 1);
      const zoneIndex = (day - 1) % sortedZones.length;
      const chosenZone = sortedZones[zoneIndex];
      const zoneSpots = zoneGroups[chosenZone] || [];

      const availableZoneSpots = zoneSpots.filter(s => !usedSpotIds.has(s.id));
      const daySpots = [];

      for (let i = 0; i < Math.min(targetPerDay, availableZoneSpots.length); i++) {
        daySpots.push(availableZoneSpots[i]);
        usedSpotIds.add(availableZoneSpots[i].id);
      }

      if (daySpots.length < targetPerDay) {
        const otherSpots = spotsPool
          .filter(s => !usedSpotIds.has(s.id))
          .sort((a, b) => b.score - a.score);

        const needed = targetPerDay - daySpots.length;
        for (let i = 0; i < Math.min(needed, otherSpots.length); i++) {
          daySpots.push(otherSpots[i]);
          usedSpotIds.add(otherSpots[i].id);
        }
      }

      // Order spots: morning -> afternoon -> sunset -> night
      daySpots.sort((a, b) => {
        const order = { morning: 1, afternoon: 2, sunset: 3, night: 4 };
        const oa = order[a.idealTime] || 2;
        const ob = order[b.idealTime] || 2;
        return oa - ob;
      });

      // Calculate total route distance
      let totalDist = 0;
      for (let i = 0; i < daySpots.length - 1; i++) {
        totalDist += getDistanceKm(daySpots[i].lat, daySpots[i].lng, daySpots[i + 1].lat, daySpots[i + 1].lng);
      }

      newItinerary.push({
        day: day,
        date: dayDate,
        zone: chosenZone,
        spots: daySpots,
        totalDistanceKm: Math.round(totalDist * 10) / 10
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

  // Render Day Filter Tabs
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

    state.itinerary.forEach(d => {
      const isSelected = state.selectedDayFilter === d.day;
      const btn = document.createElement("button");
      btn.className = `day-tab-btn ${isSelected ? "active" : ""}`;
      btn.textContent = `Hari ${d.day}`;
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

    daysToRender.forEach(dayPlan => {
      const card = document.createElement("div");
      card.className = "travel-card overflow-hidden";

      // Day Header
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
            <span class="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-100 flex items-center gap-1.5">
              <i data-lucide="navigation" class="w-3.5 h-3.5 text-sky-600"></i>
              <span>~${dayPlan.totalDistanceKm} km Rute Searah</span>
            </span>
          </div>
        </div>
      `;

      // Spots List
      let spotsHtml = `<div class="p-4 sm:p-5 space-y-4">`;

      dayPlan.spots.forEach((spot, idx) => {
        const timeSlotStr = getTimeSlot(idx, dayPlan.spots.length, spot.idealTime);
        const prevSpot = idx > 0 ? dayPlan.spots[idx - 1] : null;
        let transitHtml = "";

        if (prevSpot) {
          const d = Math.round(getDistanceKm(prevSpot.lat, prevSpot.lng, spot.lat, spot.lng) * 10) / 10;
          const mins = Math.max(10, Math.round((d / 32) * 60)); // ~32 km/h realistic driving
          transitHtml = `
            <div class="transit-route-connector">
              <i data-lucide="car" class="w-4 h-4 text-sky-600 shrink-0"></i>
              <span>Rute perjalanan: <strong class="text-slate-900 font-bold">~${d} km</strong> (${mins} menit berkendara)</span>
            </div>
          `;
        }

        const categoryBadges = spot.categories.map(c => {
          return `<span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 uppercase">${c}</span>`;
        }).join(" ");

        const photoUrl = spot.image || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80";

        spotsHtml += `
          ${transitHtml}
          <div class="travel-spot-card" id="spotCard_${spot.id}" data-lat="${spot.lat}" data-lng="${spot.lng}">
            <div class="flex flex-col sm:flex-row">
              <!-- Spot Photography Preview -->
              <div class="w-full sm:w-52 h-44 sm:h-auto shrink-0 spot-img-container">
                <img src="${photoUrl}" alt="${spot.name}" loading="lazy" />
                <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <span>Stop ${String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-xs">
                  ⏱️ ~${spot.durationHours} Jam
                </div>
              </div>

              <!-- Spot Content -->
              <div class="p-4 sm:p-5 flex-1 min-w-0 space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 flex items-center gap-1">
                      <i data-lucide="clock" class="w-3 h-3"></i>
                      <span>${timeSlotStr}</span>
                    </span>
                    <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <i data-lucide="star" class="w-3 h-3 fill-amber-500 text-amber-500"></i>
                      <span>${spot.rating}</span>
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

                <!-- Traveler Tips Box -->
                <div class="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                  <i data-lucide="lightbulb" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
                  <div>
                    <strong class="font-bold text-amber-900">Tips Wisatawan:</strong> ${spot.tips}
                  </div>
                </div>

                <!-- Action Footer -->
                <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    ${categoryBadges}
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="btn-pan-spot text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-sky-50 transition" data-lat="${spot.lat}" data-lng="${spot.lng}">
                      <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
                      <span>Lihat di Peta</span>
                    </button>
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
          // If in mobile and on timeline, switch to map
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

  // Render Map Markers & Route Lines
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
            <div style="font-size:12px; font-weight:700; color:#0f766e;">
              ${spot.price === 0 ? "Gratis" : formatRupiah(spot.price)} • Rating ${spot.rating}★
            </div>
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
    } else {
      const reg = REGIONS_DATA[state.regionId];
      if (reg) state.map.setView(reg.center, reg.zoom);
    }
  }

  // Calculate & Render Budget Breakdown & KPIs
  function renderBudgetAndStats() {
    const reg = REGIONS_DATA[state.regionId];
    if (!reg) return;

    const days = state.totalDays;
    const nights = Math.max(1, days - 1);
    const costs = reg.baseCosts[state.budgetTier] || reg.baseCosts.comfort;

    let totalTicketCost = 0;
    let totalSpotsCount = 0;
    let totalDistanceKm = 0;

    state.itinerary.forEach(d => {
      totalDistanceKm += d.totalDistanceKm;
      d.spots.forEach(s => {
        totalTicketCost += s.price;
        totalSpotsCount++;
      });
    });

    const stayCost = nights * costs.stay;
    const transportCost = days * costs.transport;
    const foodCost = days * costs.food;
    const miscCost = days * costs.misc;
    const totalTripCost = stayCost + transportCost + foodCost + miscCost + totalTicketCost;

    // Update KPI Facts
    if (elStatTotalSpots) elStatTotalSpots.textContent = `${totalSpotsCount} Destinasi`;
    if (elStatTotalDistance) elStatTotalDistance.textContent = `${Math.round(totalDistanceKm * 10) / 10} km`;
    if (elStatTotalCost) elStatTotalCost.textContent = formatRupiah(totalTripCost);
    if (elBudgetTotalBottom) elBudgetTotalBottom.textContent = formatRupiah(totalTripCost);

    // Mobile Bottom Bar Sync
    if (elMobSummaryDays) elMobSummaryDays.textContent = `${days} Hari • ${totalSpotsCount} Destinasi (${Math.round(totalDistanceKm)} km)`;
    if (elMobSummaryCost) elMobSummaryCost.textContent = formatRupiah(totalTripCost);

    // Tier badge
    const tierLabels = {
      budget: "Tier: Hemat (Hostel & Motor)",
      comfort: "Tier: Nyaman (Hotel 3-4★ & Mobil)",
      luxury: "Tier: Sultan (Resort 5★ & VIP)"
    };
    if (elBudgetTierBadge) elBudgetTierBadge.textContent = tierLabels[state.budgetTier] || "Tier: Nyaman";

    // Itemized Budget Breakdown
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
    const reg = REGIONS_DATA[state.regionId];
    let txt = `*JADWAL LIBURAN: ${reg.name.toUpperCase()}*\n`;
    txt += `📅 Durasi: ${state.totalDays} Hari (${formatIndoDate(state.startDate)} s/d ${formatIndoDate(state.endDate)})\n`;
    txt += `👥 Tipe Traveler: ${state.travelerType.toUpperCase()} | Ritme: ${state.pace}\n`;
    txt += `------------------------------------\n\n`;

    state.itinerary.forEach(d => {
      txt += `*HARI ${d.day} — ${d.zone}* (${formatIndoDate(d.date)})\n`;
      d.spots.forEach((s, idx) => {
        txt += ` ${idx + 1}. ${s.name} [${s.price === 0 ? 'Gratis' : formatRupiah(s.price)}]\n`;
      });
      txt += ` 🚗 Est. Rute: ~${d.totalDistanceKm} km\n\n`;
    });

    txt += `💰 *Total Estimasi Biaya:* ${elStatTotalCost ? elStatTotalCost.textContent : ''} / orang\n`;
    txt += `🌐 Disusun otomatis dengan NusaTrip (Platform Liburan Nusantara)\n`;

    navigator.clipboard.writeText(txt).then(() => {
      alert("✅ Jadwal liburan lengkap berhasil disalin! Siap dikirim ke WhatsApp teman atau keluarga.");
    }).catch(() => {
      prompt("Salin teks rencana perjalanan berikut:", txt);
    });
  }

  // Modal Spot Picker
  function openSpotPickerModal() {
    const reg = REGIONS_DATA[state.regionId];
    if (!reg || !elModalSpotPicker) return;

    elSelectTargetDay.innerHTML = "";
    state.itinerary.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.day;
      opt.textContent = `Hari ${d.day} (${d.zone})`;
      elSelectTargetDay.appendChild(opt);
    });

    const usedIds = new Set();
    state.itinerary.forEach(d => d.spots.forEach(s => usedIds.add(s.id)));

    const unusedSpots = reg.spots.filter(s => !usedIds.has(s.id));
    elAvailableSpotsList.innerHTML = "";

    if (unusedSpots.length === 0) {
      elAvailableSpotsList.innerHTML = `<p class="text-xs text-slate-500 p-4 text-center">Semua destinasi terverifikasi di pulau ini telah masuk ke jadwal.</p>`;
    } else {
      unusedSpots.forEach(s => {
        const item = document.createElement("div");
        item.className = "p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3";
        item.innerHTML = `
          <div>
            <h5 class="text-xs sm:text-sm font-bold text-slate-900">${s.name}</h5>
            <p class="text-xs text-slate-500">${s.zone} • ${s.price === 0 ? 'Gratis' : formatRupiah(s.price)} • Rating ${s.rating}★</p>
          </div>
          <button class="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0">
            Tambah
          </button>
        `;
        item.querySelector("button").addEventListener("click", () => {
          const targetDayNum = parseInt(elSelectTargetDay.value);
          const dayObj = state.itinerary.find(d => d.day === targetDayNum);
          if (dayObj) {
            dayObj.spots.push(s);
            let dist = 0;
            for (let i = 0; i < dayObj.spots.length - 1; i++) {
              dist += getDistanceKm(dayObj.spots[i].lat, dayObj.spots[i].lng, dayObj.spots[i + 1].lat, dayObj.spots[i + 1].lng);
            }
            dayObj.totalDistanceKm = Math.round(dist * 10) / 10;
            renderAll();
            elModalSpotPicker.classList.add("hidden");
          }
        });
        elAvailableSpotsList.appendChild(item);
      });
    }

    elModalSpotPicker.classList.remove("hidden");
  }

  // Event Listeners
  function initEventListeners() {
    // Select Region Dropdown
    if (elSelectRegion) {
      elSelectRegion.addEventListener("change", (e) => {
        selectRegion(e.target.value);
      });
    }

    // Dates Change
    if (elStartDate) {
      elStartDate.addEventListener("change", (e) => {
        state.startDate = e.target.value;
        state.endDate = addDays(state.startDate, state.totalDays - 1);
        if (elEndDate) elEndDate.value = state.endDate;
        updateDurationBadge();
        generateItinerary();
      });
    }

    if (elEndDate) {
      elEndDate.addEventListener("change", (e) => {
        state.endDate = e.target.value;
        updateDurationBadge();
        generateItinerary();
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
        generateItinerary();
      });
    });

    // Traveler Type & Budget Tier & Pace
    if (elSelectTravelerType) {
      elSelectTravelerType.addEventListener("change", (e) => {
        state.travelerType = e.target.value;
        generateItinerary();
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
        generateItinerary();
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
        generateItinerary();
      });
    });

    // Generate / Search Button
    if (elBtnGenerate) {
      elBtnGenerate.addEventListener("click", () => {
        generateItinerary();
        // Smooth scroll to itinerary
        const itSec = document.getElementById("sectionItinerary");
        if (itSec) itSec.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Reset Map Zoom
    if (elBtnResetMapBounds) {
      elBtnResetMapBounds.addEventListener("click", () => {
        renderMap();
      });
    }

    // Copy WhatsApp
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
        if (state.map) {
          setTimeout(() => state.map.invalidateSize(), 150);
        }
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

    // Modals
    if (elBtnAddSpotModal) elBtnAddSpotModal.addEventListener("click", openSpotPickerModal);
    if (elBtnCloseSpotPicker) elBtnCloseSpotPicker.addEventListener("click", () => elModalSpotPicker.classList.add("hidden"));
    if (elModalSpotPicker) {
      elModalSpotPicker.addEventListener("click", (e) => {
        if (e.target === elModalSpotPicker) elModalSpotPicker.classList.add("hidden");
      });
    }
  }

  // Bootstrap Application
  initDates();
  initIslandGallery();
  initMap();
  initEventListeners();
  generateItinerary();
  lucide.createIcons();
});

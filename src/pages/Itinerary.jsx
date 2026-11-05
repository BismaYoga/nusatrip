import React, { useState, useEffect, useRef } from 'react';
import { REGIONS_DATA } from '../data/regionsData';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Share2, 
  Printer, 
  Check, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Navigation, 
  Clock, 
  Star, 
  Compass, 
  Info,
  Car
} from 'lucide-react';

const POPULAR_SHORTCUTS = [
  { label: 'Bali', value: 'Pulau Bali' },
  { label: 'Karangasem', value: 'Karangasem' },
  { label: 'Kebumen', value: 'Kebumen' },
  { label: 'Pacitan', value: 'Pacitan' },
  { label: 'Labuan Bajo', value: 'Labuan Bajo & Komodo' },
  { label: 'Jogja', value: 'DI Yogyakarta' }
];

const DAY_COLORS = [
  { name: 'Biru', hex: '#0284c7' },
  { name: 'Kuning Amber', hex: '#d97706' },
  { name: 'Hijau Emerald', hex: '#059669' },
  { name: 'Ungu Indigo', hex: '#4f46e5' },
  { name: 'Merah Rose', hex: '#e11d48' }
];

function getDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const y = parts[0];
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  return `${d} ${months[m] || ''} ${y}`;
}

function addDaysToDate(dateStr, daysToAdd) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().split('T')[0];
}

function getInitialDates() {
  const today = new Date();
  const startStr = today.toISOString().split('T')[0];
  const end = new Date(today);
  end.setDate(end.getDate() + 2);
  const endStr = end.toISOString().split('T')[0];
  return { startStr, endStr };
}

function resolveRegionKey(query) {
  if (!query) return 'bali';
  const q = query.toLowerCase().trim();
  for (const [key, reg] of Object.entries(REGIONS_DATA)) {
    if (
      reg.name.toLowerCase().includes(q) ||
      q.includes(reg.name.toLowerCase()) ||
      key.includes(q) ||
      q.includes(key)
    ) {
      return key;
    }
  }
  return 'bali';
}

function buildInitialHeuristic(regionKey, daysCount = 3, startDateStr) {
  const regData = REGIONS_DATA[regionKey] || REGIONS_DATA['bali'];
  const allSpots = [...(regData.spots || [])];

  const daysPlan = [];
  const spotsPerDay = Math.max(2, Math.floor(allSpots.length / daysCount));

  for (let i = 0; i < daysCount; i++) {
    const daySpots = allSpots.slice(i * spotsPerDay, (i + 1) * spotsPerDay);
    if (daySpots.length === 0 && allSpots.length > 0) {
      daySpots.push(allSpots[i % allSpots.length]);
    }

    let dist = 0;
    for (let s = 0; s < daySpots.length - 1; s++) {
      dist += getDistanceKm(
        daySpots[s].lat,
        daySpots[s].lng,
        daySpots[s + 1].lat,
        daySpots[s + 1].lng
      );
    }

    const zoneName = daySpots[0]?.zone || `Eksplorasi Zona ${i + 1}`;
    const dayDate = addDaysToDate(startDateStr, i);

    daysPlan.push({
      day: i + 1,
      date: dayDate,
      zone: zoneName,
      totalDistanceKm: Math.round(dist * 10) / 10,
      spots: daySpots
    });
  }

  return daysPlan;
}

export default function Itinerary() {
  const initialDates = getInitialDates();

  // Form states (Only updated on user action; DOES NOT auto-trigger analysis)
  const [regionInput, setRegionInput] = useState('Pulau Bali');
  const [startDate, setStartDate] = useState(initialDates.startStr);
  const [endDate, setEndDate] = useState(initialDates.endStr);
  const [paxCount, setPaxCount] = useState(4);
  const [budgetTier, setBudgetTier] = useState('comfort');
  const [budgetMin, setBudgetMin] = useState('500.000');
  const [budgetMax, setBudgetMax] = useState('3.500.000');
  const [interests, setInterests] = useState(['pantai']);
  const [customPrompt, setCustomPrompt] = useState('');

  // Active loaded itinerary state
  const [activeRegionKey, setActiveRegionKey] = useState('bali');
  const [itinerary, setItinerary] = useState(() =>
    buildInitialHeuristic('bali', 3, initialDates.startStr)
  );
  const [selectedDayFilter, setSelectedDayFilter] = useState('all');

  // UI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);
  const [targetAddDay, setTargetAddDay] = useState(1);

  // Map references
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

  // Read saved target from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem('gastrip_target_region');
    if (saved) {
      setRegionInput(saved);
      const k = resolveRegionKey(saved);
      setActiveRegionKey(k);
      setItinerary(buildInitialHeuristic(k, 3, startDate));
    }
  }, []);

  const activeRegion = REGIONS_DATA[activeRegionKey] || REGIONS_DATA['bali'];

  // Calculate day difference
  const calculatedDays = Math.max(
    1,
    Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );

  // Handle preset budget tier button click
  function handleSelectBudgetTier(tier) {
    setBudgetTier(tier);
    if (tier === 'budget') {
      setBudgetMin('300.000');
      setBudgetMax('1.500.000');
    } else if (tier === 'comfort') {
      setBudgetMin('500.000');
      setBudgetMax('3.500.000');
    } else if (tier === 'luxury') {
      setBudgetMin('2.000.000');
      setBudgetMax('8.000.000');
    }
  }

  // Toggle interest tags
  function toggleInterest(cat) {
    if (interests.includes(cat)) {
      setInterests(interests.filter((i) => i !== cat));
    } else {
      setInterests([...interests, cat]);
    }
  }

  // Quick region shortcut handler (Updates input only; DOES NOT run analysis)
  function handleQuickRegion(val) {
    setRegionInput(val);
  }

  // ==========================================
  // ONLY RUN ANALYSIS ON BUTTON CLICK
  // ==========================================
  async function handleAnalyze() {
    setIsAnalyzing(true);
    const targetKey = resolveRegionKey(regionInput);
    setActiveRegionKey(targetKey);

    try {
      const payload = {
        region: regionInput,
        days: calculatedDays,
        traveler_type: paxCount <= 2 ? 'couple' : 'family',
        pace: 'balanced',
        budget_tier: budgetTier,
        interests: interests,
        custom_prompt: customPrompt
      };

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && json.data && json.data.days) {
          const formattedDays = json.data.days.map((d, idx) => {
            const dayDate = addDaysToDate(startDate, idx);
            const spots = d.spots || [];
            let totalDist = 0;
            for (let s = 0; s < spots.length - 1; s++) {
              totalDist += getDistanceKm(
                spots[s].lat,
                spots[s].lng,
                spots[s + 1].lat,
                spots[s + 1].lng
              );
            }
            return {
              day: d.day || idx + 1,
              date: dayDate,
              zone: d.zone || `Zona Hari ${idx + 1}`,
              totalDistanceKm: Math.round(totalDist * 10) / 10,
              spots: spots
            };
          });

          setItinerary(formattedDays);
          setSelectedDayFilter('all');
          setIsAnalyzing(false);
          scrollToResult();
          return;
        }
      }
    } catch (err) {
      console.warn('API generation fallback to local heuristic:', err);
    }

    // Local Heuristic Fallback
    const fallbackDays = buildInitialHeuristic(targetKey, calculatedDays, startDate);
    setItinerary(fallbackDays);
    setSelectedDayFilter('all');
    setIsAnalyzing(false);
    scrollToResult();
  }

  function scrollToResult() {
    const el = document.getElementById('resultContainerSection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Remove spot from a specific day
  function handleRemoveSpot(dayNum, spotId) {
    const updated = itinerary.map((d) => {
      if (d.day !== dayNum) return d;
      const filteredSpots = d.spots.filter((s) => s.id !== spotId);
      let dist = 0;
      for (let i = 0; i < filteredSpots.length - 1; i++) {
        dist += getDistanceKm(
          filteredSpots[i].lat,
          filteredSpots[i].lng,
          filteredSpots[i + 1].lat,
          filteredSpots[i + 1].lng
        );
      }
      return {
        ...d,
        spots: filteredSpots,
        totalDistanceKm: Math.round(dist * 10) / 10
      };
    });
    setItinerary(updated);
  }

  // Add spot to target day
  function handleAddSpotToDay(spot) {
    const updated = itinerary.map((d) => {
      if (d.day !== targetAddDay) return d;
      const newSpots = [...d.spots, spot];
      let dist = 0;
      for (let i = 0; i < newSpots.length - 1; i++) {
        dist += getDistanceKm(
          newSpots[i].lat,
          newSpots[i].lng,
          newSpots[i + 1].lat,
          newSpots[i + 1].lng
        );
      }
      return {
        ...d,
        spots: newSpots,
        totalDistanceKm: Math.round(dist * 10) / 10
      };
    });
    setItinerary(updated);
    setShowAddSpotModal(false);
  }

  // Copy WhatsApp summary
  function handleCopyWhatsApp() {
    let txt = `*JADWAL LIBURAN: ${regionInput.toUpperCase()}*\n`;
    txt += `📅 Durasi: ${calculatedDays} Hari | Jumlah: ${paxCount} Pax | Tier: ${budgetTier.toUpperCase()}\n`;
    txt += `------------------------------------\n\n`;

    itinerary.forEach((d) => {
      txt += `*HARI ${d.day} — ${d.zone}* (${d.totalDistanceKm} km)\n`;
      d.spots.forEach((s, idx) => {
        txt += `${idx + 1}. ${s.name} (${s.price === 0 ? 'Gratis' : formatRupiah(s.price)})\n`;
      });
      txt += `\n`;
    });

    txt += `Dirancang via NusaTrip Indonesia (https://nusatrip.id)`;
    navigator.clipboard.writeText(txt);
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 3000);
  }

  // Leaflet Map Rendering
  useEffect(() => {
    if (typeof window === 'undefined' || !window.L || !mapContainerRef.current) return;

    // Initialize Map if not present
    if (!mapInstanceRef.current) {
      const center = activeRegion.center || [-8.4095, 115.1889];
      const zoom = activeRegion.zoom || 10;
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(center, zoom);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous layers
    markersRef.current.forEach((m) => map.removeLayer(m));
    polylinesRef.current.forEach((p) => map.removeLayer(p));
    markersRef.current = [];
    polylinesRef.current = [];

    const bounds = window.L.latLngBounds([]);
    const daysToMap =
      selectedDayFilter === 'all'
        ? itinerary
        : itinerary.filter((d) => d.day === Number(selectedDayFilter));

    daysToMap.forEach((dayPlan) => {
      const dayColor = DAY_COLORS[(dayPlan.day - 1) % DAY_COLORS.length];
      const latlngs = [];

      dayPlan.spots.forEach((spot, idx) => {
        if (!spot.lat || !spot.lng) return;
        const pos = [spot.lat, spot.lng];
        bounds.extend(pos);
        latlngs.push(pos);

        const pinIcon = window.L.divIcon({
          className: 'custom-travel-pin',
          html: `<div style="background-color: ${dayColor.hex}; width: 26px; height: 26px; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; border: 2px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border-radius: 0;">${idx + 1}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = window.L.marker(pos, { icon: pinIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:'Montserrat',sans-serif; max-width:240px; padding:2px;">
            <div style="font-size:10px; font-weight:700; color:${dayColor.hex}; margin-bottom:2px; text-transform:uppercase;">
              Hari ${dayPlan.day} • Titik ${idx + 1}
            </div>
            <div style="font-weight:700; font-size:13px; color:#070e1e; margin-bottom:4px; font-family:'Libre Baskerville',serif;">
              ${spot.name}
            </div>
            <div style="font-size:11px; color:#595959; margin-bottom:6px; line-height:1.4;">
              ${spot.desc || ''}
            </div>
            <div style="font-size:11px; font-weight:700; color:#121d38; margin-bottom:4px;">
              ${spot.price === 0 ? 'Gratis' : formatRupiah(spot.price)} • Rating ${spot.rating || 4.8}★
            </div>
            <a href="${spot.gmaps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + regionInput)}`}" target="_blank" rel="noopener" style="font-size:10px; font-weight:700; color:#070e1e; text-decoration:none;">
              Buka Google Maps &rarr;
            </a>
          </div>
        `);
        markersRef.current.push(marker);
      });

      if (latlngs.length > 1) {
        const polyline = window.L.polyline(latlngs, {
          color: dayColor.hex,
          weight: 4,
          opacity: 0.85,
          dashArray: '6, 8'
        }).addTo(map);
        polylinesRef.current.push(polyline);
      }
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [35, 35] });
    }
  }, [itinerary, selectedDayFilter, activeRegionKey]);

  function handleResetMapZoom() {
    if (!mapInstanceRef.current) return;
    const center = activeRegion.center || [-8.4095, 115.1889];
    const zoom = activeRegion.zoom || 10;
    mapInstanceRef.current.setView(center, zoom);
  }

  // Calculate Budget Breakdown
  const nights = Math.max(1, calculatedDays - 1);
  const tierRates = {
    budget: { stay: 250000, transport: 150000, food: 120000, misc: 50000 },
    comfort: { stay: 650000, transport: 450000, food: 250000, misc: 100000 },
    luxury: { stay: 2200000, transport: 950000, food: 650000, misc: 250000 }
  };
  const costs = tierRates[budgetTier] || tierRates.comfort;

  let totalTicketCost = 0;
  let totalSpotsCount = 0;
  let totalDistanceKm = 0;

  itinerary.forEach((d) => {
    totalDistanceKm += d.totalDistanceKm || 0;
    (d.spots || []).forEach((s) => {
      totalTicketCost += s.price || 0;
      totalSpotsCount++;
    });
  });

  const stayCost = nights * costs.stay;
  const transportCost = calculatedDays * costs.transport;
  const foodCost = calculatedDays * costs.food;
  const miscCost = calculatedDays * costs.misc;
  const totalTripCost =
    stayCost + transportCost + foodCost + miscCost + totalTicketCost;

  const daysToRender =
    selectedDayFilter === 'all'
      ? itinerary
      : itinerary.filter((d) => d.day === Number(selectedDayFilter));

  const availableSpotsToAdd = (activeRegion.spots || []).filter((s) => {
    const isAlreadyAdded = itinerary.some((d) =>
      d.spots.some((cur) => cur.id === s.id)
    );
    return !isAlreadyAdded;
  });

  return (
    <div className="w-full flex flex-col">
      
      {/* ========================================== */}
      {/* 1. FORM SECTION: RANCANG LIBURAN           */}
      {/* ========================================== */}
      <section id="plannerSection" className="py-12 sm:py-16 border-b border-[#ededed] bg-[#ffffff] no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#121d38] block">
              Formulir Perencanaan Perjalanan
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#070e1e] font-serif tracking-tight">
              Rancang Liburan yang Pas Buat Kamu
            </h1>
            <p className="text-sm sm:text-base text-[#595959] max-w-xl mx-auto">
              Tentukan destinasi, budget, dan gaya wisatamu. Kami buatkan rute perjalanan terbaiknya.
            </p>
          </div>

          {/* Wireframe Form Container Card */}
          <div className="bg-[#ffffff] rounded-none p-6 sm:p-8 border border-[#ededed] space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* 1. Tujuan Wisata * (Dropdown Lokasi) */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-[#070e1e] flex items-center justify-between">
                  <span>Tujuan Wisata <span className="text-rose-500">*</span></span>
                  <span className="text-[11px] font-normal text-[#595959]">Pilih dari daftar atau ketik daerah apa saja</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    list="regionsList" 
                    placeholder="Ketik atau pilih kota / daerah tujuan (cth: Bali, Pacitan, Kebumen, Bromo, Jogja, Sumba)" 
                    className="w-full px-4 py-3 bg-[#ffffff] border border-[#ededed] rounded-none font-semibold text-sm text-[#282828] placeholder:text-[#8c8c8c] placeholder:font-normal focus:border-[#070e1e] outline-none transition" 
                  />
                  <datalist id="regionsList">
                    <option value="Pulau Bali" />
                    <option value="Karangasem" />
                    <option value="Pacitan" />
                    <option value="Kebumen" />
                    <option value="Labuan Bajo & Komodo" />
                    <option value="Pulau Lombok & Gili" />
                    <option value="DI Yogyakarta" />
                    <option value="Kepulauan Belitung" />
                    <option value="Kepulauan Raja Ampat" />
                    <option value="Banyuwangi & Kawah Ijen" />
                    <option value="Danau Toba & Samosir" />
                    <option value="Bromo & Kota Malang" />
                    <option value="Pulau Sumba" />
                    <option value="Bandung & Lembang" />
                  </datalist>
                </div>

                {/* Quick Region Shortcuts */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-[#595959]">
                  <span className="font-semibold text-[#070e1e]">Pilihan Populer:</span>
                  {POPULAR_SHORTCUTS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleQuickRegion(item.value)}
                      className={`px-2.5 py-1 rounded-none text-[11px] font-medium transition border ${
                        regionInput === item.value
                          ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                          : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#070e1e] border-[#ededed]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Tanggal * (Tanggal dari - Tanggal sampai) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#070e1e]">
                  Tanggal Perjalanan <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#ffffff] border border-[#ededed] rounded-none p-1.5 items-center">
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#282828] px-2 outline-none cursor-pointer rounded-none" 
                  />
                  <div className="flex items-center gap-1.5 px-2 border-l border-[#ededed]">
                    <span className="text-[#8c8c8c] text-xs font-bold shrink-0">–</span>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#282828] outline-none cursor-pointer rounded-none" 
                    />
                  </div>
                </div>
              </div>

              {/* 3. Jumlah Pax (Orang) * (Dropdown 1 - 20) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#070e1e]">
                  Jumlah Pax (Orang) <span className="text-rose-500">*</span>
                </label>
                <select 
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-[#ffffff] border border-[#ededed] rounded-none font-semibold text-xs text-[#282828] outline-none cursor-pointer"
                >
                  <option value="1">1 Orang (Solo Traveler)</option>
                  <option value="2">2 Orang (Pasangan / Duo)</option>
                  <option value="3">3 Orang (Keluarga Kecil)</option>
                  <option value="4">4 Orang (Keluarga / Teman)</option>
                  <option value="5">5 Orang</option>
                  <option value="6">6 Orang</option>
                  <option value="8">8 Orang (Rombongan)</option>
                  <option value="10">10 Orang (Grup Tour)</option>
                  <option value="15">15 Orang (Rombongan Besar)</option>
                  <option value="20">20 Orang (Max Bus Tour)</option>
                </select>
              </div>

              {/* 4. Budget * (Budget Minimal - Budget Maksimal) */}
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#070e1e]">
                    Rentang Budget Per Orang <span className="text-rose-500">*</span>
                  </label>
                  {/* Budget Tier Selection (Preset Buttons) */}
                  <div className="flex items-center gap-1 text-xs">
                    <button 
                      type="button" 
                      onClick={() => handleSelectBudgetTier('budget')} 
                      className={`px-2.5 py-0.5 rounded-none text-[11px] font-semibold transition border ${
                        budgetTier === 'budget'
                          ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                          : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                      }`}
                    >
                      Hemat
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSelectBudgetTier('comfort')} 
                      className={`px-2.5 py-0.5 rounded-none text-[11px] font-semibold transition border ${
                        budgetTier === 'comfort'
                          ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                          : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                      }`}
                    >
                      Nyaman
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSelectBudgetTier('luxury')} 
                      className={`px-2.5 py-0.5 rounded-none text-[11px] font-semibold transition border ${
                        budgetTier === 'luxury'
                          ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                          : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                      }`}
                    >
                      Sultan
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#8c8c8c]">Rp</span>
                    <input 
                      type="text" 
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#ffffff] border border-[#ededed] rounded-none font-semibold text-xs text-[#282828] outline-none" 
                      placeholder="Minimal" 
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[#8c8c8c]">Rp</span>
                    <input 
                      type="text" 
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#ffffff] border border-[#ededed] rounded-none font-semibold text-xs text-[#282828] outline-none" 
                      placeholder="Maksimal" 
                    />
                  </div>
                </div>
              </div>

              {/* 5. Referensi Wisata (Opsional, bisa lebih dari 1) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[#070e1e] block">
                  Referensi Wisata <span className="text-[#595959] font-normal">(Opsional, bisa pilih lebih dari 1)</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => toggleInterest('pantai')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-none border transition ${
                      interests.includes('pantai')
                        ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                        : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                    }`}
                  >
                    <span>Pantai</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => toggleInterest('alam')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-none border transition ${
                      interests.includes('alam')
                        ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                        : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                    }`}
                  >
                    <span>Dataran Tinggi</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => toggleInterest('budaya')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-none border transition ${
                      interests.includes('budaya')
                        ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                        : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                    }`}
                  >
                    <span>Perkotaan &amp; Budaya</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => toggleInterest('kuliner')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-none border transition ${
                      interests.includes('kuliner')
                        ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                        : 'bg-[#f8f8f8] hover:bg-[#ededed] text-[#282828] border-[#ededed]'
                    }`}
                  >
                    <span>Kuliner</span>
                  </button>
                </div>
              </div>

              {/* Catatan Khusus */}
              <div className="space-y-1.5 md:col-span-2 pt-1">
                <label className="text-xs font-bold text-[#070e1e] block">
                  Catatan / Instruksi Khusus <span className="text-[#595959] font-normal">(Opsional)</span>
                </label>
                <div className="flex items-center gap-2 bg-[#ffffff] rounded-none p-1.5 border border-[#ededed]">
                  <input 
                    type="text" 
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Cth: Bawa balita, rute santai, sunset cantik, kuliner halal..." 
                    className="w-full bg-transparent text-xs text-[#282828] placeholder:text-[#8c8c8c] outline-none px-2 font-normal" 
                  />
                  <button 
                    type="button" 
                    onClick={handleAnalyze}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-none bg-[#f8f8f8] hover:bg-[#ededed] text-[#070e1e] shrink-0 transition border border-[#ededed]"
                  >
                    Terapkan
                  </button>
                </div>
              </div>

            </div>

            {/* 6. Button Kirim (Analisis & Buat Rute) */}
            <div className="pt-2">
              <button 
                type="button" 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 px-6 rounded-none bg-[#070e1e] hover:bg-[#121d38] active:scale-99 text-[#ffffff] font-bold text-sm flex items-center justify-center gap-2 transition shadow-md disabled:opacity-75"
              >
                <span>{isAnalyzing ? 'Menganalisis Rute...' : 'Analisis & Buat Rute'}</span>
                <span>&rarr;</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. RESULT SECTION: KAMU COCOKNYA KESINI    */}
      {/* ========================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" id="resultContainerSection">
        
        {/* Section Title Matching Wireframe */}
        <div className="space-y-2 border-b border-[#ededed] pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#070e1e] font-serif tracking-tight">
                Kamu cocoknya kesini..
              </h2>
              <p className="text-sm text-[#595959] mt-1">
                Rute perjalanan terkurasi otomatis, hemat waktu, dan ramah di kantong.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 no-print">
              <button 
                type="button"
                onClick={handleCopyWhatsApp}
                className="px-4 py-2 rounded-none bg-[#070e1e] hover:bg-[#121d38] text-[#ffffff] font-semibold text-xs transition flex items-center gap-1.5" 
                title="Bagikan jadwal ke WhatsApp"
              >
                {copiedWa ? <Check className="w-3.5 h-3.5 text-[#fed988]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedWa ? 'Tersalin!' : 'Bagikan WhatsApp'}</span>
              </button>
              <button 
                type="button"
                onClick={() => window.print()} 
                className="px-3.5 py-2 rounded-none bg-[#ffffff] hover:bg-[#f8f8f8] text-[#070e1e] font-semibold text-xs border border-[#ededed] transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Trip Overview Banner */}
        <div className="p-5 sm:p-6 bg-[#ffffff] border border-[#ededed] rounded-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-none bg-[#fed988] text-[#070e1e] uppercase tracking-wider border border-[#ebd080]">
                  Terverifikasi
                </span>
                <span className="text-xs text-[#595959]">
                  {calculatedDays} Hari ({nights} Malam)
                </span>
                <div className="px-2.5 py-0.5 bg-[#f8f8f8] text-[#070e1e] text-xs font-semibold border border-[#ededed] rounded-none flex items-center gap-1">
                  <span>🌤️</span>
                  <span>Cuaca: Cerah Tropis 28°C</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#070e1e]">
                Liburan {regionInput}
              </h3>
              <p className="text-xs text-[#595959] mt-1 max-w-2xl leading-relaxed">
                {activeRegion.quickDesc || 'Perpaduan alam eksotis, budaya luhur, dan kuliner autentik nusantara.'}
              </p>
            </div>

            {/* Quick Trip Stats Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-[#f8f8f8] px-3 py-2 rounded-none border border-[#ededed]">
                <span className="text-[10px] font-semibold text-[#595959] block uppercase">Destinasi</span>
                <span className="text-xs font-bold text-[#070e1e]">{totalSpotsCount} Tempat</span>
              </div>
              <div className="bg-[#f8f8f8] px-3 py-2 rounded-none border border-[#ededed]">
                <span className="text-[10px] font-semibold text-[#595959] block uppercase">Rute</span>
                <span className="text-xs font-bold text-[#070e1e]">{Math.round(totalDistanceKm * 10) / 10} km</span>
              </div>
              <div className="bg-[#f8f8f8] px-3 py-2 rounded-none border border-[#ededed]">
                <span className="text-[10px] font-semibold text-[#595959] block uppercase">Total Biaya</span>
                <span className="text-xs font-bold text-[#070e1e]">{formatRupiah(totalTripCost)}</span>
              </div>
              <div className="bg-[#f8f8f8] px-3 py-2 rounded-none border border-[#ededed]">
                <span className="text-[10px] font-semibold text-[#595959] block uppercase">Musim</span>
                <span className="text-xs font-bold text-[#070e1e]">{activeRegion.bestSeason || 'Apr – Okt'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Result Workspace: Split Cards Feed (Left) & Sticky Interactive Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Day-by-Day Timeline Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-5">

            {/* Day Filter Tabs Bar */}
            <div className="bg-[#ffffff] border border-[#ededed] p-2.5 flex items-center justify-between gap-2 overflow-x-auto rounded-none no-print">
              <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedDayFilter('all')}
                  className={`text-xs px-3 py-1.5 rounded-none font-bold transition border ${
                    selectedDayFilter === 'all'
                      ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                      : 'bg-[#f8f8f8] text-[#595959] hover:bg-[#ededed] border-[#ededed]'
                  }`}
                >
                  Semua Hari
                </button>
                {itinerary.map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDayFilter(d.day)}
                    className={`text-xs px-3 py-1.5 rounded-none font-bold transition border ${
                      selectedDayFilter === d.day
                        ? 'bg-[#070e1e] text-[#ffffff] border-[#070e1e]'
                        : 'bg-[#f8f8f8] text-[#595959] hover:bg-[#ededed] border-[#ededed]'
                    }`}
                  >
                    Hari {d.day}
                  </button>
                ))}
              </div>

              <button 
                type="button"
                onClick={() => {
                  setTargetAddDay(selectedDayFilter === 'all' ? 1 : Number(selectedDayFilter));
                  setShowAddSpotModal(true);
                }}
                className="text-xs px-3 py-1.5 rounded-none bg-[#f8f8f8] hover:bg-[#ededed] text-[#070e1e] font-semibold border border-[#ededed] flex items-center gap-1 shrink-0 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Spot</span>
              </button>
            </div>

            {/* Itinerary Cards Feed */}
            <div className="space-y-4">
              {daysToRender.map((dayPlan) => (
                <div key={dayPlan.day} className="bg-[#ffffff] border border-[#ededed] rounded-none overflow-hidden">
                  
                  {/* Day Header */}
                  <div className="p-4 sm:p-5 border-b border-[#ededed] bg-[#f8f8f8] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-none bg-[#070e1e] text-[#ffffff] flex items-center justify-center font-bold text-xs">
                        H{dayPlan.day}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold font-serif text-[#070e1e]">
                            Hari ke-{dayPlan.day}: {dayPlan.zone}
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-none bg-[#ffffff] text-[#595959] border border-[#ededed]">
                            {dayPlan.spots.length} Titik
                          </span>
                        </div>
                        <p className="text-xs text-[#595959]">{formatDateIndo(dayPlan.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="px-2.5 py-1 rounded-none bg-[#ffffff] text-[#070e1e] border border-[#ededed]">
                        ~{dayPlan.totalDistanceKm} km Rute Searah
                      </span>
                    </div>
                  </div>

                  {/* Spots List */}
                  <div className="p-4 sm:p-5 space-y-4">
                    {dayPlan.spots.map((spot, idx) => {
                      const prevSpot = idx > 0 ? dayPlan.spots[idx - 1] : null;
                      let transitDist = 0;
                      let transitMins = 0;
                      if (prevSpot) {
                        transitDist = getDistanceKm(prevSpot.lat, prevSpot.lng, spot.lat, spot.lng);
                        transitMins = Math.max(10, Math.round((transitDist / 32) * 60));
                      }

                      return (
                        <div key={spot.id || idx} className="space-y-4">
                          
                          {/* Transit Connector */}
                          {prevSpot && (
                            <div className="flex items-center gap-2 text-xs text-[#595959] bg-[#f8f8f8] p-2 border border-[#ededed] rounded-none">
                              <Car className="w-3.5 h-3.5 text-[#070e1e]" />
                              <span>Rute berkendara: <strong>~{transitDist} km</strong> ({transitMins} menit perjalanan)</span>
                            </div>
                          )}

                          {/* Spot Card */}
                          <div className="border border-[#ededed] bg-[#ffffff] p-4 flex flex-col sm:flex-row gap-4 rounded-none">
                            
                            {/* Photo Thumbnail */}
                            <div className="w-full sm:w-44 h-36 sm:h-auto shrink-0 relative bg-[#ededed] overflow-hidden">
                              <img 
                                src={spot.image || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'} 
                                alt={spot.name}
                                className="w-full h-full object-cover" 
                                loading="lazy" 
                              />
                              <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#070e1e] text-[#ffffff] text-[10px] font-bold">
                                Stop {idx + 1}
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="font-bold text-[#070e1e] flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span>{spot.rating || 4.8}</span>
                                  </span>
                                  <span className="text-[#8c8c8c]">•</span>
                                  <span className="text-[#595959]">{spot.durationHours || 2} Jam Kunjungan</span>
                                </div>
                                <span className="text-xs font-bold text-[#070e1e] bg-[#f8f8f8] px-2 py-0.5 border border-[#ededed]">
                                  {spot.price === 0 ? 'Gratis Tiket' : formatRupiah(spot.price)}
                                </span>
                              </div>

                              <h4 className="font-serif font-bold text-sm sm:text-base text-[#070e1e]">
                                {spot.name}
                              </h4>

                              <p className="text-xs text-[#595959] leading-relaxed">
                                {spot.desc}
                              </p>

                              {spot.tips && (
                                <div className="p-2 bg-[#f8f8f8] border-l-2 border-[#fed988] text-[11px] text-[#595959]">
                                  <strong>Tips Lapangan:</strong> {spot.tips}
                                </div>
                              )}

                              <div className="pt-2 flex items-center justify-between border-t border-[#ededed]">
                                <a 
                                  href={spot.gmaps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + regionInput)}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-xs font-bold text-[#121d38] hover:text-[#070e1e] transition flex items-center gap-1"
                                >
                                  <span>Lihat Google Maps</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpot(dayPlan.day, spot.id)}
                                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition flex items-center gap-1"
                                  title="Hapus dari jadwal hari ini"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Hapus</span>
                                </button>
                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Sticky Leaflet Map & Cost Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

            {/* Interactive Map Card */}
            <div className="bg-[#ffffff] border border-[#ededed] rounded-none overflow-hidden">
              <div className="p-3.5 border-b border-[#ededed] flex items-center justify-between bg-[#f8f8f8]">
                <div>
                  <h3 className="text-xs font-bold text-[#070e1e] uppercase tracking-wider">
                    INTERACTIVE MAPS
                  </h3>
                  <p className="text-[11px] text-[#595959]">Rute searah berbasis OpenStreetMap</p>
                </div>
                <button 
                  type="button"
                  onClick={handleResetMapZoom}
                  className="text-[11px] px-2.5 py-1 rounded-none bg-[#ffffff] hover:bg-[#ededed] text-[#070e1e] border border-[#ededed] transition font-semibold"
                >
                  Reset Zoom
                </button>
              </div>

              {/* Leaflet Map Canvas */}
              <div 
                ref={mapContainerRef} 
                className="w-full h-[360px] sm:h-[400px] bg-[#ededed] z-10" 
              />
              
              {/* Map Legend */}
              <div className="p-2.5 bg-[#ffffff] border-t border-[#ededed] flex flex-wrap gap-3 text-xs text-[#595959]">
                {itinerary.map((d) => {
                  const dayColor = DAY_COLORS[(d.day - 1) % DAY_COLORS.length];
                  return (
                    <div key={d.day} className="flex items-center gap-1.5 font-semibold text-xs">
                      <span 
                        className="w-2.5 h-2.5 inline-block rounded-none" 
                        style={{ backgroundColor: dayColor.hex }} 
                      />
                      <span>Hari {d.day} ({d.spots.length} titik)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transparent Cost Breakdown Card */}
            <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-4 rounded-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#ededed]">
                <div>
                  <h3 className="text-sm font-bold font-serif text-[#070e1e]">
                    Estimasi Biaya Transparan
                  </h3>
                  <p className="text-xs text-[#595959]">Perkiraan all-in per orang selama liburan</p>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-none bg-[#f8f8f8] text-[#070e1e] font-semibold border border-[#ededed]">
                  Tier: {budgetTier.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#595959]">
                <div className="flex items-center justify-between py-1 border-b border-[#ededed]">
                  <span>Tiket Masuk &amp; Retribusi Resmi</span>
                  <span className="font-bold text-[#070e1e]">{formatRupiah(totalTicketCost)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#ededed]">
                  <span>Sewa Transport &amp; Bensin ({calculatedDays} Hari)</span>
                  <span className="font-bold text-[#070e1e]">{formatRupiah(transportCost)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#ededed]">
                  <span>Estimasi Konsumsi Kuliner Lokal</span>
                  <span className="font-bold text-[#070e1e]">{formatRupiah(foodCost)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#ededed]">
                  <span>Akomodasi / Penginapan ({nights} Malam)</span>
                  <span className="font-bold text-[#070e1e]">{formatRupiah(stayCost)}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#ededed]">
                  <span>Biaya Parkir &amp; Tak Terduga</span>
                  <span className="font-bold text-[#070e1e]">{formatRupiah(miscCost)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ededed] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#070e1e]">Total Perkiraan Trip</span>
                <span className="text-base font-bold font-serif text-[#070e1e]">
                  {formatRupiah(totalTripCost)}
                </span>
              </div>
            </div>

            {/* Practical Local Field Guide & Tips */}
            <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-3 rounded-none">
              <h3 className="text-sm font-bold font-serif text-[#070e1e] pb-2 border-b border-[#ededed]">
                Tips Praktis Lapangan
              </h3>
              <ul className="space-y-1.5 text-xs text-[#595959] list-disc list-inside leading-relaxed">
                {(activeRegion.tips || []).map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 3. MODAL: AI PROGRESS FEEDBACK             */}
      {/* ========================================== */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-[#070e1e]/70 flex items-center justify-center p-4 no-print">
          <div className="max-w-md w-full p-6 text-center space-y-4 bg-[#ffffff] border border-[#ededed] rounded-none shadow-2xl">
            <div className="w-10 h-10 mx-auto rounded-none bg-[#070e1e] text-[#fed988] flex items-center justify-center font-bold text-sm">
              N
            </div>
            <div>
              <h4 className="text-base font-bold font-serif text-[#070e1e]">
                Asisten Sedang Menganalisis Rute {regionInput}...
              </h4>
              <p className="text-xs text-[#595959] mt-1 leading-relaxed">
                Memeriksa klaster geografis, ulasan Google Maps, dan tiket terverifikasi.
              </p>
            </div>
            <div className="w-full bg-[#f8f8f8] h-1.5 rounded-none overflow-hidden">
              <div className="bg-[#070e1e] h-full w-2/3 animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. MODAL: ADD SPOT PICKER                  */}
      {/* ========================================== */}
      {showAddSpotModal && (
        <div className="fixed inset-0 z-50 bg-[#070e1e]/60 flex items-center justify-center p-4 no-print">
          <div className="max-w-xl w-full p-6 space-y-4 bg-[#ffffff] border border-[#ededed] rounded-none shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#ededed] pb-3 shrink-0">
              <div>
                <h3 className="text-sm font-bold font-serif text-[#070e1e]">Tambah Destinasi Wisata</h3>
                <p className="text-xs text-[#595959]">Pilih destinasi cadangan terverifikasi untuk Hari ke-{targetAddDay}</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddSpotModal(false)}
                className="text-[#595959] hover:text-[#070e1e] text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Target Day Selector */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="font-bold text-[#070e1e]">Tambahkan ke:</span>
              <select
                value={targetAddDay}
                onChange={(e) => setTargetAddDay(Number(e.target.value))}
                className="px-2.5 py-1 bg-[#f8f8f8] border border-[#ededed] rounded-none font-semibold text-xs text-[#070e1e] outline-none"
              >
                {itinerary.map((d) => (
                  <option key={d.day} value={d.day}>Hari {d.day} ({d.zone})</option>
                ))}
              </select>
            </div>

            {/* Spots List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {availableSpotsToAdd.length === 0 ? (
                <p className="text-xs text-center text-[#595959] py-8">
                  Semua spot terverifikasi di wilayah ini sudah masuk ke jadwal trip Anda.
                </p>
              ) : (
                availableSpotsToAdd.map((s) => (
                  <div key={s.id} className="p-3 border border-[#ededed] bg-[#f8f8f8] flex items-center justify-between gap-3 rounded-none">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-serif text-[#070e1e]">{s.name}</h4>
                      <p className="text-[11px] text-[#595959] line-clamp-1">{s.desc}</p>
                      <div className="text-[10px] text-[#070e1e] font-semibold">
                        {s.price === 0 ? 'Gratis' : formatRupiah(s.price)} • {s.zone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddSpotToDay(s)}
                      className="px-3 py-1.5 bg-[#070e1e] hover:bg-[#121d38] text-[#ffffff] font-bold text-xs shrink-0 rounded-none transition"
                    >
                      + Tambah
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-[#ededed] flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowAddSpotModal(false)}
                className="px-4 py-2 border border-[#ededed] hover:bg-[#ededed] text-xs font-semibold text-[#070e1e] rounded-none transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

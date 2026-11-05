import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Wallet, Share2, Copy, Check, ChevronRight } from 'lucide-react';

const SAMPLE_BALI_DAYS = [
  {
    day: 1,
    zone: 'Ubud Kesenian & Budaya Tradisional',
    totalDistanceKm: 28,
    spots: [
      { name: 'Hutan Monyet Ubud (Sacred Monkey Forest)', desc: 'Cagar alam hutan hujan tropis lebat yang dihuni ratusan kera ekor panjang dan pura kuno.', price: 80000, rating: 4.7 },
      { name: 'Puri Saren Agung & Pasar Seni Ubud', desc: 'Istana kerajaan bersejarah di jantung Ubud dengan arsitektur ukiran batu bata klasik khas Bali.', price: 0, rating: 4.6 },
      { name: 'Terasering Sawah Tegallalang & Kafe Sawah', desc: 'Undakan sawah beririgasi subak terdaftar warisan dunia UNESCO dengan pemandangan lembah asri.', price: 25000, rating: 4.8 },
      { name: 'Campuhan Ridge Walk (Bukit Cinta)', desc: 'Jalur pedestrian setapak di atas punggungan bukit berangin sejuk untuk menikmati senja syahdu.', price: 0, rating: 4.8 }
    ]
  },
  {
    day: 2,
    zone: 'Tebing Karang & Sunset Bali Selatan',
    totalDistanceKm: 34,
    spots: [
      { name: 'Pantai Melasti Ungasan', desc: 'Pantai pasir putih berair toska jernih dengan akses jalan aspal spektakuler membelah tebing kapur putih tinggi.', price: 15000, rating: 4.9 },
      { name: 'Pantai Suluban (Blue Point Uluwatu)', desc: 'Akses unik menuruni celah goa karang sempit menuju deburan ombak Samudra Hindia.', price: 10000, rating: 4.7 },
      { name: 'Pura Luhur Uluwatu & Tari Kecak Senja', desc: 'Pura megah di bibir tebing karang 70 meter dengan pertunjukan sakral magis Tari Kecak saat sunset.', price: 50000, rating: 4.9 },
      { name: 'Pantai Jimbaran (Seafood Dinner Pantai)', desc: 'Makan malam santai ikan kakap bakar dan udang madu segar langsung di atas hamparan pasir pantai.', price: 150000, rating: 4.7 }
    ]
  },
  {
    day: 3,
    zone: 'Bahari Nusa Dua & Sentra Kafe Estetik',
    totalDistanceKm: 22,
    spots: [
      { name: 'Waterblow Nusa Dua', desc: 'Fenomena semburan ombak raksasa yang menerpa celah tebing karang karang bolong di semenanjung Nusa Dua.', price: 25000, rating: 4.6 },
      { name: 'Pantai Mengiat Nusa Dua', desc: 'Hamparan pasir putih bersih dengan air laut tenang yang sangat aman untuk berenang santai.', price: 10000, rating: 4.8 },
      { name: 'Pusat Kuliner & Oleh-Oleh Khas Bali', desc: 'Belanja pie susu segar, kacang disco, dan kerajinan tangan lokal sebelum transfer ke Bandara Ngurah Rai.', price: 0, rating: 4.7 }
    ]
  }
];

export default function Itinerary() {
  const [region, setRegion] = useState('Pulau Bali');
  const [days, setDays] = useState(3);
  const [travelerType, setTravelerType] = useState('couple');
  const [pace, setPace] = useState('sedang');
  const [budgetTier, setBudgetTier] = useState('comfort');
  const [selectedDay, setSelectedDay] = useState('all');
  const [itinerary, setItinerary] = useState(SAMPLE_BALI_DAYS);
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gastrip_target_region');
    if (saved) {
      setRegion(saved);
    }
  }, []);

  async function handleAnalyze() {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          days: Number(days),
          traveler_type: travelerType,
          pace,
          budget_tier: budgetTier
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.itinerary && Array.isArray(data.itinerary)) {
          setItinerary(data.itinerary);
        }
      }
    } catch (e) {
      // Fallback to sample days
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleCopyWhatsApp() {
    let txt = `*JADWAL LIBURAN: ${region.toUpperCase()}*\n`;
    txt += `📅 Durasi: ${days} Hari | Tipe: ${travelerType.toUpperCase()} | Ritme: ${pace}\n`;
    txt += `------------------------------------\n\n`;

    itinerary.forEach(d => {
      txt += `*HARI ${d.day} — ${d.zone}*\n`;
      d.spots.forEach((s, idx) => {
        txt += `${idx + 1}. ${s.name} (${s.price === 0 ? 'Gratis' : 'Rp ' + s.price.toLocaleString('id-ID')})\n`;
      });
      txt += `\n`;
    });

    txt += `Dirancang via NusaTrip Indonesia.`;
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  const daysToDisplay = selectedDay === 'all'
    ? itinerary
    : itinerary.filter(d => d.day === Number(selectedDay));

  const totalCost = 3500000;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ededed]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#18409f]">
            Rencana Perjalanan Geospasial
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#061e5a]">
            Liburan {region} ({days} Hari)
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyWhatsApp}
            className="px-4 py-2 border border-[#ededed] hover:border-[#061e5a] bg-[#ffffff] text-xs font-bold text-[#061e5a] transition rounded-none flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Bagikan ke WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Configuration Form Bar */}
      <div className="bg-[#ffffff] border border-[#ededed] p-5 rounded-none shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          
          <div className="space-y-1">
            <label className="font-bold text-[#061e5a]">Daerah / Pulau</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#061e5a]">Durasi Liburan</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            >
              <option value={2}>2 Hari 1 Malam</option>
              <option value={3}>3 Hari 2 Malam</option>
              <option value={4}>4 Hari 3 Malam</option>
              <option value={5}>5 Hari 4 Malam</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#061e5a]">Tipe Traveler</label>
            <select
              value={travelerType}
              onChange={(e) => setTravelerType(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            >
              <option value="solo">Solo Traveler</option>
              <option value="couple">Couple / Pasangan</option>
              <option value="family">Keluarga (Anak/Ortu)</option>
              <option value="friends">Grup Teman</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#061e5a]">Kelas Budget</label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            >
              <option value="budget">Hemat (Hostel &amp; Motor)</option>
              <option value="comfort">Nyaman (Hotel 3-4★ &amp; Mobil)</option>
              <option value="luxury">Sultan (Resort 5★ &amp; VIP)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-2.5 px-4 bg-[#061e5a] hover:bg-[#18409f] disabled:opacity-50 text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none shadow-sm"
            >
              {isAnalyzing ? 'Menganalisis...' : 'Mulai Analisis'}
            </button>
          </div>

        </div>

      </div>

      {/* Day Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#ededed] pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 font-bold transition rounded-none ${selectedDay === 'all' ? 'bg-[#061e5a] text-[#ffffff]' : 'bg-[#ffffff] text-[#595959] hover:bg-[#ededed] border border-[#ededed]'}`}
        >
          Semua Hari ({itinerary.length}H)
        </button>
        {itinerary.map(d => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(String(d.day))}
            className={`px-4 py-2 font-bold transition rounded-none ${selectedDay === String(d.day) ? 'bg-[#061e5a] text-[#ffffff]' : 'bg-[#ffffff] text-[#595959] hover:bg-[#ededed] border border-[#ededed]'}`}
          >
            Hari {d.day}
          </button>
        ))}
      </div>

      {/* Main Itinerary Cards & Budget Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Itinerary Timeline List */}
        <div className="lg:col-span-2 space-y-6">
          {daysToDisplay.map(d => (
            <div key={d.day} className="bg-[#ffffff] border border-[#ededed] rounded-none p-6 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#ededed]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#061e5a] text-[#fed988] flex items-center justify-center font-bold text-xs">
                    {d.day}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#061e5a]">
                    Hari {d.day}: {d.zone}
                  </h3>
                </div>
                <span className="text-[11px] text-[#595959] font-medium">
                  {d.spots.length} Titik Kunjungan • ~{d.totalDistanceKm} km
                </span>
              </div>

              {/* Spot Items */}
              <div className="space-y-4">
                {d.spots.map((spot, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-4 p-3.5 bg-[#f8f8f8] border border-[#ededed]">
                    <span className="w-6 h-6 bg-[#18409f] text-[#ffffff] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-[#061e5a]">{spot.name}</h4>
                        <span className="text-[11px] font-bold text-[#18409f]">
                          {spot.price === 0 ? 'Gratis' : 'Rp ' + spot.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-xs text-[#595959] leading-relaxed">{spot.desc}</p>
                      <div className="pt-1 flex items-center gap-3 text-[11px] text-[#8c8c8c]">
                        <span>⭐ Rating {spot.rating || 4.8}</span>
                        <span>•</span>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + region)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#18409f] hover:underline font-semibold"
                        >
                          Buka di Google Maps &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Right: Budget & Summary Card */}
        <div className="space-y-6">
          
          <div className="bg-[#ffffff] border border-[#ededed] p-6 rounded-none space-y-4">
            <h3 className="font-serif font-bold text-base text-[#061e5a] pb-2 border-b border-[#ededed]">
              Estimasi Anggaran Liburan
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#ededed]">
                <span className="text-[#595959]">Penginapan (Hotel 3-4★)</span>
                <span className="font-bold text-[#282828]">Rp 1.300.000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ededed]">
                <span className="text-[#595959]">Sewa Mobil &amp; BBM (3 Hari)</span>
                <span className="font-bold text-[#282828]">Rp 1.250.000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ededed]">
                <span className="text-[#595959]">Tiket Masuk &amp; Retribusi Wisata</span>
                <span className="font-bold text-[#282828]">Rp 320.000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ededed]">
                <span className="text-[#595959]">Kuliner &amp; Konsumsi Lokal</span>
                <span className="font-bold text-[#282828]">Rp 500.000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ededed]">
                <span className="text-[#595959]">Cadangan Parkir &amp; Logistik</span>
                <span className="font-bold text-[#282828]">Rp 130.000</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-[#061e5a] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#061e5a] block">Total Estimasi</span>
                <span className="text-[10px] text-[#595959]">Per orang (di luar tiket pesawat)</span>
              </div>
              <span className="font-serif font-bold text-xl text-[#061e5a]">
                Rp {totalCost.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="w-full py-2.5 bg-[#061e5a] hover:bg-[#18409f] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none"
            >
              Export Itinerary
            </button>
          </div>

          {/* Tips Card */}
          <div className="bg-[#f0f4ff] border border-[#d0deff] p-5 rounded-none space-y-2 text-xs">
            <h4 className="font-bold text-[#061e5a]">💡 Tips Perjalanan Searah</h4>
            <p className="text-[#061e5a]/80 leading-relaxed text-[11px]">
              Setiap rute hari disusun berurutan secara terarah demi menghemat BBM dan menghindari jam macet sore hari di kawasan perkotaan.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

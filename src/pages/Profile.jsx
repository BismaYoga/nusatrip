import React, { useState, useEffect } from 'react';
import { User, MapPin, Compass, Check, ArrowRight } from 'lucide-react';

export default function Profile({ setRoute }) {
  const [name, setName] = useState('Bisma Yoga');
  const [email, setEmail] = useState('bismayoga@nusatrip.id');
  const [origin, setOrigin] = useState('Jakarta (CGK)');
  const [holidayStyle, setHolidayStyle] = useState('Alam & Hidden Gems (Santai)');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const n = localStorage.getItem('gastrip_user_name');
    const m = localStorage.getItem('gastrip_user_email');
    if (n) setName(n);
    if (m) setEmail(m);
  }, []);

  function handleSaveProfile(e) {
    e.preventDefault();
    localStorage.setItem('gastrip_user_name', name);
    localStorage.setItem('gastrip_user_email', email);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  }

  function handleOpenItinerary(target) {
    localStorage.setItem('gastrip_target_region', target);
    setRoute('itinerary');
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-[#ffffff] border border-[#ededed] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-none">
        
        <div className="flex items-center gap-5">
          {/* Avatar Frame */}
          <div className="w-20 h-20 rounded-none bg-[#070e1e] text-[#fed988] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#fed988] shrink-0">
            BY
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#070e1e]">{name}</h1>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#070e1e] text-[#fed988] border border-[#fed988]/40 rounded-none">
                Verified Traveler
              </span>
            </div>
            <p className="text-xs text-[#595959]">{email}</p>
            <p className="text-[11px] text-[#8c8c8c]">Member NusaTrip sejak Oktober 2026 • Wilayah Domisili: Indonesia</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => handleOpenItinerary('Pulau Bali')}
            className="flex-1 md:flex-none text-center px-4 py-2.5 bg-[#070e1e] hover:bg-[#121d38] text-[#ffffff] text-xs font-bold transition rounded-none"
          >
            + Rencana Liburan Baru
          </button>
          <button
            onClick={() => setRoute('settings')}
            className="px-3.5 py-2.5 border border-[#ededed] hover:border-[#070e1e] bg-[#ffffff] text-xs font-semibold text-[#070e1e] transition rounded-none"
          >
            Pengaturan
          </button>
        </div>

      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-1 rounded-none">
          <span className="text-[11px] font-semibold text-[#595959] uppercase tracking-wider">Destinasi</span>
          <div className="text-2xl font-serif font-bold text-[#070e1e]">8 Wilayah</div>
          <p className="text-[10px] text-[#8c8c8c]">Bali, Jogja, Bajo, Lombok &amp; lainnya</p>
        </div>

        <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-1 rounded-none">
          <span className="text-[11px] font-semibold text-[#595959] uppercase tracking-wider">Hari Terencana</span>
          <div className="text-2xl font-serif font-bold text-[#070e1e]">14 Hari</div>
          <p className="text-[10px] text-[#8c8c8c]">Tersusun terarah &amp; minim macet</p>
        </div>

        <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-1 rounded-none">
          <span className="text-[11px] font-semibold text-[#595959] uppercase tracking-wider">Rute Favorit</span>
          <div className="text-2xl font-serif font-bold text-[#070e1e]">Pulau Bali</div>
          <p className="text-[10px] text-[#8c8c8c]">Ubud &amp; Pantai Selatan Uluwatu</p>
        </div>

        <div className="bg-[#ffffff] border border-[#ededed] p-5 space-y-1 rounded-none">
          <span className="text-[11px] font-semibold text-[#595959] uppercase tracking-wider">Konsultasi AI</span>
          <div className="text-2xl font-serif font-bold text-[#121d38]">NusaBot Aktif</div>
          <p className="text-[10px] text-[#8c8c8c]">20 kuota konsultasi instan/menit</p>
        </div>

      </div>

      {/* Saved Itineraries */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-[#ededed]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#070e1e]">Rencana Perjalanan Tersimpan</h2>
            <p className="text-xs text-[#595959]">Itinerary yang Anda racik menggunakan mesin geospasial &amp; AI NusaTrip.</p>
          </div>
          <button
            onClick={() => handleOpenItinerary('Pulau Bali')}
            className="text-xs font-bold text-[#121d38] hover:underline flex items-center gap-1"
          >
            <span>Buka Planner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Bali */}
          <div className="bg-[#ffffff] border border-[#ededed] flex flex-col justify-between group hover:border-[#070e1e] transition rounded-none">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 bg-[#f0f4ff] text-[#070e1e] font-bold text-[10px] uppercase tracking-wider border border-[#d0deff] rounded-none">
                  Aktif • Siap Berangkat
                </span>
                <span className="text-[#8c8c8c] text-[11px]">3 Hari • 12 Spot</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#070e1e] group-hover:text-[#121d38] transition">
                Liburan Pulau Bali &amp; Uluwatu
              </h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Rute searah Ubud Arts, Sawah Tegallalang, Pantai Melasti, Tari Kecak Uluwatu, dan Dinner Jimbaran Seafood.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#070e1e] flex items-center justify-between">
                <span>Estimasi Budget:</span>
                <span className="font-bold">Rp 3.500.000 / pax</span>
              </div>
            </div>
            <div className="p-4 bg-[#f8f8f8] border-t border-[#ededed] flex items-center justify-between">
              <button
                onClick={() => handleOpenItinerary('Pulau Bali')}
                className="text-xs font-bold text-[#070e1e] hover:text-[#121d38] transition"
              >
                Lihat Peta &amp; Rute &rarr;
              </button>
              <span className="text-[10px] text-[#8c8c8c]">Terakhir disunting</span>
            </div>
          </div>

          {/* Card 2: Labuan Bajo */}
          <div className="bg-[#ffffff] border border-[#ededed] flex flex-col justify-between group hover:border-[#070e1e] transition rounded-none">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 bg-[#f8f8f8] text-[#595959] font-bold text-[10px] uppercase tracking-wider border border-[#ededed] rounded-none">
                  Tersimpan
                </span>
                <span className="text-[#8c8c8c] text-[11px]">3 Hari • Speedboat</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#070e1e] group-hover:text-[#121d38] transition">
                Tour Bahari Labuan Bajo &amp; Komodo
              </h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Trekking Sunrise Pulau Padar, Snorkeling Pink Beach, Manta Point, Taka Makassar, dan Kuliner Seafood Kampung Ujung.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#070e1e] flex items-center justify-between">
                <span>Estimasi Budget:</span>
                <span className="font-bold">Rp 4.200.000 / pax</span>
              </div>
            </div>
            <div className="p-4 bg-[#f8f8f8] border-t border-[#ededed] flex items-center justify-between">
              <button
                onClick={() => handleOpenItinerary('Labuan Bajo')}
                className="text-xs font-bold text-[#070e1e] hover:text-[#121d38] transition"
              >
                Lihat Peta &amp; Rute &rarr;
              </button>
              <span className="text-[10px] text-[#8c8c8c]">Draft tersimpan</span>
            </div>
          </div>

          {/* Card 3: Jogja */}
          <div className="bg-[#ffffff] border border-[#ededed] flex flex-col justify-between group hover:border-[#070e1e] transition rounded-none">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 bg-[#f8f8f8] text-[#595959] font-bold text-[10px] uppercase tracking-wider border border-[#ededed] rounded-none">
                  Riwayat
                </span>
                <span className="text-[#8c8c8c] text-[11px]">3 Hari • Budaya</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#070e1e] group-hover:text-[#121d38] transition">
                Eksplorasi Budaya &amp; Kuliner DI Yogyakarta
              </h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Keraton Yogyakarta, Tamansari, Candi Prambanan, Lava Tour Merapi Jeep 4x4, dan Santap Lodeh Kopi Klotok Pakem.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#070e1e] flex items-center justify-between">
                <span>Estimasi Budget:</span>
                <span className="font-bold">Rp 1.850.000 / pax</span>
              </div>
            </div>
            <div className="p-4 bg-[#f8f8f8] border-t border-[#ededed] flex items-center justify-between">
              <button
                onClick={() => handleOpenItinerary('DI Yogyakarta')}
                className="text-xs font-bold text-[#070e1e] hover:text-[#121d38] transition"
              >
                Lihat Peta &amp; Rute &rarr;
              </button>
              <span className="text-[10px] text-[#8c8c8c]">Selesai dijalani</span>
            </div>
          </div>

        </div>

      </div>

      {/* Form: Edit Profile Details */}
      <div className="bg-[#ffffff] border border-[#ededed] p-6 sm:p-8 space-y-6 rounded-none">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#070e1e]">Informasi Akun &amp; Preferensi Wisatawan</h2>
          <p className="text-xs text-[#595959]">Informasi ini digunakan NusaBot untuk menyusun rekomendasi liburan yang tepat sasaran.</p>
        </div>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          <div className="space-y-1.5">
            <label className="font-bold text-[#070e1e]">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#070e1e] outline-none rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#070e1e]">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#070e1e] outline-none rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#070e1e]">Kota Asal Keberangkatan</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#070e1e] outline-none rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#070e1e]">Gaya Liburan Utama</label>
            <select
              value={holidayStyle}
              onChange={(e) => setHolidayStyle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#070e1e] outline-none rounded-none"
            >
              <option>Alam &amp; Hidden Gems (Santai)</option>
              <option>Wisata Pantai &amp; Bahari</option>
              <option>Wisata Budaya &amp; Candi Bersejarah</option>
              <option>Wisata Kuliner Halal Autentik</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-2 flex items-center justify-between">
            {savedNotice && (
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Profil berhasil diperbarui!</span>
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#070e1e] hover:bg-[#121d38] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none ml-auto shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

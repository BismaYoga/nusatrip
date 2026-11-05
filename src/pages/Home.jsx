import React, { useState, useEffect } from 'react';
import { Search, Compass, ShieldCheck, MapPin, Sparkles, Calendar, Users, Wallet, ArrowRight } from 'lucide-react';

const HERO_SLIDES = [
  { name: 'Gunung Bromo — Jawa Timur', bg: 'assets/hero_bromo.jpg' },
  { name: 'Labuan Bajo & Pulau Padar — NTT', bg: 'assets/hero_labuan_bajo.jpg' },
  { name: 'Danau Beratan Bedugul — Bali', bg: 'assets/hero_bali.jpg' },
  { name: 'Candi Borobudur — Jawa Tengah', bg: 'assets/hero_borobudur.jpg' },
  { name: 'Kepulauan Raja Ampat — Papua Barat', bg: 'assets/hero_raja_ampat.jpg' },
];

export default function Home({ setRoute }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [regionInput, setRegionInput] = useState('Pulau Bali');

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function handleStartPlan() {
    localStorage.setItem('gastrip_target_region', regionInput);
    setRoute('itinerary');
  }

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Fullscreen Hero Section */}
      <section className="relative w-full h-[88vh] min-h-[580px] max-h-[850px] overflow-hidden flex items-center justify-center bg-[#061e5a]">
        
        {/* Rotating Background Slides */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === slideIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
        ))}

        {/* Deep Midnight Navy Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061e5a] via-[#061e5a]/50 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#061e5a]/80 backdrop-blur-md border border-[#fed988]/40 text-[#fed988] text-xs font-semibold uppercase tracking-wider rounded-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Perencana Liburan Nusantara Cerdas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#ffffff] leading-tight tracking-tight max-w-4xl mx-auto drop-shadow-md">
            Jelajahi Kemegahan Indonesia dengan Rute Searah &amp; Terarah
          </h1>

          <p className="text-sm sm:text-base text-[#f8f8f8]/90 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-xs">
            Optimasi rute perjalanan bebas macet, estimasi budget realistis, dan rekomendasi spot tersembunyi berdaya kecerdasan geospasial &amp; AI NusaBot.
          </p>

          {/* Search Box Card */}
          <div className="max-w-3xl mx-auto bg-[#ffffff] p-3 sm:p-4 border border-[#ededed] shadow-2xl rounded-none text-left space-y-3">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Destination Input */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-[#061e5a] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#061e5a]" />
                  <span>Tujuan Liburan</span>
                </label>
                <input
                  type="text"
                  value={regionInput}
                  onChange={(e) => setRegionInput(e.target.value)}
                  placeholder="Ketik tujuan (cth: Bali, Jogja, Labuan Bajo, Bromo, Lombok)"
                  className="w-full px-3 py-2 bg-[#f8f8f8] border border-[#ededed] font-semibold text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
                />
              </div>

              {/* Action Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleStartPlan}
                  className="w-full py-2.5 px-4 bg-[#061e5a] hover:bg-[#18409f] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-4 h-4 text-[#fed988]" />
                  <span>Mulai Rancang</span>
                </button>
              </div>

            </div>

            {/* Quick Destination Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#ededed] text-[11px]">
              <span className="text-[#595959] font-medium">Pilihan Populer:</span>
              {['Pulau Bali', 'Labuan Bajo', 'DI Yogyakarta', 'Pulau Lombok', 'Bromo', 'Kepulauan Belitung'].map((reg, rIdx) => (
                <button
                  key={rIdx}
                  type="button"
                  onClick={() => {
                    setRegionInput(reg);
                    localStorage.setItem('gastrip_target_region', reg);
                    setRoute('itinerary');
                  }}
                  className="px-2 py-0.5 bg-[#f8f8f8] hover:bg-[#ededed] text-[#061e5a] font-medium transition border border-[#ededed] rounded-none"
                >
                  {reg}
                </button>
              ))}
            </div>

          </div>

          {/* Carousel Slide Indicators */}
          <div className="pt-4 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-[#ffffff]/90 tracking-wide">
              {HERO_SLIDES[slideIdx].name}
            </span>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setSlideIdx(dotIdx)}
                  className={`h-[3px] transition-all rounded-none ${dotIdx === slideIdx ? 'w-8 bg-[#fed988]' : 'w-4 bg-[#ffffff]/40 hover:bg-[#ffffff]/70'}`}
                  title={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* 2. Philosophy & Core Pillars */}
      <section className="py-16 sm:py-24 bg-[#ffffff] border-b border-[#ededed]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-[#18409f] block">
              Filosofi Perjalanan Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#061e5a]">
              Liburan Nyaman Tanpa Terjebak Kemacetan
            </h2>
            <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
              Kami menyusun setiap rute berdasarkan geospasial aktual pulau Indonesia, memastikan pergerakan selalu searah demi pengalaman liburan yang rileks dan bermakna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-[#f8f8f8] border border-[#ededed] space-y-3 rounded-none">
              <div className="w-10 h-10 bg-[#061e5a] text-[#fed988] flex items-center justify-center rounded-none font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-[#061e5a]">Rute Searah Geospasial</h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Algoritma pengurutan cerdas yang meminimalkan waktu tempuh di jalan sehingga waktu Anda tercurah sepenuhnya untuk menikmati pesona destinasi.
              </p>
            </div>

            <div className="p-6 bg-[#f8f8f8] border border-[#ededed] space-y-3 rounded-none">
              <div className="w-10 h-10 bg-[#061e5a] text-[#fed988] flex items-center justify-center rounded-none font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-[#061e5a]">Estimasi Budget Transparan</h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Kalkulasi biaya akurat per orang mencakup tiket masuk resmi, penginapan, transportasi, konsumsi lokal, dan cadangan logistik.
              </p>
            </div>

            <div className="p-6 bg-[#f8f8f8] border border-[#ededed] space-y-3 rounded-none">
              <div className="w-10 h-10 bg-[#061e5a] text-[#fed988] flex items-center justify-center rounded-none font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-[#061e5a]">Asisten AI NusaBot 24/7</h3>
              <p className="text-xs text-[#595959] leading-relaxed">
                Konsultasikan jadwal penyeberangan fastboat, rekomendasi kuliner halal autentik, hingga hidden gem air terjun kapan pun Anda butuhkan.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Call to Action Banner */}
      <section className="py-16 bg-[#061e5a] text-[#ffffff] border-t border-[#18409f]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#ffffff]">
            Siap Memulai Petualangan Wisata Nusantara?
          </h2>
          <p className="text-xs sm:text-sm text-[#c8ccd7] max-w-xl mx-auto leading-relaxed">
            Hanya butuh 3 detik untuk meracik panduan perjalanan lengkap dengan peta interaktif, susunan hari, dan estimasi biaya.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setRoute('itinerary')}
              className="px-8 py-3.5 bg-[#fed988] hover:bg-[#fdd887] text-[#061e5a] font-bold text-xs uppercase tracking-wider transition rounded-none shadow-lg inline-flex items-center gap-2"
            >
              <span>Rancang Itinerary Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#061e5a]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

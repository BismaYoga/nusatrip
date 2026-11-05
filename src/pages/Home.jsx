import React, { useState, useEffect } from 'react';

const HERO_SLIDES = [
  { name: 'Gunung Bromo — Jawa Timur', bg: 'assets/hero_bromo.jpg' },
  { name: 'Labuan Bajo & Pulau Padar — NTT', bg: 'assets/hero_labuan_bajo.jpg' },
  { name: 'Danau Beratan Bedugul — Bali', bg: 'assets/hero_bali.jpg' },
  { name: 'Candi Borobudur — Jawa Tengah', bg: 'assets/hero_borobudur.jpg' },
  { name: 'Kepulauan Raja Ampat — Papua Barat', bg: 'assets/hero_raja_ampat.jpg' },
];

export default function Home({ setRoute }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col">
      
      {/* ========================================== */}
      {/* 1. FULLSCREEN HERO WITH ROTATING BG SLIDES */}
      {/* ========================================== */}
      <section className="hero-slider-wrap" id="heroSection">
        
        {/* 5 Background Tourism Slides (100% Famous Indonesian Destinations) */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-item ${idx === slideIdx ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
        ))}

        {/* Dark Tint Scrim Overlay */}
        <div className="hero-overlay-dark"></div>

        {/* Inner Hero Content Container */}
        <div className="hero-content-wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Top Spacer */}
          <div></div>

          {/* Center Typography & Call to Action */}
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#e7e5e4] block">
              Platform Perencana Perjalanan Indonesia
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#ffffff] font-serif tracking-tight leading-tight">
              Jelajahi Nusantara <br className="hidden sm:inline" />Sesuai Rencanamu
            </h1>

            <p className="text-base text-[#d6d3d1] leading-relaxed max-w-2xl mx-auto">
              Platform perencana liburan cerdas nomor satu. Temukan rute searah bebas macet, estimasi biaya transparan, dan rekomendasi destinasi otentik di seluruh pelosok Indonesia.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setRoute('itinerary')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-none bg-[#fed988] hover:bg-[#fdd887] text-[#061e5a] font-bold text-sm transition shadow-md"
              >
                <span>Rancang Itinerary Sekarang</span>
                <span>&rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => setRoute('about')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-none bg-transparent hover:bg-[#ffffff]/10 text-[#ffffff] font-semibold text-sm border border-[#ffffff]/40 transition"
              >
                Pelajari Cara Kerja
              </button>
            </div>
          </div>

          {/* Bottom Status Bar & Slide Navigation (No Icon Bulat, No 1/5 Total Slide) */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#ffffff]/15 text-xs text-[#d6d3d1]">
            
            {/* Current Slide Location Label */}
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-widest text-[#fed988] font-bold">Destinasi</span>
              <span id="heroSlideLocation" className="text-sm font-semibold text-[#ffffff] tracking-wide font-sans">
                {HERO_SLIDES[slideIdx].name}
              </span>
            </div>

            {/* Slide Indicator Bars (Sharp, Zero Radius) */}
            <div className="flex items-center gap-2" id="heroSlideDots">
              {HERO_SLIDES.map((slide, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setSlideIdx(dotIdx)}
                  className={`${dotIdx === slideIdx ? 'w-8 bg-[#fed988]' : 'w-4 bg-[#ffffff]/35 hover:bg-[#ffffff]/70'} h-[3px] rounded-none transition-all`}
                  title={slide.name}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. VALUE PROPOSITION & 3 FEATURED CARDS     */}
      {/* ========================================== */}
      <section className="py-20 border-b border-[#ededed] bg-[#f8f8f8]" id="sectionPhilosophy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#18409f] block">
              Filosofi Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#061e5a] font-serif tracking-tight">
              Kenapa NusaTrip Diciptakan?
            </h2>
            <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
              Menyusun rencana perjalanan di Indonesia seringkali melelahkan karena informasi yang tersebar dan rute yang tidak efisien. NusaTrip hadir memadukan kecerdasan buatan dan data geospasial riil agar liburanmu terencana sempurna, hemat waktu, dan sesuai budget.
            </p>
          </div>

          {/* 3 Featured Destination Cards (Wireframe Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Karangasem Bali */}
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('gastrip_target_region', 'Karangasem');
                setRoute('itinerary');
              }}
              className="group block text-left rounded-[6px] overflow-hidden bg-[#ffffff] border border-[#ededed] shadow-xs hover:border-[#18409f] transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-[#f8f8f8]">
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="Pura Lempuyang Karangasem" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="p-5 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#18409f]">Destinasi Budaya</span>
                <h3 className="text-lg font-bold text-[#061e5a] font-serif">Pura Lempuyang</h3>
                <p className="text-xs text-[#595959]">Karangasem, Bali</p>
              </div>
            </button>

            {/* Card 2: Pantai Menganti Kebumen */}
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('gastrip_target_region', 'Kebumen');
                setRoute('itinerary');
              }}
              className="group block text-left rounded-[6px] overflow-hidden bg-[#ffffff] border border-[#ededed] shadow-xs hover:border-[#18409f] transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-[#f8f8f8]">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Pantai Menganti Kebumen" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="p-5 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#18409f]">Wisata Pesisir</span>
                <h3 className="text-lg font-bold text-[#061e5a] font-serif">Pantai Menganti</h3>
                <p className="text-xs text-[#595959]">Kebumen, Jawa Tengah</p>
              </div>
            </button>

            {/* Card 3: Labuan Bajo NTT */}
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('gastrip_target_region', 'Labuan Bajo & Komodo');
                setRoute('itinerary');
              }}
              className="group block text-left rounded-[6px] overflow-hidden bg-[#ffffff] border border-[#ededed] shadow-xs hover:border-[#18409f] transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-[#f8f8f8]">
                <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80" alt="Taman Nasional Komodo Labuan Bajo" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div className="p-5 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#18409f]">Taman Nasional Bahari</span>
                <h3 className="text-lg font-bold text-[#061e5a] font-serif">Pulau Padar &amp; Komodo</h3>
                <p className="text-xs text-[#595959]">Labuan Bajo, NTT</p>
              </div>
            </button>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 3. SECTION ABOUT US (RINGKAS DI HOME)      */}
      {/* ========================================== */}
      <section className="py-20 border-b border-[#ededed] bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Narasi About Us & Manfaat */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#18409f] block">
                Tentang Kami
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#061e5a] font-serif tracking-tight">
                Kenapa NusaTrip Berbeda &amp; Layak Kamu Gunakan?
              </h2>
              <p className="text-sm sm:text-base text-[#595959] leading-relaxed">
                NusaTrip dirancang khusus untuk memecahkan kebingungan traveler saat menyusun agenda wisata di Indonesia. Bukan sekadar rekomendasi tempat umum, kami menghadirkan solusi menyeluruh untuk liburan efisien:
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="border-l-2 border-[#061e5a] pl-4 space-y-1">
                  <h4 className="text-sm font-bold text-[#061e5a]">Rute Searah Minim Bolak-Balik</h4>
                  <p className="text-xs text-[#595959]">Algoritma klaster cerdas mengurutkan destinasi agar searah, menghemat waktu di jalan hingga 35%.</p>
                </div>
                <div className="border-l-2 border-[#061e5a] pl-4 space-y-1">
                  <h4 className="text-sm font-bold text-[#061e5a]">Estimasi Biaya Transparan</h4>
                  <p className="text-xs text-[#595959]">Kalkulasi rinci tiket masuk resmi, sewa armada, penginapan, dan konsumsi tanpa biaya siluman.</p>
                </div>
                <div className="border-l-2 border-[#061e5a] pl-4 space-y-1">
                  <h4 className="text-sm font-bold text-[#061e5a]">Data Otentik 100% Nyata</h4>
                  <p className="text-xs text-[#595959]">Terintegrasi langsung dengan koordinat GPS OpenStreetMap dan ulasan riil Google Maps di setiap daerah.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setRoute('about')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#061e5a] hover:text-[#18409f] transition"
                >
                  <span>Baca Selengkapnya Tentang Kami</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Reviewer Card Testimonial */}
            <div className="lg:col-span-5">
              <div className="bg-[#f8f8f8] rounded-[6px] p-8 border border-[#ededed] space-y-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#18409f]">
                  Rating Wisatawan • 5.0 / 5.0
                </div>

                <blockquote className="text-sm text-[#282828] font-serif leading-relaxed italic">
                  &ldquo;Itinerary NusaTrip bikin liburan keluarga kami di Bali dan Karangasem teratur banget. Rutenya searah gak ada bolak-balik, estimasi biaya tiketnya pas di kantong, dan kami nemu spot tersembunyi yang otentik!&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-[#ededed] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#061e5a]">Bisma Yoga &amp; Keluarga</h4>
                    <p className="text-[#595959]">Wisatawan Terverifikasi • Jakarta</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-none bg-[#fed988] text-[#061e5a] font-bold text-[11px] border border-[#ebd080]">
                    Terverifikasi
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

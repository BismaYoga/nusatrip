import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  StarRating,
  Section,
  SectionHeader,
  DestinationGallery
} from '../components/index.js';
import { getAllDestinations, CATEGORY_LABELS } from '../lib/recommendation.js';

const HERO_SLIDES = [
  { name: 'Gunung Bromo — Jawa Timur', bg: 'assets/hero_bromo.jpg' },
  { name: 'Labuan Bajo & Pulau Padar — NTT', bg: 'assets/hero_labuan_bajo.jpg' },
  { name: 'Danau Beratan Bedugul — Bali', bg: 'assets/hero_bali.jpg' },
  { name: 'Candi Borobudur — Jawa Tengah', bg: 'assets/hero_borobudur.jpg' },
  { name: 'Kepulauan Raja Ampat — Papua Barat', bg: 'assets/hero_raja_ampat.jpg' },
];

// Semua wisata dataset, diurutkan selang-seling antar lokasi agar bervariasi
const DESTINATIONS = (() => {
  const groups = {};
  getAllDestinations().forEach((d) => (groups[d.regionKey] ||= []).push(d));
  const lists = Object.values(groups);
  const out = [];
  for (let i = 0; out.length < lists.flat().length; i++) {
    lists.forEach((l) => l[i] && out.push(l[i]));
  }
  return out;
})();

const FEATURES = [
  {
    title: 'Rute Searah Minim Bolak-Balik',
    desc: 'Algoritma klaster cerdas mengurutkan destinasi agar searah, menghemat waktu di jalan hingga 35%.'
  },
  {
    title: 'Estimasi Biaya Transparan',
    desc: 'Kalkulasi rinci tiket masuk resmi, sewa armada, penginapan, dan konsumsi tanpa biaya siluman.'
  },
  {
    title: 'Data Otentik 100% Nyata',
    desc: 'Terintegrasi langsung dengan koordinat GPS OpenStreetMap dan ulasan riil Google Maps di setiap daerah.'
  }
];

export default function Home({ setRoute }) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function openDestination(d) {
    try {
      localStorage.setItem('gastrip_target_region', d.regionKey);
    } catch {
      /* storage tidak tersedia */
    }
    setRoute('itinerary');
  }

  return (
    <div className="w-full flex flex-col">

      {/* 1. HERO — slide background */}
      <section className="hero-slider-wrap" id="heroSection">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-item ${idx === slideIdx ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
        ))}
        <div className="hero-overlay-dark" />

        <div className="hero-content-wrap max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div />

          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6 text-canvas">
            <Typography variant="note" className="uppercase tracking-widest text-accent">
              Platform Perencana Perjalanan Indonesia
            </Typography>
            <Typography variant="h1">
              Jelajahi Nusantara <br className="hidden sm:inline" />Sesuai Rencanamu
            </Typography>
            <Typography variant="body" className="max-w-2xl">
              Platform perencana liburan cerdas nomor satu. Temukan rute searah bebas macet, estimasi biaya transparan, dan rekomendasi destinasi otentik di seluruh pelosok Indonesia.
            </Typography>
            <div className="w-full pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => setRoute('itinerary')}>
                Rancang Itinerary Sekarang
              </Button>
              <Button variant="light" size="lg" className="w-full sm:w-auto" onClick={() => setRoute('about')}>
                Pelajari Cara Kerja
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 border-t border-canvas/20">
            <div className="flex flex-col gap-1">
              <Typography variant="note" className="uppercase tracking-widest text-accent">Destinasi</Typography>
              <Typography variant="body" as="span" id="heroSlideLocation" className="text-canvas font-semibold">
                {HERO_SLIDES[slideIdx].name}
              </Typography>
            </div>
            <div className="flex items-center gap-2" id="heroSlideDots">
              {HERO_SLIDES.map((slide, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setSlideIdx(dotIdx)}
                  aria-label={slide.name}
                  className={`${dotIdx === slideIdx ? 'w-8 bg-accent' : 'w-4 bg-canvas/40 hover:bg-canvas/70'} h-1 transition-all`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILOSOFI + SEMUA TEMPAT WISATA DARI DATASET */}
      <Section tone="canvas" id="sectionPhilosophy">
        <SectionHeader
          eyebrow="Filosofi Kami"
          title="Kenapa NusaTrip Diciptakan?"
          description="Menyusun rencana perjalanan di Indonesia seringkali melelahkan karena informasi yang tersebar dan rute yang tidak efisien. NusaTrip hadir memadukan kecerdasan buatan dan data geospasial riil agar liburanmu terencana sempurna, hemat waktu, dan sesuai budget."
        />
        <DestinationGallery
          destinations={DESTINATIONS}
          categoryLabels={CATEGORY_LABELS}
          onSelect={openDestination}
        />
      </Section>

      {/* 3. TENTANG KAMI (RINGKAS) */}
      <Section tone="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeader
              align="left"
              eyebrow="Tentang Kami"
              title="Kenapa NusaTrip Berbeda & Layak Kamu Gunakan?"
              description="NusaTrip dirancang khusus untuk memecahkan kebingungan traveler saat menyusun agenda wisata di Indonesia. Bukan sekadar rekomendasi tempat umum, kami menghadirkan solusi menyeluruh untuk liburan efisien:"
            />
            <div className="flex flex-col gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="border-l-2 border-primary pl-4 flex flex-col gap-1">
                  <Typography variant="body" as="h3" className="text-primary font-semibold">{f.title}</Typography>
                  <Typography variant="body" className="text-ink">{f.desc}</Typography>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="self-start" onClick={() => setRoute('about')}>
              Baca Selengkapnya Tentang Kami
            </Button>
          </div>

          <div className="lg:col-span-5">
            <figure className="bg-canvas border border-line p-8 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <StarRating value="5.0" />
                <Typography variant="note" className="uppercase tracking-widest text-secondary">Rating Wisatawan</Typography>
              </div>
              <blockquote>
                <Typography variant="desc" className="italic text-ink">
                  &ldquo;Itinerary NusaTrip bikin liburan keluarga kami di Bali dan Karangasem teratur banget. Rutenya searah gak ada bolak-balik, estimasi biaya tiketnya pas di kantong, dan kami nemu spot tersembunyi yang otentik!&rdquo;
                </Typography>
              </blockquote>
              <figcaption className="pt-4 border-t border-line flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <Typography variant="body" as="span" className="text-primary font-semibold">Bisma Yoga &amp; Keluarga</Typography>
                  <Typography variant="note" className="text-ink">Wisatawan Terverifikasi • Jakarta</Typography>
                </div>
                <span className="px-2 py-1 bg-accent text-ink font-sans font-medium text-note">Terverifikasi</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

    </div>
  );
}

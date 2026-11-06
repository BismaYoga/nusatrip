import React, { useState, useEffect, useMemo, useRef } from 'react';
import { loadItinerarySession, saveItinerarySession } from '../lib/itinerarySession.js';
import { recommend, getRegionOptions, getCategoryOptions, matchRegionKey } from '../lib/recommendation.js';
import {
  Typography,
  PageHero,
  ItineraryForm,
  RecommendationCard,
  MapPanel
} from '../components/index.js';

const HERO_IMAGE = 'assets/hero_raja_ampat.jpg';
const REGION_OPTIONS = getRegionOptions();

function formatDateIndo(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1] || ''} ${y}`;
}

function getMapsUrl(spot, region) {
  return (
    spot.gmaps_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${spot.name} ${spot.kabupaten || region.replace(/\s*\(.*\)/, '')}`
    )}`
  );
}

export default function Itinerary() {
  const [initialRegion] = useState(() => {
    try {
      return matchRegionKey(localStorage.getItem('gastrip_target_region'));
    } catch {
      return '';
    }
  });

  // Session: dipulihkan saat kembali ke halaman ini, hilang hanya saat refresh
  const [session] = useState(() => loadItinerarySession());
  const [formValues, setFormValues] = useState(session?.form || null);

  const [result, setResult] = useState(session?.result || null); // { region, days: [{ day, date, spots }] }
  const [activeId, setActiveId] = useState(null);
  const scrollAfterSubmit = useRef(false);

  // Rekomendasi dihitung dari dataset: hanya spot di lokasi yang dipilih
  function handleSubmit(values) {
    setFormValues(values);
    scrollAfterSubmit.current = true;
    const rec = recommend({
      regionKey: values.region,
      startDate: values.startDate,
      endDate: values.endDate,
      budgetMax: values.budgetMax,
      pax: values.pax,
      interests: values.interests
    });
    setResult({ region: rec.regionName, days: rec.days });
    setActiveId(null);
  }

  // Simpan session setiap hasil berubah (termasuk saat spot dihapus)
  useEffect(() => {
    if (result) saveItinerarySession({ form: formValues, result });
  }, [result, formValues]);

  // Scroll ke hasil hanya setelah tombol Kirim (bukan saat session dipulihkan)
  useEffect(() => {
    if (!result || !scrollAfterSubmit.current) return;
    scrollAfterSubmit.current = false;
    document.getElementById('itineraryResult')?.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  function handleRemove(day, spot) {
    setResult((prev) => ({
      ...prev,
      days: prev.days.map((d) =>
        d.day === day ? { ...d, spots: d.spots.filter((s) => s !== spot) } : d
      )
    }));
  }

  // Daftar datar untuk kartu & pin peta (nomor berurutan)
  const items = useMemo(() => {
    if (!result) return [];
    let n = 0;
    return result.days.flatMap((d) =>
      d.spots.map((spot) => ({
        key: `${d.day}-${spot.id || spot.name}`,
        day: d.day,
        date: d.date,
        spot,
        number: ++n
      }))
    );
  }, [result]);

  const points = useMemo(
    () =>
      items.map((it) => ({
        id: it.key,
        lat: it.spot.lat,
        lng: it.spot.lng,
        number: it.number,
        name: it.spot.name
      })),
    [items]
  );

  return (
    <div className="w-full flex flex-col">
      <PageHero
        image={HERO_IMAGE}
        title="Kemana kamu mau liburan?"
        subtitle="Isi destinasi tujuan kamu"
        fadeBottom={!!result}
        className="no-print"
      >
        <ItineraryForm
          initialValues={formValues || { region: initialRegion }}
          regionOptions={REGION_OPTIONS}
          getCategoryOptions={getCategoryOptions}
          onSubmit={handleSubmit}
        />
      </PageHero>

      {result && (
        <section
          id="itineraryResult"
          className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 flex flex-col gap-8 scroll-mt-16"
        >
          <Typography variant="h2" className="text-primary text-center">
            Kamu cocoknya kesini..
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kiri: hasil rekomendasi */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {items.map((it) => (
                <RecommendationCard
                  key={it.key}
                  spot={it.spot}
                  number={it.number}
                  meta={`Hari ${it.day} · ${formatDateIndo(it.date)}`}
                  mapsUrl={getMapsUrl(it.spot, result.region)}
                  active={activeId === it.key}
                  onHover={() => setActiveId(it.key)}
                  onRemove={() => handleRemove(it.day, it.spot)}
                />
              ))}
            </div>

            {/* Kanan: peta, tetap di tempat saat di-scroll */}
            <div className="order-first lg:order-none lg:col-span-5 lg:sticky lg:top-24 h-96 lg:h-[calc(100vh-8rem)] border border-line">
              <MapPanel points={points} activeId={activeId} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

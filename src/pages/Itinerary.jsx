import React, { useState, useEffect, useMemo, useRef } from 'react';
import { REGIONS_DATA } from '../data/regionsData';
import { loadItinerarySession, saveItinerarySession } from '../lib/itinerarySession.js';
import {
  Typography,
  PageHero,
  ItineraryForm,
  RecommendationCard,
  MapPanel
} from '../components/index.js';
import { LOCATION_OPTIONS } from '../components/organisms/ItineraryForm.jsx';
<<<<<<< HEAD
=======
import { apiFetch } from '../utils/api.js';
>>>>>>> aaad2af3631b1e21c06b25818edea37bcc00f1a9

const HERO_IMAGE = 'assets/hero_raja_ampat.jpg';

function addDaysToDate(dateStr, daysToAdd) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().split('T')[0];
}

function formatDateIndo(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1] || ''} ${y}`;
}

function resolveRegionKey(query) {
  if (!query) return 'bali';
  const q = query.toLowerCase().trim();

  // Smart mapping for all Bali regencies, districts, and islands
  if (q.includes('penida') || q.includes('lembongan') || q.includes('ceningan')) return 'nusa-penida';
  if (q.includes('badung') || q.includes('kuta') || q.includes('seminyak') || q.includes('canggu') || q.includes('uluwatu') || q.includes('jimbaran') || q.includes('mengwi') || q.includes('petang') || q.includes('sangeh') || q.includes('melasti') || q.includes('pandawa')) return 'badung';
  if (q.includes('gianyar') || q.includes('ubud') || q.includes('tegallalang') || q.includes('tampaksiring') || q.includes('sukawati') || q.includes('blahbatuh') || q.includes('tirta empul')) return 'gianyar';
  if (q.includes('tabanan') || q.includes('bedugul') || q.includes('tanah lot') || q.includes('jatiluwih') || q.includes('beratan') || q.includes('baturiti') || q.includes('penebel')) return 'tabanan';
  if (q.includes('bangli') || q.includes('kintamani') || q.includes('batur') || q.includes('penglipuran') || q.includes('cepung') || q.includes('devasya')) return 'bangli';
  if (q.includes('karangasem') || q.includes('besakih') || q.includes('amed') || q.includes('lempuyang') || q.includes('tirta gangga') || q.includes('sidemen') || q.includes('tulamben') || q.includes('ujung')) return 'karangasem';
  if (q.includes('buleleng') || q.includes('lovina') || q.includes('sekumpul') || q.includes('menjangan') || q.includes('singaraja') || q.includes('gitgit') || q.includes('banyumala')) return 'buleleng';
  if (q.includes('denpasar') || q.includes('sanur') || q.includes('renon') || q.includes('bajra sandhi') || q.includes('kumbasari')) return 'denpasar';
  if (q.includes('jembrana') || q.includes('medewi') || q.includes('gilimanuk') || q.includes('negara') || q.includes('bunut bolong')) return 'jembrana';

  for (const [key, reg] of Object.entries(REGIONS_DATA)) {
    const name = reg.name.toLowerCase();
    if (name.includes(q) || q.includes(name) || key.includes(q) || q.includes(key)) {
      return key;
    }
  }
  return 'bali';
}

function countDays(start, end) {
  const diff = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  return Math.min(14, Math.max(1, diff || 1));
}

function deriveBudgetTier(budgetMax, days) {
  const perDay = Number(budgetMax || 0) / Math.max(1, days);
  if (perDay < 750000) return 'budget';
  if (perDay < 2500000) return 'comfort';
  return 'luxury';
}

// Fallback lokal bila API tidak tersedia
function buildLocalPlan(regionKey, days, startDate, interests) {
  const all = (REGIONS_DATA[regionKey] || REGIONS_DATA.bali).spots || [];
  const filtered = interests.length
    ? all.filter((s) => (s.categories || []).some((c) => interests.includes(c)))
    : all;
  // Prioritaskan yang cocok; bila kurang dari jumlah hari, lengkapi dengan sisanya
  const pool = filtered.length >= days ? filtered : [...filtered, ...all.filter((s) => !filtered.includes(s))];
  const perDay = Math.max(1, Math.ceil(pool.length / days));

  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    date: addDaysToDate(startDate, i),
    spots: pool.slice(i * perDay, (i + 1) * perDay)
  })).filter((d) => d.spots.length);
}

function getMapsUrl(spot, region) {
  return (
    spot.gmaps_url ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name} ${region}`)}`
  );
}

export default function Itinerary() {
  const [initialRegion] = useState(() => {
    try {
      const saved = localStorage.getItem('gastrip_target_region');
      return LOCATION_OPTIONS.some((o) => o.value === saved) ? saved : '';
    } catch {
      return '';
    }
  });

  // Session: dipulihkan saat kembali ke halaman ini, hilang hanya saat refresh
  const [session] = useState(() => loadItinerarySession());
  const [formValues, setFormValues] = useState(session?.form || null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(session?.result || null); // { region, days: [{ day, date, spots }] }
  const [activeId, setActiveId] = useState(null);
  const scrollAfterSubmit = useRef(false);

  async function handleSubmit(values) {
    setLoading(true);
    setFormValues(values);
    scrollAfterSubmit.current = true;
    const days = countDays(values.startDate, values.endDate);
    const regionKey = resolveRegionKey(values.region);
    let plan = null;

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region: values.region,
          days,
          traveler_type: Number(values.pax) <= 2 ? 'couple' : 'family',
          pace: 'balanced',
          budget_tier: deriveBudgetTier(values.budgetMax, days),
          interests: values.interests,
          start_date: values.startDate,
          pax_count: Number(values.pax),
          budget_min: Number(values.budgetMin) || null,
          budget_max: Number(values.budgetMax) || null
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.status === 'success' && json.data?.days?.length) {
          plan = json.data.days.map((d, idx) => ({
            day: d.day || idx + 1,
            date: addDaysToDate(values.startDate, idx),
            spots: d.spots || []
          }));
        }
      }
    } catch (err) {
      console.warn('API tidak tersedia, memakai rekomendasi lokal:', err);
    }

    if (!plan) plan = buildLocalPlan(regionKey, days, values.startDate, values.interests);

    setResult({ region: values.region, days: plan });
    setActiveId(null);
    setLoading(false);
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
          onSubmit={handleSubmit}
          loading={loading}
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

/**
 * Mesin rekomendasi Itinerary — sepenuhnya berbasis dataset (src/data/regionsData.js).
 * Input  : lokasi, tanggal (lama wisata), budget per orang, jumlah pax, preferensi jenis wisata.
 * Output : rencana per hari yang HANYA berisi spot dari lokasi yang dipilih.
 */
import { REGIONS_DATA } from '../data/regionsData.js';

/** Label jenis objek wisata. Kategori di luar daftar ini (mis. "family") adalah
 *  tag audiens, bukan jenis objek wisata, sehingga tidak dijadikan pilihan. */
export const CATEGORY_LABELS = {
  pantai: 'Pantai',
  alam: 'Alam',
  budaya: 'Budaya',
  relaksasi: 'Relaksasi',
  kuliner: 'Kuliner',
  petualangan: 'Petualangan'
};

const SPOTS_PER_DAY = 3;
const MAX_DAYS = 14;

/** Semua lokasi yang ada di dataset → opsi dropdown. */
export function getRegionOptions() {
  return Object.entries(REGIONS_DATA)
    .filter(([, r]) => (r.spots || []).length > 0)
    .map(([key, r]) => ({ value: key, label: r.name }));
}

/**
 * Jenis wisata yang benar-benar ada di dataset.
 * regionKey diisi → hanya kategori di lokasi itu; kosong → seluruh dataset.
 * Diurutkan dari yang paling banyak spotnya.
 */
export function getCategoryOptions(regionKey) {
  const regions = regionKey && REGIONS_DATA[regionKey]
    ? [REGIONS_DATA[regionKey]]
    : Object.values(REGIONS_DATA);
  const counts = {};
  regions.forEach((r) =>
    (r.spots || []).forEach((s) =>
      (s.categories || []).forEach((c) => {
        if (CATEGORY_LABELS[c]) counts[c] = (counts[c] || 0) + 1;
      })
    )
  );
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([value]) => ({ value, label: CATEGORY_LABELS[value] }));
}

/** Cocokkan teks lokasi bebas (mis. dari halaman Home) ke key dataset. */
export function matchRegionKey(text) {
  if (!text) return '';
  const q = String(text).toLowerCase().trim();
  if (REGIONS_DATA[q]) return q;
  for (const [key, r] of Object.entries(REGIONS_DATA)) {
    const name = r.name.toLowerCase();
    if (name.includes(q) || q.includes(key.replace('-', ' '))) return key;
  }
  return '';
}

export function countDays(start, end) {
  const diff = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  return Math.min(MAX_DAYS, Math.max(1, diff || 1));
}

function addDays(dateStr, n) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function distanceKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Urutkan spot sebagai rute nearest-neighbour agar tiap hari berdekatan. */
function orderAsRoute(spots) {
  if (spots.length < 2) return spots;
  const remaining = [...spots];
  const route = [remaining.shift()];
  while (remaining.length) {
    const last = route[route.length - 1];
    let best = 0;
    for (let i = 1; i < remaining.length; i++) {
      if (distanceKm(last, remaining[i]) < distanceKm(last, remaining[best])) best = i;
    }
    route.push(remaining.splice(best, 1)[0]);
  }
  return route;
}

function travelerType(pax) {
  if (pax <= 1) return 'solo';
  if (pax === 2) return 'couple';
  return 'family';
}

/**
 * Biaya hidup per orang (inap, transport, makan, lain-lain) dari dataset,
 * memilih kelas tertinggi yang masih masuk budget maksimal.
 */
function livingCost(region, days, budgetMax) {
  const nights = Math.max(0, days - 1);
  const tiers = ['luxury', 'comfort', 'budget'];
  const costOf = (t) => {
    const c = region.baseCosts?.[t];
    if (!c) return 0;
    return nights * c.stay + days * (c.transport + c.food + c.misc);
  };
  for (const t of tiers) {
    if (costOf(t) <= budgetMax) return { tier: t, cost: costOf(t) };
  }
  return { tier: 'budget', cost: costOf('budget') };
}

/**
 * Buat rekomendasi.
 * @returns {{ regionKey, regionName, tier, days: [{ day, date, spots }] }}
 */
export function recommend({ regionKey, startDate, endDate, budgetMax, pax, interests = [] }) {
  const region = REGIONS_DATA[regionKey];
  if (!region) return { regionKey, regionName: '', tier: null, days: [] };

  const days = countDays(startDate, endDate);
  const paxCount = Math.max(1, Number(pax) || 1);
  const maxBudget = Number(budgetMax) || Infinity;
  const type = travelerType(paxCount);
  const all = region.spots || [];

  // 1. Preferensi jenis wisata (bila dipilih): utamakan yang cocok
  const matches = (s) => (s.categories || []).filter((c) => interests.includes(c)).length;
  let pool = interests.length ? all.filter((s) => matches(s) > 0) : [...all];
  if (pool.length < days) {
    // terlalu sedikit → lengkapi dengan spot lain DI LOKASI YANG SAMA
    pool = [...pool, ...all.filter((s) => !pool.includes(s))];
  }

  // 2. Skor: kecocokan preferensi, rating, kesesuaian dengan jumlah pax
  const score = (s) =>
    matches(s) * 3 + (s.rating || 0) + ((s.suitableFor || []).includes(type) ? 1 : 0);
  pool.sort((a, b) => score(b) - score(a));

  // 3. Budget per orang: sisa setelah biaya hidup dipakai untuk tiket masuk
  const { tier, cost } = livingCost(region, days, maxBudget);
  let ticketBudget = Math.max(0, maxBudget - cost);
  let needed = Math.min(pool.length, days * SPOTS_PER_DAY);
  const remaining = [...pool];
  const take = (s) => {
    remaining.splice(remaining.indexOf(s), 1);
    ticketBudget = Math.max(0, ticketBudget - (s.price || 0));
    needed--;
    return s;
  };

  // 4. Susun per hari: spot pertama = skor tertinggi, berikutnya = skor tinggi
  //    yang DEKAT dengan spot sebelumnya (penalti 1 poin per 15 km)
  const plan = [];
  for (let i = 0; i < days && remaining.length && needed > 0; i++) {
    const quota = Math.ceil(needed / (days - i)); // bagi rata ke sisa hari
    const daySpots = [];
    while (daySpots.length < quota && remaining.length) {
      const affordable = remaining.filter((s) => (s.price || 0) <= ticketBudget);
      if (!affordable.length) {
        // budget habis → tetap isi minimal 1 spot/hari dengan yang termurah
        if (daySpots.length) break;
        const cheapest = [...remaining].sort((a, b) => (a.price || 0) - (b.price || 0))[0];
        daySpots.push(take(cheapest));
        continue;
      }
      const last = daySpots[daySpots.length - 1];
      const value = (s) => score(s) - (last ? distanceKm(last, s) / 15 : 0);
      const best = affordable.reduce((a, b) => (value(b) > value(a) ? b : a));
      daySpots.push(take(best));
    }
    plan.push({ day: i + 1, date: addDays(startDate, i), spots: orderAsRoute(daySpots) });
  }

  return { regionKey, regionName: region.name, tier, days: plan };
}

/**
 * Semua wisata unik di dataset (region "Bali Semua Wilayah" berisi ulang spot
 * kabupaten, jadi duplikat dibuang & key kabupaten yang dipakai).
 * @returns [{ ...spot, regionKey, location }]
 */
export function getAllDestinations() {
  const seen = new Map();
  Object.entries(REGIONS_DATA).forEach(([key, region]) => {
    (region.spots || []).forEach((spot) => {
      const prev = seen.get(spot.id);
      if (prev && prev.regionKey !== 'bali') return;
      seen.set(spot.id, {
        ...spot,
        regionKey: key,
        location: spot.kabupaten
          ? `${spot.kabupaten}, Bali`
          : region.name.replace(/\s*\(.*\)/, '')
      });
    });
  });
  return [...seen.values()];
}

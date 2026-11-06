/**
 * Session hasil rekomendasi Itinerary.
 * - Tetap ada saat pindah halaman atau window ditutup lalu dibuka lagi.
 * - Dihapus hanya saat halaman di-refresh.
 */
const KEY = 'nusatrip_itinerary_session';

function isReload() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    return nav ? nav.type === 'reload' : performance.navigation?.type === 1;
  } catch {
    return false;
  }
}

// Dijalankan sekali per page load
if (isReload()) {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage tidak tersedia */
  }
}

export function loadItinerarySession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveItinerarySession(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage penuh / tidak tersedia */
  }
}

export function clearItinerarySession() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage tidak tersedia */
  }
}

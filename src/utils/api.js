export function getApiBase() {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname;
  if (pathname.startsWith('/gastrip')) return '/gastrip';
  if (pathname.startsWith('/nusatrip')) return '/nusatrip';
  if (pathname.startsWith('/halodev')) return '/halodev';
  return '';
}

export function apiFetch(endpoint, options) {
  const base = getApiBase();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return fetch(`${base}${cleanEndpoint}`, options);
}

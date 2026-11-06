import React, { useEffect, useRef } from 'react';

/**
 * Organism: MapPanel — peta interaktif (Leaflet + OpenStreetMap).
 * points: [{ id, lat, lng, number, name }]
 * activeId: id titik yang sedang di-highlight
 * Dibuat sticky oleh parent agar tetap terlihat saat halaman di-scroll.
 */
export default function MapPanel({ points = [], center = [-2.5, 118], zoom = 5, activeId, className = '' }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  // Init sekali
  useEffect(() => {
    const L = window.L;
    if (!L || !containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: true, attributionControl: true }).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Pastikan ukuran benar setelah layout selesai
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => {
      clearTimeout(t);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Gambar ulang pin & rute
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map) return;
    const layer = layerRef.current;
    layer.clearLayers();

    const valid = points.filter((p) => p.lat && p.lng);
    const latlngs = valid.map((p) => [p.lat, p.lng]);

    if (latlngs.length > 1) {
      L.polyline(latlngs, { color: '#1841a2', weight: 3, opacity: 0.8, dashArray: '6 8' }).addTo(layer);
    }

    valid.forEach((p) => {
      const isActive = p.id === activeId;
      const icon = L.divIcon({
        className: '',
        html: `<div class="map-pin${isActive ? ' map-pin--active' : ''}">${p.number}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      L.marker([p.lat, p.lng], { icon, zIndexOffset: isActive ? 1000 : 0 })
        .bindTooltip(p.name, { direction: 'top', offset: [0, -16] })
        .addTo(layer);
    });
  }, [points, activeId]);

  // Fit bounds hanya saat daftar titik berubah
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map) return;
    const latlngs = points.filter((p) => p.lat && p.lng).map((p) => [p.lat, p.lng]);
    if (latlngs.length) map.fitBounds(L.latLngBounds(latlngs), { padding: [32, 32] });
  }, [points]);

  return <div ref={containerRef} className={`relative z-0 w-full h-full bg-line ${className}`} />;
}

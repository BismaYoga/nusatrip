import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../atoms/Button.jsx';
import DestinationCard from './DestinationCard.jsx';

const AUTO_SCROLL_MS = 3000;
const RESUME_AFTER_TOUCH_MS = 6000;

// Coverflow desktop: skala per posisi dari tengah (0 = tengah).
// Selisih tiap tingkat 12% agar ukuran antar kartu tidak terlalu jauh.
const SCALES = [1, 0.88, 0.76, 0.76];
const GAP = 16; // jarak antar kartu (px)
const CARD_HEIGHT = 440; // tinggi kartu tengah (px)

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobile & tablet (< 1024px): scroll ke samping ---------- */
function MobileScroller({ destinations, categoryLabels, onSelect }) {
  const trackRef = useRef(null);
  const pausedUntil = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const timer = setInterval(() => {
      if (!track.offsetParent || reduceMotion() || Date.now() < pausedUntil.current) return;
      const card = track.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + GAP;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' });
    }, AUTO_SCROLL_MS);
    const pause = () => {
      pausedUntil.current = Date.now() + RESUME_AFTER_TOUCH_MS;
    };
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('pointerdown', pause);
    return () => {
      clearInterval(timer);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('pointerdown', pause);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="lg:hidden no-scrollbar -mx-4 px-4 sm:-mx-8 sm:px-8 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-8"
    >
      {destinations.map((d) => (
        <div key={d.id} className="shrink-0 w-[80%] sm:w-[45%] md:w-[30%] snap-start">
          <DestinationCard destination={d} categoryLabels={categoryLabels} onClick={() => onSelect?.(d)} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Desktop (≥ 1024px): coverflow 5 kartu, tengah terbesar ---------- */
function DesktopCoverflow({ destinations, categoryLabels, onSelect }) {
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const [cardWidth, setCardWidth] = useState(260);
  const [hovered, setHovered] = useState(false);
  const n = destinations.length;

  // Lebar kartu menyesuaikan lebar container agar 5 kartu pas
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const factor = SCALES[0] + 2 * SCALES[1] + 2 * SCALES[2];
      setCardWidth(Math.max(160, (stage.clientWidth - 4 * GAP) / factor));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // Geser otomatis tiap 3 detik (berhenti saat kursor di atas carousel)
  useEffect(() => {
    if (hovered || n < 2) return;
    const timer = setInterval(() => {
      if (!stageRef.current?.offsetParent || reduceMotion()) return;
      setActive((a) => (a + 1) % n);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [hovered, n]);

  // Posisi horizontal tiap tingkat dari tengah
  const offsets = [0];
  for (let i = 1; i < SCALES.length; i++) {
    offsets[i] = offsets[i - 1] + (cardWidth * SCALES[i - 1]) / 2 + GAP + (cardWidth * SCALES[i]) / 2;
  }

  const go = (delta) => setActive((a) => (a + delta + n) % n);

  return (
    <div
      className="hidden lg:flex flex-col gap-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={stageRef} className="relative w-full overflow-hidden" style={{ height: CARD_HEIGHT + 48 }}>
        {destinations.map((d, idx) => {
          let rel = (((idx - active) % n) + n) % n;
          if (rel > n / 2) rel -= n;
          const level = Math.abs(rel);
          if (level > 3) return null; // hanya 5 tampil (+1 di tiap sisi untuk transisi)

          const isCenter = rel === 0;
          const x = Math.sign(rel) * offsets[level];
          return (
            <div
              key={d.id}
              className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
              style={{
                width: cardWidth,
                height: CARD_HEIGHT,
                transform: `translate(-50%, -50%) translateX(${x}px) scale(${SCALES[level]})`,
                opacity: level === 3 ? 0 : level === 2 ? 0.7 : 1,
                zIndex: 10 - level,
                pointerEvents: level === 3 ? 'none' : 'auto'
              }}
            >
              <DestinationCard
                destination={d}
                categoryLabels={categoryLabels}
                imageClassName="flex-[3] min-h-0"
                className={isCenter ? 'shadow-[0_16px_40px_rgba(7,32,91,0.24)] border-secondary' : ''}
                aria-label={isCenter ? `Rencanakan ${d.name}` : `Tampilkan ${d.name}`}
                onClick={() => (isCenter ? onSelect?.(d) : setActive(idx))}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button variant="secondary" icon={ChevronLeft} aria-label="Sebelumnya" size="sm" onClick={() => go(-1)} />
        <span className="font-sans font-medium text-note text-ink min-w-16 text-center">
          {active + 1} / {n}
        </span>
        <Button variant="secondary" icon={ChevronRight} aria-label="Berikutnya" size="sm" onClick={() => go(1)} />
      </div>
    </div>
  );
}

/**
 * Organism: DestinationGallery
 * - < 1024px : scroll ke samping, geser otomatis tiap 3 detik
 *              (berhenti sementara saat disentuh, kembali ke awal setelah kartu terakhir)
 * - ≥ 1024px : coverflow 5 kartu — makin ke tengah makin besar, geser otomatis tiap 3 detik
 *              (berhenti saat kursor di atasnya; klik kartu samping = pindah ke tengah,
 *              klik kartu tengah = buka destinasi)
 */
export default function DestinationGallery({ destinations = [], categoryLabels = {}, onSelect }) {
  if (!destinations.length) return null;
  return (
    <>
      <MobileScroller destinations={destinations} categoryLabels={categoryLabels} onSelect={onSelect} />
      <DesktopCoverflow destinations={destinations} categoryLabels={categoryLabels} onSelect={onSelect} />
    </>
  );
}

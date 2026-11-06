import React from 'react';

const TONES = {
  canvas: 'bg-canvas text-ink',
  white: 'bg-white text-ink',
  primary: 'bg-primary text-canvas'
};

/**
 * Organism: Section — pembungkus section halaman dengan padding & lebar konsisten.
 * Padding vertikal 64px, gutter 16/32px, lebar maks 1280px (narrow: 896px), jarak antar isi 32px.
 */
export default function Section({ tone = 'canvas', narrow = false, id, className = '', innerClassName = '', children }) {
  return (
    <section id={id} className={`w-full py-16 ${TONES[tone]} ${className}`}>
      <div className={`w-full ${narrow ? 'max-w-4xl' : 'max-w-7xl'} mx-auto px-4 sm:px-8 flex flex-col gap-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

import React from 'react';
import Typography from '../atoms/Typography.jsx';

/**
 * Organism: PageHero — section dengan background foto + overlay hitam 50%.
 * Teks di atas overlay memakai warna terang (#f8f8f8).
 */
export default function PageHero({ image, title, subtitle, children, fadeBottom = false, className = '' }) {
  return (
    <section
      className={`relative w-full min-h-[calc(100vh-4rem)] flex items-center bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      {/* Fade bawah: melebur ke warna background section berikutnya */}
      <div
        className={`absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-canvas pointer-events-none transition-opacity duration-700 ${
          fadeBottom ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 py-16 flex flex-col items-center gap-8">
        {(title || subtitle) && (
          <div className="flex flex-col gap-2 text-center text-canvas">
            {title && <Typography variant="h1">{title}</Typography>}
            {subtitle && <Typography variant="desc">{subtitle}</Typography>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

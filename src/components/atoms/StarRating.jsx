import React from 'react';
import { Star } from 'lucide-react';

/** Atom: StarRating — 5 bintang ulasan + angka rating. */
export default function StarRating({ value = 0, className = '' }) {
  const rounded = Math.round(Number(value) || 0);
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} aria-label={`Rating ${value} dari 5`}>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i <= rounded ? 'fill-accent text-accent' : 'fill-transparent text-line'}`}
          />
        ))}
      </div>
      <span className="font-sans font-medium text-note text-ink">{value}</span>
    </div>
  );
}

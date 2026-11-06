import React from 'react';

/** Molecule: RangeField — dua kontrol berdampingan dipisah tanda "-". */
export default function RangeField({ start, end }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      {start}
      <span className="font-sans text-body text-ink" aria-hidden="true">-</span>
      {end}
    </div>
  );
}

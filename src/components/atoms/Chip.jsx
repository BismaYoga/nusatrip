import React from 'react';

/** Atom: Chip — tombol pilihan (toggle) untuk multi-select. */
export default function Chip({ active = false, className = '', children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`h-12 px-6 border rounded-none font-sans text-body transition-colors ${
        active
          ? 'bg-primary text-canvas border-primary'
          : 'bg-white text-ink border-line hover:border-secondary'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

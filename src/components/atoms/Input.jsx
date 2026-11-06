import React from 'react';

/** Kelas dasar kontrol form — tinggi 48px, padding 16px. */
export const CONTROL_CLASS =
  'w-full h-12 px-4 bg-white border border-line rounded-none font-sans text-body text-ink placeholder:text-ink/50 outline-none transition-colors focus:border-primary';

/** Atom: Input */
export function Input({ className = '', ...rest }) {
  return <input className={`${CONTROL_CLASS} ${className}`} {...rest} />;
}

/** Atom: Select — options: [{ value, label }] */
export function Select({ options = [], placeholder, className = '', ...rest }) {
  return (
    <select className={`${CONTROL_CLASS} cursor-pointer ${className}`} {...rest}>
      {placeholder !== undefined && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Input;

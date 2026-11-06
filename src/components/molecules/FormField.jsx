import React, { useId } from 'react';

/**
 * Molecule: FormField — label + kontrol input di bawahnya.
 * htmlFor  → untuk satu kontrol (label terhubung ke input)
 * group    → untuk beberapa kontrol (role="group" + aria-labelledby)
 */
export default function FormField({ label, htmlFor, group = false, className = '', children }) {
  const labelId = useId();
  const labelClass = 'font-sans font-semibold text-body text-ink';
  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
      {...(group ? { role: 'group', 'aria-labelledby': labelId } : {})}
    >
      {group ? (
        <span id={labelId} className={labelClass}>{label}</span>
      ) : (
        <label htmlFor={htmlFor} className={labelClass}>{label}</label>
      )}
      {children}
    </div>
  );
}

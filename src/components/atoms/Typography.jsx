import React from 'react';

/**
 * Atom: Typography — 5 varian teks sistem.
 *   h1   → Libre Baskerville 700 · 48px
 *   h2   → Libre Baskerville 700 · 32px
 *   desc → Instrument Sans 500   · 20px
 *   body → Instrument Sans 400   · 16px
 *   note → Instrument Sans 500   · 12px
 */
const VARIANTS = {
  h1: { tag: 'h1', className: 'font-serif font-bold text-h2 md:text-h1' },
  h2: { tag: 'h2', className: 'font-serif font-bold text-h2' },
  desc: { tag: 'p', className: 'font-sans font-medium text-desc' },
  body: { tag: 'p', className: 'font-sans font-normal text-body' },
  note: { tag: 'span', className: 'font-sans font-medium text-note' },
  price: { tag: 'span', className: 'font-serif font-bold text-price' }
};

export default function Typography({ variant = 'body', as, className = '', children, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.body;
  const Tag = as || v.tag;
  return (
    <Tag className={`${v.className} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

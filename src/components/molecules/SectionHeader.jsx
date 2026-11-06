import React from 'react';
import Typography from '../atoms/Typography.jsx';

/**
 * Molecule: SectionHeader — eyebrow (note) + judul (h1/h2) + deskripsi (body).
 * align: center | left · dark: true bila di atas background gelap
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  titleVariant = 'h2',
  align = 'center',
  dark = false,
  className = ''
}) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-2 max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <Typography variant="note" className={`uppercase tracking-widest ${dark ? 'text-accent' : 'text-secondary'}`}>
          {eyebrow}
        </Typography>
      )}
      {title && (
        <Typography variant={titleVariant} className={dark ? 'text-canvas' : 'text-primary'}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body" className={dark ? 'text-canvas' : 'text-ink'}>
          {description}
        </Typography>
      )}
    </div>
  );
}

import React from 'react';

/**
 * Atom: Button
 *   variant: primary (gelap) | secondary (outline terang) | accent (kuning) | ghost
 *            | light (outline terang untuk di atas background gelap)
 *   size   : sm (32px) | md (40px) | lg (56px)
 *   icon   : komponen ikon lucide (opsional), tampil di kiri label
 */
const VARIANTS = {
  primary: 'bg-primary text-canvas border-primary hover:bg-secondary hover:border-secondary',
  secondary: 'bg-white text-primary border-line hover:border-secondary hover:text-secondary',
  accent: 'bg-accent text-ink border-accent hover:brightness-95',
  ghost: 'bg-transparent text-primary border-transparent hover:text-secondary',
  light: 'bg-transparent text-canvas border-canvas/40 hover:bg-canvas/10'
};

const SIZES = {
  sm: 'px-4 py-2 text-note gap-2',
  md: 'px-6 py-2 text-body gap-2',
  lg: 'px-8 py-4 text-body gap-2'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconClassName = '',
  as,
  className = '',
  children,
  ...rest
}) {
  const Tag = as || 'button';
  return (
    <Tag
      {...(Tag === 'button' ? { type: 'button' } : {})}
      className={`inline-flex items-center justify-center font-sans font-semibold border rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className={`w-4 h-4 shrink-0 ${iconClassName}`} />}
      {children}
    </Tag>
  );
}

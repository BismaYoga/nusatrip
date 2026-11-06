import React from 'react';
import Typography from '../atoms/Typography.jsx';
import StarRating from '../atoms/StarRating.jsx';

function formatRupiah(num) {
  return num ? 'Rp ' + Number(num).toLocaleString('id-ID') : 'Gratis';
}

/**
 * Organism: DestinationCard — kartu wisata dari dataset.
 * destination: { name, image, location, rating, price, categories }
 * categoryLabels: { pantai: 'Pantai', ... }
 */
export default function DestinationCard({
  destination,
  categoryLabels = {},
  onClick,
  imageClassName = 'h-48',
  className = '',
  ...rest
}) {
  const d = destination;
  const tags = (d.categories || []).map((c) => categoryLabels[c]).filter(Boolean).slice(0, 2);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full h-full flex flex-col text-left bg-white border border-line hover:border-secondary transition-colors ${className}`}
      {...rest}
    >
      <div className={`relative w-full shrink-0 overflow-hidden bg-line ${imageClassName}`}>
        <img
          src={d.image}
          alt={d.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-2">
            {tags.map((t) => (
              <span key={t} className="px-2 py-1 bg-primary text-canvas font-sans font-medium text-note">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col gap-2">
        <Typography variant="note" className="text-secondary">{d.location}</Typography>
        <Typography variant="desc" as="h3" className="text-primary line-clamp-2">{d.name}</Typography>
        <StarRating value={d.rating || 4.8} />
        <Typography variant="note" className="text-ink mt-auto pt-2">
          {formatRupiah(d.price)} · {d.durationHours || 2} jam
        </Typography>
      </div>
    </button>
  );
}

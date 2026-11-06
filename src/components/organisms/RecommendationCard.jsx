import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import Typography from '../atoms/Typography.jsx';
import Button from '../atoms/Button.jsx';
import StarRating from '../atoms/StarRating.jsx';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80';

function formatRupiah(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

/**
 * Organism: RecommendationCard — satu tempat hasil rekomendasi.
 * number cocok dengan nomor pin di MapPanel.
 */
export default function RecommendationCard({ spot, number, meta, mapsUrl, onRemove, active = false, onHover }) {
  return (
    <article
      onMouseEnter={onHover}
      className={`bg-white border flex flex-col sm:flex-row transition-colors ${
        active ? 'border-secondary' : 'border-line'
      }`}
    >
      <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 bg-line overflow-hidden">
        <img
          src={spot.image || FALLBACK_IMG}
          alt={spot.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-primary text-canvas font-sans font-medium text-note">
          {number}
        </span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {meta && <Typography variant="note" className="text-secondary">{meta}</Typography>}
          <Typography variant="h2" as="h3" className="text-primary">{spot.name}</Typography>
          <StarRating value={spot.rating || 4.8} />
        </div>

        {spot.desc && <Typography variant="body" className="text-ink">{spot.desc}</Typography>}

        <Typography variant="price" className="text-ink">
          {spot.price === 0 ? 'Gratis' : formatRupiah(spot.price)} · {spot.durationHours || 2} jam
        </Typography>

        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
          <Button as="a" href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" icon={ExternalLink}>
            Google Maps
          </Button>
          {onRemove && (
            <Button variant="ghost" size="sm" icon={Trash2} onClick={onRemove}>
              Hapus
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

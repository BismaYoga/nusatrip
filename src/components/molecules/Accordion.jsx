import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Typography from '../atoms/Typography.jsx';

/**
 * Molecule: Accordion — daftar tanya-jawab yang bisa dibuka/tutup.
 * items: [{ q, a }] · defaultOpen: index yang terbuka di awal (-1 = semua tertutup)
 */
export default function Accordion({ items = [], defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="bg-white border border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : idx)}
              className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-canvas transition-colors"
            >
              <Typography variant="desc" as="span" className="text-primary">{item.q}</Typography>
              <ChevronDown className={`w-4 h-4 shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                <Typography variant="body" className="text-ink">{item.a}</Typography>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

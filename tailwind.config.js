/** Design tokens (Atomic Design) — dipakai lewat class Tailwind:
 *  warna  : bg-primary, text-secondary, bg-accent, text-ink, bg-canvas, border-line
 *  font   : font-serif, font-sans
 *  ukuran : text-h1, text-h2, text-desc, text-body, text-note, text-price
 *  spacing: kelipatan 8px (p-2=8, p-4=16, p-6=24, p-8=32, p-12=48, p-16=64)
 *
 *  >>> Ubah ukuran font di blok `fontSize` di bawah. <<<
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#07205b',
        secondary: '#1841a2',
        accent: '#ffd988',
        ink: '#282828',
        canvas: '#f8f8f8',
        line: '#e4e4e4'
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif']
      },
      fontSize: {
        h1: ['3rem', { lineHeight: '3.5rem' }],      /* 48 / 56 */
        h2: ['2rem', { lineHeight: '2.5rem' }],      /* 32 / 40 */
        desc: ['1.25rem', { lineHeight: '2rem' }],   /* 20 / 32 */
        body: ['1rem', { lineHeight: '1.5rem' }],    /* 16 / 24 */
        note: ['0.75rem', { lineHeight: '1rem' }],   /* 12 / 16 */
        price: ['2rem', { lineHeight: '2.5rem' }]    /* 32 / 40 — sama dengan h2 */
      }
    }
  },
  plugins: []
};

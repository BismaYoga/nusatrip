import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Button from '../atoms/Button.jsx';
import Chip from '../atoms/Chip.jsx';
import { Input, Select } from '../atoms/Input.jsx';
import FormField from '../molecules/FormField.jsx';
import RangeField from '../molecules/RangeField.jsx';

export const LOCATION_OPTIONS = [
  'Pulau Bali (Semua Wilayah)',
  'Nusa Penida, Lembongan & Ceningan (Klungkung)',
  'Badung (Kuta, Seminyak, Canggu & Uluwatu)',
  'Gianyar & Ubud (Tegallalang & Tampaksiring)',
  'Tabanan (Bedugul, Tanah Lot & Jatiluwih)',
  'Bangli & Kintamani (Gunung Batur & Penglipuran)',
  'Karangasem (Besakih, Amed, Lempuyang & Sidemen)',
  'Buleleng & Lovina (Sekumpul, Gitgit & Menjangan)',
  'Kota Denpasar (Sanur, Renon & Kumbasari)',
  'Jembrana & Medewi (Bunut Bolong & Bali Barat)',
  'Labuan Bajo & Komodo',
  'Pulau Lombok & Gili',
  'DI Yogyakarta',
  'Kepulauan Belitung',
  'Kepulauan Raja Ampat',
  'Banyuwangi & Kawah Ijen',
  'Bromo & Kota Malang',
  'Danau Toba & Samosir',
  'Pulau Sumba',
  'Bandung & Lembang'
].map((name) => ({ value: name, label: name }));

const PAX_OPTIONS = Array.from({ length: 20 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));

export const INTEREST_OPTIONS = [
  { value: 'pantai', label: 'Pantai' },
  { value: 'alam', label: 'Dataran Tinggi' },
  { value: 'budaya', label: 'Perkotaan' }
];

/**
 * Organism: ItineraryForm — form input destinasi.
 * onSubmit(values) dipanggil saat tombol Kirim ditekan.
 */
export default function ItineraryForm({ initialValues = {}, onSubmit, loading = false }) {
  const [values, setValues] = useState({
    region: '',
    startDate: '',
    endDate: '',
    budgetMin: '',
    budgetMax: '',
    pax: '',
    interests: [],
    ...initialValues
  });

  function set(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function toggleInterest(val) {
    setValues((prev) => ({
      ...prev,
      interests: prev.interests.includes(val)
        ? prev.interests.filter((i) => i !== val)
        : [...prev.interests, val]
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-canvas text-ink p-6 sm:p-8 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
    >
      <FormField label="Tujuan Wisata *" htmlFor="it-region">
        <Select
          id="it-region"
          required
          placeholder="—"
          value={values.region}
          onChange={(e) => set('region', e.target.value)}
          options={LOCATION_OPTIONS}
        />
      </FormField>

      <FormField label="Tanggal *" group>
        <RangeField
          start={
            <Input
              type="date"
              required
              aria-label="Tanggal dari"
              value={values.startDate}
              onChange={(e) => set('startDate', e.target.value)}
            />
          }
          end={
            <Input
              type="date"
              required
              aria-label="Tanggal sampai"
              min={values.startDate || undefined}
              value={values.endDate}
              onChange={(e) => set('endDate', e.target.value)}
            />
          }
        />
      </FormField>

      <FormField label="Budget *" group>
        <RangeField
          start={
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              step="1000"
              required
              placeholder="Budget Minimal"
              value={values.budgetMin}
              onChange={(e) => set('budgetMin', e.target.value)}
            />
          }
          end={
            <Input
              type="number"
              inputMode="numeric"
              min={values.budgetMin || 0}
              step="1000"
              required
              placeholder="Budget Maximal"
              value={values.budgetMax}
              onChange={(e) => set('budgetMax', e.target.value)}
            />
          }
        />
      </FormField>

      <FormField label="Jumlah Pax (Orang) *" htmlFor="it-pax">
        <Select
          id="it-pax"
          required
          placeholder="—"
          value={values.pax}
          onChange={(e) => set('pax', e.target.value)}
          options={PAX_OPTIONS}
        />
      </FormField>

      <FormField label="Referensi Wisata (Opsional (bisa lebih dari 1))" group>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INTEREST_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={values.interests.includes(opt.value)}
              onClick={() => toggleInterest(opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </FormField>

      <Button
        type="submit"
        size="lg"
        icon={loading ? Loader2 : Send}
        iconClassName={loading ? 'animate-spin' : ''}
        disabled={loading}
        className="self-start"
      >
        Kirim
      </Button>
    </form>
  );
}

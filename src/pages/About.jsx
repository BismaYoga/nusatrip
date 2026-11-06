import React from 'react';
import { Typography, Section, SectionHeader, Accordion } from '../components/index.js';

const FAQS = [
  {
    q: 'Bagaimana cara NusaTrip menyusun rute liburan searah?',
    a: 'NusaTrip memanfaatkan basis data koordinat geospasial aktual OpenStreetMap serta formula jarak Haversine untuk mengelompokkan destinasi dalam satu zona wilayah geografis yang sama, sehingga waktu Anda tidak habis terbuang karena bolak-balik di jalan raya.'
  },
  {
    q: 'Apakah rekomendasi NusaBot AI dapat dipercaya?',
    a: 'Ya, NusaBot AI didesain khusus sebagai kurator lokal nusantara dengan pengetahuan mendalam mengenai penyeberangan pulau, tarif speedboat, tiket konservasi resmi, dan kuliner halal autentik di seluruh Indonesia.'
  },
  {
    q: 'Apakah NusaTrip memungut biaya penggunaan aplikasi?',
    a: 'Tidak, perencana jadwal liburan, kalkulator anggaran, dan konsultasi asisten NusaBot dapat diakses secara gratis oleh seluruh masyarakat dan wisatawan nusantara.'
  },
  {
    q: 'Bagaimana privasi data pribadi saya dijaga?',
    a: 'Sistem kami menerapkan enkripsi token sesi HMAC-SHA256, perlindungan WAF, serta sensor otomatis yang menghapus nomor kontak atau data sensitif sebelum diolah oleh model AI.'
  }
];

const COMMITMENTS = [
  { title: 'Zero Kemacetan Berlebih', desc: 'Mengutamakan rute searah per hari demi memaksimalkan waktu rekreasi.' },
  { title: 'Transparansi Biaya', desc: 'Memberikan rincian harga tiket masuk resmi dan tarif sewa kendaraan yang wajar.' },
  { title: 'Keamanan & Privasi', desc: 'Data sesi percakapan Anda terlindungi aman di browser tanpa kebocoran data.' }
];

export default function About() {
  return (
    <div className="w-full flex flex-col">

      {/* Header */}
      <Section tone="white" className="border-b border-line">
        <SectionHeader
          titleVariant="h1"
          eyebrow="Tentang NusaTrip"
          title="Dedikasi untuk Pariwisata Kepulauan Indonesia"
          description="Menghubungkan keindahan alam, kekayaan tradisi, dan kemudahan teknologi digital dalam setiap jengkal perjalanan Anda."
        />
      </Section>

      {/* Visi & Misi */}
      <Section tone="canvas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-4">
            <SectionHeader
              align="left"
              eyebrow="Visi & Misi"
              title="Menghadirkan Rencana Liburan Otentik & Efisien"
            />
            <Typography variant="body" className="text-ink">
              Indonesia memiliki lebih dari 17.000 pulau dengan keindahan magis yang tersebar luas. Namun, tantangan terbesar wisatawan sering kali terletak pada logistik: kemacetan jalur darat, jadwal kapal yang simpang siur, dan ketidakpastian anggaran.
            </Typography>
            <Typography variant="body" className="text-ink">
              NusaTrip hadir menjawab tantangan ini dengan menyinergikan data geospasial akurat dan kecerdasan artifisial, menghasilkan rencana perjalanan yang logis, hemat biaya, dan sarat wawasan lokal.
            </Typography>
          </div>

          <div className="bg-white border border-line p-8 flex flex-col gap-6">
            <Typography variant="desc" as="h3" className="text-primary">Tiga Komitmen Utama</Typography>
            <ul className="flex flex-col gap-4">
              {COMMITMENTS.map((c) => (
                <li key={c.title} className="border-l-2 border-primary pl-4 flex flex-col gap-1">
                  <Typography variant="body" as="span" className="text-primary font-semibold">{c.title}</Typography>
                  <Typography variant="body" as="span" className="text-ink">{c.desc}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white" id="faq" narrow>
        <SectionHeader
          title="Pertanyaan yang Sering Diajukan (FAQ)"
          description="Semua hal yang perlu Anda ketahui mengenai platform NusaTrip."
        />
        <Accordion items={FAQS} />
      </Section>

      {/* Kebijakan Privasi */}
      <Section tone="canvas" id="policy" narrow>
        <SectionHeader align="left" title="Kebijakan Privasi (Privacy Policy)" />
        <div className="bg-white border border-line p-6 flex flex-col gap-4">
          <Typography variant="body" className="text-ink">
            NusaTrip berkomitmen menjaga integritas dan kerahasiaan data setiap pengguna. Sistem kami tidak memperjualbelikan informasi penelusuran liburan Anda kepada pihak ketiga mana pun.
          </Typography>
          <Typography variant="body" className="text-ink">
            Riwayat konsultasi NusaBot AI disimpan secara terenkripsi di penyimpanan lokal browser Anda dan dapat Anda bersihkan kapan saja melalui menu Pengaturan.
          </Typography>
        </div>
      </Section>

    </div>
  );
}

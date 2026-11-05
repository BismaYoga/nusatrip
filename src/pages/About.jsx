import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Shield, Heart } from 'lucide-react';

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

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="w-full flex flex-col">
      
      {/* Hero Header */}
      <section className="py-16 sm:py-20 border-b border-[#ededed] bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#18409f] block">
            Tentang NusaTrip
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#061e5a]">
            Dedikasi untuk Pariwisata Kepulauan Indonesia
          </h1>
          <p className="text-xs sm:text-sm text-[#595959] max-w-2xl mx-auto leading-relaxed">
            Menghubungkan keindahan alam, kekayaan tradisi, dan kemudahan teknologi digital dalam setiap jengkal perjalanan Anda.
          </p>
        </div>
      </section>

      {/* Philosophy & Story */}
      <section className="py-16 bg-[#f8f8f8] border-b border-[#ededed]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#18409f]">
                Visi &amp; Misi
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#061e5a]">
                Menghadirkan Rencana Liburan Otentik &amp; Efisien
              </h2>
              <p className="text-xs text-[#595959] leading-relaxed">
                Indonesia memiliki lebih dari 17.000 pulau dengan keindahan magis yang tersebar luas. Namun, tantangan terbesar wisatawan sering kali terletak pada logistik: kemacetan jalur darat, jadwal kapal yang simpang siur, dan ketidakpastian anggaran.
              </p>
              <p className="text-xs text-[#595959] leading-relaxed">
                NusaTrip hadir menjawab tantangan ini dengan menyinergikan data geospasial akurat dan kecerdasan artifisial, menghasilkan rencana perjalanan yang logis, hemat biaya, dan sarat wawasan lokal.
              </p>
            </div>

            <div className="p-8 bg-[#ffffff] border border-[#ededed] space-y-4 rounded-none shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#061e5a]">Tiga Komitmen Utama</h3>
              <ul className="space-y-3 text-xs text-[#595959]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#061e5a] mt-1.5 shrink-0"></span>
                  <span><strong>Zero Kemacetan Berlebih:</strong> Mengutamakan rute searah per hari demi memaksimalkan waktu rekreasi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#061e5a] mt-1.5 shrink-0"></span>
                  <span><strong>Transparansi Biaya:</strong> Memberikan rincian harga tiket masuk resmi dan tarif sewa kendaraan yang wajar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#061e5a] mt-1.5 shrink-0"></span>
                  <span><strong>Keamanan &amp; Privasi:</strong> Data sesi percakapan Anda terlindungi aman di browser tanpa kebocoran data.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#ffffff] border-b border-[#ededed]" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-bold text-[#061e5a]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="text-xs text-[#595959]">Semua hal yang perlu Anda ketahui mengenai platform NusaTrip.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-[#ededed] bg-[#f8f8f8]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-[#061e5a] hover:bg-[#ededed]/60 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#061e5a] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#595959] shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#595959] leading-relaxed border-t border-[#ededed]/50 bg-[#ffffff]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Privacy Policy Summary */}
      <section className="py-12 bg-[#f8f8f8]" id="policy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#061e5a]">Kebijakan Privasi (Privacy Policy)</h2>
          <div className="p-6 bg-[#ffffff] border border-[#ededed] space-y-3 text-xs text-[#595959] leading-relaxed rounded-none">
            <p>
              NusaTrip berkomitmen menjaga integritas dan kerahasiaan data setiap pengguna. Sistem kami tidak memperjualbelikan informasi penelusuran liburan Anda kepada pihak ketiga mana pun.
            </p>
            <p>
              Riwayat konsultasi NusaBot AI disimpan secara terenkripsi di penyimpanan lokal browser Anda dan dapat Anda bersihkan kapan saja melalui menu Pengaturan.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

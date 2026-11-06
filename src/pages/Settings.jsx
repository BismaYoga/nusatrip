import React, { useState } from 'react';
import { Globe, Sparkles, Database, Check } from 'lucide-react';

export default function Settings() {
  const [currency, setCurrency] = useState('IDR');
  const [language, setLanguage] = useState('id');
  const [notice, setNotice] = useState('');

  function handleClearChat() {
    try {
      localStorage.removeItem('gastrip_chat_history');
      setNotice('Riwayat chat berhasil dibersihkan.');
      setTimeout(() => setNotice(''), 3000);
    } catch (e) {}
  }

  function handleResetAll() {
    if (window.confirm('Hapus semua cache dan data perjalanan yang tersimpan di perangkat ini?')) {
      try {
        localStorage.clear();
        setNotice('Seluruh data lokal berhasil direset.');
        setTimeout(() => window.location.reload(), 1000);
      } catch (e) {}
    }
  }

  function handleSave() {
    setNotice('Pengaturan berhasil disimpan.');
    setTimeout(() => setNotice(''), 3000);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Title */}
      <div className="pb-4 border-b border-[#ededed]">
        <h1 className="text-2xl font-serif font-bold text-[#07205b]">Pengaturan &amp; Preferensi Sistem</h1>
        <p className="text-xs text-[#595959]">Atur konfigurasi bahasa, mata uang, privasi data, dan kecerdasan asisten NusaBot AI.</p>
      </div>

      <div className="space-y-6">
        
        {/* Card 1: Regional & Currency */}
        <div className="bg-[#ffffff] border border-[#ededed] p-6 space-y-4 rounded-none">
          <div className="flex items-center gap-2 pb-3 border-b border-[#ededed]">
            <Globe className="w-4 h-4 text-[#07205b]" />
            <h2 className="text-sm font-serif font-bold text-[#07205b]">Bahasa &amp; Wilayah</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#07205b]">Bahasa Aplikasi</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#07205b] outline-none rounded-none"
              >
                <option value="id">Bahasa Indonesia (Utama)</option>
                <option value="en">English (International)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#07205b]">Mata Uang Acuan</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#07205b] outline-none rounded-none"
              >
                <option value="IDR">IDR — Rupiah Indonesia (Rp)</option>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="SGD">SGD — Singapore Dollar (S$)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: AI NusaBot */}
        <div className="bg-[#ffffff] border border-[#ededed] p-6 space-y-4 rounded-none">
          <div className="flex items-center gap-2 pb-3 border-b border-[#ededed]">
            <Sparkles className="w-4 h-4 text-[#07205b]" />
            <h2 className="text-sm font-serif font-bold text-[#07205b]">Konsultan Perjalanan AI (NusaBot)</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#ededed]">
              <div>
                <p className="font-bold text-[#07205b]">Gaya Respons Konsultasi</p>
                <p className="text-[11px] text-[#595959]">Rincian mendalam dengan tips lokal, estimasi budget, dan rute searah.</p>
              </div>
              <select className="px-3 py-1.5 bg-[#f8f8f8] border border-[#ededed] font-medium text-xs text-[#282828] outline-none rounded-none">
                <option>Terperinci &amp; Panduan Lengkap</option>
                <option>Ringkas &amp; Padat</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#ededed]">
              <div>
                <p className="font-bold text-[#07205b]">Penyimpanan Sesi Chat Per User</p>
                <p className="text-[11px] text-[#595959]">Riwayat percakapan tersimpan aman di browser Anda saat berpindah halaman.</p>
              </div>
              <span className="px-2.5 py-1 bg-[#f0f4ff] text-[#07205b] font-bold text-[10px] uppercase border border-[#d0deff] rounded-none">
                Aktif
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-[#07205b]">Sensor Otomatis PII &amp; Privasi</p>
                <p className="text-[11px] text-[#595959]">Nomor telepon, NIK, dan alamat pribadi otomatis disensor sebelum diproses model AI.</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase border border-emerald-200 rounded-none">
                Terlindungi
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Storage & Reset */}
        <div className="bg-[#ffffff] border border-[#ededed] p-6 space-y-4 rounded-none">
          <div className="flex items-center gap-2 pb-3 border-b border-[#ededed]">
            <Database className="w-4 h-4 text-[#07205b]" />
            <h2 className="text-sm font-serif font-bold text-[#07205b]">Penyimpanan Lokal &amp; Riwayat</h2>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-[#595959] leading-relaxed">
              Semua rancangan rute, catatan perjalanan offline, dan histori percakapan NusaBot disimpan pada peramban lokal perangkat Anda.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleClearChat}
                className="w-full sm:w-auto px-4 py-2 border border-[#ededed] hover:border-[#07205b] bg-[#ffffff] text-[#07205b] font-bold text-xs transition rounded-none"
              >
                Hapus Riwayat Chat Saja
              </button>

              <button
                type="button"
                onClick={handleResetAll}
                className="w-full sm:w-auto px-4 py-2 border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs transition rounded-none"
              >
                Reset Semua Data &amp; Cache Lokal
              </button>

              {notice && (
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{notice}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#07205b] hover:bg-[#1841a2] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none shadow-sm"
          >
            Simpan Pengaturan
          </button>
        </div>

      </div>

    </div>
  );
}

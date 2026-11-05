import React, { useState } from 'react';

export default function Login({ setRoute }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('bismayoga@nusatrip.id');
  const [password, setPassword] = useState('Traveler2026!');
  const [name, setName] = useState('Bisma Yoga');

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('gastrip_user_name', isRegister ? name : 'Bisma Yoga');
    localStorage.setItem('gastrip_user_email', email);
    setRoute('profile');
  }

  function handleGoogleLogin() {
    localStorage.setItem('gastrip_user_name', 'Bisma Yoga');
    localStorage.setItem('gastrip_user_email', 'bismayoga@nusatrip.id');
    setRoute('profile');
  }

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#ffffff] border border-[#ededed] shadow-sm p-8 space-y-6 rounded-none">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#061e5a]">
            {isRegister ? 'Buat Akun Traveler' : 'Masuk ke Akun Anda'}
          </h1>
          <p className="text-xs text-[#595959]">
            Akses seluruh riwayat itinerary, preferensi perjalanan, dan konsultasi NusaBot AI Anda.
          </p>
        </div>

        {/* Auth Mode Switcher */}
        <div className="grid grid-cols-2 border border-[#ededed] p-1 bg-[#f8f8f8]">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 text-xs font-bold transition rounded-none ${!isRegister ? 'text-[#061e5a] bg-[#ffffff] shadow-xs' : 'text-[#595959] hover:text-[#061e5a]'}`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2 text-xs font-bold transition rounded-none ${isRegister ? 'text-[#061e5a] bg-[#ffffff] shadow-xs' : 'text-[#595959] hover:text-[#061e5a]'}`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Social Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 border border-[#ededed] hover:border-[#061e5a] bg-[#ffffff] text-xs font-semibold text-[#282828] flex items-center justify-center gap-2.5 transition rounded-none"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Lanjutkan dengan Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#ededed]"></div>
          <span className="text-[11px] text-[#8c8c8c] uppercase tracking-wider">Atau dengan Email</span>
          <div className="flex-1 h-px bg-[#ededed]"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#061e5a]">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#061e5a]">Alamat Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#061e5a]">Kata Sandi</label>
              {!isRegister && (
                <span className="text-[11px] font-semibold text-[#18409f] cursor-pointer hover:underline">
                  Lupa sandi?
                </span>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#ededed] font-medium text-xs text-[#282828] focus:border-[#061e5a] outline-none rounded-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#061e5a] hover:bg-[#18409f] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition rounded-none shadow-sm"
          >
            {isRegister ? 'Buat Akun Sekarang' : 'Masuk ke Akun'}
          </button>

        </form>

        <p className="text-[11px] text-center text-[#8c8c8c] leading-relaxed">
          Dengan melanjutkan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi NusaTrip Indonesia.
        </p>

      </div>
    </div>
  );
}

import React from 'react';
import { User, Settings, Sparkles } from 'lucide-react';

export default function Navbar({ currentRoute, setRoute }) {
  return (
    <header className="w-full bg-[#061e5a] text-[#ffffff] border-b border-[#18409f]/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setRoute('home')} 
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#ffffff] group-hover:text-[#fed988] transition">
            NusaTrip
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-[#18409f] text-[#fed988] rounded-none">
            Indonesia
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#c8ccd7]">
          <button 
            onClick={() => setRoute('home')} 
            className={`pb-1 transition-colors ${currentRoute === 'home' ? 'text-[#ffffff] border-b-2 border-[#fed988]' : 'hover:text-[#ffffff]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setRoute('itinerary')} 
            className={`pb-1 transition-colors ${currentRoute === 'itinerary' ? 'text-[#ffffff] border-b-2 border-[#fed988]' : 'hover:text-[#ffffff]'}`}
          >
            Itinerary
          </button>
          <button 
            onClick={() => setRoute('about')} 
            className={`pb-1 transition-colors ${currentRoute === 'about' ? 'text-[#ffffff] border-b-2 border-[#fed988]' : 'hover:text-[#ffffff]'}`}
          >
            About Us
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setRoute('itinerary')} 
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-none bg-[#fed988] hover:bg-[#fdd887] text-[#061e5a] font-bold text-xs transition shadow-xs"
          >
            Buat Itinerary
          </button>

          <button 
            onClick={() => setRoute('login')} 
            className={`px-3 py-2 rounded-none font-bold text-xs transition border border-[#18409f]/40 ${currentRoute === 'login' ? 'bg-[#18409f] text-[#fed988]' : 'bg-transparent hover:bg-[#18409f]/40 text-[#ffffff]'}`}
            title="Masuk / Daftar"
          >
            Masuk
          </button>

          <button 
            onClick={() => setRoute('profile')} 
            className={`w-9 h-9 rounded-none flex items-center justify-center border transition ${currentRoute === 'profile' ? 'bg-[#18409f] text-[#fed988] border-[#fed988]/50' : 'bg-transparent hover:bg-[#18409f]/40 text-[#ffffff] border-[#18409f]/40'}`}
            title="Profil Pengguna"
          >
            <User className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setRoute('settings')} 
            className={`w-9 h-9 rounded-none flex items-center justify-center border transition ${currentRoute === 'settings' ? 'bg-[#18409f] text-[#fed988] border-[#fed988]/50' : 'bg-transparent hover:bg-[#18409f]/40 text-[#ffffff] border-[#18409f]/40'}`}
            title="Pengaturan"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}

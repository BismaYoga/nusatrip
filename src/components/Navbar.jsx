import React from 'react';
import { User, Settings, Sparkles } from 'lucide-react';

export default function Navbar({ currentRoute, setRoute }) {
  return (
    <header className="w-full bg-[#07205b] text-[#ffffff] border-b border-[#1841a2]/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => setRoute('home')} 
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <img 
            src="assets/logo.png" 
            alt="NusaTrip Logo" 
            className="h-9 w-auto max-h-9 object-contain" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fb = e.currentTarget.nextElementSibling;
              if (fb) fb.style.display = 'flex';
            }}
          />
          <div className="w-8 h-8 rounded-none bg-[#ffd988] text-[#07205b] hidden items-center justify-center font-bold text-sm">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#ffffff] font-serif">
              NusaTrip
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#c8ccd7]">
          <button 
            onClick={() => setRoute('home')} 
            className={`pb-1 transition-colors ${currentRoute === 'home' ? 'text-[#ffffff] border-b-2 border-[#ffd988]' : 'hover:text-[#ffffff]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setRoute('itinerary')} 
            className={`pb-1 transition-colors ${currentRoute === 'itinerary' ? 'text-[#ffffff] border-b-2 border-[#ffd988]' : 'hover:text-[#ffffff]'}`}
          >
            Itinerary
          </button>
          <button 
            onClick={() => setRoute('about')} 
            className={`pb-1 transition-colors ${currentRoute === 'about' ? 'text-[#ffffff] border-b-2 border-[#ffd988]' : 'hover:text-[#ffffff]'}`}
          >
            About Us
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setRoute('itinerary')} 
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-none bg-[#ffd988] hover:bg-[#ffd988] text-[#07205b] font-bold text-xs transition shadow-xs"
          >
            Buat Itinerary
          </button>

          <button 
            onClick={() => setRoute('login')} 
            className={`px-3 py-2 rounded-none font-bold text-xs transition border border-[#1841a2]/40 ${currentRoute === 'login' ? 'bg-[#1841a2] text-[#ffd988]' : 'bg-transparent hover:bg-[#1841a2]/40 text-[#ffffff]'}`}
            title="Masuk / Daftar"
          >
            Masuk
          </button>

          <button 
            onClick={() => setRoute('profile')} 
            className={`w-9 h-9 rounded-none flex items-center justify-center border transition ${currentRoute === 'profile' ? 'bg-[#1841a2] text-[#ffd988] border-[#ffd988]/50' : 'bg-transparent hover:bg-[#1841a2]/40 text-[#ffffff] border-[#1841a2]/40'}`}
            title="Profil Pengguna"
          >
            <User className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setRoute('settings')} 
            className={`w-9 h-9 rounded-none flex items-center justify-center border transition ${currentRoute === 'settings' ? 'bg-[#1841a2] text-[#ffd988] border-[#ffd988]/50' : 'bg-transparent hover:bg-[#1841a2]/40 text-[#ffffff] border-[#1841a2]/40'}`}
            title="Pengaturan"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}

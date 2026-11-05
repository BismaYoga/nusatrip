import React from 'react';

export default function Footer({ setRoute }) {
  return (
    <footer className="w-full bg-[#070e1e] text-[#ffffff] pt-12 pb-8 border-t border-[#121d38]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#121d38]/30 text-xs">
          
          {/* Left: Sosmed 1, Sosmed 2, Sosmed 3 */}
          <div className="flex items-center gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#fed988] transition"
            >
              Sosmed 1 (Instagram)
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#fed988] transition"
            >
              Sosmed 2 (X / Twitter)
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#fed988] transition"
            >
              Sosmed 3 (TikTok)
            </a>
          </div>

          {/* Right: FAQ & Policy */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setRoute('about')} 
              className="hover:text-[#fed988] transition"
            >
              FAQ
            </button>
            <span>•</span>
            <button 
              onClick={() => setRoute('about')} 
              className="hover:text-[#fed988] transition"
            >
              Policy (Kebijakan Privasi)
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#c8ccd7]">
          <p>&copy; 2026 NusaTrip. All rights reserved. Platform Perencana Liburan Cerdas Indonesia.</p>
        </div>

      </div>
    </footer>
  );
}

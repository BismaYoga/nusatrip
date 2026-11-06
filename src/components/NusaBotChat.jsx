import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Minus, Trash2, Send, Lock, ShieldAlert } from 'lucide-react';
import { apiFetch } from '../utils/api.js';
import MarkdownMessage from './atoms/MarkdownMessage.jsx';

const CHAT_STORAGE_KEY = 'gastrip_chat_history';
const CHAT_SESSION_KEY = 'gastrip_chat_session_id';

const INITIAL_GREETING = {
  type: 'bot',
  text: 'Halo! Saya **NusaBot**, asisten AI konsultan perjalanan GasTrip & NusaTrip. Saya siap merekomendasikan rute wisata tersembunyi, estimasi tarif speedboat, rekomendasi kuliner autentik, hingga tips liburan bebas macet di seluruh nusantara. Ada yang ingin Anda tanyakan seputar destinasi liburan?',
  time: 'Sekarang'
};

const QUICK_CHIPS = [
  'Pantai Sepi di Bali',
  'Speedboat Labuan Bajo',
  'Kuliner Halal Jogja',
  'Hidden Gem Air Terjun'
];

export default function NusaBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityNotice, setSecurityNotice] = useState('');
  const [quota, setQuota] = useState(20);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize session & load persistent history
  useEffect(() => {
    // 1. Session handshake
    const cachedSession = localStorage.getItem(CHAT_SESSION_KEY);
    if (cachedSession) {
      setSessionId(cachedSession);
    }
    fetchSession();

    // 2. Load stored chat history
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {}

    // Default initial greeting if no history
    setMessages([INITIAL_GREETING]);
  }, []);

  // Save history on changes
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      } catch (e) {}
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  async function fetchSession() {
    try {
      const res = await apiFetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data?.session_id) {
          setSessionId(data.data.session_id);
          localStorage.setItem(CHAT_SESSION_KEY, data.data.session_id);
        }
      }
    } catch (err) {
      // Offline fallback is silent
    }
  }

  function handleClearChat() {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (e) {}
    setMessages([INITIAL_GREETING]);
  }

  async function handleSendMessage(queryText) {
    const text = (queryText || inputVal).trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setSecurityNotice('Pesan terlalu panjang (maksimal 500 karakter).');
      setTimeout(() => setSecurityNotice(''), 3000);
      return;
    }

    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { type: 'user', text, time: timeStr };
    
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          region_context: 'Indonesia',
          session_id: sessionId || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botReply = data.reply || 'Maaf, terjadi kendala saat memproses jawaban.';
        const botMsg = {
          type: 'bot',
          text: botReply,
          badge: data.security_badge || '',
          wasRedacted: data.was_redacted || false,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        if (typeof data.remaining_quota === 'number') {
          setQuota(data.remaining_quota);
        }
      } else {
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            text: 'Terjadi kendala jaringan saat menghubungi server AI. Mohon coba sesaat lagi.',
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: 'Halo! Mohon maaf sistem AI saat ini sedang padat. Silakan gunakan menu pencarian itinerary di bagian atas untuk hasil instan.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window Container */}
      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[400px] h-[520px] max-h-[82vh] bg-[#ffffff] border border-[#ededed] shadow-2xl overflow-hidden mb-3.5 transition-all">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#07205b] text-[#ffffff] flex items-center justify-between border-b border-[#1841a2]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#1841a2] flex items-center justify-center text-[#ffd988]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#ffffff] flex items-center gap-1.5">
                  <span>NusaBot AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[10px] text-[#c8ccd7]">Konsultan Perjalanan Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={handleClearChat} 
                className="p-1.5 hover:text-[#ffd988] text-[#c8ccd7] transition" 
                title="Bersihkan Riwayat Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 hover:text-[#ffd988] text-[#c8ccd7] transition" 
                title="Tutup"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Security Notice */}
          {securityNotice && (
            <div className="px-3.5 py-2 bg-amber-50 border-b border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{securityNotice}</span>
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8f8f8]">
            {messages.map((m, idx) => (
              <div key={idx}>
                {m.type === 'user' ? (
                  <div className="flex flex-col items-end space-y-1">
                    <div className="bg-[#07205b] text-[#ffffff] px-3.5 py-2.5 rounded-none text-xs leading-relaxed max-w-[85%] shadow-xs">
                      {m.text}
                    </div>
                    <span className="text-[9px] text-[#595959] px-1">{m.time}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 bg-[#07205b] text-[#ffd988] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-1.5 max-w-[85%]">
                      <div className="bg-[#ffffff] text-[#282828] p-3 border border-[#ededed] text-xs leading-relaxed shadow-xs">
                        <MarkdownMessage content={m.text} />
                        {m.wasRedacted && (
                          <div className="mt-2 px-2 py-1 bg-sky-50 border border-sky-100 rounded-none text-[10px] text-sky-800 flex items-center gap-1 font-medium">
                            <Lock className="w-3 h-3 text-sky-600 shrink-0" />
                            <span>Data pribadi otomatis disensor demi privasi Anda.</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between px-1">
                        {m.badge ? (
                          <span className="text-[10px] font-semibold text-[#1841a2] bg-[#f0f4ff] border border-[#d0deff] px-1.5 py-0.5 rounded-none">
                            {m.badge}
                          </span>
                        ) : null}
                        <span className="text-[9px] text-[#595959] ml-auto">{m.time}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Quick Chips on Welcome Message */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-2 pl-9">
                {QUICK_CHIPS.map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 bg-[#ffffff] hover:bg-[#ededed] border border-[#ededed] text-[#07205b] text-[11px] font-medium transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 pl-9 text-[11px] text-[#595959]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#07205b] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#07205b] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#07205b] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>NusaBot sedang meracik jawaban...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 bg-[#ffffff] border-t border-[#ededed]">
            <div className="flex items-center justify-between text-[10px] text-[#595959] mb-1.5 px-0.5">
              <span className="font-medium text-[#1841a2]">{quota} kuota/mnt</span>
              <span>{inputVal.length}/500</span>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                maxLength={500} 
                placeholder="Tanyakan rekomendasi liburan..." 
                className="flex-1 px-3 py-2 bg-[#f8f8f8] border border-[#ededed] text-xs text-[#282828] placeholder:text-[#8c8c8c] focus:border-[#07205b] outline-none transition" 
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputVal.trim()}
                className="px-3.5 py-2 bg-[#07205b] hover:bg-[#1841a2] disabled:opacity-50 text-[#ffffff] text-xs font-semibold transition" 
                title="Kirim"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="h-12 px-4 rounded-none bg-[#07205b] hover:bg-[#1841a2] text-[#ffd988] flex items-center justify-center gap-2 shadow-2xl transition border border-[#ffd988]/40 group"
        title="Tanya NusaBot AI"
      >
        <Sparkles className="w-5 h-5 text-[#ffd988]" />
        <span className="text-xs font-bold text-[#ffffff] tracking-wide font-sans">Tanya NusaBot</span>
      </button>

    </div>
  );
}

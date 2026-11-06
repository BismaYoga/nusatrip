import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import NusaBotChat from './components/NusaBotChat.jsx';

import Home from './pages/Home.jsx';
import Itinerary from './pages/Itinerary.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const [route, setRoute] = useState('home');

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['home', 'itinerary', 'about', 'login', 'profile', 'settings'].includes(hash)) {
        setRoute(hash);
      } else if (!hash) {
        setRoute('home');
      }
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function navigateTo(newRoute) {
    setRoute(newRoute);
    window.location.hash = `#/${newRoute}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f8f8] text-[#282828] selection:bg-[#ffd988] selection:text-[#07205b]">
      
      {/* Top Navbar */}
      <Navbar currentRoute={route} setRoute={navigateTo} />

      {/* Main Page Body */}
      <main className="flex-1 flex flex-col">
        {route === 'home' && <Home setRoute={navigateTo} />}
        {route === 'itinerary' && <Itinerary setRoute={navigateTo} />}
        {route === 'about' && <About setRoute={navigateTo} />}
        {route === 'login' && <Login setRoute={navigateTo} />}
        {route === 'profile' && <Profile setRoute={navigateTo} />}
        {route === 'settings' && <Settings setRoute={navigateTo} />}
      </main>

      {/* Global Footer */}
      <Footer setRoute={navigateTo} />

      {/* Global Persistent NusaBot Chatbot */}
      <NusaBotChat />

    </div>
  );
}

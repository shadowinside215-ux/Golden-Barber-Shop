import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { AdminProvider } from './components/AdminProvider';
import AdminModal from './components/AdminModal';
import Navigation from './components/Navigation';
import Lenis from 'lenis';
import { LanguageProvider, useLanguage } from './components/LanguageProvider';
import { Instagram, Facebook } from 'lucide-react';

function AppContent() {
  const { t } = useLanguage();
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-[#F4F1ED] selection:bg-gold-500/30 font-sans bg-moroccan-pattern">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Location />
      <Contact />
      
      <footer className="py-12 text-center text-zinc-500 border-t border-gold-500/10 bg-brand-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="flex gap-4 items-center mb-6">
            <a href="https://www.instagram.com/golden_men_rabat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-500 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://web.facebook.com/people/Golden-Barber/100027047362812/?sk=photos" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-500 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
          <div className="flex gap-2 items-center mb-6 opacity-50">
            <span className="w-12 h-px bg-gold-500"></span>
            <span className="w-2 h-2 rounded-full border border-gold-500 transform rotate-45"></span>
            <span className="w-12 h-px bg-gold-500"></span>
          </div>
          <p className="font-display italic text-lg mb-2">Golden Barber Shop</p>
          <p className="text-sm tracking-widest uppercase">© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </footer>
      {/* <AdminModal /> hidden admin function per request */}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </LanguageProvider>
  );
}

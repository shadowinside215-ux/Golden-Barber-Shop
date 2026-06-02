import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import EditableImage from './EditableImage';
import { useLanguage, Language } from './LanguageProvider';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, langDir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.location, href: '#location' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const langs: Language[] = ['en', 'fr', 'ar'];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md border-b border-gold-500/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-4 h-12 sm:h-16">
          <EditableImage 
            configKey="logo"
            defaultSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='6' cy='6' r='3'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Cline x1='20' y1='4' x2='8.12' y2='15.88'/%3E%3Cline x1='14.47' y1='14.48' x2='20' y2='20'/%3E%3Cline x1='8.12' y1='8.12' x2='12' y2='12'/%3E%3C/svg%3E"
            className="w-10 h-10 sm:w-16 sm:h-16 rounded overflow-hidden shrink-0 bg-brand-dark flex items-center justify-center p-1"
          />
          <span className="font-display font-medium text-lg leading-tight sm:leading-normal sm:text-2xl tracking-[0.05em] sm:tracking-[0.1em] text-gold-500 max-w-[140px] sm:max-w-none">
            Golden Barber Shop<span className="italic">.</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-4 lg:gap-8 ${langDir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-gold-400 transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-3 border-l border-zinc-800 pl-4 lg:pl-6 ml-2">
            <a href="https://www.instagram.com/golden_men_rabat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://web.facebook.com/people/Golden-Barber/100027047362812/?sk=photos" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded transition-colors ${language === l ? 'bg-gold-500/20 text-gold-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <a 
            href="tel:+212624720228"
            className="px-5 py-2.5 rounded-full bg-gold-500 text-brand-black font-semibold text-sm hover:bg-gold-400 transition-colors whitespace-nowrap"
          >
            {t.nav.bookNow}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-zinc-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <div className="flex items-center gap-2 mb-4 justify-center py-2 border-b border-zinc-800">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded transition-colors ${language === l ? 'bg-gold-500/20 text-gold-400' : 'text-zinc-500'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-zinc-300 hover:text-gold-400 hover:bg-zinc-900/50 rounded-lg text-center"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex justify-center gap-6 py-4">
                <a href="https://www.instagram.com/golden_men_rabat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://web.facebook.com/people/Golden-Barber/100027047362812/?sk=photos" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <a 
                  href="tel:+212624720228"
                  className="block w-full text-center px-5 py-3 rounded-lg bg-gold-500 text-brand-black font-semibold text-base hover:bg-gold-400 transition-colors"
                >
                  {t.nav.bookNow}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Location() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-brand-black" id="location">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-gold-500/50"></span>
                <h2 className="text-gold-500 font-medium tracking-[0.2em] uppercase text-xs">{t.location.visitUs}</h2>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#F4F1ED] leading-[1.1] mb-6">
                {t.location.title1}<br />
                <span className="italic text-gold-400">{t.location.title2}</span>
              </h3>
            </div>
            
            <div className="bg-brand-dark border-t border-gold-500/20 p-8 flex items-start gap-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/40 to-transparent pointer-events-none" />
              <MapPin className="w-8 h-8 text-gold-500 shrink-0 mt-1 relative z-10" />
              <div className="relative z-10">
                <p className="text-[#F4F1ED] font-display text-2xl mb-2">{t.location.name}</p>
                <p className="text-zinc-400 font-light leading-relaxed mb-6">
                  {t.location.address}<br />
                  {t.location.address2}<br />
                  {t.location.address3}
                </p>
                <a 
                  href="https://maps.google.com/?q=40004,+Av.+Moulay+Abdellah+D+185+MAG+06,+Sala+Al+Jadida+11100" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-medium transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  {t.location.getDirections}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-[500px] rounded-xl overflow-hidden border border-zinc-800 relative bg-zinc-900"
          >
            {/* Minimalist interactive map substitute (since actual maps iframe might be heavy/complex for layout, use a styled cover with link, or a direct iframe to Google Maps) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1651.528445980072!2d-6.74668!3d33.9922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76a5247814aab%3A0xc6a804edbe02a0a3!2sSala%20Al%20Jadida!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'contrast(1.2) opacity(0.8)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { useAdmin } from './AdminProvider';
import EditableGalleryImage from './EditableGalleryImage';
import { useLanguage } from './LanguageProvider';

export default function Gallery() {
  const { config, isAdmin } = useAdmin();
  const { t } = useLanguage();
  const images = config.galleryImages || [];

  return (
    <section className="py-24 bg-brand-dark relative z-10 border-y border-gold-500/10" id="gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl font-display text-gold-500 mb-6">
              {t.gallery.title}
            </h3>
            <p className="text-zinc-400 text-lg font-light">
              {t.gallery.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <EditableGalleryImage key={index} src={src} index={index} />
          ))}
          {isAdmin && (
            <EditableGalleryImage isNew />
          )}
        </div>

      </div>
    </section>
  );
}

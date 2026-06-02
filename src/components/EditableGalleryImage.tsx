import React, { useRef, useState } from 'react';
import { useAdmin } from './AdminProvider';
import { UploadCloud, Loader2, Plus, Trash } from 'lucide-react';
import { motion } from 'motion/react';

interface EditableGalleryImageProps {
  key?: React.Key;
  src?: string;
  index?: number;
  isNew?: boolean;
}

export default function EditableGalleryImage({ src, index, isNew }: EditableGalleryImageProps) {
  const { isAdmin, config, updateConfig, uploadImage } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!isAdmin) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      const newGallery = [...(config.galleryImages || [])];
      
      if (isNew) {
        newGallery.push(url);
      } else if (index !== undefined) {
        newGallery[index] = url;
      }
      
      await updateConfig({ galleryImages: newGallery });
    } catch (error) {
      console.error(error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Check Cloudinary configs and ensure Preset is Unsigned."}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === undefined) return;
    const newGallery = [...(config.galleryImages || [])];
    newGallery.splice(index, 1);
    await updateConfig({ galleryImages: newGallery });
  };

  const hiddenInput = (
    <input 
      type="file" 
      ref={fileInputRef} 
      accept="image/*" 
      style={{ display: 'none' }} 
      onChange={handleFileChange}
      onClick={e => e.stopPropagation()} 
    />
  );

  if (isNew) {
    return (
      <div 
        className="aspect-square bg-zinc-900 border border-zinc-800 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-gold-500/50 transition-colors"
        onClick={handleClick}
      >
         {isUploading ? <Loader2 className="w-8 h-8 text-gold-500 animate-spin" /> : <Plus className="w-8 h-8 text-zinc-500" />}
         {hiddenInput}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="aspect-square relative rounded-lg overflow-hidden group border border-zinc-800"
      onClick={handleClick}
    >
      <img src={src} alt="Gallery item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      {isAdmin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div className="bg-brand-gray p-3 rounded-full border border-gold-500 shadow-xl flex flex-col items-center mx-2">
            {isUploading ? (
              <Loader2 className="w-5 h-5 text-gold-500 animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5 text-gold-500" />
            )}
          </div>
          {!isUploading && !isNew && (
            <button 
              onClick={handleDelete}
              className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-full border border-red-500 transition-colors mx-2"
            >
              <Trash className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
      {hiddenInput}
    </motion.div>
  );
}

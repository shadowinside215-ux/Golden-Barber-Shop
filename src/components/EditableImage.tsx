import React, { useRef, useState } from 'react';
import { useAdmin } from './AdminProvider';
import { UploadCloud, Loader2 } from 'lucide-react';

interface EditableImageProps {
  configKey: 'heroImage' | 'logo' | 'aboutImage';
  className?: string;
  defaultSrc: string;
  isBackground?: boolean;
  children?: React.ReactNode;
}

export default function EditableImage({ configKey, className, defaultSrc, isBackground, children }: EditableImageProps) {
  const { isAdmin, config, updateConfig, uploadImage } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const src = config[configKey] || defaultSrc;

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
      await updateConfig({ [configKey]: url });
    } catch (error) {
      console.error(error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Check Cloudinary configs and ensure Preset is Unsigned."}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const overlay = isAdmin && (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
      <div className="bg-brand-gray p-4 rounded-full border border-gold-500 shadow-xl flex flex-col items-center">
        {isUploading ? (
          <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
        ) : (
          <UploadCloud className="w-6 h-6 text-gold-500" />
        )}
        <span className="text-white text-xs mt-2 font-medium">Click to replace</span>
      </div>
    </div>
  );

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

  if (isBackground) {
    return (
      <div 
        className={`relative ${className || ''}`}
        style={{ backgroundImage: `url("${src}")` }}
        onClick={handleClick}
      >
        {overlay}
        {hiddenInput}
        {children}
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className || ''}`} onClick={handleClick}>
      {overlay}
      <img src={src} alt="Editable content" className="w-full h-full object-cover" />
      {hiddenInput}
    </div>
  );
}

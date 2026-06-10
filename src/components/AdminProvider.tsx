import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface SiteConfig {
  heroImage: string;
  logo: string;
  aboutImage: string;
  galleryImages: string[];
}

const DEFAULT_CONFIG: SiteConfig = {
  heroImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  logo: "",
  aboutImage: "https://images.unsplash.com/photo-1521590838726-2bb6da41f872?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512496015851-a1dcbb411646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};

interface AdminContextType {
  isAdmin: boolean;
  login: (name: string, pass: string) => boolean;
  logout: () => void;
  config: SiteConfig;
  updateConfig: (partial: Partial<SiteConfig>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  isConfigLoaded: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    // const isLogged = localStorage.getItem('admin_logged_in') === 'true';
    // if (isLogged) setIsAdmin(true);

    const docRef = doc(db, 'siteConfig', 'global');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data() as SiteConfig);
      } else {
        // Init default if doesn't exist (fails if rules prevent create, but handles gracefully)
        setDoc(docRef, DEFAULT_CONFIG).catch(e => console.warn(e));
      }
      setIsConfigLoaded(true);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'siteConfig/global');
      setIsConfigLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const login = (name: string, pass: string) => {
    if (name === 'sam' && pass === 'sam2000') {
      setIsAdmin(true);
      localStorage.setItem('admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_logged_in');
  };

  const updateConfig = async (partial: Partial<SiteConfig>) => {
    const newConfig = { ...config, ...partial };
    setConfig(newConfig);
    try {
      await setDoc(doc(db, 'siteConfig', 'global'), newConfig);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteConfig/global');
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Check both VITE_ prefixed and common naming conventions in case user forgot prefix in secret panel
    const cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || (import.meta as any).env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || (import.meta as any).env.CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error(`Cloudinary config missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in the Secrets panel.`);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const e = await res.json();
      throw new Error(e.error?.message || "Upload failed. Double check your Cloud Name and ensure your Upload Preset is set to 'Unsigned'.");
    }
    
    const data = await res.json();
    return data.secure_url;
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, config, updateConfig, uploadImage, isConfigLoaded }}>
      {children}
    </AdminContext.Provider>
  );
}

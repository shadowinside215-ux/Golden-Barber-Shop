import React, { useState } from 'react';
import { useAdmin } from './AdminProvider';
import { Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminModal() {
  const { login, isAdmin, logout } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setIsOpen(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-brand-gray border border-zinc-800 rounded-full shadow-lg hover:border-gold-500/50 transition-colors group"
        aria-label="Admin Login"
      >
        <Lock className={`w-5 h-5 ${isAdmin ? 'text-gold-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-brand-dark border border-zinc-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <Lock className="w-10 h-10 text-gold-500 mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold text-white">Admin Access</h2>
                {isAdmin ? (
                  <p className="text-zinc-400 mt-2">You are currently logged in.</p>
                ) : (
                  <p className="text-zinc-400 mt-2">Enter credentials to edit site content.</p>
                )}
              </div>

              {isAdmin ? (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-gray border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-gray border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Enter password"
                    />
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gold-500 hover:bg-gold-400 text-brand-black rounded-lg font-semibold transition-colors mt-4"
                  >
                    Login
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

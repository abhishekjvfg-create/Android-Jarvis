import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Smartphone, 
  Search, 
  ExternalLink, 
  Tv, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Download, 
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export interface AppLaunchItem {
  key: string;
  name: string;
  category: 'Popular' | 'System' | 'Payment' | 'Social' | 'Media' | 'Shopping' | 'Utility';
  packageName: string;
  appScheme?: string;
  url: string;
  iconBg: string;
  textColor: string;
}

export const POPULAR_APPS_LIST: AppLaunchItem[] = [
  { key: 'airtel', name: 'Airtel Thanks', category: 'Utility', packageName: 'com.myairtelapp', appScheme: 'airtel://', url: 'https://www.airtel.in', iconBg: 'bg-red-600', textColor: 'text-red-400' },
  { key: 'whatsapp', name: 'WhatsApp', category: 'Social', packageName: 'com.whatsapp', appScheme: 'whatsapp://', url: 'https://web.whatsapp.com', iconBg: 'bg-emerald-600', textColor: 'text-emerald-400' },
  { key: 'youtube', name: 'YouTube', category: 'Media', packageName: 'com.google.android.youtube', appScheme: 'vnd.youtube://', url: 'https://www.youtube.com', iconBg: 'bg-red-500', textColor: 'text-red-300' },
  { key: 'instagram', name: 'Instagram', category: 'Social', packageName: 'com.instagram.android', appScheme: 'instagram://app', url: 'https://www.instagram.com', iconBg: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600', textColor: 'text-pink-400' },
  { key: 'phonepe', name: 'PhonePe', category: 'Payment', packageName: 'com.phonepe.app', appScheme: 'phonepe://', url: 'https://www.phonepe.com', iconBg: 'bg-purple-600', textColor: 'text-purple-400' },
  { key: 'paytm', name: 'Paytm', category: 'Payment', packageName: 'net.one97.paytm', appScheme: 'paytm://', url: 'https://paytm.com', iconBg: 'bg-sky-600', textColor: 'text-sky-300' },
  { key: 'gpay', name: 'Google Pay', category: 'Payment', packageName: 'com.google.android.apps.nfc.plugin.mosa.prod', appScheme: 'gpay://', url: 'https://pay.google.com', iconBg: 'bg-blue-600', textColor: 'text-blue-400' },
  { key: 'spotify', name: 'Spotify', category: 'Media', packageName: 'com.spotify.music', appScheme: 'spotify://', url: 'https://open.spotify.com', iconBg: 'bg-emerald-500', textColor: 'text-emerald-300' },
  { key: 'camera', name: 'Camera', category: 'System', packageName: 'com.android.camera', url: 'https://www.google.com', iconBg: 'bg-zinc-700', textColor: 'text-zinc-200' },
  { key: 'settings', name: 'Settings', category: 'System', packageName: 'com.android.settings', url: 'https://www.google.com', iconBg: 'bg-blue-700', textColor: 'text-blue-300' },
  { key: 'calculator', name: 'Calculator', category: 'System', packageName: 'com.google.android.calculator', url: 'https://www.google.com', iconBg: 'bg-orange-600', textColor: 'text-orange-300' },
  { key: 'clock', name: 'Clock & Alarm', category: 'System', packageName: 'com.google.android.deskclock', url: 'https://www.google.com', iconBg: 'bg-indigo-600', textColor: 'text-indigo-300' },
  { key: 'photos', name: 'Photos & Gallery', category: 'System', packageName: 'com.google.android.apps.photos', url: 'https://photos.google.com', iconBg: 'bg-yellow-600', textColor: 'text-yellow-300' },
  { key: 'gmail', name: 'Gmail', category: 'Utility', packageName: 'com.google.android.gm', appScheme: 'googlegmail://', url: 'https://mail.google.com', iconBg: 'bg-red-700', textColor: 'text-red-400' },
  { key: 'chrome', name: 'Google Chrome', category: 'Utility', packageName: 'com.android.chrome', appScheme: 'googlechrome://', url: 'https://www.google.com', iconBg: 'bg-yellow-500', textColor: 'text-yellow-300' },
  { key: 'maps', name: 'Google Maps', category: 'Utility', packageName: 'com.google.android.apps.maps', appScheme: 'geo:0,0?q=', url: 'https://maps.google.com', iconBg: 'bg-green-600', textColor: 'text-green-300' },
  { key: 'telegram', name: 'Telegram', category: 'Social', packageName: 'org.telegram.messenger', appScheme: 'tg://', url: 'https://web.telegram.org', iconBg: 'bg-cyan-600', textColor: 'text-cyan-300' },
  { key: 'facebook', name: 'Facebook', category: 'Social', packageName: 'com.facebook.katana', appScheme: 'fb://', url: 'https://www.facebook.com', iconBg: 'bg-blue-600', textColor: 'text-blue-400' },
  { key: 'x', name: 'X (Twitter)', category: 'Social', packageName: 'com.twitter.android', appScheme: 'twitter://', url: 'https://x.com', iconBg: 'bg-zinc-800', textColor: 'text-zinc-200' },
  { key: 'snapchat', name: 'Snapchat', category: 'Social', packageName: 'com.snapchat.android', appScheme: 'snapchat://', url: 'https://www.snapchat.com', iconBg: 'bg-yellow-400', textColor: 'text-yellow-200' },
  { key: 'amazon', name: 'Amazon', category: 'Shopping', packageName: 'com.amazon.mShop.android.shopping', url: 'https://www.amazon.in', iconBg: 'bg-amber-600', textColor: 'text-amber-300' },
  { key: 'flipkart', name: 'Flipkart', category: 'Shopping', packageName: 'com.flipkart.android', url: 'https://www.flipkart.com', iconBg: 'bg-blue-500', textColor: 'text-blue-200' },
  { key: 'zomato', name: 'Zomato', category: 'Utility', packageName: 'com.application.zomato', url: 'https://www.zomato.com', iconBg: 'bg-red-600', textColor: 'text-red-300' },
  { key: 'swiggy', name: 'Swiggy', category: 'Utility', packageName: 'in.swiggy.android', url: 'https://www.swiggy.com', iconBg: 'bg-orange-500', textColor: 'text-orange-300' },
  { key: 'uber', name: 'Uber', category: 'Utility', packageName: 'com.ubercab', url: 'https://www.uber.com', iconBg: 'bg-black border border-white/20', textColor: 'text-white' },
  { key: 'jiocinema', name: 'JioCinema', category: 'Media', packageName: 'com.jio.media.ondemand', appScheme: 'jiocinema://', url: 'https://www.jiocinema.com', iconBg: 'bg-pink-600', textColor: 'text-pink-300' },
  { key: 'hotstar', name: 'Disney+ Hotstar', category: 'Media', packageName: 'in.startv.hotstar', appScheme: 'hotstar://', url: 'https://www.hotstar.com', iconBg: 'bg-blue-900', textColor: 'text-blue-300' },
  { key: 'netflix', name: 'Netflix', category: 'Media', packageName: 'com.netflix.mediaclient', appScheme: 'nflx://', url: 'https://www.netflix.com', iconBg: 'bg-red-800', textColor: 'text-red-400' },
  { key: 'playstore', name: 'Google Play Store', category: 'System', packageName: 'com.android.vending', url: 'https://play.google.com', iconBg: 'bg-emerald-700', textColor: 'text-emerald-300' },
];

interface AppLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (appName: string) => void;
  activePersona: 'jarvis' | 'rose';
}

export const AppLauncherModal: React.FC<AppLauncherModalProps> = ({
  isOpen,
  onClose,
  onLaunchApp,
  activePersona
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const filteredApps = POPULAR_APPS_LIST.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Popular', 'System', 'Payment', 'Social', 'Media', 'Shopping', 'Utility'];

  const handleCustomLaunch = (nameToLaunch: string) => {
    if (!nameToLaunch.trim()) return;
    onLaunchApp(nameToLaunch);
    onClose();
  };

  const isRose = activePersona === 'rose';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-2xl rounded-2xl border p-4 sm:p-6 shadow-2xl font-mono overflow-hidden z-10 my-auto ${
            isRose 
              ? 'bg-[#120518] border-pink-500/50 text-pink-100 shadow-[0_0_60px_rgba(255,105,180,0.3)]' 
              : 'bg-[#090e15] border-cyan-500/50 text-cyan-100 shadow-[0_0_60px_rgba(0,242,255,0.3)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-black ${
                isRose ? 'bg-pink-500/20 border-pink-400 text-pink-300' : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              }`}>
                <Smartphone className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>A TO Z DIRECT PHONE APP LAUNCHER</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] rounded font-bold">
                    ANDROID INTENT LINK
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 font-sans">
                  Direct OS launching protocol for Airtel Thanks, WhatsApp, PhonePe, Paytm, Camera & all installed phone apps!
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Launch Search / Custom Input */}
          <div className="mt-4 space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type any app name (e.g. Airtel Thanks, PhonePe, Camera, Gallery)..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleCustomLaunch(searchQuery);
                    }
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 bg-black/60 border rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-all ${
                    isRose ? 'border-pink-500/40 focus:border-pink-400' : 'border-cyan-500/40 focus:border-cyan-400'
                  }`}
                />
              </div>

              <button
                onClick={() => handleCustomLaunch(searchQuery || 'Airtel Thanks')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 active:scale-95 ${
                  isRose 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>LAUNCH PHONE APP</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? isRose ? 'bg-pink-500 text-white border-pink-400' : 'bg-cyan-500 text-black border-cyan-300 font-black'
                      : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* App Grid */}
          <div className="mt-4 max-h-[300px] overflow-y-auto pr-1 space-y-2 font-sans">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredApps.map((app) => (
                <button
                  key={app.key}
                  onClick={() => handleCustomLaunch(app.name)}
                  className="p-2.5 bg-black/50 hover:bg-black/80 border border-white/10 hover:border-white/30 rounded-xl transition-all text-left flex items-center gap-2.5 group active:scale-95"
                >
                  <div className={`w-8 h-8 rounded-lg ${app.iconBg} flex items-center justify-center font-black text-white text-xs shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    {app.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                      {app.name}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-mono truncate">
                      {app.packageName}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 shrink-0" />
                </button>
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="p-6 text-center text-zinc-400 text-xs font-mono">
                No matching app found in list. Type <span className="text-white font-bold">"{searchQuery}"</span> above and click "LAUNCH PHONE APP" to trigger dynamic Android Package Intent!
              </div>
            )}
          </div>

          {/* APK & Phone Launcher Explanation Banner */}
          <div className="mt-5 p-3.5 bg-black/70 border border-emerald-500/40 rounded-xl text-[10px] space-y-1.5 font-sans">
            <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono uppercase tracking-wider text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>APK & PHONE NATIVE INTENT COMPATIBILITY</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              When you convert JARVIS into an APK (using <span className="text-white font-semibold">AppMint</span>, <span className="text-white font-semibold">PWABuilder</span>, or <span className="text-white font-semibold">Capacitor</span>) or use it in Android Chrome:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-0.5 font-mono text-[9px]">
              <li>JARVIS executes native Android OS Intent schemes (<code className="text-cyan-300">intent://#Intent;package=com.myairtelapp;...;end</code>).</li>
              <li>This directly opens the exact installed app (<span className="text-white">Airtel Thanks, PhonePe, WhatsApp, Camera, Settings, etc.</span>) on your phone.</li>
              <li>If the app is not installed, it safely redirects to Play Store for one-click installation.</li>
            </ul>
          </div>

          {/* Footer Close Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] text-zinc-500 font-mono">
              JARVIS ARCHITECTURE • PHONE LAUNCH MATRIX
            </span>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

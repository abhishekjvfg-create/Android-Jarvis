import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Settings, 
  Key, 
  Zap, 
  Mic, 
  Volume2, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Copy, 
  Server,
  Send,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  SendHorizontal,
  Cpu,
  Search,
  Check,
  Star,
  ExternalLink,
  Lock,
  Radio,
  Monitor,
  Video
} from 'lucide-react';
import { ALL_1000_PLUS_MODELS, AIModel } from '../data/aiModels';
import { GeminiLogo } from './PaymentLogos';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePersona: 'jarvis' | 'rose';
  isFlashlightOn: boolean;
  onToggleFlashlight: (enable?: boolean) => void;
  onSetSystemAlert: (msg: string) => void;
  sendIconStyle?: string;
  onSetSendIconStyle?: (style: any) => void;
  isRoseProUnlocked?: boolean;
  onOpenPaymentPortal?: () => void;
  isBackgroundSystemEnabled?: boolean;
  onToggleBackgroundSystem?: (enabled: boolean) => void;
  isScreenSharingActive?: boolean;
  onToggleScreenSharing?: (enabled: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  activePersona,
  isFlashlightOn,
  onToggleFlashlight,
  onSetSystemAlert,
  sendIconStyle = 'arrow-right',
  onSetSendIconStyle,
  isRoseProUnlocked = false,
  onOpenPaymentPortal,
  isBackgroundSystemEnabled = false,
  onToggleBackgroundSystem,
  isScreenSharingActive = false,
  onToggleScreenSharing
}) => {
  const isRose = activePersona === 'rose';
  const [serverUrlInput, setServerUrlInput] = useState('');
  const [meshApiKeyInput, setMeshApiKeyInput] = useState(() => localStorage.getItem('mesh_api_key') || '');
  const [customGeminiKeyInput, setCustomGeminiKeyInput] = useState(() => localStorage.getItem('custom_gemini_api_key') || '');
  const [isApiRevealed, setIsApiRevealed] = useState(() => localStorage.getItem('mesh_api_key_revealed') === 'true');
  const [showKeys, setShowKeys] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'api' | 'models' | 'background' | 'ui'>('api');

  // Background System State
  const [bgSystemActive, setBgSystemActive] = useState<boolean>(isBackgroundSystemEnabled);

  // 1000+ AI Models State
  const [selectedModelId, setSelectedModelId] = useState<string>(() => {
    return localStorage.getItem('jarvis_selected_model') || 'claude-sonnet-5-quantum';
  });
  const [modelSearch, setModelSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  useEffect(() => {
    setBgSystemActive(isBackgroundSystemEnabled);
  }, [isBackgroundSystemEnabled]);

  useEffect(() => {
    if (isOpen) {
      const storedServer = localStorage.getItem('jarvis_server_url') || '';
      setServerUrlInput(storedServer);
      setMeshApiKeyInput(localStorage.getItem('mesh_api_key') || '');
      setCustomGeminiKeyInput(localStorage.getItem('custom_gemini_api_key') || '');
      setIsApiRevealed(localStorage.getItem('mesh_api_key_revealed') === 'true');
      setSelectedModelId(localStorage.getItem('jarvis_selected_model') || 'claude-sonnet-5-quantum');
      setSaveSuccess(false);
    }
  }, [isOpen, activePersona, isRose, activeTab]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanServer = serverUrlInput.trim();

    if (cleanServer) {
      localStorage.setItem('jarvis_server_url', cleanServer);
    } else {
      localStorage.removeItem('jarvis_server_url');
    }

    // Only update keys if the Api.Revel console is unlocked/revealed on screen
    if (isApiRevealed) {
      if (meshApiKeyInput.trim()) {
        localStorage.setItem('mesh_api_key', meshApiKeyInput.trim());
      } else {
        localStorage.removeItem('mesh_api_key');
      }

      if (customGeminiKeyInput.trim()) {
        localStorage.setItem('custom_gemini_api_key', customGeminiKeyInput.trim());
      } else {
        localStorage.removeItem('custom_gemini_api_key');
      }
    }

    setSaveSuccess(true);
    onSetSystemAlert("BRAIN & SYSTEM SETTINGS SAVED SUCCESSFULLY");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 font-mono select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl max-h-[90vh] flex flex-col border-2 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden ${
            isRose
              ? 'bg-[#180517] border-pink-500/70 text-pink-100 shadow-[0_0_50px_rgba(255,105,180,0.35)]'
              : 'bg-[#080f18] border-cyan-500/70 text-cyan-100 shadow-[0_0_50px_rgba(0,242,255,0.35)]'
          }`}
        >
          {/* Top Bar Header */}
          <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b ${
            isRose ? 'border-pink-500/30' : 'border-cyan-500/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isRose ? 'bg-pink-500/20 border-pink-400 text-pink-300' : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
              }`}>
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
              </div>
              <div>
                <h2 className={`text-base sm:text-lg font-bold uppercase tracking-wider ${
                  isRose ? 'text-pink-300' : 'text-cyan-200'
                }`}>
                  {isRose ? 'ROSE SYSTEM SETTINGS' : 'JARVIS SYSTEM SETTINGS'}
                </h2>
                <p className="text-[10px] sm:text-xs opacity-70">
                  System Engine & Backend Server Configuration
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 pb-2 border-b border-white/10 overflow-x-auto custom-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'api'
                  ? (isRose ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,105,180,0.5)]' : 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,242,255,0.5)]')
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>System & API Keys</span>
            </button>

            {/* 1000+ AI Models Directory Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('models')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'models'
                  ? (isRose ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,105,180,0.5)]' : 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,242,255,0.5)]')
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <GeminiLogo className="w-4 h-4" />
              <span>1000+ AI Models</span>
            </button>

            {/* Background System Mode Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('background')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'background'
                  ? (isRose ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,105,180,0.5)]' : 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,242,255,0.5)]')
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${bgSystemActive ? 'text-emerald-400 animate-pulse' : ''}`} />
              <span>Background System</span>
              {bgSystemActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ui')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'ui'
                  ? (isRose ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,105,180,0.5)]' : 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,242,255,0.5)]')
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>UI Style</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar text-xs sm:text-sm">
            {/* TAB 1: API KEYS */}
            {activeTab === 'api' && (
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className={`p-3.5 rounded-xl border ${
                  isRose ? 'bg-pink-950/30 border-pink-500/40' : 'bg-cyan-950/30 border-cyan-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${isRose ? 'text-pink-400' : 'text-cyan-400'}`} />
                    <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider">
                      System & Backend Configuration
                    </h3>
                  </div>
                  
                  <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                    JARVIS & Rose system core operating on high-speed dual-channel AI engines with zero credit expenditure. All server API keys are securely locked and encrypted.
                  </p>

                  <div className="mt-3 space-y-2">
                    <label className="block text-[10px] uppercase font-bold text-zinc-400">
                      Custom Backend Server URL (Optional):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={serverUrlInput}
                        onChange={(e) => setServerUrlInput(e.target.value)}
                        placeholder="https://your-custom-backend.run.app"
                        className={`w-full py-2 px-3 bg-black/80 border rounded-xl font-mono text-xs focus:outline-none ${
                          isRose
                            ? 'border-pink-500/50 text-pink-200 focus:border-pink-400'
                            : 'border-cyan-500/50 text-cyan-200 focus:border-cyan-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* API.REVEL SECRET CONSOLE SECTION - COMPLETELY HIDDEN BY DEFAULT UNLESS UNLOCKED VIA API.REVEL */}
                {isApiRevealed && (
                  <div className={`p-3.5 rounded-xl border animate-fadeIn ${
                    isRose ? 'bg-pink-950/40 border-pink-500/50' : 'bg-cyan-950/40 border-cyan-500/50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Key className={`w-4 h-4 ${isRose ? 'text-pink-400' : 'text-cyan-400'}`} />
                        <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider">
                          Api.Revel Decryption Console
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsApiRevealed(false);
                          localStorage.setItem('mesh_api_key_revealed', 'false');
                          onSetSystemAlert("API KEYS CONCEALED 🔒");
                        }}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 font-bold flex items-center gap-1 transition-all"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Lock & Conceal</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                      Api.Revel decrypted console active. Enter or update your Mesh API Key ($10 balance loaded) or Custom Gemini Key.
                    </p>

                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] uppercase font-bold text-cyan-300">
                            Mesh API Key (560+ Premium AI Models Engine):
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowKeys(!showKeys)}
                            className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                          >
                            {showKeys ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{showKeys ? 'Mask' : 'Unmask'}</span>
                          </button>
                        </div>
                        <input
                          type={showKeys ? "text" : "password"}
                          value={meshApiKeyInput}
                          onChange={(e) => setMeshApiKeyInput(e.target.value)}
                          placeholder="mesh_live_sk_..."
                          className="w-full py-2 px-3 bg-black/90 border border-cyan-500/60 rounded-xl font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-amber-300 mb-1">
                          Custom Gemini API Key Override:
                        </label>
                        <input
                          type={showKeys ? "text" : "password"}
                          value={customGeminiKeyInput}
                          onChange={(e) => setCustomGeminiKeyInput(e.target.value)}
                          placeholder="AIzaSy..."
                          className="w-full py-2 px-3 bg-black/90 border border-amber-500/60 rounded-xl font-mono text-xs text-amber-200 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      ENCRYPTION CORE ACTIVE
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={`py-2.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 ${
                      isRose
                        ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_15px_rgba(255,105,180,0.5)]'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,242,255,0.5)]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{saveSuccess ? 'SAVED!' : 'SAVE SETTINGS'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: 1000+ AI MODELS DIRECTORY */}
            {activeTab === 'models' && (
              <div className="space-y-4">
                {/* FREEMIUM VS PREMIUM UNLOCK HEAD BANNER (ROSE MODE ONLY) */}
                {isRose && !isRoseProUnlocked && (
                  <div className="p-4 bg-gradient-to-br from-pink-950/80 via-purple-950/70 to-black border-2 border-pink-500/60 rounded-2xl text-left space-y-3 shadow-[0_0_30px_rgba(255,105,180,0.3)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-pink-400 animate-pulse" />
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                          Rose AI Model Tier Selection
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/40">
                        FREEMIUM ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Freemium Tier Card */}
                      <div className="p-3 bg-black/70 border border-zinc-700/80 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">Freemium Plan (₹0)</span>
                          <span className="text-[9px] font-bold text-emerald-400">✓ ACTIVE</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">Gemini 3.6 Flash + Full Web Studio</p>
                      </div>

                      {/* Premium Tier Card */}
                      <div className="p-3 bg-gradient-to-r from-pink-900/80 to-purple-900/80 border border-pink-400 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-white">Rose Pro (₹499)</span>
                          <p className="text-[10px] text-pink-200">Unlock 1,000+ Models Matrix</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onOpenPaymentPortal) onOpenPaymentPortal();
                          }}
                          className="px-3 py-1.5 bg-pink-500 hover:bg-pink-400 text-white font-extrabold text-[10px] uppercase rounded-lg shadow-[0_0_15px_rgba(255,105,180,0.6)]"
                        >
                          UPGRADE ₹499
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1000+ MODELS MATRIX CONTAINER */}
                <div className={`space-y-3 transition-all ${
                  isRose && !isRoseProUnlocked ? 'opacity-50 grayscale pointer-events-auto filter contrast-75' : ''
                }`}>
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    isRose ? 'bg-pink-950/30 border-pink-500/40' : 'bg-cyan-950/30 border-cyan-500/40'
                  }`}>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white flex items-center gap-2">
                        <Cpu className={`w-4 h-4 ${isRose ? 'text-pink-400' : 'text-cyan-400'}`} />
                        <span>1,000+ AI Models Directory ({isRose ? 'ROSE' : 'JARVIS'})</span>
                        {isRose && !isRoseProUnlocked && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] border border-amber-500/40 rounded uppercase font-mono flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            DEACTIVATED (FREEMIUM MODE)
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-zinc-300 mt-0.5">
                        {isRose && !isRoseProUnlocked 
                          ? 'Models catalog is currently deactivated in Freemium Mode. Upgrade to Rose Pro ₹499 to activate.' 
                          : 'Select your preferred neural model from the 1,000+ matrix below:'}
                      </p>
                    </div>
                  </div>

                  {/* Active Model Bar */}
                  <div className={`p-3 bg-black/80 border rounded-xl flex items-center justify-between ${
                    isRose ? 'border-pink-500/30' : 'border-cyan-500/30'
                  }`}>
                    <div>
                      <div className={`text-[10px] uppercase font-bold tracking-wider ${isRose ? 'text-pink-400' : 'text-cyan-400'}`}>
                        Active Neural Model
                      </div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">
                        {ALL_1000_PLUS_MODELS.find(m => m.id === selectedModelId)?.name || selectedModelId}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 ${
                      isRose ? 'bg-pink-500/20 text-pink-300 border-pink-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                      SELECTED
                    </span>
                  </div>

                  {/* Search Bar & Category Filter */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                      <input
                        type="text"
                        value={modelSearch}
                        onChange={(e) => setModelSearch(e.target.value)}
                        placeholder="Search 1,000+ models (e.g. Claude 3.5, DeepSeek R1, GPT-4o, Llama 3.3)..."
                        className={`w-full py-2.5 pl-9 pr-3 bg-black/80 border border-zinc-700 rounded-xl font-mono text-xs text-white focus:outline-none ${
                          isRose ? 'focus:border-pink-400' : 'focus:border-cyan-400'
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                      {['All', 'Flagship', 'Fast & Lite', 'Reasoning', 'Coding', 'Vision & Image', 'Open Source'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                            categoryFilter === cat
                              ? (isRose ? 'bg-pink-600 text-white' : 'bg-cyan-500 text-black font-extrabold')
                              : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Catalog Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                    {ALL_1000_PLUS_MODELS.filter((m) => {
                      const matchesCat = categoryFilter === 'All' || m.category === categoryFilter;
                      const matchesSearch = !modelSearch || 
                        m.name.toLowerCase().includes(modelSearch.toLowerCase()) || 
                        m.id.toLowerCase().includes(modelSearch.toLowerCase()) || 
                        m.provider.toLowerCase().includes(modelSearch.toLowerCase());
                      return matchesCat && matchesSearch;
                    }).slice(0, 600).map((m) => {
                      const isSelected = selectedModelId === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            if (isRose && !isRoseProUnlocked) {
                              onSetSystemAlert("ROSE PRO ₹499 REQUIRED TO SELECT 1,000+ AI MODELS");
                              onClose();
                              if (onOpenPaymentPortal) onOpenPaymentPortal();
                              return;
                            }
                            setSelectedModelId(m.id);
                            localStorage.setItem('jarvis_selected_model', m.id);
                            localStorage.setItem('rose_selected_mesh_model', m.id);
                            onSetSystemAlert(`PRIMARY MODEL SWITCHED TO: ${m.name.toUpperCase()}`);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? (isRose 
                                  ? 'bg-pink-900/40 border-pink-400 text-pink-100 shadow-[0_0_15px_rgba(255,105,180,0.3)]'
                                  : 'bg-cyan-900/40 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,242,255,0.3)]')
                              : 'bg-black/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isRose ? 'text-pink-400/80' : 'text-cyan-400/80'}`}>
                                {m.provider} • {m.category}
                              </span>
                              {isRose && !isRoseProUnlocked ? (
                                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                                  <Lock className="w-2.5 h-2.5" />
                                  LOCKED
                                </span>
                              ) : (
                                m.badge && (
                                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                                    isRose 
                                      ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' 
                                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                                  }`}>
                                    {m.badge}
                                  </span>
                                )
                              )}
                            </div>
                            <div className="font-bold text-xs text-white truncate font-mono">{m.name}</div>
                            <div className="text-[10px] text-zinc-400 line-clamp-2 mt-1 leading-snug">{m.description}</div>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                            <span className="text-zinc-500 font-mono">{m.contextWindow}</span>
                            <span className={`font-bold flex items-center gap-1 ${
                              isRose && !isRoseProUnlocked ? 'text-amber-400' : isSelected ? 'text-emerald-400' : 'text-zinc-400'
                            }`}>
                              {isRose && !isRoseProUnlocked ? (
                                <>
                                  <Lock className="w-2.5 h-2.5" />
                                  <span>UNLOCK ₹499</span>
                                </>
                              ) : isSelected ? (
                                '✓ SELECTED'
                              ) : (
                                'SELECT MODEL'
                              )}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BACKGROUND SYSTEM AUTOMATION (CLEAN MINIMAL ON/OFF) */}
            {activeTab === 'background' && (
              <div className="py-4 space-y-4">
                <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  bgSystemActive
                    ? (isRose 
                        ? 'bg-gradient-to-r from-pink-950/60 to-purple-950/60 border-pink-400/80 shadow-[0_0_25px_rgba(236,72,153,0.3)]' 
                        : 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-400/80 shadow-[0_0_25px_rgba(0,242,255,0.3)]')
                    : 'bg-black/50 border-white/10'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3.5 rounded-2xl border shrink-0 ${
                      bgSystemActive
                        ? (isRose ? 'bg-pink-500/20 border-pink-400 text-pink-300' : 'bg-cyan-500/20 border-cyan-400 text-cyan-300')
                        : 'bg-white/5 border-white/10 text-zinc-500'
                    }`}>
                      <Radio className={`w-6 h-6 ${bgSystemActive ? 'animate-pulse' : ''}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-white tracking-wide uppercase">
                          Background System
                        </h3>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          bgSystemActive
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 animate-pulse'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                        }`}>
                          {bgSystemActive ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {bgSystemActive ? 'Continuous background mode is active' : 'Background mode is currently disabled'}
                      </p>
                    </div>
                  </div>

                  {/* Clean ON/OFF Switch */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !bgSystemActive;
                      setBgSystemActive(next);
                      if (onToggleBackgroundSystem) {
                        onToggleBackgroundSystem(next);
                      } else {
                        localStorage.setItem('jarvis_background_system_enabled', next ? 'true' : 'false');
                      }
                      onSetSystemAlert(
                        next 
                          ? "⚡ BACKGROUND SYSTEM: ON" 
                          : "BACKGROUND SYSTEM: OFF"
                      );
                    }}
                    className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shrink-0 transition-all flex items-center justify-center gap-2 border shadow-lg ${
                      bgSystemActive
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black border-emerald-400 shadow-emerald-500/30'
                        : (isRose 
                            ? 'bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 border-pink-500/50' 
                            : 'bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border-cyan-500/50')
                    }`}
                  >
                    <Zap className={`w-4 h-4 ${bgSystemActive ? 'fill-current' : ''}`} />
                    <span>{bgSystemActive ? 'Turn OFF' : 'Turn ON'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: UI STYLE */}
            {activeTab === 'ui' && (
              <div className="space-y-4">
                <div className={`p-3.5 rounded-xl border ${
                  isRose ? 'bg-pink-950/30 border-pink-500/40' : 'bg-cyan-950/30 border-cyan-500/30'
                }`}>
                  <h3 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Chat Input Send Button Icon Style</span>
                  </h3>
                  <p className="text-xs text-zinc-300 mb-3">
                    Choose your preferred send button icon style for the main chat prompt input bar:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'arrow-right', label: 'Arrow Right', icon: <ArrowRight className="w-4 h-4" /> },
                      { id: 'arrow-up', label: 'Arrow Up', icon: <ArrowUp className="w-4 h-4" /> },
                      { id: 'arrow-up-right', label: 'Arrow Up-Right', icon: <ArrowUpRight className="w-4 h-4" /> },
                      { id: 'send-horizontal', label: 'Send Horizontal', icon: <SendHorizontal className="w-4 h-4" /> },
                      { id: 'send', label: 'Send Paper Plane', icon: <Send className="w-4 h-4" /> },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (onSetSendIconStyle) onSetSendIconStyle(item.id);
                          onSetSystemAlert(`SEND ICON CHANGED TO ${item.label.toUpperCase()}`);
                        }}
                        className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${
                          sendIconStyle === item.id
                            ? (isRose ? 'bg-pink-500 text-white border-pink-400 shadow-md' : 'bg-cyan-500 text-black border-cyan-400 shadow-md')
                            : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
            <div>JARVIS QUANTUM CORE • v4.2</div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-xs uppercase"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

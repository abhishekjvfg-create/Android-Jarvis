import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Bot } from 'lucide-react';

interface LiveVoiceInterfaceProps {
  activePersona: 'jarvis' | 'rose';
  onSwitchPersona: (persona: 'jarvis' | 'rose') => void;
  onToggleBackgroundSystem: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  userTranscript: string;
  aiReplyText: string;
  onTapToSpeak?: () => void;
}

export const LiveVoiceInterface: React.FC<LiveVoiceInterfaceProps> = ({
  activePersona,
  onSwitchPersona,
  onToggleBackgroundSystem,
  isListening,
  isSpeaking,
  isProcessing,
  userTranscript,
  aiReplyText,
  onTapToSpeak,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-performance dynamic fluid aurora canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Animation speed based on state
      const speed = isSpeaking ? 0.045 : isProcessing ? 0.035 : isListening ? 0.02 : 0.015;
      time += speed;

      // Color themes depending on persona and state
      const isRose = activePersona === 'rose';
      const c1 = isRose ? 'rgba(236, 72, 153, ' : 'rgba(6, 182, 212, '; // pink or cyan
      const c2 = isRose ? 'rgba(168, 85, 247, ' : 'rgba(37, 99, 235, '; // purple or blue
      const c3 = isRose ? 'rgba(244, 114, 182, ' : 'rgba(59, 130, 246, '; // light pink or royal blue
      const c4 = 'rgba(99, 102, 241, '; // indigo

      // Amplitude based on speaking/listening
      const baseAmp = isSpeaking ? 45 : isProcessing ? 30 : 20;

      // Draw multiple layered fluid wave gradient blobs
      const numWaves = 4;
      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        const yOffset = h * 0.45 + i * (h * 0.12);
        ctx.moveTo(0, h);
        ctx.lineTo(0, yOffset);

        for (let x = 0; x <= w; x += 15) {
          const wave1 = Math.sin(x * 0.003 + time + i * 1.5) * (baseAmp + i * 8);
          const wave2 = Math.cos(x * 0.006 - time * 0.8 + i) * (baseAmp * 0.6);
          const wave3 = Math.sin(x * 0.012 + time * 1.2) * (baseAmp * 0.3);
          const y = yOffset + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        // Gradient for this layer
        const grad = ctx.createLinearGradient(0, yOffset - 50, w, h);
        const alpha = isSpeaking ? 0.85 : isProcessing ? 0.7 : 0.55;

        if (i === 0) {
          grad.addColorStop(0, `${c1}${alpha})`);
          grad.addColorStop(0.5, `${c2}${alpha * 0.8})`);
          grad.addColorStop(1, `${c4}0.2)`);
        } else if (i === 1) {
          grad.addColorStop(0, `${c2}${alpha * 0.9})`);
          grad.addColorStop(0.6, `${c3}${alpha * 0.7})`);
          grad.addColorStop(1, `${c1}0.15)`);
        } else if (i === 2) {
          grad.addColorStop(0, `${c3}${alpha * 0.8})`);
          grad.addColorStop(0.5, `${c4}${alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
        } else {
          grad.addColorStop(0, `${c1}${alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(2, 6, 23, 0.85)');
        }

        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activePersona, isSpeaking, isProcessing, isListening]);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between px-5 pt-8 sm:pt-6 pb-4 z-20">
        {/* Left: Persona Switcher Badge */}
        <button
          type="button"
          onClick={() => onSwitchPersona(activePersona === 'jarvis' ? 'rose' : 'jarvis')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-medium backdrop-blur-md transition-all active:scale-95 ${
            activePersona === 'rose'
              ? 'border-pink-500/40 bg-pink-500/10 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
              : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
          }`}
          title="Click to switch between JARVIS and ROSE"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider font-bold">{activePersona}</span>
        </button>

        {/* Center: Live Sparkle Indicator (Exactly like in the image: |i| Live) */}
        <div className="flex items-center gap-2 text-zinc-100 font-medium tracking-wide text-sm sm:text-base">
          <div className="flex items-center gap-1">
            <span
              className={`w-0.5 rounded-full bg-white transition-all duration-300 ${
                isSpeaking ? 'h-4 animate-pulse' : 'h-2'
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-white transition-all duration-300 ${
                isSpeaking ? 'h-6 animate-pulse' : 'h-3.5'
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-white transition-all duration-300 ${
                isSpeaking ? 'h-3 animate-pulse' : 'h-1.5'
              }`}
            />
          </div>
          <span className="font-semibold text-white tracking-wide">Live</span>
        </div>

        {/* Right: Corner Background System Switch (Same button that enabled it) */}
        <button
          type="button"
          onClick={onToggleBackgroundSystem}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-mono text-xs font-bold backdrop-blur-md transition-all active:scale-95 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:bg-emerald-500/25"
          title="Click to turn OFF Background System and return to Chat"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>BG: ON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </header>

      {/* Middle Conversational Subtitle / Status Display */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center z-20 max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <p className="text-zinc-400 text-sm font-mono tracking-widest uppercase">
                {activePersona === 'rose' ? 'Rose is thinking...' : 'Jarvis is processing...'}
              </p>
            </motion.div>
          ) : isSpeaking && aiReplyText ? (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="space-y-3"
            >
              <p
                className={`text-lg sm:text-2xl font-light leading-relaxed tracking-wide ${
                  activePersona === 'rose' ? 'text-pink-100' : 'text-cyan-100'
                }`}
              >
                "{aiReplyText}"
              </p>
              <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                {activePersona === 'rose' ? 'Rose Speaking' : 'Jarvis Speaking'}
              </p>
            </motion.div>
          ) : userTranscript ? (
            <motion.div
              key="transcript"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <p className="text-xl sm:text-2xl font-light text-zinc-100 leading-relaxed tracking-wide">
                "{userTranscript}"
              </p>
              <p className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                Listening...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 cursor-pointer select-none group"
              onClick={onTapToSpeak}
            >
              <p className="text-zinc-400 group-hover:text-cyan-300 text-sm sm:text-base font-light tracking-wide transition-colors">
                {isListening ? '🎤 Listening... Speak now' : 'Tap to speak'}
              </p>
              <p className="text-[11px] font-mono text-zinc-500">
                Continuous voice mode • Speak anytime
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Fluid Color-Flowing Aurora Container (Matches image.jpg perfectly, NO Hold / End buttons!) */}
      <section className="relative w-full h-[42vh] sm:h-[45vh] overflow-hidden rounded-t-[48px] sm:rounded-t-[60px] border-t border-white/5 bg-gradient-to-t from-black via-black/80 to-transparent">
        {/* Ambient Blur Glow Behind */}
        <div
          className={`absolute inset-0 blur-3xl opacity-70 pointer-events-none transition-all duration-700 ${
            activePersona === 'rose'
              ? 'bg-gradient-to-t from-pink-900/40 via-purple-900/30 to-transparent'
              : 'bg-gradient-to-t from-blue-900/50 via-cyan-900/30 to-transparent'
          }`}
        />

        {/* Dynamic Canvas Fluid Wave */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block absolute inset-0 mix-blend-screen opacity-90"
        />

        {/* Soft Center Radiant Core Light (Soft Blue / Cyan glow as seen in the user's reference photo) */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-48 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
            isSpeaking
              ? (activePersona === 'rose' ? 'bg-pink-500/40 scale-110' : 'bg-cyan-400/40 scale-110')
              : (activePersona === 'rose' ? 'bg-pink-600/25 scale-100' : 'bg-blue-500/30 scale-100')
          }`}
        />

        {/* Glass Edge Highlight at the curved top boundary */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </section>
    </div>
  );
};

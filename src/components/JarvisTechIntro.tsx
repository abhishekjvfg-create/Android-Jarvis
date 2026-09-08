import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, ShieldCheck, Zap, Terminal, CheckCircle2, Globe, Layers, Activity, Volume2 } from 'lucide-react';

interface JarvisTechIntroProps {
  onComplete: () => void;
}

const FEATURE_NODES = [
  { id: '3d', label: 'HIGGSFIELD X 3D ENGINE', icon: Layers, desc: 'Realtime WebGL procedural rendering' },
  { id: 'vision', label: 'NANO BANANA PRO VISION', icon: Zap, desc: 'Multi-modal optical analysis' },
  { id: 'neural', label: 'QUANTUM NEURAL MATRIX', icon: Cpu, desc: 'Omniscient knowledge processing' },
  { id: 'srk', label: 'SRK PERSONA VOICE SYNTH', icon: Activity, desc: 'Emotionally expressive speech synthesis' },
  { id: 'subagents', label: '100,000 SUB-AGENT MATRIX', icon: Globe, desc: 'Parallel task orchestration engine' },
  { id: 'godot', label: 'GODOT & THREE.JS CORE', icon: Terminal, desc: 'Interactive physics & environment builder' },
];

export const JarvisTechIntro: React.FC<JarvisTechIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro_hud' | 'dimmed' | 'loading'>('intro_hud');
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [spokenText, setSpokenText] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play realistic high-tech JARVIS sound effects using Web Audio API
  const playSciFiSoundEffect = (type: 'skill_transfer' | 'hud_beep' | 'reactor_charge' | 'power_down' | 'system_start') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      if (type === 'skill_transfer') {
        // High-tech frequency sweep and chime when skill shifts from one node to another
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);

        // Sub harmonic pulse
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(320, now);
        subOsc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
        subGain.gain.setValueAtTime(0.1, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.08);

      } else if (type === 'hud_beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(1600, now + 0.04);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);

      } else if (type === 'reactor_charge') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(2200, now + 0.6);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);

      } else if (type === 'power_down') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.5);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);

      } else if (type === 'system_start') {
        // Deep sub bass drop + power up chime for "System Start"
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1040, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);

        const sub = ctx.createOscillator();
        const subG = ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(120, now);
        sub.frequency.exponentialRampToValueAtTime(60, now + 0.5);
        subG.gain.setValueAtTime(0.3, now);
        subG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        sub.connect(subG);
        subG.connect(ctx.destination);
        sub.start(now);
        sub.stop(now + 0.5);
      }
    } catch (e) {
      console.warn("Audio Context Notice:", e);
    }
  };

  // Skill transfer animation loop with sound effect match
  useEffect(() => {
    if (phase !== 'intro_hud') return;

    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % FEATURE_NODES.length);
      playSciFiSoundEffect('skill_transfer');
    }, 1100);

    return () => clearInterval(interval);
  }, [phase]);

  // Continuous high-tech JARVIS Arc Reactor & Skill Transfer Sound Effect Engine
  useEffect(() => {
    localStorage.setItem('jarvis_first_time_device_intro_seen', 'true');

    setSpokenText("OPERATING SYSTEM ACTIVE • INITIALIZING MATRIX");
    playSciFiSoundEffect('reactor_charge');

    let isCancelled = false;

    // Direct sound effect sequence without long paragraph speech
    const runIntroSoundSequence = async () => {
      // Play initial high-tech power surge hum
      playSciFiSoundEffect('reactor_charge');

      // Allow 4.5 seconds of high-tech sound effects & skill transfer visuals
      await new Promise(res => setTimeout(res, 4500));
      if (isCancelled) return;

      // System Start Trigger
      setSpokenText("System Start.");
      playSciFiSoundEffect('system_start');

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const startUtter = new SpeechSynthesisUtterance("System Start.");
        startUtter.rate = 1.1;
        startUtter.pitch = 1.0;
        startUtter.onend = () => {
          if (!isCancelled) transitionToDimmedAndLoading();
        };
        startUtter.onerror = () => {
          if (!isCancelled) transitionToDimmedAndLoading();
        };
        window.speechSynthesis.speak(startUtter);
      } else {
        transitionToDimmedAndLoading();
      }
    };

    const transitionToDimmedAndLoading = () => {
      playSciFiSoundEffect('power_down');
      setPhase('dimmed');
      setTimeout(() => {
        setPhase('loading');
      }, 700);
    };

    runIntroSoundSequence();

    return () => {
      isCancelled = true;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Loading Progress Bar Sequence
  useEffect(() => {
    if (phase !== 'loading') return;

    setLoadingProgress(0);
    playSciFiSoundEffect('reactor_charge');

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          playSciFiSoundEffect('system_start');
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        playSciFiSoundEffect('hud_beep');
        return prev + 5;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center p-4 font-mono select-none overflow-hidden">
      {/* Background High-Tech Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.12)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#00f2ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* PHASE 1: TECH HUD & ARC REACTOR INTERFACE */}
      {phase === 'intro_hud' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-4xl flex flex-col items-center justify-center space-y-6"
        >
          {/* Header Title Ticker */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,255,0.3)] text-[11px] text-cyan-300 tracking-widest uppercase animate-pulse">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>JARVIS SYSTEM OPERATING MATRIX • SOUND EFFECTS ACTIVE</span>
          </div>

          {/* MAIN CENTERPIECE: EXACT JARVIS ARC REACTOR INTERFACE ICON (MATCHING IMAGE BLUEPRINT) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-2">
            {/* Outer Spinning Sci-Fi Ring with Tickers */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
            />

            {/* Middle Rotating Arc & Gold Gauge Section */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-cyan-500/60 border-t-amber-400 border-r-transparent p-2"
            >
              <div className="w-full h-full rounded-full border border-cyan-400/30 border-b-amber-400/80" />
            </motion.div>

            {/* Inner Blueprint Circle & HUD Markers */}
            <div className="absolute inset-10 rounded-full bg-cyan-950/40 border border-cyan-400/70 shadow-[inset_0_0_40px_rgba(0,242,255,0.3)] flex items-center justify-center">
              {/* Concentric Circle Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="100" cy="100" r="55" fill="none" stroke="#00f2ff" strokeWidth="0.8" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="#00f2ff" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>

              {/* Glowing Core J.A.R.V.I.S. Typography Emblem */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-white drop-shadow-[0_0_15px_rgba(0,242,255,0.9)] font-mono">
                  J.A.R.V.I.S.
                </span>
                <span className="text-[9px] tracking-widest text-cyan-400 uppercase mt-1 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  SYSTEM ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* FEATURE NODES ORBITING MATRIX WITH SOUND EFFECT MATCH */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 px-2 max-w-3xl">
            {FEATURE_NODES.map((node, idx) => {
              const IconComp = node.icon;
              const isActive = idx === activeNodeIndex;
              return (
                <motion.div
                  key={node.id}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(0,242,255,0.4)] text-white'
                      : 'bg-zinc-950/70 border-cyan-500/20 text-zinc-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg border ${
                    isActive ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-zinc-900 border-zinc-800 text-cyan-400'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold truncate tracking-wider text-cyan-200 uppercase flex items-center justify-between">
                      <span>{node.label}</span>
                      {isActive && <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />}
                    </div>
                    <div className="text-[9px] text-zinc-400 truncate">
                      {node.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Voice & Sound Effects Subtitle Banner */}
          <div className="w-full max-w-xl p-3 bg-black/90 border border-cyan-500/40 rounded-xl text-center space-y-1 shadow-lg">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>JARVIS AUDIO & SOUND TRANSMISSION</span>
            </div>
            <p className="text-xs text-white font-semibold leading-relaxed">
              "{spokenText || 'Initializing...'}"
            </p>
          </div>
        </motion.div>
      )}

      {/* PHASE 2: DIMMED SCENE TRANSITION */}
      {phase === 'dimmed' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-24 h-24 rounded-full border-2 border-cyan-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,242,255,0.2)]">
            <span className="text-lg font-bold text-cyan-300">J.A.R.V.I.S.</span>
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Dimming Interface...</span>
        </motion.div>
      )}

      {/* PHASE 3: JARVIS SYSTEM LOADING HUD */}
      {phase === 'loading' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-zinc-950/90 border-2 border-cyan-500/60 rounded-2xl p-6 space-y-6 shadow-[0_0_60px_rgba(0,242,255,0.3)] text-center relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">
              JARVIS SYSTEM BOOT SEQUENCE
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold">
              <span className="text-cyan-400">INITIALIZING NEURAL CORE...</span>
              <span className="text-white font-extrabold">{loadingProgress}%</span>
            </div>

            {/* Glowing Loading Bar */}
            <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden border border-cyan-500/40 p-0.5">
              <motion.div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 h-full rounded-full shadow-[0_0_15px_rgba(0,242,255,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>

          {/* Module Diagnostics Status Checklist */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-left">
            <div className="p-2 bg-black/60 border border-cyan-500/20 rounded-lg flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Engine: OK</span>
            </div>
            <div className="p-2 bg-black/60 border border-cyan-500/20 rounded-lg flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Nano Vision: OK</span>
            </div>
            <div className="p-2 bg-black/60 border border-cyan-500/20 rounded-lg flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mesh Matrix: OK</span>
            </div>
            <div className="p-2 bg-black/60 border border-cyan-500/20 rounded-lg flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chat Session: READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};


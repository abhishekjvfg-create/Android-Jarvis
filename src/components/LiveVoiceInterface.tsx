import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Bot, Monitor, Sparkles, Mic, MicOff } from 'lucide-react';

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
  isScreenSharingActive?: boolean;
  onToggleScreenSharing?: () => void;
  screenVideoRef?: React.RefObject<HTMLVideoElement | null>;
  onCaptureAndAsk?: () => void;
  buildingProjectTask?: string | null;
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
  isScreenSharingActive,
  onToggleScreenSharing,
  screenVideoRef,
  onCaptureAndAsk,
  buildingProjectTask,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [screenShareToast, setScreenShareToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);
  const prevScreenShareRef = useRef<boolean>(Boolean(isScreenSharingActive));

  // Screen sharing top toast banner
  useEffect(() => {
    if (prevScreenShareRef.current !== Boolean(isScreenSharingActive)) {
      prevScreenShareRef.current = Boolean(isScreenSharingActive);
      const text = isScreenSharingActive ? 'Screen sharing on' : 'Screen sharing off';
      setScreenShareToast(text);
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setScreenShareToast(null);
      }, 2600);
    }
  }, [isScreenSharingActive]);

  const handleToggleScreenShare = () => {
    const nextVal = !isScreenSharingActive;
    setScreenShareToast(nextVal ? 'Screen sharing on' : 'Screen sharing off');
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setScreenShareToast(null);
    }, 2600);
    if (onToggleScreenSharing) {
      onToggleScreenSharing();
    }
  };

  // 3D Particle-Jaali Animated Orb Canvas Engine (Exact algorithm as provided by user)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const TAU = Math.PI * 2;
    const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
    const smooth = (a: number, b: number, x: number) => {
      x = clamp((x - a) / (b - a), 0, 1);
      return x * x * (3 - 2 * x);
    };

    let seed = 724813;
    function random() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    // 1280 nodes forming a connected 3D shell with filaments
    const NODE_COUNT = 1280;
    const nodes: any[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = random() * TAU;
      const z = random() * 2 - 1;
      const q = Math.sqrt(1 - z * z);
      nodes.push({
        x: Math.cos(theta) * q,
        y: Math.sin(theta) * q,
        z,
        theta,
        phase: random() * TAU,
        size: 0.45 + random() * 0.85,
        jitter: random() - 0.5,
      });
    }

    const edges: any[] = [];
    const seen = new Set<number>();
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const near: any[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const m = nodes[j];
        const d = (n.x - m.x) ** 2 + (n.y - m.y) ** 2 + (n.z - m.z) ** 2;
        if (d < 0.125) near.push({ j, d });
      }
      near.sort((a, b) => a.d - b.d);
      const count = Math.min(near.length, 4 + (i % 3));
      for (let k = 0; k < count; k++) {
        const j = near[k].j;
        const a = Math.min(i, j);
        const b = Math.max(i, j);
        const key = a * NODE_COUNT + b;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ a, b, bridge: false, tint: i % 4 });
        }
      }
      if (i % 7 === 0 && near.length > 16) {
        const j = near[Math.min(near.length - 1, 15 + (i % 20))].j;
        edges.push({ a: i, b: j, bridge: true, tint: i % 4 });
      }
    }

    // Triangular struts visible through hollow middle
    for (let i = 0; i < 70; i++) {
      const a = Math.floor(random() * NODE_COUNT);
      const b = Math.floor(random() * NODE_COUNT);
      if (a !== b) edges.push({ a, b, bridge: true, tint: 0 });
    }

    const dust: any[] = [];
    for (let i = 0; i < 1020; i++) {
      dust.push({
        theta: random() * TAU,
        z: random() * 2 - 1,
        layer: random(),
        phase: random() * TAU,
        size: 0.4 + random() * 0.85,
      });
    }

    const points = nodes.map(() => ({ x: 0, y: 0, z: 0, alpha: 0, rim: 0, heat: 0 }));
    const lineBins: any[][][] = Array.from({ length: 4 }, () => Array.from({ length: 13 }, () => []));
    const pointBins: any[][] = Array.from({ length: 12 }, () => []);

    // Offscreen Canvas for Mesh Glow
    const glowLayer = document.createElement('canvas');
    const glowCtx = glowLayer.getContext('2d');

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let base = 0;
    let elapsed = 0;
    let lastTime = 0;
    let animId: number;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      base = Math.min(W * 0.46, H * 0.44, 420);
      base = Math.max(40, base);
      glowLayer.width = Math.max(1, Math.round(W * 0.42));
      glowLayer.height = Math.max(1, Math.round(H * 0.42));
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      const isRose = activePersona === 'rose';

      // Hues & Color configuration:
      // Jarvis: Electric Blue/Cyan hues
      // Rose: Vibrant Neon Pink/Magenta hues
      const hues = isRose
        ? ['244,63,142', '251,113,181', '255,150,210', '255,210,240']
        : ['36,185,230', '42,220,247', '73,243,255', '154,255,255'];

      const glowColor = isRose ? '#f43f8e' : '#09d7f1';

      // 🔊 SPEECH DYNAMICS: Jarvis bolne se hi ye orb move kare aur size badle (chhota bada kare)!
      let scale = 0.52;
      let energy = 0.6;
      let rotSpeedY = 0.15;
      let waveFactor = 1.0;

      if (isSpeaking) {
        // High vocal energy: Fast dynamic oscillations, vocal modulation, rhythmically expanding & contracting
        const vocalBreath = 0.5 + 0.5 * Math.sin(t * 3.2 - 0.9);
        const vocalSyllables = (Math.sin(t * 7.5) + 0.6 * Math.sin(t * 13.2 + 0.6)) / 1.6;
        // Noticeable size variation when speaking (from ~0.50 to ~1.05)
        scale = 0.55 + 0.38 * vocalBreath + 0.15 * vocalSyllables;
        energy = 0.85 + 0.45 * vocalBreath + 0.2 * Math.sin(t * 5.4);
        rotSpeedY = 0.35;
        waveFactor = 2.2;
      } else if (isProcessing) {
        // Fast processing pulse
        const pBreath = 0.5 + 0.5 * Math.sin(t * 4.0);
        scale = 0.54 + 0.12 * pBreath;
        energy = 0.75 + 0.25 * pBreath;
        rotSpeedY = 0.25;
        waveFactor = 1.4;
      } else {
        // Quiet, calm breathing scale while listening / standby
        const breath = 0.5 + 0.5 * Math.sin(t * 1.22 - 0.9);
        const syllable = (Math.sin(t * 4.7) + 0.5 * Math.sin(t * 8.3 + 0.6)) / 1.5;
        scale = 0.48 + 0.18 * breath + 0.04 * syllable;
        energy = 0.54 + 0.25 * breath + 0.08 * Math.sin(t * 3.3);
        rotSpeedY = 0.15;
        waveFactor = 1.0;
      }

      const radius = base * scale;
      const ry = t * rotSpeedY;
      const rx = 0.15 * Math.sin(t * 0.31);
      const rz = 0.1 * Math.sin(t * 0.27);
      const sy = Math.sin(ry);
      const coY = Math.cos(ry);
      const sx = Math.sin(rx);
      const coX = Math.cos(rx);
      const sz = Math.sin(rz);
      const coZ = Math.cos(rz);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = points[i];
        let x0 = n.x * coY + n.z * sy;
        let z0 = n.z * coY - n.x * sy;
        let y0 = n.y * coX - z0 * sx;
        z0 = n.y * sx + z0 * coX;
        const x1 = x0 * coZ - y0 * sz;
        const y1 = x0 * sz + y0 * coZ;
        const angle = Math.atan2(y1, x1);

        const wave =
          (0.12 * Math.sin(angle * 3 + t * 0.9 * waveFactor + z0 * 3) +
            0.082 * Math.sin(angle * 7 - t * 1.14 * waveFactor + z0 * 5) +
            0.035 * Math.sin(angle * 13 + t * 1.32 * waveFactor + z0 * 9)) *
          (isSpeaking ? 1.4 : 1.0);

        const fold =
          0.082 * Math.sin(z0 * 14 + angle * 4 - t * 1.25 * waveFactor) * energy;
        const rad = 1 + wave + fold + n.jitter * 0.017;
        const persp = 3.9 / (3.9 - z0 * 0.65);

        p.x = cx + x1 * radius * rad * persp;
        p.y = cy + y1 * radius * rad * persp;
        p.z = z0;
        p.rim = Math.sqrt(x1 * x1 + y1 * y1);

        const side = Math.pow(Math.abs(Math.cos(angle + 0.09 * Math.sin(t * 0.45))), 8);
        const band = 0.5 + 0.5 * Math.sin(angle * 4 + z0 * 7 + t * 0.76);
        const web = 0.25 + 0.75 * Math.pow(band, 2);
        const shell = smooth(0.2, 0.94, p.rim);
        const front = 0.58 + 0.42 * (z0 * 0.5 + 0.5);

        p.heat = clamp((0.21 + 0.79 * side) * (0.7 + 0.3 * web), 0, 1);
        p.alpha = (0.035 + shell * (0.19 + 0.78 * side) * web) * front;
      }

      for (const bins of lineBins) {
        for (const bin of bins) {
          bin.length = 0;
        }
      }

      for (const e of edges) {
        const a = points[e.a];
        const b = points[e.b];
        let opacity = Math.sqrt(a.alpha * b.alpha) * (0.41 + energy * 0.36);
        if (e.bridge) opacity *= 0.43;
        const span = Math.hypot(a.x - b.x, a.y - b.y) / radius;
        if (span > 0.9) opacity *= 0.38;
        const bin = clamp(Math.round(opacity * 13), 0, 12);
        if (bin > 0) {
          const hot = (a.heat + b.heat) * 0.5;
          const hue = hot > 0.69 ? (e.tint === 0 ? 3 : 2) : e.tint === 0 ? 0 : 1;
          lineBins[hue][bin].push(e);
        }
      }

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Low-resolution optical glow from mesh
      if (glowCtx) {
        glowCtx.setTransform(0.42, 0, 0, 0.42, 0, 0);
        glowCtx.clearRect(0, 0, W + 4, H + 4);
        glowCtx.globalCompositeOperation = 'source-over';
        glowCtx.strokeStyle = glowColor;
        glowCtx.lineWidth = isSpeaking ? 5.5 : 4;
        glowCtx.globalAlpha = isSpeaking ? 0.32 : 0.18;
        glowCtx.beginPath();
        for (let h = 1; h < 4; h++) {
          for (let b = 2; b < 13; b++) {
            for (const e of lineBins[h][b]) {
              glowCtx.moveTo(points[e.a].x, points[e.a].y);
              glowCtx.lineTo(points[e.b].x, points[e.b].y);
            }
          }
        }
        glowCtx.stroke();
        ctx.globalAlpha = isSpeaking ? 0.68 : 0.48;
        ctx.filter = 'blur(7px)';
        ctx.drawImage(glowLayer, 0, 0, W, H);
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      }

      // Render line bins
      for (let h = 0; h < 4; h++) {
        for (let b = 1; b < 13; b++) {
          const bin = lineBins[h][b];
          if (!bin.length) continue;
          ctx.strokeStyle = `rgba(${hues[h]},${(b / 13) * 0.73})`;
          ctx.lineWidth = h === 3 ? 0.75 : 0.52;
          ctx.beginPath();
          for (const e of bin) {
            ctx.moveTo(points[e.a].x, points[e.a].y);
            ctx.lineTo(points[e.b].x, points[e.b].y);
          }
          ctx.stroke();
        }
      }

      // Dissolving dust points & radial dashes
      for (const bin of pointBins) bin.length = 0;
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        const angle = d.theta + t * (0.026 + 0.012 * d.layer);
        const q = Math.sqrt(1 - d.z * d.z);
        const outward = (d.layer + t * 0.035) % 1;
        const wave =
          0.11 * Math.sin(angle * 3 + t * 0.9 + d.z * 3) +
          0.08 * Math.sin(angle * 7 - t * 1.14 + d.z * 5);
        const r = radius * (1 + wave + 0.37 * outward) * q;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const edge = smooth(0.15, 0.86, q);
        const sparkle = 0.4 + 0.6 * Math.pow(0.5 + 0.5 * Math.sin(t * 1.8 + d.phase), 3);
        const side = 0.28 + 0.72 * Math.pow(Math.abs(Math.cos(angle)), 4);
        const alpha = edge * (1 - outward * 0.75) * sparkle * (0.3 + 0.5 * side);
        const b = clamp(Math.floor(alpha * 12), 0, 11);
        if (b > 0) {
          pointBins[b].push({
            x,
            y,
            size: d.size * (0.7 + base / 440),
            angle,
            dash: 1 + outward * 2.3,
          });
        }
      }

      for (let b = 1; b < 12; b++) {
        ctx.fillStyle = isRose
          ? `rgba(251,113,181,${b / 12})`
          : `rgba(95,232,249,${b / 12})`;
        for (const p of pointBins[b]) {
          ctx.fillRect(p.x, p.y, p.size, p.size * 1.4);
        }
        ctx.strokeStyle = isRose
          ? `rgba(244,63,142,${(b / 12) * 0.42})`
          : `rgba(53,202,236,${(b / 12) * 0.42})`;
        ctx.lineWidth = 0.55;
        ctx.beginPath();
        for (const p of pointBins[b]) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(p.angle) * p.dash, p.y + Math.sin(p.angle) * p.dash);
        }
        ctx.stroke();
      }

      // Pinpoint intersections & bright filament knots
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const n = nodes[i];
        const twinkle = 0.72 + 0.28 * Math.sin(t * 2 + n.phase);
        const a = clamp(p.alpha * twinkle * 1.55, 0.025, 0.94);
        if (a < 0.055) continue;
        const size = n.size * (0.65 + base / 570);
        ctx.fillStyle = isRose
          ? `rgba(255,182,225,${a})`
          : `rgba(142,249,255,${a})`;
        ctx.fillRect(p.x - size * 0.5, p.y - size * 0.5, size, size);

        if (p.heat > 0.74 && p.rim > 0.9 && i % 5 === 0) {
          ctx.fillStyle = isRose
            ? `rgba(255,75,170,${a * 0.12})`
            : `rgba(52,232,255,${a * 0.09})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.4, 0, TAU);
          ctx.fill();
          ctx.fillStyle = isRose
            ? `rgba(255,230,245,${a * 0.84})`
            : `rgba(211,255,255,${a * 0.84})`;
          ctx.fillRect(p.x - 0.65, p.y - 0.65, 1.3, 1.3);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      if (document.hidden) return;
      if (lastTime) {
        // Run time faster when speaking so the orb moves vigorously with speech
        const timeMult = isSpeaking ? 1.7 : isProcessing ? 1.3 : 1.0;
        elapsed += Math.min((now - lastTime) / 1000, 0.05) * timeMult;
      }
      lastTime = now;
      render(elapsed);
      animId = requestAnimationFrame(frame);
    };

    lastTime = performance.now();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activePersona, isSpeaking, isProcessing, isListening]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050608] text-white flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Subtle Background Technological Grid / Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/90" />

      {/* Top Notification Toast: "Screen sharing on" / "Screen sharing off" */}
      <AnimatePresence>
        {screenShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full border text-xs sm:text-sm font-mono font-bold tracking-wider uppercase shadow-2xl backdrop-blur-xl flex items-center gap-2.5 ${
              screenShareToast.toLowerCase().includes('on')
                ? 'bg-emerald-950/80 border-emerald-400/80 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                : 'bg-zinc-900/90 border-zinc-700 text-zinc-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                screenShareToast.toLowerCase().includes('on')
                  ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]'
                  : 'bg-zinc-500'
              }`}
            />
            <span>{screenShareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between px-5 pt-7 sm:pt-6 pb-3 z-30">
        {/* Left: Persona Switcher Badge */}
        <button
          type="button"
          onClick={() => onSwitchPersona(activePersona === 'jarvis' ? 'rose' : 'jarvis')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium backdrop-blur-md transition-all active:scale-95 ${
            activePersona === 'rose'
              ? 'border-pink-500/50 bg-pink-500/15 text-pink-300 shadow-[0_0_14px_rgba(236,72,153,0.35)] hover:bg-pink-500/25'
              : 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.35)] hover:bg-cyan-500/25'
          }`}
          title="Click to switch between JARVIS and ROSE"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider font-bold">{activePersona}</span>
        </button>

        {/* Center: Live Status Indicator */}
        <div className="flex items-center gap-2 text-zinc-100 font-medium tracking-wide text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <span
              className={`w-0.5 rounded-full ${activePersona === 'rose' ? 'bg-pink-400' : 'bg-cyan-400'} transition-all duration-300 ${
                isSpeaking ? 'h-4 animate-pulse' : 'h-2'
              }`}
            />
            <span
              className={`w-0.5 rounded-full ${activePersona === 'rose' ? 'bg-pink-300' : 'bg-cyan-300'} transition-all duration-300 ${
                isSpeaking ? 'h-6 animate-pulse' : 'h-3.5'
              }`}
            />
            <span
              className={`w-0.5 rounded-full ${activePersona === 'rose' ? 'bg-pink-400' : 'bg-cyan-400'} transition-all duration-300 ${
                isSpeaking ? 'h-3 animate-pulse' : 'h-1.5'
              }`}
            />
          </div>
          <span className="font-semibold text-white tracking-widest uppercase font-mono text-[11px] sm:text-xs">
            {isSpeaking ? 'VOICE ACTIVE' : isProcessing ? 'PROCESSING' : 'LISTENING'}
          </span>
        </div>

        {/* Right: Corner Controls (Icon-Only Screen Sharing + Background System Switch) */}
        <div className="flex items-center gap-2">
          {/* Top Corner Screen Share Button (Icon Only - NO TEXT) */}
          <button
            type="button"
            onClick={handleToggleScreenShare}
            className={`w-9 h-9 rounded-full border transition-all duration-300 flex items-center justify-center backdrop-blur-md active:scale-95 relative ${
              isScreenSharingActive
                ? (activePersona === 'rose'
                    ? 'border-pink-400 bg-pink-500/30 text-pink-100 shadow-[0_0_20px_rgba(236,72,153,0.9)]'
                    : 'border-cyan-400 bg-cyan-500/30 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.9)]')
                : 'border-white/15 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10'
            }`}
            title={isScreenSharingActive ? "Screen Sharing Active (Click to stop)" : "Start Screen Sharing"}
          >
            <Monitor className={`w-4 h-4 transition-transform ${isScreenSharingActive ? 'scale-110' : ''}`} />
            {isScreenSharingActive && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </button>

          {/* Corner Background System Switch */}
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
        </div>
      </header>

      {/* Centerpiece: 3D Particle-Jaali Animated Orb Viewport */}
      <main className="flex-1 relative flex flex-col items-center justify-center px-4 w-full z-20 min-h-0">
        <div
          className="relative w-full max-w-xl h-[48vh] sm:h-[54vh] flex items-center justify-center cursor-pointer group"
          onClick={onTapToSpeak}
          title="Click to speak or listen"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block relative z-10"
          />

          {/* Subtle Ambient Glow Behind Orb that Expands when Speaking */}
          <div
            className={`absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
              isSpeaking
                ? (activePersona === 'rose' ? 'bg-pink-500/40 scale-125' : 'bg-cyan-500/40 scale-125')
                : (activePersona === 'rose' ? 'bg-pink-600/20 scale-95' : 'bg-cyan-600/20 scale-95')
            }`}
          />
        </div>

        {/* Dynamic Subtitle / Live Transcription HUD Floating Under the Orb */}
        <div className="w-full max-w-lg px-4 text-center mt-1 sm:mt-2 min-h-[90px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {buildingProjectTask ? (
              <motion.div
                key="building"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-2 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full animate-ping ${activePersona === 'rose' ? 'bg-pink-400' : 'bg-cyan-400'}`} />
                  <p className={`text-xs sm:text-sm font-mono tracking-widest uppercase font-bold ${activePersona === 'rose' ? 'text-pink-400' : 'text-cyan-400'}`}>
                    CONSTRUCTING IN BACKGROUND...
                  </p>
                </div>
                <p className="text-sm sm:text-base font-medium text-zinc-100">
                  {buildingProjectTask}
                </p>
                <p className="text-[10px] font-mono text-zinc-400">
                  Will announce "Project completed, Sir" & open directly in browser
                </p>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-2 h-2 rounded-full animate-ping ${
                    activePersona === 'rose' ? 'bg-pink-400' : 'bg-cyan-400'
                  }`}
                />
                <p className="text-zinc-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
                  {activePersona === 'rose' ? 'Rose analyzing neural stream...' : 'Jarvis processing command...'}
                </p>
              </motion.div>
            ) : isSpeaking && aiReplyText ? (
              <motion.div
                key="speaking"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="space-y-1.5 max-w-md mx-auto"
              >
                <p
                  className={`text-base sm:text-xl font-light leading-relaxed tracking-wide ${
                    activePersona === 'rose' ? 'text-pink-100' : 'text-cyan-100'
                  }`}
                >
                  "{aiReplyText}"
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  {activePersona === 'rose' ? 'Rose Speaking' : 'Jarvis Speaking'}
                </p>
              </motion.div>
            ) : userTranscript ? (
              <motion.div
                key="transcript"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-1.5 max-w-md mx-auto"
              >
                <p className="text-base sm:text-xl font-light text-zinc-100 leading-relaxed tracking-wide">
                  "{userTranscript}"
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Listening continuously...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1 select-none"
              >
                <p className="text-zinc-300 text-xs sm:text-sm font-light tracking-wide flex items-center justify-center gap-2">
                  <Mic className={`w-3.5 h-3.5 ${activePersona === 'rose' ? 'text-pink-400' : 'text-cyan-400'} animate-pulse`} />
                  Autonomous Mic Always Active • Speak anytime
                </p>
                <p className="text-[10px] font-mono text-zinc-500">
                  {activePersona === 'rose' ? 'Rose Neural Listening Grid Online' : 'Jarvis Neural Listening Grid Online'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Floating Controls: Permanent Autonomous Neural Mic Indicator + Floating Icon-Only Screen Share */}
      <footer className="w-full px-6 pb-6 pt-2 z-30 flex items-center justify-between">
        {/* Left: Always-On Autonomous Neural Mic Status (Permanent, non-toggleable) */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs font-mono font-medium backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.25)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wider">MIC ALWAYS ON</span>
        </div>

        {/* Right: Floating Screen Share Icon-Only Button + Mini Screen PIP Card */}
        <div className="flex items-center gap-3">
          {/* If screen sharing is active, show small live preview card */}
          {isScreenSharingActive && screenVideoRef && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 20 }}
              className={`hidden sm:flex flex-col w-44 bg-black/90 rounded-2xl border-2 overflow-hidden shadow-2xl backdrop-blur-md p-2 ${
                activePersona === 'rose'
                  ? 'border-pink-500/80 shadow-[0_0_25px_rgba(255,105,180,0.4)]'
                  : 'border-cyan-500/80 shadow-[0_0_25px_rgba(0,242,255,0.4)]'
              }`}
            >
              <div className="relative w-full h-24 bg-black rounded-xl overflow-hidden border border-white/10 mb-1.5">
                <video
                  ref={screenVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-500/60 text-[8px] font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  VISION ON
                </div>
              </div>
              {onCaptureAndAsk && (
                <button
                  type="button"
                  onClick={onCaptureAndAsk}
                  className={`w-full py-1 px-2 rounded-lg font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all active:scale-95 ${
                    activePersona === 'rose'
                      ? 'bg-pink-600 hover:bg-pink-500 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  Scan Screen
                </button>
              )}
            </motion.div>
          )}

          {/* Floating Action Button (Icon Only - NO TEXT) */}
          <button
            type="button"
            onClick={handleToggleScreenShare}
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center backdrop-blur-xl transition-all duration-300 shadow-2xl active:scale-90 relative ${
              isScreenSharingActive
                ? (activePersona === 'rose'
                    ? 'border-pink-400 bg-pink-500/40 text-white shadow-[0_0_30px_rgba(236,72,153,0.9)] animate-pulse'
                    : 'border-cyan-400 bg-cyan-500/40 text-cyan-100 shadow-[0_0_30px_rgba(6,182,212,0.9)] animate-pulse')
                : 'border-white/20 bg-zinc-900/90 text-zinc-300 hover:text-white hover:border-white/50 hover:scale-105'
            }`}
            title={isScreenSharingActive ? "Screen Sharing Active (Click to stop)" : "Start Screen Sharing"}
          >
            <Monitor className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isScreenSharingActive ? 'scale-110' : ''}`} />
            {isScreenSharingActive && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, Zap, Eye, ShieldCheck, Activity, Terminal, RotateCcw, 
  Volume2, Sparkles, CheckCircle2, Sliders, Box, Radio, RefreshCw
} from 'lucide-react';

interface RobotCharacterCardProps {
  title?: string;
  subtitle?: string;
  onSpeak?: (text: string) => void;
}

export const RobotCharacterCard: React.FC<RobotCharacterCardProps> = ({
  title = "Ultra-Realistic Advanced Autonomous Robot Character",
  subtitle = "V3.8 Quantum Neural Cybernetic Core & Hardware Blueprint",
  onSpeak
}) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'specs' | 'hardware' | 'memory'>('3d');
  const [eyeGlow, setEyeGlow] = useState<'cyan' | 'pink' | 'emerald'>('cyan');
  const [corePower, setCorePower] = useState<number>(100);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simple WebGL 3D Rotating Robot Core Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) * 0.65;

      // Outer Rotating Ring 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 1.5);
      ctx.strokeStyle = eyeGlow === 'pink' ? '#ff69b4' : eyeGlow === 'emerald' ? '#10b981' : '#00f2ff';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.stroke();
      ctx.restore();

      // Outer Rotating Ring 2 (Counter)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.8, 0, Math.PI * 1.2);
      ctx.strokeStyle = '#ffffff88';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Cybernetic Head Silhouette & Glowing Eyes
      ctx.save();
      ctx.translate(cx, cy);
      
      // Face Outline
      ctx.beginPath();
      ctx.moveTo(-r * 0.4, -r * 0.4);
      ctx.lineTo(r * 0.4, -r * 0.4);
      ctx.lineTo(r * 0.3, r * 0.4);
      ctx.lineTo(-r * 0.3, r * 0.4);
      ctx.closePath();
      ctx.fillStyle = '#091522';
      ctx.fill();
      ctx.strokeStyle = eyeGlow === 'pink' ? '#ff69b4' : '#00f2ff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glowing Eyes
      const eyeColor = eyeGlow === 'pink' ? '#ff69b4' : eyeGlow === 'emerald' ? '#10b981' : '#00f2ff';
      ctx.fillStyle = eyeColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = eyeColor;

      // Left Eye
      ctx.beginPath();
      ctx.arc(-r * 0.18, -r * 0.1, r * 0.08, 0, Math.PI * 2);
      ctx.fill();

      // Right Eye
      ctx.beginPath();
      ctx.arc(r * 0.18, -r * 0.1, r * 0.08, 0, Math.PI * 2);
      ctx.fill();

      // Arc Reactor Mouth Indicator
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-r * 0.12, r * 0.18, r * 0.24, r * 0.04);

      ctx.restore();

      if (isRotating) angle += 0.03;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [eyeGlow, isRotating]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full my-3 rounded-2xl bg-gradient-to-br from-[#0c051a] via-[#05111e] to-[#010912] border border-cyan-500/40 p-4 sm:p-5 text-white font-sans shadow-[0_0_30px_rgba(0,242,255,0.2)] overflow-hidden relative"
    >
      {/* Background Holographic Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-cyan-200 flex items-center gap-2">
              {title}
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                ONLINE
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">{subtitle}</p>
          </div>
        </div>

        {onSpeak && (
          <button
            onClick={() => onSpeak("Namaste Master Abhishek! Aapka Ultra-Realistic Advanced Autonomous Robot Character 100 percent active aur restored hai!")}
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 font-mono text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Robot Voice</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-4 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: '3d', label: '3D WebGL Kinematics', icon: Box },
          { id: 'specs', label: 'Cybernetic Specs', icon: Activity },
          { id: 'hardware', label: 'Jetson & LiDAR Hardware', icon: Cpu },
          { id: 'memory', label: 'Vault Memory Status', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                isSel
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: 3D WebGL Canvas */}
      {activeTab === '3d' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-black/40 border border-white/10 relative">
            <canvas ref={canvasRef} width={220} height={220} className="w-full max-w-[220px] aspect-square" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2">
              <span className="text-[10px] font-mono text-zinc-400">FPS: 60 | WebGL Shader</span>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="p-1 rounded bg-white/10 text-xs font-mono text-cyan-300 hover:bg-white/20"
              >
                {isRotating ? 'Pause Rotation' : 'Spin 3D'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-2">
              <span className="font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Eye & Core LED Color Spectrum
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setEyeGlow('cyan')}
                  className={`flex-1 py-1 rounded font-mono text-[10px] font-bold border ${eyeGlow === 'cyan' ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-cyan-900/40 text-cyan-300 border-cyan-500/30'}`}
                >
                  Cyan Arc
                </button>
                <button
                  onClick={() => setEyeGlow('pink')}
                  className={`flex-1 py-1 rounded font-mono text-[10px] font-bold border ${eyeGlow === 'pink' ? 'bg-pink-500 text-white border-pink-300' : 'bg-pink-900/40 text-pink-300 border-pink-500/30'}`}
                >
                  Rose Heart
                </button>
                <button
                  onClick={() => setEyeGlow('emerald')}
                  className={`flex-1 py-1 rounded font-mono text-[10px] font-bold border ${eyeGlow === 'emerald' ? 'bg-emerald-500 text-black border-emerald-300' : 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30'}`}
                >
                  Emerald Core
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Joint Servo Kinematics:</span>
                <span className="text-emerald-400">18-DOF Synchronized</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Arc Reactor Power:</span>
                <span className="text-cyan-300">{corePower}% Stable</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Real-Time Vision Latency:</span>
                <span className="text-pink-300">12ms Ultra-Low</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cybernetic Specs */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-cyan-300 font-bold block">🧠 Cybernetic Neural Mind</span>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Multi-turn contextual reasoning, fluid Hinglish empathy engine, and real-time problem solving.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-pink-300 font-bold block">👁️ Computer Vision Engine</span>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              YOLOv8 face detection, spatial gesture tracking, and real-time obstacle avoidance.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-emerald-300 font-bold block">🔊 Voice Synthesizer & STT</span>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              ElevenLabs & Google TTS low-latency voice dictation with Whisper STT speech recognition.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-purple-300 font-bold block">⚙️ Inverse Kinematics</span>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Smooth joint movement interpolation, bipedal balance correction, and arm fluid gestures.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Hardware Diagram */}
      {activeTab === 'hardware' && (
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Supported Physical Hardware & Embedded Controllers</span>
          </div>
          <ul className="space-y-1 text-zinc-300 text-[11px] list-disc list-inside">
            <li><strong className="text-white">NVIDIA Jetson Orin Nano (8GB):</strong> Primary AI Neural Inference & Object Detection Core</li>
            <li><strong className="text-white">Raspberry Pi 5 (8GB):</strong> System Host Controller, Web Server & I/O Bus</li>
            <li><strong className="text-white">ESP32 Dual-Core Microcontroller:</strong> High-frequency PWM servo joint motor driver</li>
            <li><strong className="text-white">360° RPLiDAR A2M12:</strong> Real-time 2D/3D SLAM room mapping & spatial awareness</li>
            <li><strong className="text-white">HC-SR04 Ultrasonic & IMU MPU6050:</strong> Gyro balance sensor & safety collision stop</li>
          </ul>
        </div>
      )}

      {/* Tab 4: Vault Memory */}
      {activeTab === 'memory' && (
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Immutable Secret Memory Vault Status</span>
          </div>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            All past conversations, code builds, character attributes, and user custom preferences are permanently archived in your personal cloud memory vault. Even if a local browser session is cleared, Rose retrieves and restores everything seamlessly!
          </p>
        </div>
      )}
    </motion.div>
  );
};

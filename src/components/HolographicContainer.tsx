import { motion } from "motion/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function HolographicContainer({ children, className = "", title }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-4 rounded-lg glass-panel holographic-border overflow-hidden ${className}`}
    >
      {/* Decorative scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {title && (
        <div className="flex items-center gap-2 mb-3 border-b border-cyan-500/30 pb-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">{title}</span>
        </div>
      )}

      <div className="relative z-10 font-sans">
        {children}
      </div>

      {/* Futuristic corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
    </motion.div>
  );
}

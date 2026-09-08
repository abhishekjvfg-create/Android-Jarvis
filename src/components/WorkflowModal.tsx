import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Cpu, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, 
  Workflow, Database, Zap, RefreshCw, ShieldCheck, Activity, Terminal
} from 'lucide-react';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePersona: 'jarvis' | 'rose';
  onSetSystemAlert: (alertText: string) => void;
  onRestoreRoseHistory?: () => void;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({
  isOpen,
  onClose,
  activePersona,
  onSetSystemAlert,
  onRestoreRoseHistory
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string>('');

  if (!isOpen) return null;

  const runSystemProbe = async () => {
    setTestStatus('testing');
    setTestResult('Pinging Neural API Mesh Core...');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Ping system health probe', persona: activePersona, history: [] })
      });
      const data = await res.json();
      if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setTestStatus('success');
        setTestResult(`200 OK! Neural Link Operational. Active Model Reply verified.`);
        onSetSystemAlert("SYSTEM WORKFLOW PROBE PASSED - ALL AI PIPELINES ONLINE");
      } else {
        setTestStatus('error');
        setTestResult('Probe returned error or non-standard format');
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestResult(`Probe network error: ${err?.message || err}`);
    }
  };

  const steps = [
    {
      id: 1,
      title: "1. Request Intake & Multimodal Parsing",
      icon: Terminal,
      color: "from-cyan-500 to-blue-600",
      description: "Captures user input via text, continuous voice dictation, camera vision, or file upload. Extracts intents and cleans prompt context."
    },
    {
      id: 2,
      title: "2. Function Calling & Native Intent Engine",
      icon: Zap,
      color: "from-purple-500 to-indigo-600",
      description: "Parses system commands (app launches, music playback, flashlight, weather, games, calculation, device settings) without waiting for LLM where possible."
    },
    {
      id: 3,
      title: "3. Multi-Tier AI Routing & OpenRouter Failover",
      icon: Cpu,
      color: "from-emerald-500 to-teal-600",
      description: "Routes requests through Primary Gemini 2.5/2.0 Core -> Secondary Vault Key -> OpenRouter Mesh Network (DeepSeek-Chat/GPT-4o/Llama-3.3-70B) -> Local Offline System Controller."
    },
    {
      id: 4,
      title: "4. Session History & Active Top-Floating Sync",
      icon: Database,
      color: "from-pink-500 to-rose-600",
      description: "Generates instant fresh chats, isolates persona histories, and automatically floats active sessions to the top of history drawers."
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className={`w-full max-w-2xl rounded-3xl border p-5 sm:p-6 text-white font-sans relative my-auto shadow-2xl ${
            activePersona === 'rose'
              ? 'bg-gradient-to-b from-[#2d091e] via-[#1a0413] to-[#0d020a] border-pink-500/50 shadow-[0_0_50px_rgba(255,105,180,0.3)]'
              : 'bg-gradient-to-b from-[#081b29] via-[#040e17] to-[#01060b] border-cyan-500/50 shadow-[0_0_50px_rgba(0,242,255,0.3)]'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
            <div className={`p-3 rounded-2xl flex items-center justify-center ${
              activePersona === 'rose'
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}>
              <Workflow className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase flex items-center gap-2">
                System Neural Workflow
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                  activePersona === 'rose' ? 'bg-pink-500/20 text-pink-300 border-pink-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}>
                  v3.8 ARCHITECTURE
                </span>
              </h2>
              <p className="text-xs text-zinc-300">
                Transparent Execution Pipeline & Automatic Failover Control
              </p>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-3 mb-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? activePersona === 'rose'
                        ? 'bg-pink-950/40 border-pink-400/80 shadow-[0_0_15px_rgba(255,105,180,0.3)] scale-[1.01]'
                        : 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_15px_rgba(0,242,255,0.3)] scale-[1.01]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${step.color} text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono opacity-60">Step {step.id}/4</span>
                  </div>
                  {isSelected && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed pl-1 border-l-2 border-cyan-400/60 ml-2">
                      {step.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live System Health Test */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                  Live Neural Core Probe
                </span>
              </div>
              <button
                type="button"
                onClick={runSystemProbe}
                disabled={testStatus === 'testing'}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                <span>{testStatus === 'testing' ? 'Testing...' : 'Run Diagnostics Probe'}</span>
              </button>
            </div>

            {testStatus !== 'idle' && (
              <div className={`p-2.5 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                testStatus === 'testing' ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' :
                testStatus === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
                'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {testStatus === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{testResult}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {onRestoreRoseHistory && (
              <button
                type="button"
                onClick={() => {
                  onRestoreRoseHistory();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                <span>Restore All Rose Chats & Robot Character</span>
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg ml-auto ${
                activePersona === 'rose'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:opacity-90'
              }`}
            >
              System Operations Confirmed
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

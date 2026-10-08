import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Activity, 
  Cpu, 
  Zap, 
  RotateCcw, 
  Flame, 
  CheckCircle2, 
  BellRing,
  Sparkles
} from 'lucide-react';

export const Header = ({ 
  activeScreen, 
  setActiveScreen, 
  alertsCount, 
  onSimulateSurge, 
  onResetData,
  onOpenEcoAgent,
  isSurgeActive 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d18]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center">
                <span className="text-2xl select-none animate-pulse">🌿</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#090d18] rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight font-heading bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                  ECOCITY AI
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
                  v2.4 LIVE
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  IoT MESH CONNECTED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Autonomous Waste Management & Predictive Command Center
              </p>
            </div>
          </div>

          {/* Center / System Telemetry Pills (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Grid Status</div>
                <div className="text-xs font-bold text-emerald-400">99.8% Online</div>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-800" />

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">EcoAgent</div>
                <div className="text-xs font-bold text-cyan-300">Autonomous Active</div>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-800" />

            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">System Clock</div>
              <div className="text-xs font-bold text-slate-200">
                {time.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Judges & Demo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* EcoAgent Assistant Quick Button */}
            <button
              onClick={onOpenEcoAgent}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 hover:border-emerald-400/80 transition-all shadow-md group cursor-pointer text-xs font-bold"
              title="Open EcoAgent AI Copilot"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">EcoAgent AI</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Simulation Trigger (Hackathon demo killer feature) */}
            <button
              onClick={onSimulateSurge}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-md ${
                isSurgeActive 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-amber-500/20' 
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Simulate Market Zone Waste Surge & Trigger AI Recommendations"
            >
              <Flame className={`w-3.5 h-3.5 ${isSurgeActive ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSurgeActive ? 'Surge Active' : 'Simulate Surge'}</span>
            </button>

            {/* Reset State */}
            <button
              onClick={onResetData}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
              title="Reset System Telemetry"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

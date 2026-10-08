import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  isSurgeActive,
  isSimulationRunning,
  onToggleSimulation,
  isDemoTourOpen,
  onToggleDemoTour,
  isBackendConnected = false,
  onRefreshBackend
}) => {
  const [time, setTime] = useState(new Date());
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-0.5 shadow-xs">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-xl select-none">🌿</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight font-heading text-slate-900">
                  ECOCITY AI
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono">
                  v2.4 LIVE
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                  IoT MESH CONNECTED
                </span>
                <button
                  onClick={onRefreshBackend}
                  title="FastAPI Backend Status (Click to ping/sync)"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono border transition-all cursor-pointer ${
                    isBackendConnected
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span>{isBackendConnected ? '⚡ API :8000 LIVE' : '⚠️ API OFFLINE'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Autonomous Waste Management & Predictive Command Center
              </p>
            </div>
          </div>

          {/* Center / System Telemetry Pills (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Grid Status</div>
                <div className="text-xs font-bold text-emerald-600">99.8% Online</div>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-200" />

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-600" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">EcoAgent</div>
                <div className="text-xs font-bold text-cyan-600">Autonomous Active</div>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-200" />

            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">System Clock</div>
              <div className="text-xs font-bold text-slate-800">
                {time.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Judges & Demo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <select 
              onChange={changeLanguage} 
              defaultValue={i18n.language}
              className="bg-slate-50 border border-slate-300 text-slate-700 text-xs rounded-xl px-2.5 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer font-bold"
            >
              <option value="en">🌐 EN</option>
              <option value="hi">🌐 HI</option>
            </select>

            {/* EcoAgent Assistant Quick Button */}
            <button
              onClick={onOpenEcoAgent}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-all shadow-xs group cursor-pointer text-xs font-bold"
              title="Open EcoAgent AI Copilot"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">EcoAgent AI</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Step 6: Live Simulation Engine Toggle Button */}
            <button
              onClick={onToggleSimulation}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border shadow-xs ${
                isSimulationRunning
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
              title="Toggle Live IoT Bin Simulation (Step 6)"
            >
              <span className={`w-2 h-2 rounded-full ${isSimulationRunning ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`}></span>
              <span className="hidden sm:inline">{isSimulationRunning ? 'LIVE SIM ACTIVE' : '▶ SIMULATE'}</span>
            </button>

            {/* 10-Step Judge Demo Tour Launcher */}
            <button
              onClick={onToggleDemoTour}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-xs ${
                isDemoTourOpen
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300'
              }`}
              title="Launch 10-Step Judge Presentation Scenario"
            >
              <span className="text-xs">🎬</span>
              <span className="hidden md:inline font-mono">10-Step Tour</span>
            </button>

            {/* Simulation Trigger (Hackathon demo killer feature) */}
            <button
              onClick={onSimulateSurge}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-xs ${
                isSurgeActive 
                  ? 'bg-amber-100 text-amber-800 border-amber-400 shadow-amber-500/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
              title="Simulate Market Zone Waste Surge & Trigger AI Recommendations"
            >
              <Flame className={`w-3.5 h-3.5 ${isSurgeActive ? 'text-amber-600 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSurgeActive ? 'Surge Active' : 'Simulate Surge'}</span>
            </button>

            {/* Reset State */}
            <button
              onClick={onResetData}
              className="p-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-300 transition-colors cursor-pointer"
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

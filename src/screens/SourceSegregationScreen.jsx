import React, { useState } from 'react';
import { 
  Recycle, 
  ShieldCheck, 
  AlertTriangle, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Award,
  Zap,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { SEGREGATION_METRICS } from '../data/mockData';

export const SourceSegregationScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [enforcedAction, setEnforcedAction] = useState(false);

  const zoneChartData = SEGREGATION_METRICS.zoneComparisons.map(z => ({
    name: z.zone,
    fullName: z.fullName,
    score: z.score,
    wet: z.wet,
    dry: z.dry,
    mixed: z.mixed,
  }));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1424] border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Source Segregation & AI Bin Contamination Audits
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Computer Vision Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-spectral classification of wet organic, dry recyclable, and hazardous mixed waste streams.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setEnforcedAction(true)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            enforcedAction
              ? 'bg-purple-950 text-purple-300 border-purple-800'
              : 'bg-purple-600/90 hover:bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-950'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{enforcedAction ? 'Green Incentives Broadcasted' : 'Distribute Green Rewards & Warnings'}</span>
        </button>
      </div>

      {/* REQUIRED PROMPT SECTION:
          SOURCE SEGREGATION

          Wet          46%
          Dry          31%
          Mixed        23% 🔴

          Segregation Score: 62/100
      */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#140e24] via-[#0d1322] to-[#0a101d]">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
              CITYWIDE AUDIT METRICS
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              SOURCE SEGREGATION
            </h3>
          </div>

          {/* REQUIRED PROMPT SCORE: Segregation Score: 62/100 */}
          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 sm:px-5 sm:py-3 shadow-lg">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-500 p-0.5">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black font-mono text-white">62</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-slate-400">
                Segregation Score
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">
                62 / 100
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Benchmark Target: 85/100 (Grade C+)
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Stream Percentages matching prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          
          {/* Wet 46% */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-emerald-400">
                Wet Waste (Organics)
              </span>
              <span className="text-xl">🥗</span>
            </div>
            <div className="my-4">
              <div className="text-5xl font-black font-mono text-emerald-400">
                46%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '46%' }} />
              </div>
            </div>
            <span className="text-xs text-emerald-300/80 font-mono">Compostable Food & Agri-Waste</span>
          </div>

          {/* Dry 31% */}
          <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                Dry Waste (Recyclables)
              </span>
              <span className="text-xl">📦</span>
            </div>
            <div className="my-4">
              <div className="text-5xl font-black font-mono text-cyan-300">
                31%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '31%' }} />
              </div>
            </div>
            <span className="text-xs text-cyan-300/80 font-mono">Paper, Plastics, Metal, Glass</span>
          </div>

          {/* Mixed 23% 🔴 */}
          <div className="p-6 rounded-2xl bg-red-950/25 border border-red-500/40 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-red-400 flex items-center gap-1.5">
                <span>Mixed Waste</span>
                <span className="text-base">🔴</span>
              </span>
              <span className="text-xl">⚠️</span>
            </div>
            <div className="my-4">
              <div className="text-5xl font-black font-mono text-red-400">
                23%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
            <span className="text-xs text-red-300/90 font-mono font-bold animate-pulse">
              Contamination Breach (&gt;10% max threshold)
            </span>
          </div>

        </div>

      </div>

      {/* REQUIRED PROMPT SECTION:
          Then compare zones.
          Zone A     91% 🟢
          Zone B     84% 🟢
          Zone C     62% 🟠
          Zone D     41% 🔴
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (7 cols): Exact Zone Comparison List from prompt */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  SECTOR BENCHMARKS (PROMPT SPECIFICATIONS)
                </span>
                <h3 className="text-xl font-black font-heading text-white mt-0.5">
                  Zone Segregation Comparison
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Sorted by Compliance
              </span>
            </div>

            {/* Exact Required Zone Comparison Rows */}
            <div className="space-y-3 mt-5">
              
              {/* Zone A: 91% 🟢 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏭</span>
                  <div>
                    <div className="font-bold text-white text-base">Zone A <span className="text-xs text-slate-400 font-normal">(Industrial A)</span></div>
                    <div className="text-[11px] text-slate-400 font-mono">Wet: 22% • Dry: 69% • Mixed: 9%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-emerald-400">91%</span>
                  <span className="text-2xl">🟢</span>
                </div>
              </div>

              {/* Zone B: 84% 🟢 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <div className="font-bold text-white text-base">Zone B <span className="text-xs text-slate-400 font-normal">(Residential B)</span></div>
                    <div className="text-[11px] text-slate-400 font-mono">Wet: 58% • Dry: 26% • Mixed: 16%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-emerald-400">84%</span>
                  <span className="text-2xl">🟢</span>
                </div>
              </div>

              {/* Zone C: 62% 🟠 */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <div className="font-bold text-white text-base">Zone C <span className="text-xs text-slate-400 font-normal">(Commercial C)</span></div>
                    <div className="text-[11px] text-slate-400 font-mono">Wet: 41% • Dry: 35% • Mixed: 24%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-amber-400">62%</span>
                  <span className="text-2xl">🟠</span>
                </div>
              </div>

              {/* Zone D: 41% 🔴 */}
              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/40 flex items-center justify-between hover:bg-red-950/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <div className="font-bold text-white text-base">Zone D <span className="text-xs text-red-300 font-normal">(Market D)</span></div>
                    <div className="text-[11px] text-red-300 font-mono">Wet: 54% • Dry: 18% • Mixed: 28% (CRITICAL)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black font-mono text-red-400">41%</span>
                  <span className="text-2xl">🔴</span>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Zone E: 88% 🟢 • Zone F: 73% 🟠</span>
            <span className="font-mono text-emerald-400">Model: SegregAI-v3</span>
          </div>
        </div>

        {/* Right Column (5 cols): AI Camera Audit Stream Simulation */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold font-heading text-white">
                  AI Computer Vision Bin Audits
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                LIVE DETECTIONS
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Optical sensors at smart chutes continuously classify item composition upon disposal.
            </p>

            {/* Audit log feeds */}
            <div className="space-y-2.5 mt-4">
              {SEGREGATION_METRICS.aiBinDetections.map((detection) => (
                <div
                  key={detection.id}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">{detection.binId}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{detection.timestamp}</span>
                  </div>
                  <div className="text-slate-300 font-medium">
                    {detection.itemDetected}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-cyan-400 font-bold">
                      Confidence: {detection.confidence}%
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      detection.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                      detection.severity === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {detection.severity === 'high' ? 'Violation' : detection.severity === 'medium' ? 'Warning' : 'Verified'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
            <strong>Municipal Incentive Engine:</strong> Zone A & B commercial tenants rewarded with 5% property tax rebate on waste surcharge.
          </div>
        </div>

      </div>

    </div>
  );
};

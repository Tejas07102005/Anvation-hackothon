import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  ArrowRight,
  Layers,
  Flame,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  Line 
} from 'recharts';
import { LANDFILL_METRICS } from '../data/mockData';

export const LandfillIntelligenceScreen = () => {
  // Interactive Simulation Slider: Adjust Processing Capacity
  const [simulatedProcessing, setSimulatedProcessing] = useState(35);
  const [divertOrganicsActive, setDivertOrganicsActive] = useState(false);

  // Compute dynamic stats based on simulation
  const effectiveProcessing = simulatedProcessing + (divertOrganicsActive ? 8 : 0);
  const netDailyAccumulation = 42 - effectiveProcessing;
  
  // Dynamic forecast calculations
  const dynamicTomorrow = Math.min(100, Math.max(70, Math.round(78 + (netDailyAccumulation > 0 ? (netDailyAccumulation * 1.1) : (netDailyAccumulation * 0.8)))));
  const dynamicSevenDay = Math.min(100, Math.max(50, Math.round(78 + (netDailyAccumulation * 2.6))));
  const isHighRisk = dynamicSevenDay >= 88;

  // Dynamic 7-day projection data
  const dynamicProjection = [
    { day: 'Today', capacity: 78, incoming: 42, processing: effectiveProcessing },
    { day: '+1 Day', capacity: dynamicTomorrow, incoming: 43, processing: effectiveProcessing },
    { day: '+2 Days', capacity: Math.min(100, Math.round(dynamicTomorrow + netDailyAccumulation * 0.4)), incoming: 44, processing: effectiveProcessing },
    { day: '+3 Days', capacity: Math.min(100, Math.round(dynamicTomorrow + netDailyAccumulation * 0.9)), incoming: 43, processing: effectiveProcessing },
    { day: '+4 Days', capacity: Math.min(100, Math.round(dynamicTomorrow + netDailyAccumulation * 1.4)), incoming: 45, processing: effectiveProcessing },
    { day: '+5 Days', capacity: Math.min(100, Math.round(dynamicTomorrow + netDailyAccumulation * 1.9)), incoming: 44, processing: effectiveProcessing },
    { day: '+6 Days', capacity: Math.min(100, Math.round(dynamicTomorrow + netDailyAccumulation * 2.3)), incoming: 43, processing: effectiveProcessing },
    { day: '+7 Days', capacity: dynamicSevenDay, incoming: 45, processing: effectiveProcessing },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Screen Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1424] border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Landfill Intelligence & Saturation Forecaster
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Cell Capacity Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Predictive methane, compaction and volume saturation modeling for municipal landfills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Hub: South Integrated Facility (Cell-04)</span>
        </div>
      </div>

      {/* REQUIRED PROMPT SECTION:
          LANDFILL STATUS

          Current capacity       78%
          Incoming waste         42 tons/day
          Processing capacity    35 tons/day

          Tomorrow forecast      86%
          7-day forecast          96%

          🔴 HIGH OVERFLOW RISK
      */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#120a16] via-[#0d1322] to-[#090e1a]">
        
        {/* Glow effect */}
        <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none ${isHighRisk ? 'bg-red-500/15' : 'bg-emerald-500/15'}`} />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
              FACILITY SENSOR TELEMETRY
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              LANDFILL STATUS
            </h3>
          </div>

          {/* REQUIRED PROMPT STATUS BADGE: 🔴 HIGH OVERFLOW RISK */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-sm font-black font-mono tracking-wider shadow-lg ${
              isHighRisk 
                ? 'bg-red-950/80 text-red-300 border-red-500/60 shadow-red-950/50 pulse-marker-red' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-emerald-950/50'
            }`}>
              <span className="text-xl">{isHighRisk ? '🔴' : '🟢'}</span>
              <span>{isHighRisk ? 'HIGH OVERFLOW RISK' : 'CAPACITY STABILIZED'}</span>
            </div>
          </div>
        </div>

        {/* 5 Core Required Metrics in exact format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          
          {/* 1. Current Capacity: 78% */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Current Capacity
            </span>
            <div className="my-3">
              <div className="text-4xl font-black font-mono text-white">
                {LANDFILL_METRICS.currentCapacityPercent}%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${LANDFILL_METRICS.currentCapacityPercent}%` }} 
                />
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">936,000 / 1.2M Tons</span>
          </div>

          {/* 2. Incoming waste: 42 tons/day */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Incoming Waste
            </span>
            <div className="my-3">
              <div className="text-4xl font-black font-mono text-cyan-300">
                {LANDFILL_METRICS.incomingWasteTonsDay}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1 font-semibold">tons / day</div>
            </div>
            <span className="text-[11px] text-cyan-400/80 font-mono">From 6 Municipal Zones</span>
          </div>

          {/* 3. Processing capacity: 35 tons/day */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Processing Capacity
            </span>
            <div className="my-3">
              <div className="text-4xl font-black font-mono text-slate-100">
                {simulatedProcessing}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1 font-semibold">tons / day</div>
            </div>
            <div className="text-[11px] font-mono text-red-400 font-bold">
              Net Accumulation: +{netDailyAccumulation} T/day
            </div>
          </div>

          {/* 4. Tomorrow forecast: 86% */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Tomorrow Forecast
            </span>
            <div className="my-3">
              <div className="text-4xl font-black font-mono text-amber-400">
                {dynamicTomorrow}%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${dynamicTomorrow}%` }} />
              </div>
            </div>
            <span className="text-[11px] text-amber-300/80 font-mono">+8% Rapid Saturation</span>
          </div>

          {/* 5. 7-day forecast: 96% */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-red-900/50 bg-red-950/20 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-red-300 font-semibold">
              7-Day Forecast
            </span>
            <div className="my-3">
              <div className="text-4xl font-black font-mono text-red-400">
                {dynamicSevenDay}%
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${dynamicSevenDay}%` }} />
              </div>
            </div>
            <span className="text-[11px] font-mono text-red-400 font-bold animate-pulse">
              CRITICAL OVERFLOW IN 5 DAYS
            </span>
          </div>

        </div>

      </div>

      {/* Interactive Mitigation Sandbox / Live Simulator for Judges */}
      <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 bg-[#0d1626] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold font-heading text-white">
                Live Interactive Scenario Sandbox (Judge Demonstration)
              </h4>
              <p className="text-xs text-slate-400">
                Simulate how municipal processing adjustments and biowaste diversion eliminate overflow risk.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSimulatedProcessing(35);
              setDivertOrganicsActive(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Processing Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">Processing Shredder & Baler Capacity:</span>
              <span className="font-bold text-cyan-300 text-sm">{simulatedProcessing} Tons / Day</span>
            </div>
            <input
              type="range"
              min="25"
              max="50"
              value={simulatedProcessing}
              onChange={(e) => setSimulatedProcessing(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>25 T (Reduced Shift)</span>
              <span>35 T (Baseline Deficit)</span>
              <span>50 T (Double Shift)</span>
            </div>
          </div>

          {/* Organic Diversion Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Divert Organic Streams to Bio-methanation</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  -8 T/day Landfill Load
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Reroutes wet market waste directly to compost anaerobic digesters.
              </p>
            </div>
            
            <button
              onClick={() => setDivertOrganicsActive(!divertOrganicsActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                divertOrganicsActive
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {divertOrganicsActive ? 'Active (-8T)' : 'Activate'}
            </button>
          </div>
        </div>
      </div>

      {/* 7-Day Saturation Trajectory Chart */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-400" />
              7-Day Predictive Saturation Curve
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Simulated landfill capacity % under current vs adjusted operations
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-3 h-0.5 bg-red-400"></span> 90% Breach Threshold
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span> Forecasted Capacity
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dynamicProjection} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="landfillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isHighRisk ? '#ef4444' : '#10b981'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={isHighRisk ? '#ef4444' : '#10b981'} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} domain={[60, 100]} unit="%" tickLine={false} />
              <Tooltip 
                formatter={(val) => [`${val}%`, 'Capacity Fill']}
                contentStyle={{ backgroundColor: '#0b1220', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '90% Critical Threshold', fill: '#ef4444', fontSize: 11 }} />
              <Area 
                type="monotone" 
                dataKey="capacity" 
                stroke={isHighRisk ? '#ef4444' : '#10b981'} 
                strokeWidth={3} 
                fill="url(#landfillGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Landfill Cell Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LANDFILL_METRICS.cells.map((cell, idx) => (
          <div key={idx} className="glass-card-interactive rounded-2xl p-4 border border-slate-800 bg-slate-900/60 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-white">{cell.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                cell.status === 'Critical' ? 'bg-red-500/20 text-red-300' :
                cell.status === 'Warning' ? 'bg-amber-500/20 text-amber-300' :
                'bg-emerald-500/20 text-emerald-300'
              }`}>
                {cell.status}
              </span>
            </div>
            <div className="mt-2 text-2xl font-black font-mono text-white">
              {cell.fill}% <span className="text-xs font-normal text-slate-400">Fill</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${cell.fill > 85 ? 'bg-red-500' : cell.fill > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${cell.fill}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-400 font-mono">
              Methane: <span className="text-cyan-300 font-bold">{cell.methanePpm} ppm</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

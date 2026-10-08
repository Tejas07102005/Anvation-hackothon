import React from 'react';
import { 
  Trash2, 
  AlertTriangle, 
  Truck, 
  MapPin, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  ChevronRight, 
  Zap, 
  CheckCircle2,
  Clock,
  Gauge
} from 'lucide-react';
import { CityWasteMap } from '../components/CityWasteMap';

export const CommandCenterScreen = ({
  overview,
  zones,
  vehicles,
  alerts,
  recommendations,
  onSelectZone,
  onDispatchVehicle,
  onExecuteRecommendation,
  onOpenEcoAgent,
  executedActions
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Top Main Section: Left Metric Column + Center/Right City Waste Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (4 Cols on lg): 42.8 Tons, 7 High Risk Zones, 28 Vehicles */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          
          {/* Card 1: 42.8 Tons Today's Waste */}
          <div className="glass-card-interactive rounded-3xl p-6 border border-slate-800 bg-gradient-to-b from-[#0e172a] to-[#0a1120] relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Daily Accumulation
                </span>
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Trash2 className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black font-heading text-white tracking-tight">
                  {overview.todayWasteTons}
                </span>
                <span className="text-xl font-bold font-mono text-emerald-300">Tons</span>
              </div>
              
              <div className="text-sm font-semibold text-slate-300 mt-1">
                Today's Municipal Waste
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">vs Yesterday (39.4 T)</span>
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +8.6% Surge
              </span>
            </div>
          </div>

          {/* Card 2: 7 High Risk Zones */}
          <div className="glass-card-interactive rounded-3xl p-6 border border-slate-800 bg-gradient-to-b from-[#180f1a] to-[#0e0a16] relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                  Urgent Thresholds
                </span>
                <span className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black font-heading text-red-400 tracking-tight">
                  {overview.highRiskZonesCount}
                </span>
                <span className="text-xl font-bold font-mono text-red-300/80">Active</span>
              </div>

              <div className="text-sm font-semibold text-slate-200 mt-1">
                High Risk Zones
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-950/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Immediate Action Required</span>
              <span className="font-mono font-bold text-red-400">Market D & Ind. A</span>
            </div>
          </div>

          {/* Card 3: 28 Vehicles */}
          <div className="glass-card-interactive rounded-3xl p-6 border border-slate-800 bg-gradient-to-b from-[#0a1626] to-[#070e1b] relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  Fleet Operations
                </span>
                <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Truck className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black font-heading text-cyan-300 tracking-tight">
                  {overview.activeVehiclesCount}
                </span>
                <span className="text-xl font-bold font-mono text-cyan-400">Dispatched</span>
              </div>

              <div className="text-sm font-semibold text-slate-200 mt-1">
                Active Electric & Compactor Vehicles
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Fleet Uptime: 96.4%</span>
              <span className="font-mono font-bold text-emerald-400">22 En Route • 6 Idle</span>
            </div>
          </div>

        </div>

        {/* Center / Right Column (8 Cols on lg): Interactive City Waste Map */}
        <div className="lg:col-span-8 flex flex-col">
          <CityWasteMap 
            zones={zones}
            vehicles={vehicles}
            onSelectZone={onSelectZone}
            onDispatchVehicle={onDispatchVehicle}
          />
        </div>

      </div>

      {/* Required Screen 1 Bottom Panels: 🚨 ALERTS & 🤖 ECOAGENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 🚨 ALERTS PANEL */}
        <div className="glass-panel rounded-3xl p-6 border border-red-500/30 bg-gradient-to-br from-red-950/20 via-[#0d1322] to-[#0a0f1d] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white tracking-wide">
                    🚨 CRITICAL ALERTS
                  </h3>
                  <p className="text-xs text-red-300/80 font-mono">Live Municipal Alarm Feeds</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {alerts.length} Active
              </span>
            </div>

            {/* Main Required Alert Callout */}
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 mb-3 shadow-inner">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-red-300 font-bold uppercase tracking-wider">
                    PRIORITY 1: LANDFILL CAPACITY
                  </div>
                  <div className="text-base font-black text-white">
                    Landfill predicted to reach 90% capacity in 5 days
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Incoming waste (42 T/day) exceeds compaction limits. Risk mitigation protocol recommended immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Active Alert */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🛍️</span>
                <div>
                  <span className="font-bold text-slate-200">Market Zone D Bin Cluster #402</span>
                  <div className="text-[11px] text-slate-400 font-mono">Fill rate at 92% • Overdue for 14:00 pickup</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
                SURGE
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Automated alert forwarding to Municipal Control Unit</span>
            <span className="font-mono text-slate-300">Channel: SEC-IoT-01</span>
          </div>
        </div>

        {/* 🤖 ECOAGENT INTELLIGENCE PANEL */}
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[#0d1624] to-[#0a1120] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white tracking-wide">
                    🤖 ECOAGENT AUTONOMOUS DISPATCH
                  </h3>
                  <p className="text-xs text-emerald-300/80 font-mono">Real-time Optimization Engine</p>
                </div>
              </div>
              <button
                onClick={onOpenEcoAgent}
                className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Required Recommendation Callout */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 mb-3 shadow-inner">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    AUTONOMOUS RECOMMENDATION
                  </div>
                  <div className="text-base font-black text-white italic">
                    "3 zones require immediate collection."
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Market D (92%), Industrial A (87%), and Commercial C (72%) have breached dynamic risk gates. Diverting Trucks V04 and V12 saves 4.2 km in transit.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onExecuteRecommendation(recommendations[0])}
                disabled={executedActions.includes('rec-1')}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  executedActions.includes('rec-1')
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/80 hover:shadow-emerald-500/20'
                }`}
              >
                {executedActions.includes('rec-1') ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reroute Executed • Trucks En Route</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Authorize Immediate 3-Zone Dispatch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Model: EcoCity Multi-Agent Orchestrator</span>
            <span className="font-mono text-emerald-400">Latency: 28ms</span>
          </div>
        </div>

      </div>

    </div>
  );
};

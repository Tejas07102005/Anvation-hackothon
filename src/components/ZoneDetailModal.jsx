import React from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  AlertTriangle, 
  Users, 
  Trash2, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const ZoneDetailModal = ({ zone, onClose, onDispatchTruck }) => {
  if (!zone) return null;

  const isHigh = zone.riskLevel === 'high';
  const isMedium = zone.riskLevel === 'medium';
  const riskColor = isHigh ? 'text-red-400 bg-red-500/10 border-red-500/30' : isMedium ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0d1424] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700">{zone.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-heading text-white">{zone.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase border ${riskColor}`}>
                  {zone.riskLevel === 'high' ? '🔴 High Risk' : zone.riskLevel === 'medium' ? '🟠 Medium Risk' : '🟢 Normal'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {zone.code} • Geo: [{zone.coordinates[0].toFixed(4)}, {zone.coordinates[1].toFixed(4)}]
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content: Complete Zone Model */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metric Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400">Current Waste</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{zone.wasteTons} <span className="text-xs font-normal text-slate-400">Tons</span></div>
              <span className="text-[10px] text-slate-500">Live Weight Sensors</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400">Fill Level</span>
              <div className={`text-2xl font-black font-mono mt-1 ${isHigh ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'}`}>
                {zone.fillPercentage}%
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${zone.fillPercentage}%` }} 
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400">Predicted (24h)</span>
              <div className="text-2xl font-black text-cyan-300 font-mono mt-1">{zone.predictedWasteTons} <span className="text-xs font-normal text-slate-400">Tons</span></div>
              <span className="text-[10px] text-cyan-400/80">AI Neural Forecast</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400">Overflow Risk</span>
              <div className={`text-2xl font-black font-mono mt-1 ${zone.overflowProbability > 70 ? 'text-red-400' : zone.overflowProbability > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {zone.overflowProbability}%
              </div>
              <span className="text-[10px] text-slate-500">Bayesian Model</span>
            </div>
          </div>

          {/* Detailed Zone Model Fields */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4.5 space-y-3.5 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Zone Model Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Population & Activity Index</div>
                  <div className="text-sm font-semibold text-slate-200">{zone.populationActivity}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Trash2 className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Smart Bins & Sensor Health</div>
                  <div className="text-sm font-semibold text-slate-200">
                    {zone.binsCount} Smart Units • <span className="text-emerald-400">{zone.activeSensors} Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Collection Frequency</div>
                  <div className="text-sm font-semibold text-slate-200">{zone.collectionFrequency}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Priority Scheduling</div>
                  <div className="text-sm font-semibold text-white font-mono">{zone.priority}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Last Collection:</span>
                <span className="text-xs text-slate-200 font-mono ml-2 font-semibold">{zone.lastCollection}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400">Next Scheduled:</span>
                <span className="text-xs text-amber-300 font-mono ml-2 font-semibold">{zone.nextCollection}</span>
              </div>
            </div>
          </div>

          {/* Source Segregation Profile */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Zone Segregation Health
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Score: {zone.segregationScore}/100
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Wet Organic ({zone.wetPercentage}%)</span>
                <span>Dry Recyclable ({zone.dryPercentage}%)</span>
                <span className="text-red-400">Mixed ({zone.mixedPercentage}%)</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                <div className="bg-emerald-500" style={{ width: `${zone.wetPercentage}%` }} title="Wet" />
                <div className="bg-cyan-500" style={{ width: `${zone.dryPercentage}%` }} title="Dry" />
                <div className="bg-red-500" style={{ width: `${zone.mixedPercentage}%` }} title="Mixed" />
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-5 border-t border-slate-800 bg-slate-900/70">
          <p className="text-xs text-slate-400">
            Automated dispatch routing active via EcoAgent
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDispatchTruck(zone);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 transition-all cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>Dispatch Emergency Truck</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

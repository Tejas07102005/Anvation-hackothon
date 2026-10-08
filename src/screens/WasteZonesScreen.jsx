import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Truck, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Trash2, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowUpDown
} from 'lucide-react';

export const WasteZonesScreen = ({ zones, onSelectZone, onDispatchVehicle }) => {
  const [filterRisk, setFilterRisk] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const filteredZones = zones.filter((zone) => {
    const matchesRisk = filterRisk === 'all' || zone.riskLevel === filterRisk;
    const matchesSearch = zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          zone.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          zone.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Screen Header & Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1424] border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗂️</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Municipal Waste Zones (6-Zone MVP)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Active Monitoring
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time IoT bin network, Bayesian overflow probability, and activity-indexed predictive generation.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
            <div className="text-[10px] font-mono uppercase text-red-400 font-bold">High Risk</div>
            <div className="text-lg font-black text-red-300 font-mono">2 Zones</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Medium Risk</div>
            <div className="text-lg font-black text-amber-300 font-mono">2 Zones</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Normal</div>
            <div className="text-lg font-black text-emerald-300 font-mono">2 Zones</div>
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by zone name, type or code (e.g. Market, Industrial)..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterRisk('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              filterRisk === 'all'
                ? 'bg-slate-800 text-white border-slate-600'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All (6)
          </button>
          <button
            onClick={() => setFilterRisk('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              filterRisk === 'high'
                ? 'bg-red-950/80 text-red-300 border-red-500/50 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-red-400'
            }`}
          >
            <span>🔴 High Risk (2)</span>
          </button>
          <button
            onClick={() => setFilterRisk('medium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              filterRisk === 'medium'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-amber-400'
            }`}
          >
            <span>🟠 Medium (2)</span>
          </button>
          <button
            onClick={() => setFilterRisk('normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              filterRisk === 'normal'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-emerald-400'
            }`}
          >
            <span>🟢 Normal (2)</span>
          </button>

          {/* Table / Grid Toggle */}
          <div className="ml-2 pl-2 border-l border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
              title="Grid View"
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
              title="Table View (Exact Match to Prompt)"
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* REQUIRED PROMPT TABLE:
          ZONE                 WASTE     FILL     RISK
          ------------------------------------------------
          🏭 Industrial A      4.8 T      87%     🔴
          🏠 Residential B     2.1 T      48%     🟢
          🏢 Commercial C      3.7 T      72%     🟠
          🛍️ Market D          5.1 T      92%     🔴
          🎓 Education E       1.4 T      35%     🟢
          🏥 Healthcare F      2.5 T      65%     🟠
      */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              Zone Matrix Overview (Prompt Specifications)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Total Daily Waste: 19.6 T (Sample Sectors)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 sm:px-6">Zone</th>
                <th className="py-3 px-4">Waste</th>
                <th className="py-3 px-4">Fill Level</th>
                <th className="py-3 px-4 text-center">Risk</th>
                <th className="py-3 px-4 hidden md:table-cell">Predicted (24h)</th>
                <th className="py-3 px-4 hidden lg:table-cell">Next Collection</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredZones.map((zone) => {
                const isHigh = zone.riskLevel === 'high';
                const isMedium = zone.riskLevel === 'medium';
                return (
                  <tr 
                    key={zone.id} 
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectZone(zone)}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{zone.icon}</span>
                        <div>
                          <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {zone.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{zone.type}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {zone.wasteTons} T
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isHigh ? 'text-red-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {zone.fillPercentage}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className={`h-full rounded-full ${isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${zone.fillPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="text-lg">
                        {isHigh ? '🔴' : isMedium ? '🟠' : '🟢'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-300 hidden md:table-cell">
                      {zone.predictedWasteTons} T
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-400 text-xs hidden lg:table-cell">
                      {zone.nextCollection}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onDispatchVehicle(zone)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white transition-colors cursor-pointer"
                          title="Dispatch Vehicle to Zone"
                        >
                          <Truck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectZone(zone)}
                          className="p-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                          title="View Full Zone Model"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED ZONE CARDS GRID (Showing Full Zone Model Specs) */}
      {viewMode === 'grid' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Full Zone Model Telemetry Cards
            </h3>
            <span className="text-xs text-slate-500">Showing {filteredZones.length} of {zones.length} Zones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredZones.map((zone) => {
              const isHigh = zone.riskLevel === 'high';
              const isMedium = zone.riskLevel === 'medium';
              return (
                <div
                  key={zone.id}
                  onClick={() => onSelectZone(zone)}
                  className="glass-card-interactive rounded-3xl p-5 border border-slate-800 bg-[#0c1322] flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Top Card Bar */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                          {zone.icon}
                        </span>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {zone.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            {zone.code} • {zone.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">
                          {isHigh ? '🔴' : isMedium ? '🟠' : '🟢'}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isHigh ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                          isMedium ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {zone.fillPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${zone.fillPercentage}%` }}
                      />
                    </div>

                    {/* Zone Model Fields */}
                    <div className="mt-4 space-y-2.5 text-xs">
                      {/* Current & Predicted Waste */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 font-mono">
                        <div>
                          <div className="text-[10px] text-slate-400">Current Waste</div>
                          <div className="text-sm font-bold text-white">{zone.wasteTons} Tons</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">Predicted (24h)</div>
                          <div className="text-sm font-bold text-cyan-300">{zone.predictedWasteTons} Tons</div>
                        </div>
                      </div>

                      {/* Population / Activity */}
                      <div className="flex items-start gap-2 text-slate-300 text-[11px]">
                        <Users className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span className="truncate">{zone.populationActivity}</span>
                      </div>

                      {/* Bins & Sensors */}
                      <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                        <Trash2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{zone.binsCount} Smart Bins • {zone.activeSensors} Sensors Online</span>
                      </div>

                      {/* Collection Frequency & Timing */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                        <span>Freq: <span className="text-slate-200 font-bold">{zone.collectionFrequency}</span></span>
                        <span>Overflow: <span className={`font-bold ${zone.overflowProbability > 70 ? 'text-red-400' : 'text-emerald-400'}`}>{zone.overflowProbability}%</span></span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Next: <span className="text-amber-300">{zone.nextCollection}</span></span>
                        <span className="text-slate-300 font-semibold">{zone.priority}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectZone(zone)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Full Model Telemetry</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDispatchVehicle(zone)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Dispatch</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

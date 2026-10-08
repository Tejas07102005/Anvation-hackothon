import React, { useState } from 'react';
import { 
  Truck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Navigation, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { COLLECTION_SCHEDULE_DATA, COLLECTION_RELIABILITY_STATS } from '../data/mockData';
import { fetchCollectionSchedule } from '../services/api';

export const CollectionReliabilityScreen = () => {
  const [scheduleData, setScheduleData] = useState(COLLECTION_SCHEDULE_DATA);
  const [resolvedMissed, setResolvedMissed] = useState(false);
  const [backendLoaded, setBackendLoaded] = useState(false);

  React.useEffect(() => {
    fetchCollectionSchedule().then(res => {
      if (res && res.timetable && res.timetable.length > 0) {
        const mapped = res.timetable.map((r, i) => ({
          id: r.id || `col-${i}`,
          zone: r.zone,
          subArea: r.sub_area || r.subArea || '',
          scheduledTime: r.scheduled_time || r.scheduledTime,
          actualTime: r.actual_time || r.actualTime || '--',
          varianceMins: r.variance_minutes ? `+${r.variance_minutes}m` : (r.varianceMins || '--'),
          status: r.status,
          statusCode: (r.status_code || r.statusCode || 'on_time').toLowerCase(),
          statusColor: r.status === 'ON TIME' ? 'green' : r.status === 'DELAYED' ? 'orange' : 'red',
          vehicleId: r.vehicle_id || r.vehicleId,
          driver: r.driver,
          reason: r.reason,
          binsCollected: r.bins_collected ? `${r.bins_collected} / ${r.total_bins || 64}` : (r.binsCollected || '40 / 50'),
        }));
        setScheduleData(mapped);
        setBackendLoaded(true);
      }
    }).catch(err => console.warn('Could not fetch collection schedule:', err));
  }, []);

  // Auto-reassign missed route action
  const handleResolveMissed = () => {
    setScheduleData(prev => prev.map(item => {
      if (item.zone === 'Indiranagar') {
        return {
          ...item,
          actualTime: '08:15 (Reassigned)',
          status: 'ON TIME',
          statusCode: 'on_time',
          statusColor: 'green',
          varianceMins: 'Auto-Rerouted',
          vehicleId: 'V18 (Backup Hauler)',
          driver: 'Suresh Rao (Active)',
          reason: 'Emergency backup vehicle dispatched via EcoAgent',
          binsCollected: '48 / 48'
        };
      }
      return item;
    }));
    setResolvedMissed(true);
  };

  const reliabilityPieData = [
    { name: 'ON TIME', value: resolvedMissed ? 89 : 86, color: '#10b981' },
    { name: 'DELAYED', value: 9, color: '#f59e0b' },
    { name: 'MISSED', value: resolvedMissed ? 2 : 5, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Collection Schedule & Fleet Reliability
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
              Live Dispatch Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time GPS variance monitoring between scheduled municipal timetables and actual truck arrivals.
          </p>
        </div>

        {/* Quick action */}
        {!resolvedMissed && (
          <button
            onClick={handleResolveMissed}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Auto-Reschedule Missed Route</span>
          </button>
        )}
      </div>

      {/* REQUIRED PROMPT TABLE:
          ZONE          SCHEDULED    ACTUAL      STATUS
          ------------------------------------------------
          Whitefield      7:00        7:12       🟠 DELAYED
          Indiranagar     7:30        --         🔴 MISSED
          Koramangala     8:00        8:45       🟠 DELAYED
          Jayanagar       8:30        8:28       🟢 ON TIME
      */}
      <div className="glass-panel rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-200/80 bg-white/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
              MUNICIPAL FLEET TIMETABLE (PROMPT SPECIFICATIONS)
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Live route progress, schedule variance, and driver delay logs
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            28 Active GPS Transponders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-950/70 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Zone</th>
                <th className="py-3.5 px-4">Scheduled</th>
                <th className="py-3.5 px-4">Actual</th>
                <th className="py-3.5 px-4">Variance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Vehicle / Driver</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">Telemetry Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {scheduleData.map((row) => {
                const isDelayed = row.statusCode === 'delayed';
                const isMissed = row.statusCode === 'missed';
                const isOnTime = row.statusCode === 'on_time';

                return (
                  <tr key={row.id} className="hover:bg-slate-100/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{row.zone}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{row.subArea}</div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-slate-700">
                      {row.scheduledTime}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold">
                      <span className={isMissed ? 'text-red-600' : isDelayed ? 'text-amber-600' : 'text-emerald-600'}>
                        {row.actualTime}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded ${
                        isMissed ? 'bg-red-500/20 text-red-300' :
                        isDelayed ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-700'
                      }`}>
                        {row.varianceMins}
                      </span>
                    </td>

                    {/* Status Column matching exact prompt emojis & badges */}
                    <td className="py-4 px-4">
                      {isDelayed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-amber-500/15 text-amber-600 border border-amber-500/30">
                          🟠 DELAYED
                        </span>
                      )}
                      {isMissed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-red-500/15 text-red-600 border border-red-500/30 animate-pulse">
                          🔴 MISSED
                        </span>
                      )}
                      {isOnTime && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                          🟢 ON TIME
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-slate-700 hidden md:table-cell">
                      <div>{row.vehicleId}</div>
                      <div className="text-[10px] text-slate-500">{row.driver}</div>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-500 hidden lg:table-cell max-w-xs truncate">
                      {row.reason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* REQUIRED PROMPT SECTION:
          Collection reliability

          ON TIME      86%
          DELAYED       9%
          MISSED        5%
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left (7 Cols): Reliability KPI Cards & Percentages */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  PERFORMANCE BENCHMARKS
                </span>
                <h3 className="text-2xl font-black font-heading text-slate-900 mt-0.5">
                  Collection Reliability
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Tier-1 Efficiency
              </span>
            </div>

            {/* Exact Required Breakdown Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              
              {/* ON TIME 86% */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-emerald-600">
                    ON TIME
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-600">
                    {resolvedMissed ? '89%' : '86%'}
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700/80 font-mono">124 Routes Timely</span>
              </div>

              {/* DELAYED 9% */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-amber-600">
                    DELAYED
                  </span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-5xl font-black font-mono text-amber-600">
                    9%
                  </div>
                </div>
                <span className="text-[10px] text-amber-300/80 font-mono">13 Routes (+14m avg)</span>
              </div>

              {/* MISSED 5% */}
              <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-red-600">
                    MISSED
                  </span>
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-5xl font-black font-mono text-red-600">
                    {resolvedMissed ? '2%' : '5%'}
                  </div>
                </div>
                <span className="text-[10px] text-red-300/80 font-mono">
                  {resolvedMissed ? 'Rerouted' : '1 Missed Sector'}
                </span>
              </div>

            </div>

            {/* Linear Progress Breakdown */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-700">
                <span>Fleet Punctuality Distribution</span>
                <span>Target: 95% On-Time</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: `${resolvedMissed ? 89 : 86}%` }} title="On Time" />
                <div className="bg-amber-500 h-full" style={{ width: '9%' }} title="Delayed" />
                <div className="bg-red-500 h-full" style={{ width: `${resolvedMissed ? 2 : 5}%` }} title="Missed" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Core Problem 1: Unpredictable Collection Solved</span>
            <span className="font-mono text-slate-700">GPS Interval: 5s Ping</span>
          </div>
        </div>

        {/* Right (5 Cols): Donut Chart & Telematics Summary */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold font-heading text-slate-900">
              Reliability Donut Distribution
            </h4>
            <span className="text-xs font-mono text-slate-500">142 Total Shifts</span>
          </div>

          {/* Donut Chart */}
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reliabilityPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {reliabilityPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                On Time Compliance
              </span>
              <span className="font-mono font-bold text-emerald-600">{resolvedMissed ? '89%' : '86%'}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                Traffic & Access Delays
              </span>
              <span className="font-mono font-bold text-amber-600">9%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Vehicle Mechanical Fault
              </span>
              <span className="font-mono font-bold text-red-600">{resolvedMissed ? '2%' : '5%'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

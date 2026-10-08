import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, Info, ChevronRight, X, ShieldAlert, Check } from 'lucide-react';

export const AlertsBanner = ({ alerts, onResolveAlert, onSelectAlertZone }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (!alerts || alerts.length === 0) return null;

  const criticalAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'danger');
  const primaryAlert = criticalAlerts[0] || alerts[0];

  return (
    <div className="w-full mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/40 border border-red-500/40 p-4 shadow-xl shadow-red-950/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Main Alert Banner Content */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/30 text-red-200 border border-red-500/40">
                  🚨 SYSTEM ALERT
                </span>
                <span className="text-xs text-red-300/80 font-mono">
                  {primaryAlert.zone} • {primaryAlert.timestamp}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                {primaryAlert.message}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            {primaryAlert.action && (
              <button
                onClick={() => onResolveAlert(primaryAlert.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 hover:border-red-400 transition-all cursor-pointer shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{primaryAlert.action}</span>
              </button>
            )}

            <button
              onClick={() => onSelectAlertZone && onSelectAlertZone(primaryAlert.zone)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              <span>Inspect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Multi-alert ticker bar if more than 1 alert */}
        {alerts.length > 1 && (
          <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-red-400 text-[11px] uppercase font-bold shrink-0">
                Active alerts ({alerts.length}):
              </span>
              {alerts.slice(1).map(alert => (
                <span
                  key={alert.id}
                  className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 shrink-0 font-medium"
                >
                  {alert.title}: {alert.message.substring(0, 48)}...
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

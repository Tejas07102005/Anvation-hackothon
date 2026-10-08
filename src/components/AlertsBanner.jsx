import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, Info, ChevronRight, X, ShieldAlert, Check } from 'lucide-react';

export const AlertsBanner = ({ alerts, onResolveAlert, onSelectAlertZone }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (!alerts || alerts.length === 0) return null;

  const criticalAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'danger');
  const primaryAlert = criticalAlerts[0] || alerts[0];

  return (
    <div className="w-full mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-red-50 border border-red-200 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Main Alert Banner Content */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 border border-red-300 text-red-600 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-300">
                  🚨 SYSTEM ALERT
                </span>
                <span className="text-xs text-red-700 font-mono">
                  {primaryAlert.zone} • {primaryAlert.timestamp}
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {primaryAlert.message}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            {primaryAlert.action && (
              <button
                onClick={() => onResolveAlert(primaryAlert.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{primaryAlert.action}</span>
              </button>
            )}

            <button
              onClick={() => onSelectAlertZone && onSelectAlertZone(primaryAlert.zone)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-all cursor-pointer"
            >
              <span>Inspect</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Multi-alert ticker bar if more than 1 alert */}
        {alerts.length > 1 && (
          <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-red-600 text-[11px] uppercase font-bold shrink-0">
                Active alerts ({alerts.length}):
              </span>
              {alerts.slice(1).map(alert => (
                <span
                  key={alert.id}
                  className="px-2 py-0.5 rounded bg-white/95 border border-slate-200 text-[11px] text-slate-700 shrink-0 font-medium"
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

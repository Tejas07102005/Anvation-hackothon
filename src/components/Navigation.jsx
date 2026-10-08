import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  LineChart, 
  AlertTriangle, 
  Truck, 
  Recycle,
  Sparkles
} from 'lucide-react';

export const SCREENS = [
  {
    id: 'command_center',
    label: 'Command Center',
    screenNumber: 'Screen 1',
    icon: LayoutDashboard,
    badge: 'Live',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'waste_zones',
    label: 'Waste Zones',
    screenNumber: 'Screen 2',
    icon: MapPin,
    badge: '6 Zones',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 'historical_analytics',
    label: 'Historical Analytics',
    screenNumber: 'Screen 3',
    icon: LineChart,
    badge: 'Sat +28%',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'landfill',
    label: 'Landfill Intelligence',
    screenNumber: 'Screen 4',
    icon: AlertTriangle,
    badge: '78% Cap',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'collection',
    label: 'Collection Reliability',
    screenNumber: 'Screen 5',
    icon: Truck,
    badge: '86% On-Time',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'segregation',
    label: 'Source Segregation',
    screenNumber: 'Screen 6',
    icon: Recycle,
    badge: 'Score 62',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    id: 'data_and_ai',
    label: 'Data + AI Engine',
    screenNumber: 'Member 2',
    icon: Sparkles,
    badge: 'Step 1-6 Live',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse',
  },
];

export const Navigation = ({ activeScreen, setActiveScreen }) => {
  return (
    <nav className="w-full bg-[#0b101e]/80 border-b border-slate-800/80 backdrop-blur-md sticky top-20 z-30 px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {SCREENS.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 text-white border-emerald-500/50 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-mono font-medium ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

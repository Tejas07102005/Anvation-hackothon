import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Truck, 
  AlertTriangle, 
  Sparkles 
} from 'lucide-react';

export const MobileBottomNav = ({ 
  activeScreen, 
  setActiveScreen, 
  onOpenEcoAgent,
  alertsCount = 0 
}) => {
  const items = [
    { id: 'command_center', label: 'Home', icon: LayoutDashboard },
    { id: 'waste_zones', label: 'Zones', icon: MapPin },
    { id: 'route_optimization', label: 'Routes', icon: Truck },
    { id: 'collection', label: 'Alerts', icon: AlertTriangle, badge: alertsCount },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
                isActive 
                  ? 'text-emerald-600 font-bold bg-emerald-50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* EcoAgent Quick AI Button */}
        <button
          onClick={onOpenEcoAgent}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-emerald-700 font-bold bg-emerald-100 border border-emerald-300 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
          <span className="text-[10px] font-bold">Ask AI</span>
        </button>
      </div>
    </div>
  );
};

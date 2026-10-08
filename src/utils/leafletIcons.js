import L from 'leaflet';

export const createZoneMarkerIcon = (zone) => {
  const isHigh = zone.riskLevel === 'high';
  const isMedium = zone.riskLevel === 'medium';

  const borderColor = isHigh ? '#ef4444' : isMedium ? '#f59e0b' : '#10b981';
  const bgColor = isHigh ? 'rgba(239, 68, 68, 0.25)' : isMedium ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)';
  const pulseClass = isHigh ? 'pulse-marker-red' : '';
  const badgeColor = isHigh ? 'bg-red-500 text-white' : isMedium ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      <!-- Outer pulsing ring for high risk -->
      <div class="absolute -inset-2 rounded-full ${pulseClass}" style="background-color: ${bgColor};"></div>
      
      <!-- Core circular container -->
      <div class="relative flex items-center justify-center w-11 h-11 rounded-2xl shadow-xl transition-transform duration-300 transform group-hover:scale-110"
           style="background-color: #0d1527; border: 2.5px solid ${borderColor}; box-shadow: 0 0 15px ${borderColor}60;">
        <span class="text-lg leading-none select-none">${zone.icon}</span>
        
        <!-- Fill percentage badge -->
        <span class="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight shadow-md ${badgeColor}">
          ${zone.fillPercentage}%
        </span>
      </div>

      <!-- Label Tooltip Pin -->
      <div class="absolute -top-7 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide whitespace-nowrap shadow-lg border border-slate-700 bg-slate-900/90 text-slate-200">
        ${zone.code}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-zone-marker',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
};

export const createVehicleMarkerIcon = (vehicle) => {
  const isSelected = false;
  const isEnRoute = vehicle.status === 'En Route';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer animate-vehicle group">
      <!-- Glow halo -->
      <div class="absolute -inset-1.5 rounded-full bg-cyan-500/20 blur-sm"></div>
      
      <!-- Vehicle bubble -->
      <div class="relative flex items-center gap-1 px-2 py-1 rounded-xl shadow-2xl transition-all duration-300 group-hover:scale-105"
           style="background-color: #0a1324; border: 1.5px solid #06b6d4; box-shadow: 0 0 12px rgba(6, 182, 212, 0.45);">
        <span class="text-sm">🚛</span>
        <span class="font-mono text-[11px] font-bold text-cyan-300">${vehicle.id}</span>
        <div class="w-1.5 h-1.5 rounded-full ${isEnRoute ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}"></div>
      </div>

      <!-- Vehicle Target mini label -->
      <div class="absolute -bottom-5 px-1.5 py-0.2 rounded text-[9px] font-semibold text-slate-300 bg-slate-950/80 border border-cyan-800/50 whitespace-nowrap">
        → ${vehicle.assignedZone}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-vehicle-marker',
    iconSize: [64, 30],
    iconAnchor: [32, 15],
    popupAnchor: [0, -18],
  });
};

export const createLandfillMarkerIcon = (capacityPercent) => {
  const isCritical = capacityPercent >= 75;
  const borderColor = isCritical ? '#ef4444' : '#f59e0b';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      <div class="absolute -inset-2 rounded-full pulse-marker-red" style="background-color: rgba(239, 68, 68, 0.2);"></div>
      <div class="relative flex items-center justify-center w-12 h-12 rounded-2xl shadow-2xl"
           style="background-color: #12090d; border: 2.5px solid ${borderColor}; box-shadow: 0 0 18px ${borderColor}80;">
        <span class="text-xl">⚠️</span>
        <span class="absolute -bottom-2.5 px-1.5 py-0.5 rounded-full text-[9px] font-black font-mono bg-red-600 text-white shadow">
          ${capacityPercent}%
        </span>
      </div>
      <div class="absolute -top-7 px-2 py-0.5 rounded-md text-[10px] font-bold text-red-300 bg-red-950/90 border border-red-800 shadow">
        LANDFILL
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-landfill-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });
};

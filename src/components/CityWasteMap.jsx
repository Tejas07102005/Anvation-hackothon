import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { createZoneMarkerIcon, createVehicleMarkerIcon, createLandfillMarkerIcon } from '../utils/leafletIcons';
import { ExternalLink, Truck, ShieldAlert, Navigation, Info } from 'lucide-react';

export const CityWasteMap = ({ zones, vehicles, onSelectZone, onDispatchVehicle }) => {
  const mapCenter = [12.9450, 77.6250];
  const landfillCoord = [12.8620, 77.5450];

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#080d18]">
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
          Live City Waste Grid Telemetry
        </span>
      </div>

      {/* Required Prompt Map Legend & Vehicle Tracking Box */}
      <div className="absolute bottom-4 right-4 z-[400] max-w-xs w-64 rounded-2xl bg-[#0c1424]/92 border border-slate-700/80 p-3.5 backdrop-blur-xl shadow-2xl text-xs space-y-3">
        {/* Risk Indicators */}
        <div>
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Zone Risk Severity
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🔴</span> High Risk Zones
              </span>
              <span className="text-red-400 font-bold">&gt;80% Fill</span>
            </div>
            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🟠</span> Medium Risk
              </span>
              <span className="text-amber-400 font-bold">50-80%</span>
            </div>
            <div className="flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🟢</span> Normal Status
              </span>
              <span className="text-emerald-400 font-bold">&lt;50% Fill</span>
            </div>
          </div>
        </div>

        {/* Live Dispatched Vehicles list matching prompt */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-cyan-400" />
            Live Vector Dispatches
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-900/80 border border-cyan-900/50 text-cyan-300">
              <span>🚛 V12 → Zone A</span>
              <span className="text-[10px] text-slate-400">ETA 8m</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-900/80 border border-cyan-900/50 text-cyan-300">
              <span>🚛 V17 → Zone C</span>
              <span className="text-[10px] text-slate-400">ETA 14m</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-900/80 border border-red-900/50 text-red-300">
              <span>🚛 V04 → Zone D</span>
              <span className="text-[10px] text-red-400 font-bold">URGENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={mapCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Dark Matter CartoDB Basemap */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Route Vectors / Polylines between trucks and target zones */}
        {vehicles.map((v) => {
          if (!v.coordinates || !v.targetCoordinates) return null;
          return (
            <Polyline
              key={`route-${v.id}`}
              positions={[v.coordinates, v.targetCoordinates]}
              color="#06b6d4"
              weight={2.5}
              dashArray="6, 8"
              opacity={0.7}
            />
          );
        })}

        {/* Zone Markers */}
        {zones.map((zone) => (
          <Marker
            key={zone.id}
            position={zone.coordinates}
            icon={createZoneMarkerIcon(zone)}
            eventHandlers={{
              click: () => onSelectZone && onSelectZone(zone),
            }}
          >
            <Popup>
              <div className="p-1 space-y-2 text-slate-200">
                <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{zone.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-white">{zone.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{zone.code}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    zone.riskLevel === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    zone.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {zone.fillPercentage}% Fill
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-400">Current: </span>
                    <span className="font-bold text-white">{zone.wasteTons} T</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Pred (24h): </span>
                    <span className="font-bold text-cyan-300">{zone.predictedWasteTons} T</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Overflow: </span>
                    <span className="font-bold text-red-400">{zone.overflowProbability}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Bins: </span>
                    <span className="font-bold text-slate-200">{zone.binsCount}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectZone && onSelectZone(zone)}
                    className="flex-1 py-1 px-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all text-center cursor-pointer shadow"
                  >
                    View Telemetry
                  </button>
                  <button
                    onClick={() => onDispatchVehicle && onDispatchVehicle(zone)}
                    className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 transition-all cursor-pointer"
                    title="Dispatch Truck"
                  >
                    🚛
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Vehicle Markers */}
        {vehicles.map((v) => (
          <Marker
            key={v.id}
            position={v.coordinates}
            icon={createVehicleMarkerIcon(v)}
          >
            <Popup>
              <div className="p-1 text-slate-200 space-y-1.5">
                <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-1">
                  <span className="font-bold font-mono text-cyan-400 text-xs">{v.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 font-mono">
                    {v.status}
                  </span>
                </div>
                <div className="text-[11px] space-y-0.5 font-mono">
                  <div>Driver: <span className="text-white font-sans">{v.driver}</span></div>
                  <div>Assigned: <span className="text-emerald-400">{v.assignedZone}</span></div>
                  <div>Speed: <span className="text-slate-300">{v.speedKmH} km/h</span> • ETA: <span className="text-amber-400">{v.etaMins}m</span></div>
                  <div>Payload Fill: <span className="text-slate-300">{v.fillPercentage}%</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* South Landfill Facility Marker */}
        <Marker
          position={landfillCoord}
          icon={createLandfillMarkerIcon(78)}
        >
          <Popup>
            <div className="p-1 text-slate-200 space-y-1 text-xs">
              <div className="font-bold text-red-400">South Landfill Hub</div>
              <div>Current Capacity: <span className="font-bold font-mono text-white">78%</span></div>
              <div>Daily Accumulation: <span className="font-bold font-mono text-red-400">+7 T/day</span></div>
              <div className="text-[10px] text-amber-300">Critical 90% threshold in 5 days</div>
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
};

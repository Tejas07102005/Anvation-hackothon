import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { createZoneMarkerIcon, createVehicleMarkerIcon, createLandfillMarkerIcon } from '../utils/leafletIcons';
import { ExternalLink, Truck, ShieldAlert, Navigation, Info } from 'lucide-react';

export const CityWasteMap = ({ zones, vehicles, onSelectZone, onDispatchVehicle }) => {
  const mapCenter = [12.9450, 77.6250];
  const landfillCoord = [12.8620, 77.5450];
  
  // Read Google Maps API Key from VITE_GOOGLE_MAPS_API_KEY environment variable
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Google Maps tile layer if API key is present, otherwise fallback light tiles
  const tileUrl = googleMapsApiKey && googleMapsApiKey.trim() !== ''
    ? `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${googleMapsApiKey}`
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  const attribution = googleMapsApiKey && googleMapsApiKey.trim() !== ''
    ? '&copy; <a href="https://maps.google.com">Google Maps</a>'
    : '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>';

  return (
    <div className="relative w-full h-[360px] sm:h-[520px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 backdrop-blur-md shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
          <span>Live City Waste Grid Telemetry</span>
          {googleMapsApiKey && googleMapsApiKey.trim() !== '' && (
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold">Google Maps Connected</span>
          )}
        </span>
      </div>

      {/* Required Prompt Map Legend & Vehicle Tracking Box */}
      <div className="hidden sm:block absolute bottom-4 right-4 z-[400] max-w-xs w-64 rounded-2xl bg-white/95 border border-slate-200 p-3.5 backdrop-blur-xl shadow-md text-xs space-y-3">
        {/* Risk Indicators */}
        <div>
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Zone Risk Severity
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-800">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🔴</span> High Risk Zones
              </span>
              <span className="text-red-600 font-bold">&gt;80% Fill</span>
            </div>
            <div className="flex items-center justify-between text-slate-800">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🟠</span> Medium Risk
              </span>
              <span className="text-amber-600 font-bold">50-80%</span>
            </div>
            <div className="flex items-center justify-between text-slate-800">
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">🟢</span> Normal Status
              </span>
              <span className="text-emerald-600 font-bold">&lt;50% Fill</span>
            </div>
          </div>
        </div>

        {/* Live Dispatched Vehicles list matching prompt */}
        <div className="pt-2 border-t border-slate-200">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-cyan-600" />
            Live Vector Dispatches
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center justify-between px-2 py-1 rounded bg-cyan-50 border border-cyan-200 text-cyan-800">
              <span>🚛 V12 → Zone A</span>
              <span className="text-[10px] text-slate-500">ETA 8m</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-cyan-50 border border-cyan-200 text-cyan-800">
              <span>🚛 V17 → Zone C</span>
              <span className="text-[10px] text-slate-500">ETA 14m</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-red-50 border border-red-200 text-red-800">
              <span>🚛 V04 → Zone D</span>
              <span className="text-[10px] text-red-600 font-bold">URGENT</span>
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
        {/* Tile Layer (Google Maps when VITE_GOOGLE_MAPS_API_KEY is present) */}
        <TileLayer
          attribution={attribution}
          url={tileUrl}
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
              <div className="p-1 space-y-2 text-slate-800">
                <div className="flex items-center justify-between gap-3 border-b border-slate-300/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{zone.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{zone.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{zone.code}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    zone.riskLevel === 'high' ? 'bg-red-500/20 text-red-600 border border-red-500/30' :
                    zone.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-600 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
                  }`}>
                    {zone.fillPercentage}% Fill
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500">Current: </span>
                    <span className="font-bold text-slate-900">{zone.wasteTons} T</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Pred (24h): </span>
                    <span className="font-bold text-cyan-300">{zone.predictedWasteTons} T</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Overflow: </span>
                    <span className="font-bold text-red-600">{zone.overflowProbability}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Bins: </span>
                    <span className="font-bold text-slate-800">{zone.binsCount}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectZone && onSelectZone(zone)}
                    className="flex-1 py-1 px-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-slate-900 text-[11px] font-bold transition-all text-center cursor-pointer shadow"
                  >
                    View Telemetry
                  </button>
                  <button
                    onClick={() => onDispatchVehicle && onDispatchVehicle(zone)}
                    className="p-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-700 text-slate-800 text-[11px] font-bold border border-slate-300 transition-all cursor-pointer"
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
              <div className="p-1 text-slate-800 space-y-1.5">
                <div className="flex items-center justify-between gap-3 border-b border-slate-300/80 pb-1">
                  <span className="font-bold font-mono text-cyan-600 text-xs">{v.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 font-mono">
                    {v.status}
                  </span>
                </div>
                <div className="text-[11px] space-y-0.5 font-mono">
                  <div>Driver: <span className="text-slate-900 font-sans">{v.driver}</span></div>
                  <div>Assigned: <span className="text-emerald-600">{v.assignedZone}</span></div>
                  <div>Speed: <span className="text-slate-700">{v.speedKmH} km/h</span> • ETA: <span className="text-amber-600">{v.etaMins}m</span></div>
                  <div>Payload Fill: <span className="text-slate-700">{v.fillPercentage}%</span></div>
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
            <div className="p-1 text-slate-800 space-y-1 text-xs">
              <div className="font-bold text-red-600">South Landfill Hub</div>
              <div>Current Capacity: <span className="font-bold font-mono text-slate-900">78%</span></div>
              <div>Daily Accumulation: <span className="font-bold font-mono text-red-600">+7 T/day</span></div>
              <div className="text-[10px] text-amber-300">Critical 90% threshold in 5 days</div>
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
};

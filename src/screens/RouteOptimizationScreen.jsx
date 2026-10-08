import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { 
  Truck, 
  Navigation, 
  TrendingDown, 
  Leaf, 
  Fuel, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Compass, 
  Zap,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { 
  assignVehiclesToZones, 
  getRouteOptimizationData, 
  simulateWhatIfScenario,
  MUNICIPAL_WAYPOINTS,
  DEPOT_COORDINATES 
} from '../services/routeOptimizationEngine';

// Custom Pin Icons for Route Map
const createWaypointIcon = (label, color = '#10b981', isDepot = false) => {
  const html = `
    <div class="relative flex items-center justify-center cursor-pointer group">
      <div class="absolute -inset-1 rounded-full ${isDepot ? 'bg-cyan-500/30' : 'bg-emerald-500/20'} blur-sm"></div>
      <div class="relative flex items-center justify-center ${isDepot ? 'w-10 h-10' : 'w-8 h-8'} rounded-xl shadow-xl font-mono font-bold text-xs"
           style="background-color: #0b1120; border: 2px solid ${color}; color: ${color};">
        ${isDepot ? '🏢' : label}
      </div>
      <div class="absolute -top-6 px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-slate-950/90 text-slate-200 border border-slate-700 whitespace-nowrap">
        ${isDepot ? 'Central Depot' : label}
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-route-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export const RouteOptimizationScreen = ({ zones, onDispatchVehicle }) => {
  const [activeRouteView, setActiveRouteView] = useState('both'); // 'both', 'optimized', 'legacy'
  
  // Step 4 Simulator Inputs
  const [wasteDemandSurge, setWasteDemandSurge] = useState(30);
  const [availableVehicles, setAvailableVehicles] = useState(4);
  const [binCapacityKg, setBinCapacityKg] = useState(1000);
  const [simulationTriggered, setSimulationTriggered] = useState(true);
  const [deployedExtraTruck, setDeployedExtraTruck] = useState(false);

  // Computations
  const assignmentData = assignVehiclesToZones();
  const routeData = getRouteOptimizationData();
  const scenarioOutput = simulateWhatIfScenario({
    wasteDemandSurge,
    availableVehicles,
    binCapacityKg
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Header Banner: Goal & Flow */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1424] border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚛</span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Member 3 — Vehicle & Route Optimization Engine
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Action Engine Active
            </span>
          </div>
          
          {/* Goal Pipeline: HIGH RISK ZONES → VEHICLE ASSIGNMENT → ROUTE → FUEL/DISTANCE SAVING */}
          <div className="flex items-center gap-2 mt-2 flex-wrap text-xs font-mono font-bold">
            <span className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/30">
              HIGH RISK ZONES
            </span>
            <span className="text-slate-500">→</span>
            <span className="text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
              VEHICLE ASSIGNMENT
            </span>
            <span className="text-slate-500">→</span>
            <span className="text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
              OPTIMIZED ROUTE
            </span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
              FUEL & DISTANCE SAVING
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Routing Protocol: Capacity + Demand + Priority + Distance
          </span>
        </div>
      </div>

      {/* STEP 2: VEHICLE ASSIGNMENT MATRIX */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              STEP 2: VEHICLE ALLOCATION ALGORITHM
            </span>
            <h3 className="text-xl font-black font-heading text-white mt-0.5">
              Priority-to-Capacity Dynamic Assignment
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Automated Allocation
          </span>
        </div>

        {/* Algorithm Flow Diagram */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <span className="text-red-400 font-bold shrink-0">1. Sort by Priority</span>
          <span className="text-slate-500">→</span>
          <span className="text-cyan-300 shrink-0">2. Check Waste (Tons)</span>
          <span className="text-slate-500">→</span>
          <span className="text-purple-300 shrink-0">3. Check Vehicle Capacity</span>
          <span className="text-slate-500">→</span>
          <span className="text-amber-300 shrink-0">4. Check Distance</span>
          <span className="text-slate-500">→</span>
          <span className="text-emerald-400 font-bold shrink-0">5. Assign Vehicle</span>
        </div>

        {/* EXACT PROMPT TARGET OUTPUT:
            🔴 Market Zone D → V12
            🔴 Industrial A  → V17
            🟠 Commercial C  → V21
            🟢 Residential B → next cycle
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assignmentData.map((item, idx) => {
            const isHigh = item.risk === 'high';
            const isMedium = item.risk === 'medium';
            const isAssigned = item.status === 'ASSIGNED';

            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isHigh 
                    ? 'bg-red-950/20 border-red-500/40' 
                    : isMedium 
                    ? 'bg-amber-950/20 border-amber-500/40' 
                    : 'bg-emerald-950/20 border-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <span>{item.icon}</span>
                    <span>{item.zoneName}</span>
                  </span>
                  <span>{isHigh ? '🔴' : isMedium ? '🟠' : '🟢'}</span>
                </div>

                {/* EXACT FORMAT: 🔴 Market Zone D → V12 */}
                <div className="my-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Assignment Vector</div>
                  <div className={`text-base font-black mt-0.5 ${
                    isAssigned ? 'text-cyan-300' : 'text-emerald-400'
                  }`}>
                    {item.zoneCode} → <span className="underline decoration-cyan-500">{item.assignedVehicleId}</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Waste Demand:</span>
                    <span className="text-white font-bold">{item.wasteTons} Tons</span>
                  </div>
                  {isAssigned && (
                    <div className="flex justify-between">
                      <span>Vehicle Cap:</span>
                      <span className="text-cyan-300">{item.vehicleCapacityTons} Tons</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Dispatch Cycle:</span>
                    <span className={isAssigned ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {item.cycle}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-slate-400 leading-tight">
                  {item.rationale}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: ROUTE OPTIMIZATION MAP & SAVINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left (7 cols): Interactive Leaflet Route Map */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  STEP 3: ROUTE OPTIMIZATION
                </span>
                <h3 className="text-xl font-black font-heading text-white mt-0.5">
                  Route Path Visualizer (Depot ➔ A, B, C, D)
                </h3>
              </div>

              {/* Route View Toggle */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveRouteView('both')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeRouteView === 'both' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Compare Both
                </button>
                <button
                  onClick={() => setActiveRouteView('optimized')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeRouteView === 'optimized' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EcoCity (31.2km)
                </button>
                <button
                  onClick={() => setActiveRouteView('legacy')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeRouteView === 'legacy' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Current (42.6km)
                </button>
              </div>
            </div>

            {/* Route Map Canvas */}
            <div className="mt-4 relative w-full h-[360px] rounded-2xl overflow-hidden border border-slate-800">
              <MapContainer
                center={[12.9550, 77.6300]}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Legacy Route Polyline (Orange) */}
                {(activeRouteView === 'both' || activeRouteView === 'legacy') && (
                  <Polyline
                    positions={routeData.legacyRoute.coordinates}
                    color="#f97316"
                    weight={3}
                    dashArray="6, 8"
                    opacity={0.8}
                  />
                )}

                {/* EcoCity Optimized Route Polyline (Neon Emerald) */}
                {(activeRouteView === 'both' || activeRouteView === 'optimized') && (
                  <Polyline
                    positions={routeData.ecoCityRoute.coordinates}
                    color="#10b981"
                    weight={4}
                    opacity={0.9}
                  />
                )}

                {/* Central Depot Marker */}
                <Marker position={DEPOT_COORDINATES} icon={createWaypointIcon('DEPOT', '#06b6d4', true)}>
                  <Popup>
                    <div className="p-1 text-slate-200 text-xs font-mono">
                      <div className="font-bold text-cyan-300">Central Municipal Depot</div>
                      <div>Start & End waypoint</div>
                    </div>
                  </Popup>
                </Marker>

                {/* Zone Waypoints */}
                {Object.keys(MUNICIPAL_WAYPOINTS).filter(k => k !== 'Depot').map(key => {
                  const wp = MUNICIPAL_WAYPOINTS[key];
                  return (
                    <Marker key={key} position={wp.coords} icon={createWaypointIcon(key, '#10b981')}>
                      <Popup>
                        <div className="p-1 text-slate-200 text-xs font-mono">
                          <div className="font-bold text-white">{wp.name}</div>
                          <div>Waste: <span className="text-emerald-400">{wp.wasteTons} Tons</span></div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* Map Route Legend */}
              <div className="absolute bottom-3 left-3 z-[400] px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-3 h-1 bg-emerald-500 rounded"></span>
                  <span>EcoCity Route: 31.2 km</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="w-3 h-0.5 border-t border-dashed border-amber-500"></span>
                  <span>Current Route: 42.6 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sequence Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-amber-400 font-bold block text-[10px] uppercase">Current Route (42.6 km):</span>
              <span className="text-slate-300 mt-1 block">Depot → A → D → B → C → Depot</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold block text-[10px] uppercase">EcoCity Route (31.2 km):</span>
              <span className="text-white font-bold mt-1 block">Depot → A → C → B → D → Depot</span>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Exact Prompt Savings Outputs */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                OPTIMIZATION RESULTS
              </span>
              <h3 className="text-xl font-black font-heading text-white mt-0.5">
                Route Efficiency Gains
              </h3>
            </div>

            {/* EXACT PROMPT REQUIRED OUTPUTS:
                Distance saved = 11.4 km
                Fuel saved     = 2.3 L
                CO₂ avoided   = 6.2 kg
            */}
            <div className="space-y-4 mt-6">
              
              {/* Distance saved = 11.4 km */}
              <div className="p-4 rounded-2xl bg-[#0a1224] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                    Distance Saved
                  </span>
                  <div className="text-3xl font-black font-mono text-cyan-300 mt-1">
                    11.4 <span className="text-sm font-normal text-slate-400">km</span>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <div>42.6 km → 31.2 km</div>
                  <div className="text-cyan-400 font-bold mt-0.5">-26.8% Reduction</div>
                </div>
              </div>

              {/* Fuel saved = 2.3 L */}
              <div className="p-4 rounded-2xl bg-[#0d1620] border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                    <Fuel className="w-4 h-4 text-amber-400" />
                    Fuel Saved
                  </span>
                  <div className="text-3xl font-black font-mono text-amber-400 mt-1">
                    2.3 <span className="text-sm font-normal text-slate-400">L</span>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <div>8.5 L → 6.2 L</div>
                  <div className="text-amber-400 font-bold mt-0.5">Per Shift Cycle</div>
                </div>
              </div>

              {/* CO₂ avoided = 6.2 kg */}
              <div className="p-4 rounded-2xl bg-[#09151c] border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    CO₂ Avoided
                  </span>
                  <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                    6.2 <span className="text-sm font-normal text-slate-400">kg</span>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <div>22.8 kg → 16.6 kg</div>
                  <div className="text-emerald-400 font-bold mt-0.5">Green Fleet Certified</div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono">
            EcoCity Algorithm: 2-Opt TSP Dynamic Matrix Solver
          </div>
        </div>

      </div>

      {/* STEP 4: WHAT-IF SIMULATOR */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              STEP 4: FLEET WHAT-IF SIMULATOR
            </span>
            <h3 className="text-xl font-black font-heading text-white mt-0.5">
              Waste Demand Surge & Vehicle Requirement Simulator
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-800/60">
            Interactive Scenario Sandbox
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left (6 cols): Sliders matching exact prompt layout */}
          <div className="lg:col-span-6 space-y-5 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* WASTE DEMAND [──────●────] 30% */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase">WASTE DEMAND</span>
                  <span className="text-lg font-black text-cyan-300">{wasteDemandSurge}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={wasteDemandSurge}
                  onChange={(e) => setWasteDemandSurge(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (Standard)</span>
                  <span>30% (Weekend)</span>
                  <span>80% (Festival Surge)</span>
                </div>
              </div>

              {/* VEHICLES [────●─────] 4 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase">VEHICLES</span>
                  <span className="text-lg font-black text-emerald-400">{availableVehicles}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={availableVehicles}
                  onChange={(e) => setAvailableVehicles(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2 Trucks</span>
                  <span>4 Trucks (Default)</span>
                  <span>8 Trucks</span>
                </div>
              </div>

              {/* CAPACITY 1000 kg */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase">CAPACITY</span>
                  <span className="text-lg font-black text-white">{binCapacityKg} kg</span>
                </div>
                <select
                  value={binCapacityKg}
                  onChange={(e) => setBinCapacityKg(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono cursor-pointer focus:outline-none"
                >
                  <option value={800}>800 kg (Standard Chute)</option>
                  <option value={1000}>1000 kg (High-Capacity Compactor)</option>
                  <option value={1500}>1500 kg (Commercial Heavy Bin)</option>
                </select>
              </div>

            </div>

            {/* [ SIMULATE ] Button */}
            <button
              onClick={() => {
                setSimulationTriggered(true);
                setDeployedExtraTruck(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-black font-mono tracking-wider text-sm shadow-lg shadow-cyan-950/80 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>[ SIMULATE ]</span>
            </button>
          </div>

          {/* Right (6 cols): Output matching exact prompt */}
          <div className="lg:col-span-6 p-5 rounded-2xl bg-gradient-to-br from-[#0c1424] via-slate-900 to-[#120a16] border border-cyan-500/40 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  SIMULATION TELEMETRY OUTPUT
                </span>
                <span className="text-xs font-mono text-slate-400">Delta Computation</span>
              </div>

              {/* EXACT PROMPT OUTPUT:
                  Current waste       8.4 tons
                  New waste          10.9 tons

                  Overflow zones      3 → 6
                  Vehicles required   4 → 5

                  Fuel                +18%

                  Recommendation:
                  Deploy 1 additional vehicle
              */}
              <div className="mt-4 space-y-3 font-mono text-sm">
                
                {/* Waste Delta */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-xs">Current Waste</span>
                  <span className="text-slate-200 font-bold">{scenarioOutput.currentWasteTons} tons</span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex justify-between items-center">
                  <span className="text-cyan-300 text-xs font-bold">New Waste (Surge)</span>
                  <span className="text-cyan-300 font-black text-base">{scenarioOutput.newWasteTons} tons</span>
                </div>

                {/* Overflow zones 3 -> 6 & Vehicles required 4 -> 5 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30">
                    <div className="text-[10px] text-red-300 uppercase">Overflow Zones</div>
                    <div className="text-lg font-black text-red-400 mt-0.5">
                      {scenarioOutput.overflowZonesFrom} → {scenarioOutput.overflowZonesTo}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30">
                    <div className="text-[10px] text-amber-300 uppercase">Vehicles Required</div>
                    <div className="text-lg font-black text-amber-400 mt-0.5">
                      {scenarioOutput.vehiclesRequiredFrom} → {scenarioOutput.vehiclesRequiredTo}
                    </div>
                  </div>
                </div>

                {/* Fuel +18% */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-xs">Fleet Fuel Consumption</span>
                  <span className="text-amber-400 font-black">+{scenarioOutput.fuelDeltaPercent}%</span>
                </div>
              </div>

              {/* EXACT PROMPT RECOMMENDATION:
                  Recommendation:
                  Deploy 1 additional vehicle
              */}
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                  Recommendation:
                </span>
                <p className="text-sm font-black text-white mt-0.5 font-mono">
                  "{scenarioOutput.recommendation}"
                </p>
              </div>
            </div>

            {/* Quick Action Deployment Button */}
            {scenarioOutput.additionalVehiclesNeeded > 0 && (
              <button
                onClick={() => setDeployedExtraTruck(true)}
                disabled={deployedExtraTruck}
                className={`mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  deployedExtraTruck
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                {deployedExtraTruck ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reserve Hauler V18 Dispatched • Fleet Balanced</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4" />
                    <span>Authorize {scenarioOutput.recommendation}</span>
                  </>
                )}
              </button>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

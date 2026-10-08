import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AlertsBanner } from './components/AlertsBanner';
import { ZoneDetailModal } from './components/ZoneDetailModal';
import { EcoAgentDrawer } from './components/EcoAgentDrawer';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';

// Screens
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { WasteZonesScreen } from './screens/WasteZonesScreen';
import { HistoricalAnalyticsScreen } from './screens/HistoricalAnalyticsScreen';
import { LandfillIntelligenceScreen } from './screens/LandfillIntelligenceScreen';
import { CollectionReliabilityScreen } from './screens/CollectionReliabilityScreen';
import { SourceSegregationScreen } from './screens/SourceSegregationScreen';
import { DataAndAIScreen } from './screens/DataAndAIScreen';
import { RouteOptimizationScreen } from './screens/RouteOptimizationScreen';

// Mock Data Baseline & Municipal Datasets
import { 
  INITIAL_OVERVIEW, 
  INITIAL_ZONES, 
  INITIAL_VEHICLES, 
  INITIAL_ALERTS, 
  ECO_AGENT_RECOMMENDATIONS 
} from './data/mockData';
import { initialBins, simulateSensorTick } from './services/aiIntelligenceEngine';
import { 
  checkBackendHealth, 
  fetchDashboardSummary, 
  fetchAlerts, 
  fetchZones, 
  fetchVehicles, 
  fetchRealtimeBins,
  normalizeOverview,
  mergeZonesWithBackend 
} from './services/api';

export function App() {
  const [activeScreen, setActiveScreen] = useState('command_center');
  const [overview, setOverview] = useState(INITIAL_OVERVIEW);
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [recommendations, setRecommendations] = useState(ECO_AGENT_RECOMMENDATIONS);
  const [bins, setBins] = useState(initialBins);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  
  // Real-time IoT Sensor Simulation State
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  
  // Modals & Drawers
  const [selectedZone, setSelectedZone] = useState(null);
  const [isEcoAgentOpen, setIsEcoAgentOpen] = useState(false);
  const [executedActions, setExecutedActions] = useState([]);
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState(0);

  const showToast = (message, type = 'success') => {
    setNotificationToast({ message, type });
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Synchronize live municipal state from FastAPI Backend
  const syncWithBackend = React.useCallback(async (showFeedback = false) => {
    try {
      const health = await checkBackendHealth();
      if (health.online) {
        setIsBackendConnected(true);
        const [dashRes, alertsRes, zonesRes, binsRes] = await Promise.allSettled([
          fetchDashboardSummary(),
          fetchAlerts(),
          fetchZones(),
          fetchRealtimeBins(),
        ]);

        if (dashRes.status === 'fulfilled' && dashRes.value) {
          setOverview(prev => normalizeOverview(dashRes.value, prev));
        }
        if (zonesRes.status === 'fulfilled' && Array.isArray(zonesRes.value)) {
          setZones(prev => mergeZonesWithBackend(zonesRes.value, prev));
        }
        if (alertsRes.status === 'fulfilled' && Array.isArray(alertsRes.value)) {
          setAlerts(alertsRes.value);
        }
        if (binsRes.status === 'fulfilled' && binsRes.value && Array.isArray(binsRes.value.bins)) {
          setBins(binsRes.value.bins);
        }

        if (showFeedback) {
          showToast('⚡ FastAPI Backend Telemetry Synced (:8000)');
        }
      } else {
        setIsBackendConnected(false);
        if (showFeedback) {
          showToast('⚠️ Backend unavailable, using local cache', 'warning');
        }
      }
    } catch (err) {
      setIsBackendConnected(false);
      console.warn('Backend sync notice:', err);
    }
  }, []);

  // Initial load backend connection check
  React.useEffect(() => {
    syncWithBackend(false);
  }, [syncWithBackend]);

  // Step 6: Live IoT Sensor Simulation Ticker Interval
  React.useEffect(() => {
    let interval = null;
    if (isSimulationRunning) {
      interval = setInterval(() => {
        setBins(prevBins => {
          setZones(prevZones => {
            const { updatedBins, updatedZones } = simulateSensorTick(prevBins, prevZones);
            
            // Check for high risk bins like BIN-1092
            const criticalBin = updatedBins.find(b => b.current_fill_percent >= 95);
            if (criticalBin && Math.random() > 0.7) {
              showToast(`⚡ IoT Ping: ${criticalBin.code} surged to ${criticalBin.current_fill_percent}%! Risk threshold crossed.`, 'warning');
            }
            
            return updatedZones;
          });
          return prevBins; // Will be updated together in simulateSensorTick
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulationRunning]);

  const handleToggleSimulation = () => {
    setIsSimulationRunning(prev => {
      const next = !prev;
      if (next) {
        showToast('▶ Live IoT Bin Simulation Started! Receiving sensor telemetry every 2.5s.');
      } else {
        showToast('⏸ Live IoT Bin Simulation Paused.');
      }
      return next;
    });
  };

  // Dispatch Truck to a zone
  const handleDispatchVehicle = (zone) => {
    // Update zone fill level to reflect dispatch relief
    setZones(prev => prev.map(z => {
      if (z.id === zone.id) {
        return {
          ...z,
          fillPercentage: Math.max(25, z.fillPercentage - 30),
          riskLevel: z.fillPercentage - 30 > 80 ? 'high' : z.fillPercentage - 30 > 50 ? 'medium' : 'normal',
          lastCollection: 'Just now (Dispatched)',
        };
      }
      return z;
    }));

    // Update vehicle
    setVehicles(prev => prev.map(v => {
      if (v.assignedZone === zone.code || v.id === 'V04') {
        return {
          ...v,
          status: 'En Route',
          etaMins: 3,
          assignedZone: zone.code,
        };
      }
      return v;
    }));

    showToast(`🚛 Emergency Hauler V04 dispatched to ${zone.name}. Fill level relieved by 30%.`);
  };

  // Autonomous Recommendation Execution
  const handleExecuteRecommendation = (rec) => {
    if (executedActions.includes(rec.id)) return;

    setExecutedActions(prev => [...prev, rec.id]);

    if (rec.id === 'rec-1') {
      // "3 zones require immediate collection"
      setZones(prev => prev.map(z => {
        if (z.id === 'zone-d' || z.id === 'zone-a' || z.id === 'zone-c') {
          return {
            ...z,
            fillPercentage: Math.max(30, z.fillPercentage - 40),
            riskLevel: 'normal',
            lastCollection: 'Just now (EcoAgent Auto)',
          };
        }
        return z;
      }));

      setOverview(prev => ({
        ...prev,
        highRiskZonesCount: 2,
      }));

      showToast(`⚡ EcoAgent dispatched autonomous routes to Market D, Industrial A & Commercial C! Overflow mitigated.`);
    } else if (rec.id === 'rec-2') {
      // Landfill diversion
      showToast(`🌿 8 Tons/day biowaste diverted to Bio-methanation Unit 2. Landfill runway extended by 19 days.`);
    } else {
      showToast(`🤖 Autonomous directive applied: ${rec.text}`);
    }
  };

  // Toggle Market Surge (Judges demonstration)
  const handleSimulateSurge = () => {
    if (!isSurgeActive) {
      setIsSurgeActive(true);
      setZones(prev => prev.map(z => {
        if (z.id === 'zone-d') {
          return {
            ...z,
            wasteTons: 5.9,
            fillPercentage: 98,
            overflowProbability: 99,
            riskLevel: 'high',
          };
        }
        return z;
      }));

      setOverview(prev => ({
        ...prev,
        todayWasteTons: 47.4,
        highRiskZonesCount: 8,
      }));

      setAlerts(prev => [
        {
          id: `surge-${Date.now()}`,
          type: 'danger',
          title: '🚨 CRITICAL MARKET SURGE DETECTED',
          message: 'Market Zone D bin cluster #402 reached 98% capacity. Immediate vehicle diversion requested.',
          timestamp: 'Just now',
          zone: '🛍️ Market D',
          action: 'Dispatch Truck V04',
        },
        ...prev
      ]);

      showToast('⚠️ Festival Waste Surge Simulated! Zone D at 98% capacity.', 'warning');
    } else {
      handleResetData();
      showToast('System telemetry restored to baseline.');
    }
  };

  // Reset to Baseline
  const handleResetData = () => {
    setOverview(INITIAL_OVERVIEW);
    setZones(INITIAL_ZONES);
    setVehicles(INITIAL_VEHICLES);
    setAlerts(INITIAL_ALERTS);
    setRecommendations(ECO_AGENT_RECOMMENDATIONS);
    setExecutedActions([]);
    setIsSurgeActive(false);
  };

  const handleResolveAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast('Alert resolved & archived to municipal log.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-700">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white border border-emerald-500/50 text-slate-900 shadow-2xl backdrop-blur-xl text-xs sm:text-sm font-semibold">
            <span className="text-emerald-600">⚡</span>
            <span>{notificationToast.message}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        alertsCount={alerts.length}
        onSimulateSurge={handleSimulateSurge}
        onResetData={handleResetData}
        onOpenEcoAgent={() => setIsEcoAgentOpen(true)}
        isSurgeActive={isSurgeActive}
        isSimulationRunning={isSimulationRunning}
        onToggleSimulation={handleToggleSimulation}
        isDemoTourOpen={isDemoTourOpen}
        onToggleDemoTour={() => setIsDemoTourOpen(prev => !prev)}
        isBackendConnected={isBackendConnected}
        onRefreshBackend={() => syncWithBackend(true)}
      />

      {/* Screen Navigation Tabs */}
      <Navigation
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 sm:pb-6">
        
        {/* Global Live Alert Banner (shows landfill 90% in 5 days alert) */}
        <AlertsBanner
          alerts={alerts}
          onResolveAlert={handleResolveAlert}
          onSelectAlertZone={(zoneCode) => {
            if (zoneCode && zoneCode.includes('Landfill')) {
              setActiveScreen('landfill');
            } else if (zoneCode && zoneCode.includes('Market')) {
              setActiveScreen('waste_zones');
            }
          }}
        />

        {/* Dynamic Screen Renderer */}
        {activeScreen === 'command_center' && (
          <CommandCenterScreen
            overview={overview}
            zones={zones}
            vehicles={vehicles}
            alerts={alerts}
            recommendations={recommendations}
            onSelectZone={(zone) => setSelectedZone(zone)}
            onDispatchVehicle={handleDispatchVehicle}
            onExecuteRecommendation={handleExecuteRecommendation}
            onOpenEcoAgent={() => setIsEcoAgentOpen(true)}
            executedActions={executedActions}
          />
        )}

        {activeScreen === 'waste_zones' && (
          <WasteZonesScreen
            zones={zones}
            onSelectZone={(zone) => setSelectedZone(zone)}
            onDispatchVehicle={handleDispatchVehicle}
          />
        )}

        {activeScreen === 'historical_analytics' && (
          <HistoricalAnalyticsScreen />
        )}

        {activeScreen === 'landfill' && (
          <LandfillIntelligenceScreen />
        )}

        {activeScreen === 'collection' && (
          <CollectionReliabilityScreen />
        )}

        {activeScreen === 'segregation' && (
          <SourceSegregationScreen />
        )}

        {activeScreen === 'data_and_ai' && (
          <DataAndAIScreen
            zones={zones}
            bins={bins}
            isSimulationRunning={isSimulationRunning}
            onToggleSimulation={handleToggleSimulation}
            onDispatchVehicle={handleDispatchVehicle}
          />
        )}

        {activeScreen === 'route_optimization' && (
          <RouteOptimizationScreen
            zones={zones}
            onDispatchVehicle={handleDispatchVehicle}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#060911] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            🌿 EcoCity AI — Municipal Solid Waste Autonomous Command Center • Anvation Hackathon
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>React 19</span>
            <span>•</span>
            <span>Vite</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Recharts</span>
            <span>•</span>
            <span>Leaflet</span>
          </div>
        </div>
      </footer>

      {/* Zone Detail Telemetry Modal */}
      {selectedZone && (
        <ZoneDetailModal
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
          onDispatchTruck={handleDispatchVehicle}
        />
      )}

      {/* EcoAgent AI Copilot Drawer */}
      <EcoAgentDrawer
        isOpen={isEcoAgentOpen}
        onClose={() => setIsEcoAgentOpen(false)}
        recommendations={recommendations}
        onExecuteRecommendation={handleExecuteRecommendation}
        executedActions={executedActions}
      />

      {/* 10-Step Interactive Judge Demo Tour Modal */}
      <DemoWalkthroughModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentStepIndex={currentDemoStepIndex}
        onSetStepIndex={setCurrentDemoStepIndex}
        onNavigateScreen={setActiveScreen}
        onSelectZone={(zoneId) => {
          const found = zones.find(z => z.id === zoneId);
          if (found) setSelectedZone(found);
        }}
        onOpenEcoAgentWithQuery={(query) => {
          setIsEcoAgentOpen(true);
        }}
      />

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileBottomNav
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onOpenEcoAgent={() => setIsEcoAgentOpen(true)}
        alertsCount={alerts.length}
      />

    </div>
  );
}

export default App;

/**
 * EcoCity AI — Centralized REST API Service
 * Connects the React 19 Frontend with the FastAPI Backend (http://127.0.0.1:8000)
 * 
 * Supports:
 * - Member 1: Dashboard, Alerts, Zones, Vehicles, Landfill
 * - Member 2: Risk Scoring, Forecasting, Historical Analytics, Real-Time IoT
 * - Member 3: Vehicle Optimization, Route Optimization, What-If Simulator
 * - Member 4: EcoAgent Autonomous Q&A, 10 Tool Runners, Task Dispatch, Collections, Segregation
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const REQUEST_TIMEOUT_MS = 4000;

/**
 * Robust fetch wrapper with timeout, Vite proxy support, and direct port 8000 fallback
 */
async function request(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. First try configured base or Vite proxy
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const primaryUrl = API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;

    const res = await fetch(primaryUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Proxy or primary request failed, try direct connection
  }

  // 2. Direct fallback to FastAPI backend on 127.0.0.1:8000
  const fallbackUrl = `http://127.0.0.1:8000${cleanEndpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(fallbackUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// ----------------- HEALTH & SYSTEM -----------------

export async function checkBackendHealth() {
  try {
    const data = await request('/api/dashboard');
    return {
      online: true,
      platform: 'EcoCity AI Municipal Solid Waste Command Center',
      status: 'ONLINE',
      version: '2.0.0',
      dashboard: data,
    };
  } catch {
    try {
      const res = await fetch('http://127.0.0.1:8000/', { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const rootData = await res.json();
        return {
          online: true,
          platform: rootData.platform || 'EcoCity AI API',
          status: 'ONLINE',
          version: rootData.version || '2.0.0',
        };
      }
    } catch {}
    return {
      online: false,
    };
  }
}

// ----------------- MEMBER 1: DASHBOARD, ZONES & ALERTS -----------------

export async function fetchDashboardSummary() {
  return await request('/api/dashboard');
}

export async function fetchAlerts() {
  return await request('/api/alerts');
}

export async function fetchZones() {
  return await request('/api/zones');
}

export async function fetchZoneById(zoneId) {
  return await request(`/api/zones/${zoneId}`);
}

export async function fetchVehicles() {
  return await request('/api/vehicles');
}

// ----------------- MEMBER 2: PREDICTIVE & AI ENGINE -----------------

export async function fetchForecast() {
  return await request('/api/forecast');
}

export async function fetchRiskScores() {
  return await request('/api/risk');
}

export async function fetchHistoricalData() {
  return await request('/api/historical');
}

export async function fetchRealtimeBins() {
  return await request('/api/realtime');
}

// ----------------- MEMBER 3: VEHICLE & ROUTE OPTIMIZATION -----------------

export async function fetchOptimizedVehicles() {
  return await request('/api/optimize/vehicles', { method: 'POST' });
}

export async function fetchOptimizedRoutes() {
  return await request('/api/optimize/routes', { method: 'POST' });
}

export async function simulateWhatIfScenario(wasteDemandDeltaPct = 30.0, fleetCount = 4, vehicleCapacityKg = 5000) {
  return await request('/api/simulate', {
    method: 'POST',
    body: JSON.stringify({
      waste_demand_delta_pct: parseFloat(wasteDemandDeltaPct),
      fleet_count: parseInt(fleetCount, 10),
      vehicle_capacity_kg: parseInt(vehicleCapacityKg, 10),
    }),
  });
}

// ----------------- MEMBER 4: ECOAGENT & SUSTAINABILITY OPERATIONS -----------------

export async function fetchLandfillStatus() {
  return await request('/api/landfill');
}

export async function simulateLandfillCapacity(incomingWaste = 42.0, processingCapacity = 35.0) {
  return await request('/api/landfill/simulate', {
    method: 'POST',
    body: JSON.stringify({
      incoming_waste: parseFloat(incomingWaste),
      processing_capacity: parseFloat(processingCapacity),
    }),
  });
}

export async function fetchCollectionSchedule() {
  return await request('/api/collection');
}

export async function fetchSegregationAnalysis() {
  return await request('/api/segregation');
}

export async function queryEcoAgent(queryText) {
  return await request('/api/agent', {
    method: 'POST',
    body: JSON.stringify({ query: queryText }),
  });
}

export async function executeAgentTool(toolName) {
  return await request(`/api/agent/tools/${toolName}`);
}

export async function createAgentCollectionTask(zoneCode = 'Zone D', vehicleId = 'V12', priority = 'CRITICAL') {
  return await request('/api/agent/task', {
    method: 'POST',
    body: JSON.stringify({
      zone_code: zoneCode,
      vehicle_id: vehicleId,
      priority: priority,
    }),
  });
}

// ----------------- DATA NORMALIZATION & MERGE ADAPTERS -----------------

/**
 * Normalizes backend dashboard payload to the shape expected by UI
 */
export function normalizeOverview(backendData, fallbackOverview) {
  if (!backendData) return fallbackOverview;
  return {
    ...fallbackOverview,
    todayWasteTons: backendData.today_waste_tons ?? fallbackOverview.todayWasteTons,
    yesterdayWasteTons: backendData.yesterday_waste_tons ?? fallbackOverview.yesterdayWasteTons,
    highRiskZonesCount: backendData.high_risk_zones_count ?? fallbackOverview.highRiskZonesCount,
    activeVehiclesCount: backendData.active_vehicles_count ?? fallbackOverview.activeVehiclesCount,
    totalBinsMonitored: backendData.total_bins_monitored ?? fallbackOverview.totalBinsMonitored,
    landfillIntakeDaily: backendData.landfill_intake_daily ?? fallbackOverview.landfillIntakeDaily,
    landfillProcessingDaily: backendData.landfill_processing_daily ?? fallbackOverview.landfillProcessingDaily,
    overallSegregationScore: backendData.segregation_score ?? fallbackOverview.overallSegregationScore,
    iotSensorUptime: backendData.iot_uptime ?? fallbackOverview.iotSensorUptime,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    isBackendLive: true,
  };
}

/**
 * Merges backend zones (with multi-factor risk scores) into rich frontend zone models
 */
export function mergeZonesWithBackend(backendZones, fallbackZones) {
  if (!Array.isArray(backendZones) || backendZones.length === 0) return fallbackZones;

  return fallbackZones.map((fallbackZone, idx) => {
    // Match by ID, name, or index
    const backendMatch = backendZones.find(
      bz => bz.id === fallbackZone.id || 
            (bz.name && fallbackZone.name && bz.name.toLowerCase() === fallbackZone.name.toLowerCase()) ||
            bz.id === idx + 1
    );

    if (!backendMatch) return fallbackZone;

    const wasteTons = backendMatch.current_waste ? backendMatch.current_waste / 1000 : fallbackZone.wasteTons;
    const fill = backendMatch.fill ?? fallbackZone.fillPercentage;
    const riskAnalysis = backendMatch.risk_analysis || {};
    const riskBand = riskAnalysis.band ? riskAnalysis.band.toLowerCase() : fallbackZone.riskLevel;

    return {
      ...fallbackZone,
      wasteTons: parseFloat(wasteTons.toFixed(1)),
      fillPercentage: fill,
      riskLevel: riskBand === 'critical' || riskBand === 'high' ? 'high' : riskBand === 'medium' ? 'medium' : 'normal',
      binsCount: backendMatch.bins || fallbackZone.binsCount,
      overflowProbability: riskAnalysis.overflow_probability || fallbackZone.overflowProbability,
      predictedWasteTons: riskAnalysis.predicted_3h_fill_tons || fallbackZone.predictedWasteTons,
      backendRiskScore: riskAnalysis.total_risk_score,
      backendSynced: true,
    };
  });
}

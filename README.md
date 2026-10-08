# 🌿 EcoCity AI — Municipal Waste Management Command Center

> Built for the **Anvation Hackathon** • **Member 1: Frontend + Command Center**  
> High-performance municipal command center with real-time IoT telemetry, AI autonomous routing, predictive landfill intelligence, and source segregation auditing.

---

## 🚀 Quick Start

The application is built using **React 19 + Vite + Tailwind CSS + Recharts + Leaflet / React-Leaflet**.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Or build for production
npm run build
```

Open your browser to: **`http://127.0.0.1:5173/`**

---

## 🖥️ Screen Architecture (Member 1 Screens)

### 🌿 Screen 1 — Command Center (Main Operations Hub)
- **Top Metrics**:
  - `42.8 Tons` Today's Waste (+8.6% surge vs yesterday)
  - `7 High Risk Zones` with immediate action triggers
  - `28 Vehicles` Dispatched electric & compactor fleet
- **Interactive City Waste Map**:
  - CartoDB dark high-tech basemap centered on the municipal grid
  - 🔴 High Risk, 🟠 Medium, 🟢 Normal pulsing IoT zone pins
  - Live animated truck markers: `🚛 V12 → Zone A`, `🚛 V17 → Zone C`, `🚛 V04 → Zone D`
  - Dotted dynamic vector polylines connecting vehicles to their assigned collection targets
- **🚨 Alerts Panel**:
  - *"Landfill predicted to reach 90% capacity in 5 days"*
  - One-click mitigation diversion trigger
- **🤖 EcoAgent Intelligence Panel**:
  - *"3 zones require immediate collection."*
  - Autonomous dispatch button: reroutes trucks V04 & V12, mitigating 4.8 tons overflow spill

---

### 🗂️ Screen 2 — Waste Zones (6-Zone MVP)
Displays all 6 designated zones with the complete zone specification model:
1. 🏭 **Industrial A**: `4.8 T` • `87% Fill` • 🔴 High Risk
2. 🏠 **Residential B**: `2.1 T` • `48% Fill` • 🟢 Normal
3. 🏢 **Commercial C**: `3.7 T` • `72% Fill` • 🟠 Medium
4. 🛍️ **Market D**: `5.1 T` • `92% Fill` • 🔴 High Risk
5. 🎓 **Education E**: `1.4 T` • `35% Fill` • 🟢 Normal
6. 🏥 **Healthcare F**: `2.5 T` • `65% Fill` • 🟠 Medium

**Every Zone Model Contains**:
- Population & activity index
- Smart bins & sensor health
- Current waste (Tons)
- Predicted waste (next 24 hours)
- Fill percentage with live progress meter
- Collection frequency
- Last and next scheduled collections
- Bayesian overflow probability
- Priority scheduling rank (P1 - P5)

---

### 📈 Screen 3 — Historical Analytics
- **Waste Trend Chart (Mon - Sun)**:
  - Exact curve matching specification: `Mon: 20T`, `Tue: 30T`, `Wed: 40T`, `Thu: 40T`, `Fri: 50T`, `Sat: 60T`
- **Key Insight Callout**:
  - **Saturday waste ↑ 28% above weekly average** (60T vs 40.1T average)
  - Root-cause breakdown: weekend dining, market restocking, commercial corridors
- **Diurnal Hourly Analysis**: Peak windows at 08:00, 12:00, and 18:00
- **Landfill Diversion**: 342.8 Tons diverted, 186.4 MT CO2 saved

---

### ⚠️ Screen 4 — Landfill Intelligence
- **Status Dashboard**:
  - Current capacity: `78%`
  - Incoming waste: `42 tons/day`
  - Processing capacity: `35 tons/day` (Surplus accumulation: `+7 tons/day`)
  - Tomorrow forecast: `86%`
  - 7-day forecast: `96%`
  - 🔴 **HIGH OVERFLOW RISK**
- **Interactive "What-If" Mitigation Slider**:
  - Adjust shredder/baler processing capacity from 25 to 50 tons/day in real-time
  - Toggle organic diversion (-8 T/day) and watch the 7-day forecast drop below danger thresholds!
- **Landfill Cell Health**: Alpha, Beta, Gamma, and Delta monitoring with methane telemetry

---

### ⏱️ Screen 5 — Collection Reliability
- **Schedule vs Actual Timetable**:
  - `Whitefield` | Scheduled: 7:00 | Actual: 7:12 | 🟠 **DELAYED** (+12m)
  - `Indiranagar` | Scheduled: 7:30 | Actual: -- | 🔴 **MISSED**
  - `Koramangala` | Scheduled: 8:00 | Actual: 8:45 | 🟠 **DELAYED** (+45m)
  - `Jayanagar` | Scheduled: 8:30 | Actual: 8:28 | 🟢 **ON TIME** (-2m)
- **Collection Reliability Distribution**:
  - **ON TIME: 86%**
  - **DELAYED: 9%**
  - **MISSED: 5%**
- **Autonomous Rerouting**: One-click "Auto-Reschedule Missed Route" dispatches backup vehicle V18 to Indiranagar, restoring on-time reliability.

---

### ♻️ Screen 6 — Source Segregation
- **Source Segregation Breakdown**:
  - **Wet Waste**: `46%`
  - **Dry Waste**: `31%`
  - **Mixed Waste**: `23% 🔴` (Contamination breach)
  - **Segregation Score**: `62 / 100` (Grade C+)
- **Zone Comparisons**:
  - Zone A: `91%` 🟢
  - Zone B: `84%` 🟢
  - Zone C: `62%` 🟠
  - Zone D: `41%` 🔴
- **AI Computer Vision Bin Audits**: Real-time simulated optical scan logs detecting unsegregated packaging and awarding green credits.

---

## 🎮 Interactive Demo Controls for Judges
1. **▶ START LIVE SIMULATION**: Top navigation and Step 6 button starts real-time IoT sensor telemetry pings (`BIN-1042 → 87%`, `BIN-1058 → 92%`, `BIN-1081 → 61%`, `BIN-1092 → 96% 🔴`), recomputing risk scores across all municipal zones.
2. **Simulate Surge**: Top-right flame button triggers an emergency waste spike in Market Zone D (fill jumps to 98%), spawning emergency alarms and updating AI routing.
3. **EcoAgent AI Drawer**: Top-right button opens the conversational copilot to query municipal vectors or authorize one-click autonomous dispatches.
4. **Interactive Map**: Click any marker to view real-time zone telemetry or dispatch a truck.
5. **What-If Slider**: Screen 4 slider dynamically recalibrates the 7-day saturation curve.

---

## 🤖 MEMBER 2 — DATA + AI ARCHITECTURE

### Step 1: Datasets in `data/`
- [`data/historical_waste.csv`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/historical_waste.csv): Time-series records (`date,zone,type,waste_kg,fill_percent`)
- [`data/zones.json`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/zones.json): Zone models with id, name, type, activity, bins, current_waste, capacity, fill
- [`data/vehicles.json`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/vehicles.json): Fleet telematics, payload weights, routes, drivers
- [`data/landfill.json`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/landfill.json): 78% capacity, 42 T/day intake, 35 T/day processing, 7-day forecast
- [`data/collections.json`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/collections.json): Route punctuality timetable and reliability benchmarks
- [`data/bins.json`](file:///c:/Users/pavan/Downloads/Anvation-hackothon/data/bins.json): IoT ultrasonic bin sensors (`BIN-1042`, `BIN-1058`, `BIN-1081`, `BIN-1092`)

### Step 2: Zone Data Schema
```json
{
  "id": 1,
  "name": "Industrial A",
  "type": "industrial",
  "activity": 95,
  "bins": 128,
  "current_waste": 4800,
  "capacity": 5500,
  "fill": 87
}
```

### Step 3: Multi-Factor Weighted Risk Score
Exact formula:
$$\text{Risk Score} = (\text{Waste Volume} \times 0.35) + (\text{Fill Level} \times 0.25) + (\text{Activity} \times 0.15) + (\text{Historical} \times 0.15) + (\text{Pickup Delay} \times 0.10)$$

Risk bands:
- `0–30`: **LOW 🟢**
- `31–60`: **MEDIUM 🟠**
- `61–80`: **HIGH 🟠**
- `81–100`: **CRITICAL 🔴**

### Step 4: Overflow Prediction Engine
$$\text{Predicted 3-Hour Fill} = \text{Current Fill} + (\text{Growth Rate/hr} \times 3)$$
Example: $82\% + (4.5\% \times 3) = 95.5\% \rightarrow \mathbf{96\%}$ (🔴 CRITICAL)
- **Insight generated**: *"Whitefield is predicted to reach critical capacity within 3 hours. Recommendation: Dispatch Vehicle V12."*

### Step 5: Historical Analysis & Synthesis
- Weekly average = `42 tons`
- Saturday waste = `54 tons`
- Weekend surge: $\frac{54 - 42}{42} \times 100 = \mathbf{28.6\%}$
- **EcoAgent Insight**: *"Saturday waste generation is 28% higher than the weekly average."*

### Step 6: Real-Time IoT Sensor Simulation
- Ticker button: **`▶ START LIVE SIMULATION`**
- Broadcasts real-time ultrasonic pings:
  - `BIN-1042 → 87%`
  - `BIN-1058 → 92%`
  - `BIN-1081 → 61%`
  - `BIN-1092 → 96% 🔴`

---

## 🚛 MEMBER 3 — VEHICLE + ROUTE OPTIMIZATION

### Goal Pipeline
$$\text{HIGH RISK ZONES} \longrightarrow \text{VEHICLE ASSIGNMENT} \longrightarrow \text{OPTIMIZED ROUTE} \longrightarrow \text{FUEL / DISTANCE SAVING}$$

### Step 1: Vehicle Dataset (`data/vehicles.json`)
```json
[
  { "id": "V12", "capacity": 5000, "current_load": 1000, "status": "available" },
  { "id": "V17", "capacity": 4000, "current_load": 500, "status": "available" },
  { "id": "V21", "capacity": 5000, "current_load": 0, "status": "available" }
]
```

### Step 2: Vehicle Assignment Algorithm
$$\text{Priority Sort} \longrightarrow \text{Waste Demand} \longrightarrow \text{Vehicle Capacity} \longrightarrow \text{Distance Check} \longrightarrow \text{Assign}$$

- 🔴 **Market Zone D** $\longrightarrow$ **V12**
- 🔴 **Industrial A** $\longrightarrow$ **V17**
- 🟠 **Commercial C** $\longrightarrow$ **V21**
- 🟢 **Residential B** $\longrightarrow$ **next cycle**

### Step 3: Route Optimization
- **Current Route**: `Depot → A → D → B → C → Depot` = **42.6 km**
- **EcoCity Route**: `Depot → A → C → B → D → Depot` = **31.2 km**

**Optimization Results**:
- **Distance saved**: **11.4 km** ($-26.8\%$)
- **Fuel saved**: **2.3 L** per shift
- **CO₂ avoided**: **6.2 kg**

### Step 4: What-If Scenario Simulator
- **Waste Demand Slider**: `[──────●────] 30%`
- **Vehicles Slider**: `[────●─────] 4`
- **Bin Unit Capacity**: `1000 kg`

**Simulation Output**:
- Current waste: **8.4 tons** $\longrightarrow$ New waste: **10.9 tons**
- Overflow zones: **3 $\longrightarrow$ 6**
- Vehicles required: **4 $\longrightarrow$ 5**
- Fuel consumption: **+18%**
- **AI Recommendation**: *"Deploy 1 additional vehicle"* (with one-click deployment action)

---

## ⚡ MEMBER 4 — ECOAGENT OPERATIONAL ENGINE & SUSTAINABILITY

### Overview
Member 4 implements the **Autonomous Operational Co-Pilot**, **Collection Reliability Engine**, and **Source Segregation Intelligence**. It connects real-time municipal telemetry with autonomous decision-making through 10 operational tools, interactive Judge Q&A, and direct dispatch actions.

### 🛠️ The 10 Autonomous Operational Tools

| # | Tool Function | Operational Responsibility | Key Telemetry / Output |
|---|---|---|---|
| 1 | `get_realtime_bins()` | Queries live IoT ultrasonic sensors | 1,420 bins monitored; critical bin `BIN-1092` at 96% |
| 2 | `get_historical_waste()` | Retrieves time-series volume trends | 40.6T weekly average; Saturday +28.6% surge |
| 3 | `get_landfill_status()` | Real-time landfill cell utilization | 78% capacity, 42 T/day intake vs 35 T/day processing (+7 T/day) |
| 4 | `predict_landfill_capacity()` | Projects saturation horizon & overflow risk | 86% tomorrow, 96% in 7 days; 90% breach in 5 days |
| 5 | `detect_collection_failures()` | Audits scheduled vs actual route timing | 86% On-Time, 9% Delayed, 5% Missed (Indiranagar missed) |
| 6 | `calculate_segregation_score()` | Audits wet / dry / mixed streams & contamination | Citywide score 62/100; Market Zone D mixed waste spike (41%) |
| 7 | `find_high_risk_zones()` | Ranks sectors by multi-factor weighted formula | 3 zones: Market (94%), Industrial (88%), Commercial (83%) |
| 8 | `optimize_vehicle_routes()` | Matches priority demand to vehicle capacity | Saves 11.4 km (-26.8%), 2.3L fuel, 6.2kg CO2 |
| 9 | `create_collection_task()` | Dispatches autonomous directives to MDT | Direct dispatch of V12 / V18 with ETA & live routing |
| 10 | `generate_daily_report()` | Cross-cutting municipal executive digest | Full daily audit: 42.8T generated, 28 vehicles active |

---

### 🎯 Hackathon Judge Evaluation Queries (Automated in EcoAgent)

The EcoAgent drawer features one-click prompt chips answering the exact evaluation questions:

#### 1. "Which zones need collection now?"
- **Autonomous Tools Invoked**: `find_high_risk_zones()`, `optimize_vehicle_routes()`
- **Agent Verdict**:
  > **3 zones require immediate collection.**
  > 1. Market Zone — 94% risk
  > 2. Industrial Zone — 88% risk
  > 3. Commercial Zone — 83% risk
  > 
  > *Recommendation: Dispatch V12 and V17.*

#### 2. "Why is Market Zone high risk?"
- **Autonomous Tools Invoked**: `get_realtime_bins()`, `get_historical_waste()`, `predict_landfill_capacity()`
- **Agent Verdict**:
  > **Market Zone is at 92% capacity.**
  > Waste generation is 28% above the weekly average.
  > Predicted capacity: **100% within 90 minutes.**
  > 
  > *Recommendation: Dispatch V12 immediately.*

#### 3. "What is the biggest problem today?"
- **Autonomous Tools Invoked**: `get_landfill_status()`, `predict_landfill_capacity()`, `detect_collection_failures()`
- **Agent Verdict**:
  > **Landfill capacity is the highest risk.**
  > Current utilization: 82%
  > Incoming waste: 48 tons/day (Historical: 41 tons/day, Forecast: 57 tons/day)
  > 
  > *Recommended Actions:*
  > 1. Increase recyclable diversion
  > 2. Prioritize high-risk zones
  > 3. Optimize vehicle routes
  > 4. Monitor landfill capacity hourly

---

### ⏱️ Collection Reliability Engine (Screen 5 & `/api/collection`)
- **Punctuality Distribution**: **86% ON TIME**, **9% DELAYED**, **5% MISSED**
- **Schedule vs Actual Timetable**: Tracks vehicle GPS, driver ID, variance, and root causes
- **Autonomous Resolution**: One-click **Auto-Reschedule Missed Route** dispatches backup hauler **V18** to Indiranagar, restoring reliability to 89%.

---

### ♻️ Source Segregation Intelligence (Screen 6 & `/api/segregation`)
- **Stream Breakdown**: **Wet 46%** • **Dry 31%** • **Mixed 23% 🔴**
- **Citywide Compliance Score**: **62 / 100** (Grade C+)
- **Critical Contamination Anomaly**: **Market Zone D** mixed waste reached **41%** (increased from 32% to 41% over the past 4 weeks).
- **AI Computer Vision Audits**: Simulated optical bin camera scans identifying unsegregated waste and issuing green credits.

---

### 🌐 Member 4 API Endpoints (FastAPI Backend)
```http
POST /api/agent                     # Autonomous query answering with multi-tool calling
GET  /api/agent/tools/{tool_name}    # Direct execution of any of the 10 operational tools
POST /api/agent/task                 # Create automated vehicle dispatch task
GET  /api/collection                 # Route punctuality timetable & reliability stats
GET  /api/segregation                # Multi-stream segregation audit & zone rankings
GET  /api/landfill                   # Landfill intake, capacity & 7-day runway projections
```


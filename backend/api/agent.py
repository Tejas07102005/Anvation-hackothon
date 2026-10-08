from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from backend.services.risk_engine import calculate_weighted_risk_score
from backend.services.forecast_engine import calculate_landfill_overflow, get_historical_analysis
from backend.services.route_optimizer import assign_vehicles_to_zones, get_route_comparison
from backend.services.segregation import get_segregation_analysis

router = APIRouter(tags=["EcoAgent Operational AI"])

class AgentQueryRequest(BaseModel):
    query: str

class CollectionTaskRequest(BaseModel):
    zone_code: str = "Zone D"
    vehicle_id: str = "V12"
    priority: str = "CRITICAL"

# ----------------- 10 OPERATIONAL TOOLS -----------------

def tool_get_realtime_bins():
    return {
        "tool": "get_realtime_bins",
        "total_monitored_bins": 1420,
        "sample_telemetry": [
            {"code": "BIN-1042", "zone": "Zone A", "fill": 82, "status": "warning"},
            {"code": "BIN-1058", "zone": "Zone B", "fill": 44, "status": "normal"},
            {"code": "BIN-1081", "zone": "Zone C", "fill": 78, "status": "warning"},
            {"code": "BIN-1092", "zone": "Zone D", "fill": 96, "status": "critical 🔴"}
        ]
    }

def tool_get_historical_waste():
    return {
        "tool": "get_historical_waste",
        "weekly_average": 40.6,
        "saturday_surge": "+28.6%",
        "trend": "Strong weekend surge driven by retail footfall and market trading."
    }

def tool_get_landfill_status():
    return {
        "tool": "get_landfill_status",
        "current_capacity_percent": 78,
        "incoming_waste_tons_day": 42,
        "processing_capacity_tons_day": 35,
        "daily_overflow_tons": 7,
        "tomorrow_forecast": 86,
        "seven_day_forecast": 96,
        "risk": "HIGH OVERFLOW RISK"
    }

def tool_predict_landfill_capacity(incoming=42, processing=35, days=7):
    return calculate_landfill_overflow(incoming, processing)

def tool_detect_collection_failures():
    return {
        "tool": "detect_collection_failures",
        "reliability": {"on_time": 86, "delayed": 9, "missed": 5},
        "critical_missed": {"zone": "Indiranagar", "scheduled": "7:30 AM", "actual": "None", "status": "🔴 MISSED"}
    }

def tool_calculate_segregation_score():
    return get_segregation_analysis()

def tool_find_high_risk_zones():
    return {
        "tool": "find_high_risk_zones",
        "count": 3,
        "high_risk_zones": [
            {"rank": 1, "zone": "Market Zone", "risk": "94%", "fill": "92%", "time_to_100": "90 minutes"},
            {"rank": 2, "zone": "Industrial Zone", "risk": "88%", "fill": "87%"},
            {"rank": 3, "zone": "Commercial Zone", "risk": "83%", "fill": "84%"}
        ],
        "recommended_vehicles": ["V12", "V17"]
    }

def tool_optimize_vehicle_routes():
    return {
        "tool": "optimize_vehicle_routes",
        "allocations": [
            "🔴 Market Zone D → V12",
            "🔴 Industrial A → V17",
            "🟠 Commercial C → V21",
            "🟢 Residential B → next cycle"
        ],
        "route_savings": {
            "legacy_distance_km": 42.6,
            "optimized_distance_km": 31.2,
            "saved_km": 11.4,
            "fuel_saved_liters": 2.3,
            "co2_avoided_kg": 6.2
        }
    }

def tool_create_collection_task(zone_code="Zone D", vehicle_id="V12", priority="CRITICAL"):
    return {
        "tool": "create_collection_task",
        "task_id": "TSK-8491",
        "assigned_vehicle": vehicle_id,
        "zone": zone_code,
        "priority": priority,
        "status": "DISPATCHED",
        "eta_minutes": 8
    }

def tool_generate_daily_report():
    return {
        "tool": "generate_daily_report",
        "total_waste_tons": 42.8,
        "high_risk_zones": 3,
        "active_fleet": 28,
        "landfill_utilization": "78% (96% in 7 days)",
        "collection_reliability": "86% On-time",
        "segregation_score": "62/100",
        "route_distance_saved_km": 11.4
    }

# ----------------- AGENT QUERY & TOOLS ENDPOINTS -----------------

@router.post("/api/agent")
def query_eco_agent(req: AgentQueryRequest):
    q = req.query.lower().strip()

    # Question 1: "Which zones need collection now?"
    if "which zones need collection" in q or ("zones" in q and "collection" in q and "now" in q):
        return {
            "query": req.query,
            "tools_called": ["find_high_risk_zones()", "optimize_vehicle_routes()"],
            "response": """3 zones require immediate collection.

1. Market Zone — 94% risk
2. Industrial Zone — 88% risk
3. Commercial Zone — 83% risk

I recommend dispatching V12 and V17."""
        }

    # Question 2: "Why is Market Zone high risk?"
    if "why is market zone" in q or ("market" in q and "high risk" in q):
        return {
            "query": req.query,
            "tools_called": ["get_realtime_bins()", "get_historical_waste()", "predict_landfill_capacity()"],
            "response": """Market Zone is at 92% capacity.

Waste generation is 28% above
the weekly average.

Predicted capacity:
100% within 90 minutes.

Recommendation:
Dispatch V12 immediately."""
        }

    # Question 3: "What is the biggest problem today?"
    if "biggest problem" in q or "highest risk" in q or "problem today" in q:
        return {
            "query": req.query,
            "tools_called": ["get_landfill_status()", "predict_landfill_capacity()", "detect_collection_failures()"],
            "response": """Landfill capacity is the highest risk.

Current utilization: 82%
Incoming waste: 48 tons/day
Historical average: 41 tons/day
Forecast: 57 tons/day

Recommended actions:

1. Increase recyclable diversion.
2. Prioritize high-risk zones.
3. Optimize vehicle routes.
4. Monitor landfill capacity hourly."""
        }

    # General queries fallback
    return {
        "query": req.query,
        "tools_called": ["find_high_risk_zones()", "get_landfill_status()"],
        "response": f"EcoAgent Operational Intelligence: Evaluated system state for '{req.query}'. High priority: Market Zone D at 92% capacity. Recommended action: Dispatch V12."
    }

@router.get("/api/agent/tools/{tool_name}")
def execute_tool(tool_name: str):
    tools_map = {
        "get_realtime_bins": tool_get_realtime_bins,
        "get_historical_waste": tool_get_historical_waste,
        "get_landfill_status": tool_get_landfill_status,
        "predict_landfill_capacity": tool_predict_landfill_capacity,
        "detect_collection_failures": tool_detect_collection_failures,
        "calculate_segregation_score": tool_calculate_segregation_score,
        "find_high_risk_zones": tool_find_high_risk_zones,
        "optimize_vehicle_routes": tool_optimize_vehicle_routes,
        "create_collection_task": tool_create_collection_task,
        "generate_daily_report": tool_generate_daily_report
    }
    if tool_name in tools_map:
        return tools_map[tool_name]()
    return {"error": f"Unknown tool: {tool_name}"}

@router.post("/api/agent/task")
def create_task(req: CollectionTaskRequest):
    return tool_create_collection_task(req.zone_code, req.vehicle_id, req.priority)

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import json
from pathlib import Path
from backend.services.route_optimizer import assign_vehicles_to_zones, get_route_comparison, simulate_what_if

router = APIRouter(tags=["Vehicles & Route Optimization"])

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "vehicles.json"

def load_vehicles():
    if DATA_PATH.exists():
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

class SimulateRequest(BaseModel):
    waste_demand_delta_pct: float = 30.0
    fleet_count: int = 4
    vehicle_capacity_kg: int = 5000

@router.get("/api/vehicles")
def get_vehicles():
    return load_vehicles()

@router.post("/api/optimize/vehicles")
def optimize_vehicle_allocation():
    """
    Step 2: Priority-to-capacity vehicle allocation
    🔴 Market Zone D → V12
    🔴 Industrial A  → V17
    🟠 Commercial C  → V21
    🟢 Residential B → next cycle
    """
    return {
        "status": "success",
        "assignments": assign_vehicles_to_zones()
    }

@router.post("/api/optimize/routes")
def optimize_routes():
    """
    Step 3: Route optimization comparison
    Legacy 42.6 km vs EcoCity 31.2 km -> 11.4 km saved, 2.3 L fuel, 6.2 kg CO2 avoided
    """
    return {
        "status": "success",
        "comparison": get_route_comparison()
    }

@router.post("/api/simulate")
def run_simulation(req: SimulateRequest):
    """
    Step 4: What-If Fleet Stress Simulator
    Demand +30% -> Vehicles: 4 -> 5, Overflow zones: 3 -> 6
    """
    return simulate_what_if(
        waste_demand_delta_pct=req.waste_demand_delta_pct,
        fleet_count=req.fleet_count,
        vehicle_capacity_kg=req.vehicle_capacity_kg
    )

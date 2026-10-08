from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.forecast_engine import calculate_landfill_overflow

router = APIRouter(tags=["Landfill Intelligence"])

class LandfillSimulationRequest(BaseModel):
    incoming_waste: float = 42.0
    processing_capacity: float = 35.0

@router.get("/api/landfill")
def get_landfill_status():
    """
    Step 3: Landfill Intelligence
    Current capacity: 78%
    Incoming waste: 42 tons/day
    Processing capacity: 35 tons/day
    Daily overflow = 42 - 35 = 7 tons/day
    Tomorrow forecast: 86%
    7-day forecast: 96%
    🔴 HIGH OVERFLOW RISK
    """
    return calculate_landfill_overflow(42.0, 35.0)

@router.post("/api/landfill/simulate")
def simulate_landfill_capacity(req: LandfillSimulationRequest):
    return calculate_landfill_overflow(req.incoming_waste, req.processing_capacity)

from fastapi import APIRouter
import json
from pathlib import Path
from backend.services.forecast_engine import get_historical_analysis, calculate_landfill_overflow
from backend.services.risk_engine import calculate_weighted_risk_score

router = APIRouter(tags=["Forecasting & Risk Engine"])

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

def load_json(name: str):
    p = DATA_DIR / name
    if p.exists():
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("/api/forecast")
def get_forecast():
    """
    Returns landfill forecast, saturation runway, and net accumulation.
    """
    return calculate_landfill_overflow(incoming_waste=42.0, processing_capacity=35.0)

@router.get("/api/risk")
def get_risk_scores():
    """
    Evaluates all 6 zones through the weighted risk formula (35/25/15/15/10).
    """
    zones = load_json("zones.json")
    results = [calculate_weighted_risk_score(z) for z in zones]
    # Sort by risk score descending
    results.sort(key=lambda x: x["total_risk_score"], reverse=True)
    return {
        "status": "success",
        "high_risk_zones_count": sum(1 for r in results if r["total_risk_score"] >= 80),
        "zones_risk": results
    }

@router.get("/api/historical")
def get_historical():
    """
    Returns historical waste patterns, weekly average 40.6 T, and Saturday +28.6% surge.
    """
    return get_historical_analysis()

@router.get("/api/realtime")
def get_realtime_bins():
    """
    Real-time IoT smart bin telemetry across all monitored units.
    """
    bins = load_json("bins.json")
    return {
        "timestamp": "2026-10-08T18:30:00Z",
        "total_bins": len(bins),
        "critical_bins": [b for b in bins if b.get("current_fill_percent", 0) >= 90],
        "bins": bins
    }

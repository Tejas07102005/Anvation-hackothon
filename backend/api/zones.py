from fastapi import APIRouter
import json
import os
from pathlib import Path
from backend.services.risk_engine import calculate_weighted_risk_score

router = APIRouter(prefix="/api/zones", tags=["Zones"])

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "zones.json"

def load_zones():
    if DATA_PATH.exists():
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("")
def get_all_zones():
    zones = load_zones()
    scored_zones = []
    for z in zones:
        risk = calculate_weighted_risk_score(z)
        scored_zones.append({
            **z,
            "risk_analysis": risk
        })
    return scored_zones

@router.get("/{zone_id}")
def get_zone_by_id(zone_id: int):
    zones = load_zones()
    for z in zones:
        if z.get("id") == zone_id:
            risk = calculate_weighted_risk_score(z)
            return {**z, "risk_analysis": risk}
    return {"error": "Zone not found"}

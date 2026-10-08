from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter(tags=["Dashboard & Alerts"])

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

@router.get("/api/dashboard")
def get_dashboard_summary():
    """
    Member 1 Dashboard summary
    Today's waste: 42.8 tons
    High-risk zones: 3
    Active vehicles: 28
    """
    return {
        "today_waste_tons": 42.8,
        "yesterday_waste_tons": 39.4,
        "high_risk_zones_count": 3,
        "active_vehicles_count": 28,
        "total_bins_monitored": 1420,
        "landfill_intake_daily": 42.0,
        "landfill_processing_daily": 35.0,
        "segregation_score": 62,
        "iot_uptime": "99.8%"
    }

@router.get("/api/alerts")
def get_alerts():
    """
    Live municipal alert feed
    """
    return [
        {
            "id": "alt-1",
            "type": "critical",
            "title": "Landfill Capacity Alert",
            "message": "Landfill predicted to reach 90% capacity in 5 days (+7 T/day net accumulation)",
            "zone": "South Integrated Landfill",
            "action": "Divert 8 T/day to Bio-methanation Unit 2"
        },
        {
            "id": "alt-2",
            "type": "danger",
            "title": "Market Zone D Imminent Overflow",
            "message": "Market Zone D at 92% capacity. Waste generation is 28% above weekly average.",
            "zone": "Market Zone D",
            "action": "Dispatch V12 immediately"
        },
        {
            "id": "alt-3",
            "type": "warning",
            "title": "Indiranagar Missed Schedule",
            "message": "Scheduled 7:30 AM collection was missed (+45 mins overdue).",
            "zone": "Indiranagar",
            "action": "Auto-reassign route to V18"
        }
    ]

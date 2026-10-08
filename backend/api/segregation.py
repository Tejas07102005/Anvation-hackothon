from fastapi import APIRouter
from backend.services.segregation import get_segregation_analysis

router = APIRouter(tags=["Segregation Intelligence"])

@router.get("/api/segregation")
def get_segregation():
    """
    Step 5: Segregation Intelligence
    Wet %: 46%, Dry %: 31%, Mixed %: 23%, Segregation score: 62/100
    Zone D: Mixed waste = 41% 🔴 Poor segregation
    EcoAgent diagnosis: "Mixed waste increased from 32% to 41% during the last four weeks."
    """
    return get_segregation_analysis()

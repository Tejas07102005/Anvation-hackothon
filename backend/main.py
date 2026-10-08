"""
EcoCity AI — Municipal Solid Waste Intelligence Backend (FastAPI)
Implements all four integration roles:
- Member 1: Dashboard, Zones, Alerts, Vehicles, Landfill
- Member 2: Forecasting, Risk Engine, Historical, Realtime Telemetry
- Member 3: Vehicle Optimization, Route Optimization, What-If Simulator
- Member 4: EcoAgent Operational Engine (10 Tools + Judge Q&A), Collection, Segregation
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.zones import router as zones_router
from backend.api.vehicles import router as vehicles_router
from backend.api.forecast import router as forecast_router
from backend.api.landfill import router as landfill_router
from backend.api.collection import router as collection_router
from backend.api.segregation import router as segregation_router
from backend.api.dashboard import router as dashboard_router
from backend.api.agent import router as agent_router

app = FastAPI(
    title="EcoCity AI Operational Platform API",
    description="Autonomous municipal solid waste command center, predictive modeling, route optimization, and operational agent.",
    version="2.0.0"
)

# Enable CORS for local Vite dev frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routers
app.include_router(zones_router)
app.include_router(vehicles_router)
app.include_router(forecast_router)
app.include_router(landfill_router)
app.include_router(collection_router)
app.include_router(segregation_router)
app.include_router(dashboard_router)
app.include_router(agent_router)

@app.get("/")
def root():
    return {
        "platform": "EcoCity AI Municipal Solid Waste Command Center",
        "status": "ONLINE",
        "version": "2.0.0",
        "docs_url": "/docs",
        "modules": {
            "Member 1 (Frontend & Operations)": ["/api/dashboard", "/api/zones", "/api/alerts", "/api/vehicles", "/api/landfill"],
            "Member 2 (Data & AI Engine)": ["/api/forecast", "/api/risk", "/api/historical", "/api/realtime"],
            "Member 3 (Optimization)": ["/api/optimize/vehicles", "/api/optimize/routes", "/api/simulate"],
            "Member 4 (EcoAgent & Operations)": ["/api/agent", "/api/collection", "/api/segregation", "/api/landfill", "/api/alerts"]
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

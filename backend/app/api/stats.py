"""
KisanRakshak – Stats Router (Phase 2 Placeholder)
===================================================
GET /api/v1/stats

Basic summary statistics for the admin dashboard.
Full analytics will be implemented in Phase 2.
"""
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.observation import Observation

router = APIRouter(prefix="/stats", tags=["Statistics"])


class StatsResponse(BaseModel):
    success: bool
    total_observations: int
    total_crops: int
    total_diseases: int


@router.get(
    "",
    response_model=StatsResponse,
    summary="Get Summary Statistics",
)
def get_stats(db: Session = Depends(get_db)) -> StatsResponse:
    """
    Return basic summary statistics from the observations table.

    Full analytics (time series, region breakdown, disease trends)
    will be added in Phase 2.
    """
    total_observations = db.query(func.count(Observation.id)).scalar() or 0
    total_crops = db.query(func.count(func.distinct(Observation.crop))).scalar() or 0
    total_diseases = db.query(func.count(func.distinct(Observation.disease))).scalar() or 0

    return StatsResponse(
        success=True,
        total_observations=total_observations,
        total_crops=total_crops,
        total_diseases=total_diseases,
    )

"""
KisanRakshak – Hotspots Router (Phase 2 Placeholder)
======================================================
GET /api/v1/hotspots

Disease hotspot clustering using ST_ClusterDBSCAN will be implemented
in Phase 2.  This placeholder keeps the routing structure in place so
the frontend can reference the endpoint without errors.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/hotspots", tags=["Hotspots"])


class HotspotResponse(BaseModel):
    success: bool
    message: str
    hotspots: List = []


@router.get(
    "",
    response_model=HotspotResponse,
    summary="Get Disease Hotspots (Phase 2)",
)
def get_hotspots() -> HotspotResponse:
    """
    **Phase 2 endpoint — not yet implemented.**

    Will return geospatial disease hotspot clusters computed via
    ``ST_ClusterDBSCAN`` across recent observations.
    """
    return HotspotResponse(
        success=True,
        message="Hotspot clustering will be implemented in Phase 2.",
        hotspots=[],
    )

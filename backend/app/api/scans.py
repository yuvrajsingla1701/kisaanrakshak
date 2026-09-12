"""
KisanRakshak – Scans Router
=============================
GET /api/v1/scans/history

Returns the scan history for the authenticated farmer, newest first.
Authentication is optional in Phase 1 — if a Bearer token is provided
the results are filtered to that user; otherwise all scans are returned
(useful for early testing before auth is wired up in the frontend).
"""
import logging
from typing import Optional

from fastapi import APIRouter, Depends, Query, Header
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.database import get_db
from app.models.observation import Observation
from app.schemas.observation import ScanHistoryResponse, ObservationOut

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/scans", tags=["Scans"])


@router.get(
    "/history",
    response_model=ScanHistoryResponse,
    summary="Get Scan History",
)
def get_scan_history(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(default=None),
    limit: int = Query(50, ge=1, le=200, description="Max records to return"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
) -> ScanHistoryResponse:
    """
    Retrieve crop scan observations, newest first.

    If a valid Bearer token is supplied the results are scoped to
    the authenticated user.  Without a token all observations are
    returned (Phase 1 convenience — lock this down in Phase 2).
    """
    user_id: Optional[str] = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]
        payload = decode_access_token(token)
        if payload:
            user_id = payload.get("sub")

    query = db.query(Observation)
    if user_id:
        query = query.filter(Observation.user_id == user_id)

    total = query.count()
    scans = (
        query.order_by(Observation.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    logger.info(
        "Scan history requested — user_id=%s total=%d returning=%d",
        user_id, total, len(scans),
    )

    return ScanHistoryResponse(
        success=True,
        total=total,
        scans=[ObservationOut.model_validate(s) for s in scans],
    )

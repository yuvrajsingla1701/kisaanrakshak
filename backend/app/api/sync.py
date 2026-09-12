"""
KisanRakshak – Sync Router
============================
POST /api/v1/sync

Accepts a batch of offline observations from the frontend/device and
stores them idempotently using ``client_uuid`` as the deduplication key.

This endpoint is the heart of the offline-first architecture.
The frontend stores scans locally (IndexedDB / localStorage) and retries
sending them when connectivity returns.  Sending the same batch twice is
safe — duplicates are detected and skipped.
"""
import logging
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.database import get_db
from app.models.observation import Observation
from app.schemas.observation import SyncRequest, SyncResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/sync", tags=["Sync"])


def _get_optional_user_id(authorization: Optional[str]) -> Optional[str]:
    """Extract user UUID from Bearer token if present, else return None."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ", 1)[1]
    payload = decode_access_token(token)
    return payload.get("sub") if payload else None


@router.post(
    "",
    response_model=SyncResponse,
    summary="Batch Sync Observations (Offline-first)",
    status_code=status.HTTP_200_OK,
)
def sync_observations(
    body: SyncRequest,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(default=None),
) -> SyncResponse:
    """
    Accept a batch of observations from the device.

    * Validates each observation.
    * Inserts new records into ``observations``.
    * Skips records whose ``client_uuid`` already exists (idempotent).
    * Returns counts: received, inserted, duplicates, errors.
    """
    user_id = _get_optional_user_id(authorization)
    received = len(body.observations)
    inserted = 0
    duplicates = 0
    errors = 0

    logger.info(
        "Sync request received — %d observation(s), user_id=%s",
        received,
        user_id,
    )

    for obs_in in body.observations:
        try:
            # Build location WKT for PostGIS (if coordinates provided)
            location_wkt: Optional[str] = None
            if obs_in.latitude is not None and obs_in.longitude is not None:
                location_wkt = f"POINT({obs_in.longitude} {obs_in.latitude})"

            obs = Observation(
                client_uuid=obs_in.client_uuid,
                user_id=user_id,
                crop=obs_in.crop,
                disease=obs_in.disease,
                confidence=obs_in.confidence,
                latitude=obs_in.latitude,
                longitude=obs_in.longitude,
                location=location_wkt,
                captured_at=obs_in.captured_at,
                synced_at=datetime.now(timezone.utc),
            )
            db.add(obs)
            db.flush()   # Detect constraint violations early, per record
            inserted += 1
            logger.debug("Inserted observation client_uuid=%s", obs_in.client_uuid)

        except IntegrityError:
            db.rollback()
            duplicates += 1
            logger.debug("Duplicate skipped: client_uuid=%s", obs_in.client_uuid)

        except Exception as exc:
            db.rollback()
            errors += 1
            logger.error(
                "Error inserting observation client_uuid=%s: %s",
                obs_in.client_uuid,
                exc,
            )

    logger.info(
        "Sync complete — received=%d inserted=%d duplicates=%d errors=%d",
        received, inserted, duplicates, errors,
    )

    return SyncResponse(
        success=True,
        received=received,
        inserted=inserted,
        duplicates=duplicates,
        errors=errors,
    )

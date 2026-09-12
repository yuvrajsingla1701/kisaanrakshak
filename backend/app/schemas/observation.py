"""
KisanRakshak – Observation Pydantic Schemas
=============================================
Request / response models for the sync and scan history endpoints.
"""
import uuid
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


# ── Single observation input ──────────────────────────────────────────────────

class ObservationIn(BaseModel):
    """
    A single observation record sent from the frontend / mobile device.

    ``client_uuid`` is generated on the device and must be unique.
    The backend uses it to detect and skip duplicate records during
    offline-sync retries.
    """
    client_uuid: str = Field(
        ...,
        min_length=8,
        max_length=64,
        description="Device-generated unique ID for idempotent sync",
    )
    crop: str = Field(..., min_length=1, max_length=100)
    disease: str = Field(..., min_length=1, max_length=200)
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0)
    latitude: Optional[float] = Field(None, ge=-90.0, le=90.0)
    longitude: Optional[float] = Field(None, ge=-180.0, le=180.0)
    captured_at: Optional[datetime] = None


# ── Sync request / response ───────────────────────────────────────────────────

class SyncRequest(BaseModel):
    """Body for POST /api/v1/sync."""
    observations: List[ObservationIn] = Field(..., min_length=1)


class SyncResponse(BaseModel):
    """Response body for POST /api/v1/sync."""
    success: bool
    received: int
    inserted: int
    duplicates: int
    errors: int = 0


# ── Scan history ──────────────────────────────────────────────────────────────

class ObservationOut(BaseModel):
    """A single observation returned in scan history."""
    id: uuid.UUID
    client_uuid: str
    crop: str
    disease: str
    confidence: Optional[float]
    latitude: Optional[float]
    longitude: Optional[float]
    captured_at: Optional[datetime]
    synced_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}


class ScanHistoryResponse(BaseModel):
    """Response body for GET /api/v1/scans/history."""
    success: bool
    total: int
    scans: List[ObservationOut]

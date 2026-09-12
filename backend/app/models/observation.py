"""
KisanRakshak – Observation ORM Model
======================================
Stores a single crop-disease scan/observation made by a farmer.

Offline-first design notes
---------------------------
``client_uuid`` is a client-generated UUID sent with every observation.
It has a UNIQUE constraint so that the /api/v1/sync endpoint can safely
call ``INSERT … ON CONFLICT DO NOTHING`` and handle retries idempotently.

PostGIS
-------
The ``location`` column uses GeoAlchemy2's ``Geography(Point, 4326)`` type.
This requires the ``postgis`` extension to be enabled in PostgreSQL.

The Alembic migration runs ``CREATE EXTENSION IF NOT EXISTS postgis`` so
this happens automatically on ``alembic upgrade head``.

If PostGIS is unavailable in a dev environment the column simply stores
NULL – the separate ``latitude`` / ``longitude`` float columns are always
populated and can be used as a fallback.
"""
import uuid
from datetime import datetime, timezone
from typing import Optional

import sqlalchemy as sa
from geoalchemy2 import Geography
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Observation(Base):
    __tablename__ = "observations"

    # ── Primary key ────────────────────────────────────────────────────────
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=sa.text("gen_random_uuid()"),
    )

    # ── Offline-sync deduplication key ────────────────────────────────────
    client_uuid: Mapped[str] = mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
        index=True,
        comment="Client-generated UUID for idempotent offline sync",
    )

    # ── Foreign key to user ───────────────────────────────────────────────
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        sa.ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # ── Scan data ─────────────────────────────────────────────────────────
    crop: Mapped[str] = mapped_column(sa.String(100), nullable=False)
    disease: Mapped[str] = mapped_column(sa.String(200), nullable=False)
    confidence: Mapped[Optional[float]] = mapped_column(
        sa.Float, nullable=True,
        comment="Model confidence score 0.0–1.0",
    )

    # ── Geolocation ───────────────────────────────────────────────────────
    latitude: Mapped[Optional[float]] = mapped_column(sa.Float, nullable=True)
    longitude: Mapped[Optional[float]] = mapped_column(sa.Float, nullable=True)

    # PostGIS GEOGRAPHY point – populated from lat/lon during sync.
    # Requires PostGIS extension.  Nullable so app works without PostGIS.
    location: Mapped[Optional[object]] = mapped_column(
        Geography(geometry_type="POINT", srid=4326),
        nullable=True,
        comment="PostGIS GEOGRAPHY point derived from latitude/longitude",
    )

    # ── Timestamps ────────────────────────────────────────────────────────
    captured_at: Mapped[Optional[datetime]] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=True,
        comment="When the scan was captured on the device",
    )
    synced_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        server_default=sa.text("NOW()"),
        comment="When the backend received and stored the observation",
    )
    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        server_default=sa.text("NOW()"),
    )

    # ── Spatial index ─────────────────────────────────────────────────────
    __table_args__ = (
        sa.Index(
            "ix_observations_location_gist",
            "location",
            postgresql_using="gist",
        ),
    )

    def __repr__(self) -> str:
        return (
            f"<Observation id={self.id} crop={self.crop!r} "
            f"disease={self.disease!r} client_uuid={self.client_uuid!r}>"
        )

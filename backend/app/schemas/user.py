"""
KisanRakshak – User Pydantic Schemas
======================================
Request / response models for user and authentication endpoints.
"""
import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_validator


# ── Request schemas ───────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    """Credentials for POST /api/v1/auth/login."""
    phone: str
    password: str


class UserCreate(BaseModel):
    """Body for creating a new user (admin operation)."""
    name: str
    phone: str
    password: str
    role: str = "farmer"

    @field_validator("role")
    @classmethod
    def role_must_be_valid(cls, v: str) -> str:
        if v not in ("farmer", "admin"):
            raise ValueError("role must be 'farmer' or 'admin'")
        return v


# ── Response schemas ──────────────────────────────────────────────────────────

class UserOut(BaseModel):
    """Public user representation returned by the API."""
    id: uuid.UUID
    name: str
    phone: str
    role: str
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    """JWT token response."""
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class TokenPayload(BaseModel):
    """Decoded JWT payload."""
    sub: Optional[str] = None
    role: Optional[str] = None

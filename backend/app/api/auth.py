"""
KisanRakshak – Auth Router
============================
POST /api/v1/auth/login  — exchange phone + password for a JWT.

Phase 1: minimal implementation.  No OTP, no refresh tokens, no OAuth.
"""
import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, Token, UserOut

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/login",
    response_model=Token,
    summary="Farmer / Admin Login",
    responses={
        401: {"description": "Invalid credentials"},
    },
)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> Token:
    """
    Authenticate with phone number and password.

    Returns a JWT ``access_token`` that must be sent as
    ``Authorization: Bearer <token>`` on protected endpoints.
    """
    logger.info("Login attempt for phone: %s", payload.phone)

    user: User | None = db.query(User).filter(User.phone == payload.phone).first()

    if user is None or not verify_password(payload.password, user.password_hash):
        logger.warning("Failed login attempt for phone: %s", payload.phone)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(subject=str(user.id), role=user.role)
    logger.info("Successful login for user %s (role: %s)", user.id, user.role)

    return Token(
        access_token=token,
        token_type="bearer",
        user=UserOut.model_validate(user),
    )

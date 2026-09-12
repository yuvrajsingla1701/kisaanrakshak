"""
KisanRakshak – SQLAlchemy Declarative Base
============================================
All ORM models must inherit from ``Base`` defined here.
Import this module in alembic/env.py so Alembic can auto-detect models.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Shared declarative base for all KisanRakshak ORM models."""
    pass

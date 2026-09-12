"""
KisanRakshak – Database Connection & Session
==============================================
Creates the SQLAlchemy engine and provides a ``get_db`` FastAPI dependency
that yields a transactional database session.

PostGIS notes
-------------
* GeoAlchemy2 is imported so that the ``GEOGRAPHY`` type is registered with
  SQLAlchemy's type system.  This must happen before any model that uses it is
  imported.
* The PostGIS extension itself must be enabled in PostgreSQL once with:
      CREATE EXTENSION IF NOT EXISTS postgis;
  The Alembic migration handles this automatically.
"""
import logging

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

logger = logging.getLogger(__name__)

# ── Engine ────────────────────────────────────────────────────────────────────
engine = create_engine(
    settings.database_url,
    echo=settings.debug,          # Log SQL statements in debug mode
    pool_pre_ping=True,           # Verify connections before use
    pool_size=5,
    max_overflow=10,
)

# ── Session factory ───────────────────────────────────────────────────────────
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


# ── FastAPI dependency ────────────────────────────────────────────────────────
def get_db() -> Session:
    """
    Yield a database session, then close it after the request finishes.

    Usage in a route::

        @router.get("/example")
        def example(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


# ── Connection health check ───────────────────────────────────────────────────
def check_db_connection() -> bool:
    """Return True if the database is reachable, False otherwise."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as exc:
        logger.error("Database connection failed: %s", exc)
        return False

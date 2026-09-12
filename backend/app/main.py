"""
KisanRakshak – FastAPI Application Entry Point
===============================================
Start with:
    uvicorn app.main:app --reload

Swagger UI:  http://localhost:8000/docs
ReDoc:       http://localhost:8000/redoc
"""
import logging
import sys

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.db.database import check_db_connection

# ── Routers ───────────────────────────────────────────────────────────────────
from app.api import auth, sync, scans, hotspots, stats

# ── Logging configuration ─────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.project_name,
    description=(
        "Backend API for KisanRakshak — an offline-first crop disease "
        "detection and reporting system for Indian farmers (SIH Prototype)."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the React/Vite frontend (port 3000) during development.
# In production, restrict to the real domain via FRONTEND_URL env var.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Global error handler ──────────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Catch-all handler that returns a clean JSON error without leaking
    stack traces or internal details to the client.
    """
    logger.error("Unhandled exception on %s %s: %s", request.method, request.url, exc)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "An internal server error occurred. Please try again.",
        },
    )

# ── API Routers ───────────────────────────────────────────────────────────────
prefix = settings.api_v1_prefix   # /api/v1

app.include_router(auth.router,     prefix=prefix)
app.include_router(sync.router,     prefix=prefix)
app.include_router(scans.router,    prefix=prefix)
app.include_router(hotspots.router, prefix=prefix)
app.include_router(stats.router,    prefix=prefix)

# ── Root endpoints ────────────────────────────────────────────────────────────
@app.get("/", tags=["Root"], summary="API Root")
def root() -> dict:
    """Confirm the API is running."""
    return {"message": "KisanRakshak API is running"}


@app.get("/health", tags=["Root"], summary="Health Check")
def health() -> dict:
    """
    Health check endpoint.

    Returns ``status: healthy`` when the API is up.
    Also reports database connectivity so the team can quickly diagnose
    connection issues during the SIH demo.
    """
    db_ok = check_db_connection()
    return {
        "status": "healthy",
        "database": "connected" if db_ok else "unreachable",
    }


# ── Startup event ─────────────────────────────────────────────────────────────
@app.on_event("startup")
def on_startup() -> None:
    logger.info("═══════════════════════════════════════════════")
    logger.info("  %s  starting up", settings.project_name)
    logger.info("  API prefix : %s", settings.api_v1_prefix)
    logger.info("  CORS origin: %s", settings.frontend_url)
    logger.info("  Debug mode : %s", settings.debug)
    logger.info("═══════════════════════════════════════════════")

    db_ok = check_db_connection()
    if db_ok:
        logger.info("✅ Database connection: OK")
    else:
        logger.warning("⚠️  Database connection: FAILED — check DATABASE_URL in .env")

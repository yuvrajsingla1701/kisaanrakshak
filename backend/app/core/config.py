"""
KisanRakshak – Application Configuration
=========================================
All configuration is loaded from environment variables (via .env file).
Never hard-code secrets or credentials here.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Project ──────────────────────────────────────────────────────────────
    project_name: str = "KisanRakshak API"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False

    # ── Database ──────────────────────────────────────────────────────────────
    database_url: str = "postgresql+psycopg://postgres:password@localhost:5432/kisanrakshak"

    # ── Security ──────────────────────────────────────────────────────────────
    secret_key: str = "changeme"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Frontend runs on port 3000 (vite.config.js → server.port: 3000)
    frontend_url: str = "http://localhost:3000"


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance. Use as a FastAPI dependency."""
    return Settings()


# Convenience singleton used by modules that don't use dependency injection
settings = get_settings()

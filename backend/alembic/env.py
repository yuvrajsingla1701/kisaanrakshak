"""
Alembic Environment — KisanRakshak
====================================
Reads DATABASE_URL from the .env file via the app settings so that the
migration URL is always consistent with the running application and is
never hard-coded in version control.
"""
import os
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool, text
from dotenv import load_dotenv

# ── Make sure ``app`` package is importable from the backend/ directory ───────
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load .env so DATABASE_URL is available
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# ── Import all models so Alembic can detect them ─────────────────────────────
# This must happen BEFORE target_metadata is set.
from app.db.base import Base          # noqa: F401 – registers Base
from app.models.user import User      # noqa: F401 – registers User table
from app.models.observation import Observation  # noqa: F401 – registers Observation table

# ── Alembic config object ─────────────────────────────────────────────────────
config = context.config

# Override the sqlalchemy.url from alembic.ini with the real env var
database_url = os.environ.get("DATABASE_URL")
if not database_url:
    raise RuntimeError(
        "DATABASE_URL environment variable is not set. "
        "Copy .env.example to .env and fill in your database credentials."
    )
config.set_main_option("sqlalchemy.url", database_url)

# Logging configuration from alembic.ini
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Target metadata for --autogenerate
target_metadata = Base.metadata


# ── Helpers ───────────────────────────────────────────────────────────────────

def run_migrations_offline() -> None:
    """Run migrations without a live DB connection (generates SQL script)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations against a live database connection."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        # Enable the PostGIS extension before any migration runs.
        # CREATE EXTENSION IF NOT EXISTS is safe to run repeatedly.
        try:
            connection.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
            connection.execute(text("CREATE EXTENSION IF NOT EXISTS pgcrypto"))
            connection.commit()
        except Exception as exc:
            # PostGIS may not be installed in all dev environments.
            # Log a warning and continue — the migration will still work,
            # but the location column will be unavailable.
            import logging
            logging.getLogger("alembic.env").warning(
                "Could not enable PostGIS/pgcrypto extensions: %s. "
                "The 'location' column will remain NULL until PostGIS is installed.",
                exc,
            )
            connection.rollback()

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

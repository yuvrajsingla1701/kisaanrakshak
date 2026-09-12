# KisanRakshak – Backend API

FastAPI + PostgreSQL/PostGIS backend for the KisanRakshak SIH prototype.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI 0.115 |
| Server | Uvicorn |
| Database | PostgreSQL 15+ with PostGIS |
| ORM | SQLAlchemy 2 |
| Migrations | Alembic |
| Geospatial | GeoAlchemy2 |
| Auth | JWT (python-jose) + bcrypt (passlib) |
| Config | Pydantic Settings + python-dotenv |

---

## Prerequisites

- **Python 3.11+**
- **PostgreSQL 15+** with the **PostGIS** extension
- (Optional) `pgAdmin` or `psql` for database inspection

---

## 1. Create a Virtual Environment

```bash
# From the backend/ directory
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

---

## 2. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Open `.env` and fill in your values:

```env
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/kisanrakshak
SECRET_KEY=generate_a_long_random_string_here
ACCESS_TOKEN_EXPIRE_MINUTES=60
FRONTEND_URL=http://localhost:3000
DEBUG=true
```

Generate a secure `SECRET_KEY`:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## 4. Set Up PostgreSQL

### Create the database

```sql
-- In psql or pgAdmin
CREATE DATABASE kisanrakshak;
```

### Enable PostGIS (once per database)

```sql
\c kisanrakshak
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

> **Note:** The Alembic migration also runs `CREATE EXTENSION IF NOT EXISTS postgis`
> automatically on `alembic upgrade head`, so you may not need this step manually.

---

## 5. Run Database Migrations

```bash
# From the backend/ directory (where alembic.ini lives)
alembic revision --autogenerate -m "initial schema"
alembic upgrade head
```

Verify the tables were created:
```bash
# In psql
\c kisanrakshak
\dt
```

You should see:
- `users`
- `observations`
- `alembic_version`

---

## 6. Start the Backend

```bash
# Development (auto-reload on file changes)
uvicorn app.main:app --reload

# Specific host/port
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 7. API Endpoints

Base URL: `http://localhost:8000`
API prefix: `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API running check |
| GET | `/health` | Health + DB connectivity check |
| POST | `/api/v1/auth/login` | Farmer/admin login → JWT |
| POST | `/api/v1/sync` | Offline sync batch observations |
| GET | `/api/v1/scans/history` | Scan history (paginated) |
| GET | `/api/v1/hotspots` | Disease hotspots (Phase 2) |
| GET | `/api/v1/stats` | Summary statistics |

---

## 8. Interactive API Documentation

| Tool | URL |
|---|---|
| **Swagger UI** | http://localhost:8000/docs |
| **ReDoc** | http://localhost:8000/redoc |

---

## 9. Test Key Endpoints

```bash
# Root
curl http://localhost:8000/

# Health check (includes DB status)
curl http://localhost:8000/health

# Sync observations (no auth required in Phase 1)
curl -X POST http://localhost:8000/api/v1/sync \
  -H "Content-Type: application/json" \
  -d '{
    "observations": [
      {
        "client_uuid": "test-device-001",
        "crop": "Tomato",
        "disease": "Late Blight",
        "confidence": 0.94,
        "latitude": 20.59,
        "longitude": 78.96,
        "captured_at": "2026-09-11T10:30:00Z"
      }
    ]
  }'

# Scan history
curl http://localhost:8000/api/v1/scans/history

# Stats
curl http://localhost:8000/api/v1/stats
```

---

## 10. Backend Structure

```
backend/
├── app/
│   ├── main.py               # FastAPI app, CORS, routers, health
│   ├── core/
│   │   ├── config.py         # Pydantic Settings (reads .env)
│   │   └── security.py       # bcrypt hashing + JWT utilities
│   ├── db/
│   │   ├── base.py           # SQLAlchemy DeclarativeBase
│   │   └── database.py       # Engine, SessionLocal, get_db dependency
│   ├── models/
│   │   ├── user.py           # User ORM model
│   │   └── observation.py    # Observation ORM model (PostGIS-ready)
│   ├── schemas/
│   │   ├── user.py           # Pydantic schemas for auth
│   │   └── observation.py    # Pydantic schemas for sync/history
│   └── api/
│       ├── auth.py           # POST /api/v1/auth/login
│       ├── sync.py           # POST /api/v1/sync
│       ├── scans.py          # GET  /api/v1/scans/history
│       ├── hotspots.py       # GET  /api/v1/hotspots  (Phase 2)
│       └── stats.py          # GET  /api/v1/stats
├── alembic/
│   ├── env.py                # Alembic config (reads DATABASE_URL)
│   ├── script.py.mako        # Migration template
│   └── versions/             # Auto-generated migration files
├── alembic.ini               # Alembic settings
├── requirements.txt
├── .env.example
└── README.md
```

---

## 11. Phase 2 (Not Yet Implemented)

- `ST_ClusterDBSCAN` hotspot detection
- Image upload + AI model inference
- Bhashini voice API
- Admin dashboard analytics
- WebSockets / SSE for real-time alerts
- Government heatmap

---

## Notes

- **Offline-first sync**: `client_uuid` in observations has a UNIQUE constraint.
  The frontend can safely re-send the same batch — duplicates are silently skipped.
- **PostGIS**: The `observations.location` GEOGRAPHY column is ready for
  spatial queries. If PostGIS is not installed, the column stores NULL and
  lat/lon floats are used instead.
- **Security**: Never commit your `.env` file. Add it to `.gitignore`.

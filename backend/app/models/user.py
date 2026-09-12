"""
KisanRakshak – User ORM Model
===============================
Represents a farmer or admin registered in the system.

Fields
------
id          UUID primary key (server-generated)
name        Full name of the user
phone       Mobile number (unique, used for login)
role        Enum: 'farmer' | 'admin'
password_hash  bcrypt hash – never store plaintext passwords
created_at  Timestamp of registration
"""
import uuid
from datetime import datetime, timezone

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class UserRole(str):
    """Simple role constants."""
    FARMER = "farmer"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=sa.text("gen_random_uuid()"),
    )
    name: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    phone: Mapped[str] = mapped_column(sa.String(20), unique=True, nullable=False, index=True)
    role: Mapped[str] = mapped_column(
        sa.String(20),
        nullable=False,
        default=UserRole.FARMER,
        server_default="farmer",
    )
    password_hash: Mapped[str] = mapped_column(sa.Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        server_default=sa.text("NOW()"),
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} phone={self.phone} role={self.role}>"

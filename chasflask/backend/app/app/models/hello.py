# Import standard library packages
from datetime import datetime

# Import installed packages
from sqlalchemy import Column, Integer, DateTime, String
from sqlalchemy.orm import relationship

# Import app code
from app.db.base_class import Base
from app.models.base_relations import users_roles


class Hello():
    title = ""
    description = ""

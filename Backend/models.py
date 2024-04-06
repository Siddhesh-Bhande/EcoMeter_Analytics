from sqlalchemy import Column, Integer, String, TIMESTAMP, JSON
from dbconnection import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password_hashed = Column(String(100))
    fullname = Column(String(100))
    created_at = Column(TIMESTAMP)
    filters = Column(JSON)

class EnergyData(Base):
    __tablename__ = "energy_consumption"

    data_id = Column(Integer, primary_key=True)  # Matches the AUTO_INCREMENT
    recorded_time = Column(String(100), index=True)  # Name and type aligned with your table
    consumption = Column(Integer, nullable=True)  # Type changed to Integer, allowing null
    generation = Column(Integer)  # Type changed to Integer
    energy_source = Column(String(20), nullable=True)  # Length adjusted, allowing null
    state = Column(String(20), nullable=True)  # Length adjusted, allowing null   
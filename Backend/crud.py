from sqlalchemy.orm import Session
import models
from sqlalchemy import cast, Date
from datetime import datetime, timedelta

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# def get_energy_data(db: Session):
#     return db.query(models.EnergyData).all()


# def get_energy_data(db: Session, states: list = None, sources: list = None):
#     query = db.query(models.EnergyData)
#     if states:
#         query = query.filter(models.EnergyData.state.in_(states))
#     if sources:
#         query = query.filter(models.EnergyData.energy_source.in_(sources))
#     return query.all()

def get_energy_data(db: Session, states: list = None, sources: list = None, start_date: datetime = None, end_date: datetime = None):
    query = db.query(models.EnergyData)
    
    if states:
        query = query.filter(models.EnergyData.state.in_(states))
    if sources:
        query = query.filter(models.EnergyData.energy_source.in_(sources))
    if start_date:
        query = query.filter(cast(models.EnergyData.recorded_time, Date) >= start_date)
    if end_date:
        query = query.filter(cast(models.EnergyData.recorded_time, Date) <= end_date)
    
    return query.all()

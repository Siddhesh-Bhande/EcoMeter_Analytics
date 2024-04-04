from sqlalchemy.orm import Session
import models

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_energy_data(db: Session):
    return db.query(models.EnergyData).all()
from sqlalchemy.orm import Session
import models

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# def get_energy_data(db: Session):
#     return db.query(models.EnergyData).all()


def get_energy_data(db: Session, states: list = None, sources: list = None):
    query = db.query(models.EnergyData)
    if states:
        query = query.filter(models.EnergyData.state.in_(states))
    if sources:
        query = query.filter(models.EnergyData.energy_source.in_(sources))
    return query.all()

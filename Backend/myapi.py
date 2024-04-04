from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, models, dbconnection

models.Base.metadata.create_all(bind=dbconnection.engine)

app = FastAPI()

# Dependency
def get_db():
    db = dbconnection.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/{username}")
def read_user(username: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

#To get entire energy data
@app.get("/get-energy-data")
def get_energy_data(db: Session = Depends(get_db)):
    energy_data = crud.get_energy_data(db)
    if energy_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return energy_data
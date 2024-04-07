from fastapi import FastAPI, Depends, HTTPException, Security, status
from sqlalchemy.orm import Session
import crud, models, dbconnection
import bcrypt
from datetime import datetime, timedelta
from starlette.middleware.cors import CORSMiddleware
from typing import List
from fastapi import Query
import uvicorn
from jwt import PyJWTError, decode
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from pydantic import BaseModel
from typing import Optional  # Make sure List is imported from typing

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=dbconnection.engine)

def hash_password(password: str) -> str:
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

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

# @app.get("/get-energy-data")
# def get_energy_data(states: List[str] = Query(None), sources: List[str] = Query(None), db: Session = Depends(get_db)):
#     energy_data = crud.get_energy_data(db, states=states, sources=sources)
#     if energy_data is None:
#         raise HTTPException(status_code=404, detail="Data not found")
#     return energy_data

@app.get("/get-energy-data")
def get_energy_data(
    states: List[str] = Query(None),
    sources: List[str] = Query(None),
    startDate: Optional[str] = None,
    endDate: Optional[str] = None,
    db: Session = Depends(get_db)):
    
    energy_data = crud.get_energy_data(db, states=states, sources=sources, start_date=startDate, end_date=endDate)
    if energy_data is None:
        raise HTTPException(
            status_code=404, detail="Data not found"
        )
    return energy_data

@app.post("/users/")
def create_user(username: str, email: str, password: str, fullname: str, db: Session = Depends(get_db)):
    hashed_password = hash_password(password)
    user_instance = models.User(
        username=username,
        email=email,
        password_hashed=hashed_password,
        fullname=fullname,
        filters='{}'
    )
    db.add(user_instance)
    db.commit()
    db.refresh(user_instance)
    return {"username": username, "email": email, "fullname": fullname}

def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user(db, username=username)
    if not user:
        return False
    if not verify_password(password, user.password_hashed):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

class FilterUpdateRequest(BaseModel):
    filters: dict

def get_current_username(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except jwt.PyJWTError:
        raise credentials_exception

@app.post("/update-user-filters/")
def update_user_filters(
    request: FilterUpdateRequest, 
    db: Session = Depends(get_db), 
    username: str = Depends(get_current_username)
):
    user = crud.get_user(db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.filters = request.filters
    db.commit()
    return {"msg": "Filters updated successfully"}

@app.get("/get-user-filters")
def get_user_filters(
    db: Session = Depends(get_db), 
    username: str = Depends(get_current_username)
):
    user = crud.get_user(db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {user.filters}

@app.get("/get-user-filters")
def get_user_filters(
    db: Session = Depends(get_db), 
    username: str = Depends(get_current_username)
):
    user = crud.get_user(db, username=username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user.filters
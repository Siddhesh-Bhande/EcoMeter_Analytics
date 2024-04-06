from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, models, dbconnection
import bcrypt
from datetime import datetime
from starlette.middleware.cors import CORSMiddleware
import uvicorn

from fastapi import APIRouter, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# If you haven't already, you might need to install PyJWT or another library to work with JWT for token generation
import jwt
from datetime import datetime, timedelta

# Assuming you have a secret key for JWT token encoding
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# You can replace OAuth2PasswordBearer with a more appropriate security scheme if needed
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Allow requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=dbconnection.engine)

def hash_password(password: str) -> str:
    # Ensure password is encoded to bytes
    password_bytes = password.encode('utf-8')
    # Generate a salt
    salt = bcrypt.gensalt()
    # Hash the password
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    # Return the hashed password as a string for storing in the database
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Check if the plain password, when hashed, matches the stored hashed password
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

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

@app.post("/users/")
def create_user(username: str, email: str, password: str, fullname: str, db: Session = Depends(get_db)):
    # Hash the password
    hashed_password = hash_password(password)
    # Create new user instance
    user_instance = models.User(
        username=username,
        email=email,
        password_hashed=hashed_password,
        fullname=fullname,
        filters='{}'
    )
    # Add the new user to the session and commit
    db.add(user_instance)
    db.commit()
    db.refresh(user_instance)
    return {"username": username, "email": email, "fullname": fullname}



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


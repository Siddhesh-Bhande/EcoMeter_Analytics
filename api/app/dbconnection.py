from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

SQLALCHEMY_DATABASE_URL = "mysql://sid1:dbpassword@localhost:3306/renewable_energy_app"
# # Connection strings
# DOCKER_CONN_STR = "mysql+mysqlconnector://sid1:dbpassword@db/renewable_energy_data"
# LOCAL_CONN_STR = "mysql+mysqlconnector://sid1:dbpassword@host.docker.internal/mydatabase"

# # Try to connect using the Docker connection string
# try:
#     engine = create_engine(DOCKER_CONN_STR)
#     # Attempt to connect or perform an operation that requires connection
#     connection = engine.connect()
#     print("Connected using Docker connection string.")
# except OperationalError:
#     # If connection fails, try the local connection string
#     try:
#         engine = create_engine(LOCAL_CONN_STR)
#         connection = engine.connect()
#         print("Connected using local connection string.")
#     except OperationalError:
#         print("Failed to connect using both connection strings.")


engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

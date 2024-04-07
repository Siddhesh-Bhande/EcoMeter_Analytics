# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the necessary Python packages
RUN pip install fastapi sqlalchemy pydantic bcrypt uvicorn mysqlclient PyJWT

# Command to run the application
CMD ["uvicorn", "myapi:app", "--host", "127.0.0.1", "--reload"]

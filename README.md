# Renewable Energy Data Visualization with User Authentication

### Objective

This web application visualizes energy consumption and generation data, providing secure user access. It allows users to register, log in, and gain personalized insights into renewable energy usage and trends, leveraging mock hourly consumption and generation data.

## Getting Started

### Prerequisites

1. MySQL server must be installed and running.
2. Node.js and npm should be installed for the front end.
3. Python must be installed to run the backend API.

### Setup Instructions

#### Database Initialization:

Navigate to the MySQL server and import the SQL file from the initdb directory.

#### Backend API:

Inside the Backend directory, install the required Python packages:

Run commands - 
pip install -r Requirements.txt

Start the API service with Uvicorn:

Run command - uvicorn main:app --reload

#### Frontend Application:

In the sidtrace directory, install the necessary npm packages:

Run command -
npm install

Run the React app:
npm start

#### API Documentation

After running the FastAPI backend, visit /docs for interactive API documentation, where you can test and understand the various API endpoints and their expected payloads.

## Technology Stack

- Frontend: React.js
- Backend: Python with FastAPI
- Database: MySQL
- Visualization Libraries: charts.js, react-charts-js

# Project Structure

## Frontend Components (/src)

Poster.js: Display header poster image.
Profile.js: User profile information.
Tagline.js: Application tagline display.
User Authentication: (/Components/User)
AuthContext.js: React context for user authentication.
LoginForm.js: Component for user login form.
Register.js: User registration form component.
Visualizations: (/Components/Visualisations)

EnergyCharts:
EnergyDoughnut.js: Doughnut chart for energy distribution.
EnergyStackedBarChart.js: Stacked bar chart for comparative energy data.
RE_BarChart.js: Specialized bar chart for renewable energy data.

## Backend API (/Backend)

FastAPI Endpoints:
User authentication, registration, and token generation.
Energy data retrieval with filter capabilities.
User favorite visualization updates.

## Features

### User Authentication

- User registration and login functionality.
- Secure password hashing with the bcrypt library in Python.
- JWT (JSON Web Tokens) for authenticated sessions post-login.

### Front-End

- Responsive user interface developed with React.
- Dashboard access post-login for data visualization interaction.
- User registration and login forms.
- Dynamic charts and graphs for energy data visualization, with filters for energy sources and time frames.

### Back-End

- RESTful API created with Python FastAPI.
- API features include user authentication, energy data retrieval, and filtering by date, energy source, and state.
- Secure storage of user information and energy data in MySQL database.

### Data Visualization

- Interactive charts and graphs created with `charts.js` and `react-charts-js` libraries.
- Insights into consumption vs. generation trends, with a focus on renewable energy contributions.

### Extra Credit Options

- **Git Version Control**: Utilization of GitHub for version control with structured commits.
- **Report Generation**: Users can now generate reports of the visualizations made by their favorite filters. They can download a PDF file for the visualizations or get an Excel file for raw data.
- **Advanced Features**: Capability for users to save their favorite visualizations.
- **Git CI/CI Pipeline**: Git pipeline is setup for CI/CD to my AWS EC2 instance created on ubuntu.

## Future Enhancements

- Integrate real-time data feeds for up-to-date energy insights.
- Develop advanced data analytics features for deeper user engagement.
- Improve security features for API and user data protection.

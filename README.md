# BJJ Finder

A simple web application to find Brazilian Jiu-Jitsu gyms. This project consists of a React frontend and a FastAPI backend.

## Project Structure

- `frontend/`: React application (Vite)
- `backend/`: FastAPI application

## Prerequisites

- Node.js (via NVM recommended)
- Python 3.9+

## Setup & Running

You will need to run the backend and frontend in separate terminal instances.

### 1. Backend

 Navigate to the backend directory, set up the virtual environment, and start the server:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### 2. Frontend

Navigate to the frontend directory, install dependencies, and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Features

- **Gym Listing**: Displays a list of BJJ gyms with their location details.
- **Map Integration**: Links to Google Maps for each gym location.

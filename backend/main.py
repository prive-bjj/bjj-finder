from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development convenience
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to BJJ Finder API"}

@app.get("/gyms")
def get_gyms(name: str = None, location: str = None, tags: str = None):
    file_path = os.path.join(os.path.dirname(__file__), "data", "gyms.json")
    with open(file_path, "r") as f:
        data = json.load(f)
    
    filtered_data = data
    
    if name:
        filtered_data = [
            gym for gym in filtered_data 
            if name.lower() in gym["name"].lower()
        ]
        
    if location:
        filtered_data = [
            gym for gym in filtered_data 
            if location.lower() in gym["city"].lower() or location.lower() in gym["postcode"].lower()
        ]

    if tags:
        tag_list = [t.strip().lower() for t in tags.split(",")]
        filtered_data = [
            gym for gym in filtered_data
            if all(any(tag.lower() == t for tag in gym.get("tags", [])) for t in tag_list)
        ]
        
    return filtered_data

@app.get("/gyms/{gym_id}")
def get_gym_by_id(gym_id: int):
    file_path = os.path.join(os.path.dirname(__file__), "data", "gyms.json")
    with open(file_path, "r") as f:
        data = json.load(f)
    
    gym = next((g for g in data if g["id"] == gym_id), None)
    return gym

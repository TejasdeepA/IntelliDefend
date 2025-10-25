from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow frontend to connect from Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "IntelliDefend API is live!", "status": "healthy"}

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "IntelliDefend Backend",
        "version": "1.0.0"
    }

@app.get("/api/test")
def test_endpoint():
    return {
        "message": "Frontend-Backend connection successful!",
        "data": {
            "security_score": 85,
            "vulnerabilities_found": 3,
            "last_scan": "2025-10-25T21:30:00Z"
        }
    }

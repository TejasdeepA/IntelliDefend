from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Security Bot API is live!"}

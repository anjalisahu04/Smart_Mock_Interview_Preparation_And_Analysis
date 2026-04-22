import os
from dotenv import load_dotenv
from fastapi import FastAPI
from backend.routes import generate, evaluate
from database.models import init_db
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="AI Interview Coach API")

# Initialize database
init_db()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(generate.router, prefix="/api", tags=["generation"])
app.include_router(evaluate.router, prefix="/api", tags=["evaluation"])

@app.get("/")
async def root():
    return {"message": "AI Interview Coach Backend is running"}

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("BACKEND_HOST", "127.0.0.1")
    port = int(os.getenv("BACKEND_PORT", "8081"))
    uvicorn.run(app, host=host, port=port)

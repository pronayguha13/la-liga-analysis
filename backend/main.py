from fastapi import FastAPI, Path, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils import convert_csv_to_json

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/league-table/{season}")
def get_league_table(season: int = Path(..., description="Season", example=2025)):
    avaialble_seasons = [2020, 2021, 2022, 2023, 2024, 2025]

    if season not in avaialble_seasons:
        # return error code with the message "Season not available"
        raise HTTPException(status_code=400, detail="Season not available")
    else:
        base_path = "./analysis/league_table/output/"

        file_path = f"{base_path}/{season}.csv"

        data = convert_csv_to_json(file_path)

        return JSONResponse(status_code=200, content=data)


@app.get("/get-season-wise-goals")
def get_season_wise_stat():
    file_path = "./analysis/goal/output/goals.csv"
    data = convert_csv_to_json(file_path)
    return JSONResponse(status_code=200, content=data)

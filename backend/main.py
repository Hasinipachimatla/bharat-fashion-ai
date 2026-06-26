from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = BASE_DIR / "dataset" / "fashion_data.csv"

df = pd.read_csv(DATASET_PATH)


@app.get("/")
def home():
    return {
        "message": "Bharat Fashion AI API Running"
    }


@app.get("/recommend")
def recommend(
    gender: str,
    occasion: str,
    budget: int,
    city: str
):

    result = df[
    (df["gender"].str.lower() == gender.lower()) &
    (df["occasion"].str.lower() == occasion.lower()) &
    (df["budget"] <= budget) &
    (df["city"].str.lower() == city.lower())
]

    result = result.sort_values(
        by="rating",
        ascending=False
    )

    recommendations = []

    for _, row in result.iterrows():
        recommendations.append({
            "product": row["product"],
            "style": row["style"],
            "city": row["city"],
            "rating": row["rating"]
        })

    return recommendations


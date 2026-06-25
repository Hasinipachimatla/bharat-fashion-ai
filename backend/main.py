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

df = pd.read_csv("../dataset/fashion_data.csv")


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


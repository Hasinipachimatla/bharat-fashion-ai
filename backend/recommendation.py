import pandas as pd

# Load dataset
df = pd.read_csv("../dataset/fashion_data.csv")

gender = input("Enter Gender (Male/Female): ")
occasion = input("Enter Occasion: ")
budget = int(input("Enter Budget: "))

result = df[
    (df["gender"].str.lower() == gender.lower()) &
    (df["occasion"].str.lower() == occasion.lower()) &
    (df["budget"] <= budget)
]

if len(result) > 0:
    print("\nRecommended Products:\n")

    for _, row in result.iterrows():
        print(f"{row['product']} ({row['style']})")
else:
    print("\nNo recommendations found.")


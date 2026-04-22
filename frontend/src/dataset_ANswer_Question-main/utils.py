import json
import os

def load_questions(role):
    file_path = f"data/{role}.json"

    if not os.path.exists(file_path):
        return None

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
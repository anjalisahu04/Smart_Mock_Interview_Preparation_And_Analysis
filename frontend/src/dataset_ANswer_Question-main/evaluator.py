from sentence_transformers import SentenceTransformer, util
import re

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')


# 🔹 Clean text
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    return text


# 🔹 Check valid answer (avoid garbage input)
def is_valid_answer(text):
    words = text.strip().split()
    return len(words) >= 2


# 🔹 Accuracy calculation (with threshold fix)
def evaluate_answer(correct_answer, student_answer):

    # ❌ invalid input
    if not is_valid_answer(student_answer):
        return 0.0

    emb1 = model.encode(correct_answer, convert_to_tensor=True)
    emb2 = model.encode(student_answer, convert_to_tensor=True)

    score = util.cos_sim(emb1, emb2)
    percentage = float(score) * 100

    # 🔥 FIX: remove fake similarity
    if percentage < 30:
        return 0.0

    return round(percentage, 2)


# 🔹 Extract keywords
def get_keywords(text):
    words = clean_text(text).split()

    stopwords = {
        "is", "are", "the", "a", "an", "and", "or",
        "to", "of", "in", "on", "for", "with", "by",
        "that", "this"
    }

    keywords = [w for w in words if w not in stopwords and len(w) > 3]
    return set(keywords)


# 🔹 Suggestion generator
def generate_suggestion(correct_answer, student_answer, score):

    correct_keywords = get_keywords(correct_answer)
    student_keywords = get_keywords(student_answer)

    missing = correct_keywords - student_keywords

    if score >= 85:
        return "Your answer is correct and complete."

    elif score >= 70:
        if missing:
            return f"Good answer, but you missed: {', '.join(list(missing)[:5])}"
        else:
            return "Good answer, try to add more detail."

    elif score >= 50:
        if missing:
            return f"Partially correct. Add: {', '.join(list(missing)[:5])}"
        else:
            return "Your answer is incomplete."

    else:
        return f"Incorrect answer. Focus on: {', '.join(list(correct_keywords)[:5])}"
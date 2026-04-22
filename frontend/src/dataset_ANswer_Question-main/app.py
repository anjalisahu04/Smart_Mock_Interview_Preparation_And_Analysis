import random
from utils import load_questions
from evaluator import evaluate_answer, generate_suggestion


def main():
    # Available roles
    roles = [
        "banking_finance",
        "it_software",
        "data_science",
        "ai_engineer",
        "teaching",
        "sales_marketing",
        "product_manager",
        "devops_engineer",
        "ui_ux_engineer"
    ]

    # Show roles
    print("\nAvailable Roles:")
    for role in roles:
        print("-", role)

    # Take user input
    role = input("\nEnter role: ").strip()

    # Load questions
    questions = load_questions(role)

    if not questions:
        print("❌ Invalid role or file not found")
        return

    # Pick random question
    q = random.choice(questions)

    print("\n📌 Question:")
    print(q["question"])

    # Take student answer
    student_answer = input("\n✍️ Your Answer: ")

    # Calculate accuracy
    score = evaluate_answer(q["answer"], student_answer)

    # Generate suggestion
    suggestion = generate_suggestion(q["answer"], student_answer, score)

    # Output result
    print("\n========== RESULT ==========")

    print("\n📌 Your Answer:")
    print(student_answer)

    print("\n✅ Correct Answer:")
    print(q["answer"])

    print(f"\n📊 Accuracy: {score}%")

    print("\n💡 Suggestion:")
    print(suggestion)

    print("\n============================")


if __name__ == "__main__":
    main()
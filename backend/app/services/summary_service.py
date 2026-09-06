from app.services.ai_service import summarize_text


def generate_summary(text):

    return summarize_text(
        text[:15000]
    )
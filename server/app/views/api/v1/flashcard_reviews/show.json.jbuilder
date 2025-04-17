# Render a single flashcard review entry after it's created
json.partial! "api/v1/flashcard_reviews/flashcard_review", review: @flashcard_review

# Renders a list of flashcards for a specific deck
json.array! @flashcards, partial: "api/v1/flashcards/flashcard", as: :flashcard

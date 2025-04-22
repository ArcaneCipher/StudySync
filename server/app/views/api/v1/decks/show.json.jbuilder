# Renders a single deck
json.partial! "api/v1/decks/deck", deck: @deck
json.flashcards @deck.flashcards do |flashcard|
  json.partial! "api/v1/flashcards/flashcard", flashcard: flashcard
end
# Renders a list of decks
json.array! @decks, partial: "api/v1/decks/deck", as: :deck

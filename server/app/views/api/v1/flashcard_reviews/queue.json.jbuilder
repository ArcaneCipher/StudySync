# Render the list of due reviews for the user
json.array! @due_reviews do |review|
  json.partial! "api/v1/flashcard_reviews/flashcard_review", review: review
end

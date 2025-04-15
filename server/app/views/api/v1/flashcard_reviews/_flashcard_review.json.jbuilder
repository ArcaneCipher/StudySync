# JSON structure for a single flashcard review
json.extract! review,
  :id,            # Review ID
  :user_id,       # ID of the user who reviewed it
  :flashcard_id,  # ID of the flashcard reviewed
  :ease_rating,   # Rating given by the user (e.g. 1-3 scale)
  :next_due,      # When this card should be reviewed again
  :reviewed_at,   # When the review happened
  :created_at,
  :updated_at

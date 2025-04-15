class FlashcardReview < ApplicationRecord
  # == Associations ==

  # Each review is tied to the user who reviewed the flashcard
  belongs_to :user

  # Each review is tied to the specific flashcard being reviewed
  belongs_to :flashcard

  # == Validations ==

  # Ensure the ease rating is present and within an expected range (1 = Again, 2 = Hard, 3 = Easy)
  validates :ease_rating, presence: true, inclusion: {in: [1, 2, 3]}

  # `next_due` should be a valid date if provided (calculated after review)
  validates :next_due, presence: true

  # Optional: validate that a card can’t be reviewed more than once per minute by the same user (safety check)
  # validates :reviewed_at, presence: true
end

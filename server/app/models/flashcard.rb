class Flashcard < ApplicationRecord
  # == Associations ==

  # Each flashcard belongs to a specific deck
  belongs_to :deck

  # A flashcard can have many spaced repetition reviews
  has_many :flashcard_reviews, dependent: :destroy

  # A flashcard can have media attachments (image/audio)
  has_many :media_uploads, dependent: :destroy

  # == Validations ==
  validates :front_text, presence: true
  validates :back_text, presence: true
end

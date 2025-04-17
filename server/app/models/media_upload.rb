class MediaUpload < ApplicationRecord
  # == Associations ==

  # Media is uploaded by a user
  belongs_to :user

  # Media is associated with a specific flashcard
  belongs_to :flashcard

  # == Validations ==
  validates :file_url, presence: true

  # Only allow known media types
  validates :media_type, presence: true, inclusion: {
    in: %w[image audio],
    message: "%{value} is not a supported media type"
  }
end

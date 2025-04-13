class Comment < ApplicationRecord
  # == Associations ==

  # Every comment is authored by a user
  belongs_to :user

  # Polymorphic association to support commenting on various entities (e.g., Deck, Reflection)
  belongs_to :commentable, polymorphic: true

  # Comments can appear in the activity feed or timeline (optional use)
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :body, presence: true, length: {minimum: 2}

  # Helpful if you're using nested comments in the future
  # validates :parent_comment_id, numericality: { only_integer: true }, allow_nil: true
end

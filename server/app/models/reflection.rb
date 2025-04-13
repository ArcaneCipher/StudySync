class Reflection < ApplicationRecord
  # == Associations ==

  # Each reflection is written by a user
  belongs_to :user

  # A reflection may be linked to a specific learning goal (optional)
  belongs_to :goal, optional: true

  # Reflections can be reacted to (likes, emojis, etc.)
  has_many :reactions, as: :reactable, dependent: :destroy

  # Reflections can receive comments from other users
  has_many :comments, as: :commentable, dependent: :destroy

  # Reflections can appear in the activity feed
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :content, presence: true, length: {minimum: 10}

  # Optional field for sharing the reflection publicly
  validates :is_public, inclusion: {in: [true, false]}
end

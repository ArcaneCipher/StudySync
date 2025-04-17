class Deck < ApplicationRecord
  # == Associations ==

  # Each deck belongs to a specific user (the creator)
  belongs_to :user

  # A deck has many flashcards inside it
  has_many :flashcards, dependent: :destroy

  # A deck can have many taggings (e.g., "Biology", "JS", etc.)
  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  # A deck can receive reactions (likes, etc.)
  has_many :reactions, as: :reactable, dependent: :destroy

  # A deck can have many comments
  has_many :comments, as: :commentable, dependent: :destroy

  # A deck can appear in activity logs
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :title, presence: true
  validates :description, length: {maximum: 500}, allow_blank: true
end

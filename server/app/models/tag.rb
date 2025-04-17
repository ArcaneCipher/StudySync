class Tag < ApplicationRecord
  # == Associations ==

  # A tag can be applied to many taggable entities (goals, decks, etc.)
  has_many :taggings, dependent: :destroy
  has_many :goals, through: :taggings, source: :taggable, source_type: "Goal"
  has_many :decks, through: :taggings, source: :taggable, source_type: "Deck"

  # == Validations ==
  validates :name, presence: true, uniqueness: true

  # Optional: You can normalize tag names here if desired
  # before_save { name.downcase! }
end

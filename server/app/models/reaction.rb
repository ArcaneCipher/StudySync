class Reaction < ApplicationRecord
  # Enums for Type Fields
  enum reaction_type: {like: 0, fire: 1, clap: 2, thumbs_up: 3, thumbs_down: 4}

  # == Associations ==

  # The user who created the reaction (e.g., liked a deck or goal)
  belongs_to :user

  # Polymorphic association allows reactions on multiple types (e.g., Deck, Goal, Reflection)
  belongs_to :reactable, polymorphic: true

  # Reactions can appear in activity feeds (optional)
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :reaction_type, presence: true, inclusion: {
    in: %w[like fire clap thumbs_up thumbs_down],
    message: "%{value} is not a valid reaction type"
  }

  # Avoid duplicate reactions (e.g., same user liking the same deck twice)
  validates :user_id, uniqueness: {scope: [:reactable_id, :reactable_type, :reaction_type],
                                   message: "has already reacted with this type"}
end

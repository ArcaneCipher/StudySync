class ActivityLog < ApplicationRecord
  # == Associations ==

  # The user who performed the action (e.g., created a deck, completed a goal)
  belongs_to :user

  # Polymorphic association to the object the action relates to
  belongs_to :reference, polymorphic: true

  # == Validations ==

  # Describes what action took place (e.g., "created_deck", "completed_goal", "earned_badge")
  validates :action_type, presence: true

  # Sanity check to ensure reference is valid
  validates :reference_id, presence: true
  validates :reference_type, presence: true
end

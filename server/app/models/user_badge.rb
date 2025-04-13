class UserBadge < ApplicationRecord
  # == Associations ==

  # This is the user who earned the badge
  belongs_to :user

  # The badge that was earned
  belongs_to :badge

  # == Validations ==

  # Prevent earning the same badge twice
  validates :badge_id, uniqueness: {scope: :user_id, message: "has already been earned"}

  validates :earned_at, presence: true
end

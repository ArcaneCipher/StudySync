class UserSetting < ApplicationRecord
  # == Associations ==

  # Each settings record belongs to exactly one user
  belongs_to :user

  # == Validations ==

  # Timezone is optional here (can fall back to user's main timezone field)
  validates :timezone, allow_blank: true, length: {maximum: 100}

  # Study goal is optional but should be a positive number if present
  validates :study_goal_min, numericality: {greater_than_or_equal_to: 0}, allow_nil: true

  # prefers_emails should always be a boolean
  validates :prefers_emails, inclusion: {in: [true, false]}
end

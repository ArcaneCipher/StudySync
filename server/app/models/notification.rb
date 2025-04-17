class Notification < ApplicationRecord
  # == Associations ==

  # Each notification is sent to a specific user
  belongs_to :user

  # == Validations ==

  # Describes what type of notification this is (e.g., "review_reminder", "streak_loss", "new_follower")
  validates :type, presence: true

  # The message content shown in the notification
  validates :message, presence: true, length: {maximum: 255}

  # `is_read` flag defaults to false when created (can be managed in controller/service)
  validates :is_read, inclusion: {in: [true, false]}
end

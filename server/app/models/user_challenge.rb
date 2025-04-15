class UserChallenge < ApplicationRecord
  # == Associations ==

  # The user who completed the challenge
  belongs_to :user

  # The challenge that was completed
  belongs_to :challenge

  # == Validations ==

  # Prevent duplicate completions of the same challenge by one user
  validates :challenge_id, uniqueness: {scope: :user_id, message: "has already been completed"}

  validates :completed_at, presence: true
end

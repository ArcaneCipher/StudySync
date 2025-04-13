class Following < ApplicationRecord
  # == Associations ==

  # The user who is following someone
  belongs_to :follower, class_name: "User"

  # The user being followed
  belongs_to :followed, class_name: "User"

  # == Validations ==
  validates :follower_id, presence: true
  validates :followed_id, presence: true

  # Prevent duplicate follows
  validates :follower_id, uniqueness: {scope: :followed_id, message: "is already following this user"}

  # Prevent users from following themselves
  validate :cannot_follow_self

  private

  def cannot_follow_self
    errors.add(:follower_id, "can't follow yourself") if follower_id == followed_id
  end
end

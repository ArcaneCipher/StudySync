class Challenge < ApplicationRecord
  # == Associations ==

  # A challenge can be completed by many users
  has_many :user_challenges, dependent: :destroy
  has_many :users, through: :user_challenges

  # == Validations ==

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true

  # Type can be "daily", "weekly", or "custom" — this can be an enum if preferred
  validates :type, presence: true

  # XP must be a non-negative integer
  validates :xp_reward, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}
end

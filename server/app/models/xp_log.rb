class XpLog < ApplicationRecord
  # == Associations ==

  # The user who earned this XP
  belongs_to :user

  # Polymorphic source of the XP (e.g., StudySession, Goal, Challenge)
  belongs_to :source, polymorphic: true

  # == Validations ==

  # XP must be a non-negative integer
  validates :amount, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}

  validates :source_type, presence: true
  validates :source_id, presence: true
end

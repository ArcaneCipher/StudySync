study_session.rb
class StudySession < ApplicationRecord
  # == Associations ==

  # Each session is logged by a specific user
  belongs_to :user

  # Each session is tied to a specific learning goal
  belongs_to :goal

  # Appears in XP logs and activity feed via polymorphic associations
  has_many :xp_logs, as: :source, dependent: :destroy
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :duration_min, presence: true, numericality: {greater_than: 0}

  # Optional: Notes for reflection/journaling
  validates :notes, length: {maximum: 1000}, allow_blank: true
end

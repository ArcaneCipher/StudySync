class Goal < ApplicationRecord
  # == Associations ==

  # Each goal belongs to a specific user
  belongs_to :user

  # A goal can have many study sessions logged against it
  has_many :study_sessions, dependent: :destroy

  # A goal can have multiple reflections (journaling entries)
  has_many :reflections, dependent: :destroy

  # A goal can have many taggings through the polymorphic interface
  has_many :taggings, as: :taggable, dependent: :destroy
  has_many :tags, through: :taggings

  # A goal can receive reactions (likes, emojis, etc.)
  has_many :reactions, as: :reactable, dependent: :destroy

  # A goal can appear in activity logs (polymorphic)
  has_many :activity_logs, as: :reference, dependent: :destroy

  # == Validations ==
  validates :title, presence: true
  validates :description, length: {maximum: 500}, allow_blank: true
  validates :target_hours, numericality: {greater_than_or_equal_to: 0}, allow_nil: true
end

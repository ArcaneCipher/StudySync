class User < ApplicationRecord
  # == Associations ==
  # A user can have many learning goals
  has_many :goals, dependent: :destroy

  # A user can log many study sessions
  has_many :study_sessions, dependent: :destroy

  # A user can create multiple decks of flashcards
  has_many :decks, dependent: :destroy

  # A user has many flashcard reviews (spaced repetition)
  has_many :flashcard_reviews, dependent: :destroy

  # A user can upload many media files to flashcards
  has_many :media_uploads, dependent: :destroy

  # A user can receive many notifications
  has_many :notifications, dependent: :destroy

  # A user can write many reflections (study journaling)
  has_many :reflections, dependent: :destroy

  # A user can leave many comments on decks, reflections, etc.
  has_many :comments, dependent: :destroy

  # A user can react to multiple objects (decks, goals, reflections)
  has_many :reactions, dependent: :destroy

  # A user can receive and earn many badges
  has_many :user_badges, dependent: :destroy
  has_many :badges, through: :user_badges

  # A user can complete many challenges
  has_many :user_challenges, dependent: :destroy
  has_many :challenges, through: :user_challenges

  # A user has many XP log entries
  has_many :xp_logs, dependent: :destroy

  # A user generates activity log entries (used for feeds/timeline)
  has_many :activity_logs, dependent: :destroy

  # A user can submit AI-powered flashcard generation requests
  has_many :ai_requests, dependent: :destroy

  # A user can follow others and be followed (self-referential relationship)
  has_many :followings, foreign_key: :follower_id, class_name: "Following", dependent: :destroy
  has_many :followed_users, through: :followings, source: :followed

  has_many :reverse_followings, foreign_key: :followed_id, class_name: "Following", dependent: :destroy
  has_many :followers, through: :reverse_followings, source: :follower

  # A user has one settings record (preferences, timezone overrides, etc.)
  has_one :user_setting, dependent: :destroy

  # == Validations ==
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true

  # == Secure Password ==
  # Enables `has_secure_password` for bcrypt auth (password hashing)
  has_secure_password
end

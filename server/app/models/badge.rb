class Badge < ApplicationRecord
  # == Associations ==

  # A badge can be earned by many users
  has_many :user_badges, dependent: :destroy
  has_many :users, through: :user_badges

  # == Validations ==

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true

  # Optional: Include URL or asset path to an icon representing the badge
  validates :icon_url, allow_blank: true, format: URI::DEFAULT_PARSER.make_regexp(%w[http https])
end

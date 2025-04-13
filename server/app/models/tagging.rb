class Tagging < ApplicationRecord
  # == Associations ==

  # Each tagging record connects a tag to a taggable model
  belongs_to :tag

  # Polymorphic association lets tags be applied to multiple model types
  belongs_to :taggable, polymorphic: true

  # == Validations ==
  validates :tag_id, presence: true
  validates :taggable_type, presence: true
  validates :taggable_id, presence: true

  # Prevent the same tag from being applied multiple times to the same object
  validates :tag_id, uniqueness: {scope: [:taggable_type, :taggable_id],
                                  message: "has already been added to this item"}
end

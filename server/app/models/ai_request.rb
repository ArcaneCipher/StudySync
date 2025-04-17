class AiRequest < ApplicationRecord
  # == Associations ==

  # The user who initiated the AI request
  belongs_to :user

  # == Validations ==
  validates :input_text, presence: true
  validates :output_data, presence: true

  # Optional: You could validate model_used against known OpenAI model names
  validates :model_used, presence: true
end

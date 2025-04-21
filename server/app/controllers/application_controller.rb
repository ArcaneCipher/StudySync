class ApplicationController < ActionController::API
  # This is the base controller for all API controllers in the app.
  # Common functionality (like authentication, error handling, etc.) should be added here.

  ### CONSIDERATIONS ###
  # Optional / Future Refinement

  ### Consideration 1 ###
  # Consider Add `rescue_from` to `ApplicationController` to centralize error handling
  # example:
  # rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # def record_not_found
  #   render json: {error: "Record not found"}, status: :not_found
  # end

  ### Consideration 2 ###
  # Consider Route Guards: a helper like `require_login` in `ApplicationController`
  # example:
  # before_action :require_login, only: [:create, :update, :destroy]

  ### Consideration 3 ###
  # Consider Add JSON Default Headers for API Clarity
  # In `application_controller.rb`, consider adding this to ensure
  # API clients hitting browser URLs still get JSON responses by default
  # example:
  # before_action :set_default_format

  # private

  # def set_default_format
  #   request.format = :json unless params[:format]
  # end

  ### Consideration 4 ###
  # Consider Standardize Pagination (if needed)
  # If your data grows, especially for public decks or review queues, consider paginating
  # example:
  # @decks = Deck.limit(20).offset(params[:offset] || 0)
  # This pagination would go in the affected controller.
end

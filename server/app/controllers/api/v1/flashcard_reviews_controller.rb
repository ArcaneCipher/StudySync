# This controller supports:
# POST /api/v1/flashcard_reviews         => Create a new review entry
# GET  /api/v1/review_queue              => Get the user's current review queue

module Api
  module V1
    class FlashcardReviewsController < ApplicationController
      # POST /api/v1/flashcard_reviews
      def create
        @flashcard_review = FlashcardReview.new(flashcard_review_params)

        if @flashcard_review.save
          render :show, status: :created, formats: :json
        else
          render json: {errors: @flashcard_review.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # GET /api/v1/review_queue?user_id=1
      def queue
        if params[:user_id]
          @due_reviews = FlashcardReview
            .where(user_id: params[:user_id])
            .where("next_due <= ?", Date.today)
            .order(:next_due)

          render :queue, status: :ok, formats: :json
        else
          render json: {error: "Missing user_id parameter"}, status: :bad_request
        end
      end

      private

      # Strong parameters for creating a flashcard review
      def flashcard_review_params
        params.require(:flashcard_review).permit(:user_id, :flashcard_id, :ease_rating, :next_due, :reviewed_at)
      end
    end
  end
end

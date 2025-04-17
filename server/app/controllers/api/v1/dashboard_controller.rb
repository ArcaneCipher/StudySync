# This controller supports:
# GET /api/v1/dashboard?user_id=1
# Provides a summarized dashboard view for the given user

module Api
  module V1
    class DashboardController < ApplicationController
      # GET /api/v1/dashboard?user_id=1
      def show
        if params[:user_id]
          user = User.find_by(id: params[:user_id])

          if user
            @total_goals = user.goals.count
            @study_minutes = user.study_sessions.sum(:duration_min)
            @cards_reviewed = user.flashcard_reviews.count
            @upcoming_reviews = user.flashcard_reviews.where("next_due <= ?", Date.today).count
            @latest_goal = user.goals.order(created_at: :desc).first

            render :show, status: :ok, formats: :json
          else
            render json: {error: "User not found"}, status: :not_found
          end
        else
          render json: {error: "Missing user_id parameter"}, status: :bad_request
        end
      end
    end
  end
end

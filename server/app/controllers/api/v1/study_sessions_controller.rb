# This controller supports:
# GET    /api/v1/study_sessions
# POST   /api/v1/study_sessions

module Api
  module V1
    class StudySessionsController < ApplicationController
      # GET /api/v1/study_sessions
      # Returns a list of all study sessions, optionally filtered by user_id or goal_id.
      def index
        @study_sessions = StudySession.all

        # Optional filtering: /study_sessions?user_id=1&goal_id=3
        @study_sessions = @study_sessions.where(user_id: params[:user_id]) if params[:user_id]
        @study_sessions = @study_sessions.where(goal_id: params[:goal_id]) if params[:goal_id]

        render :index, formats: :json
      end

      # POST /api/v1/study_sessions
      # Creates a new study session record for a given user and goal.
      def create
        @study_session = StudySession.new(study_session_params)

        if @study_session.save
          render :show, formats: :json, status: :created
        else
          render json: {errors: @study_session.errors.full_messages}, status: :unprocessable_entity
        end
      end

      private

      # Params to permit only allowed attributes
      def study_session_params
        params.require(:study_session).permit(:user_id, :goal_id, :duration_min, :notes)
      end
    end
  end
end
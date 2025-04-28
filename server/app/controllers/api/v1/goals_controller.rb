# This controller supports:
# GET /api/v1/goals
# GET /api/v1/goals/:id
# POST /api/v1/goals
# PATCH /api/v1/goals/:id
# DELETE /api/v1/goals/:id

module Api
  module V1
    class GoalsController < ApplicationController
      # GET /api/v1/goals or /api/v1/goals?user_id=1
      # Returns goals based on user_id (or only public goals if no user)
      def index
        @goals = if params[:user_id]
          # Logged in: show all goals belonging to that user (private or public)
          Goal.where(user_id: params[:user_id])
        else
          # Not logged in: show only public goals
          Goal.where(is_public: true)
        end

        render :index, formats: :json
      end

      # GET /api/v1/goals/:id
      def show
        @goal = Goal.find(params[:id])
        render :show, formats: :json
      end

      # POST /api/v1/goals
      def create
        @goal = Goal.new(goal_params)
        if @goal.save
          render :show, status: :created, formats: :json
        else
          render json: {errors: @goal.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/goals/:id
      def update
        @goal = Goal.find(params[:id])
        if @goal.update(goal_params)
          render :show, formats: :json
        else
          render json: {errors: @goal.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/goals/:id
      def destroy
        @goal = Goal.find(params[:id])
        @goal.destroy
        head :no_content
      end

      private

      # Strong parameters for goal creation/updating
      def goal_params
        params.require(:goal).permit(:user_id, :title, :description, :target_hours, :is_public)
      end
    end
  end
end

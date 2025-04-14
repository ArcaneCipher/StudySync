# This controller supports:
# POST /signup
# GET /me
# GET /users/:id
# PATCH /users/:id
# DELETE /users/:id

module Api
  module V1
    class UsersController < ApplicationController
      # POST /signup
      # Registers a new user and stores their ID in the session
      def create
        @user = User.new(user_params)
        if @user.save
          session[:user_id] = @user.id
          render :show, status: :created, formats: :json
        else
          render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # GET /me
      # Returns the currently logged-in user
      def show_current
        if current_user
          @user = current_user
          render :show, formats: :json
        else
          render json: {error: "Not logged in"}, status: :unauthorized
        end
      end

      # GET /users/:id
      # Returns a user's profile by ID (public or self)
      def show
        @user = User.find_by(id: params[:id])
        if @user
          render :show, formats: :json
        else
          render json: {error: "User not found"}, status: :not_found
        end
      end

      # PATCH/PUT /users/:id
      # Allows users to update their profile (basic info)
      def update
        @user = User.find_by(id: params[:id])

        if @user.nil?
          render json: {error: "User not found"}, status: :not_found
        elsif @user.id != session[:user_id]
          render json: {error: "Unauthorized"}, status: :unauthorized
        elsif @user.update(user_params)
          render :show, formats: :json
        else
          render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # DELETE /users/:id
      # Destroys a user account (self-delete only)
      def destroy
        @user = User.find_by(id: params[:id])

        if @user.nil?
          render json: {error: "User not found"}, status: :not_found
        elsif @user.id != session[:user_id]
          render json: {error: "Unauthorized"}, status: :unauthorized
        else
          @user.destroy
          session[:user_id] = nil  # Log them out
          render json: {message: "Account deleted"}, status: :ok
        end
      end

      private

      # Permit only safe fields during user creation or update
      def user_params
        params.require(:user).permit(:email, :password, :username, :avatar_url, :timezone)
      end

      # Retrieves the current user from session
      def current_user
        return @current_user if defined?(@current_user)
        @current_user = User.find_by(id: session[:user_id])
      end
    end
  end
end

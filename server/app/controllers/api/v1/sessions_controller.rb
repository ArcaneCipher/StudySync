# This controller supports:
# POST /api/v1/login
# DELETE /api/v1/logout

module Api
  module V1
    class SessionsController < ApplicationController
      # POST /api/v1/login
      # Authenticates the user by email and password using bcrypt.
      # On success, returns user details for frontend use.
      def create
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          render json: {
            message: "Login successful",
            user: {
              id: user.id,
              email: user.email,
              username: user.username,
              avatar_url: user.avatar_url,
              timezone: user.timezone
            }
          }, status: :ok
        else
          render json: {error: "Invalid email or password"}, status: :unauthorized
        end
      end

      # DELETE /api/v1/logout
      # Placeholder logout response. In the future, this can be replaced
      # with token/session clearing logic if authentication becomes stateful.
      def destroy
        render json: {message: "Logout successful (no session tracking yet)"}, status: :ok
      end
    end
  end
end

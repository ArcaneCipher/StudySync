class ApplicationController < ActionController::API
  def ping
    render json: {message: "pong from Rails"}
  end
end

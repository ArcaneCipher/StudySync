class WelcomeController < ApplicationController
  def index
    render json: {message: "Welcome to the StudySync API"}
  end
end

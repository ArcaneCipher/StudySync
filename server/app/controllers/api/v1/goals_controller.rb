class Api::V1::GoalsController < ApplicationController
  def index
    @goals = if params[:user_id]
      Goal.where(user_id: params[:user_id])
    else
      Goal.all
    end

    render :index, formats: :json
  end
end

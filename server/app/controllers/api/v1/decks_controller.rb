# This controller supports:
# GET /api/v1/decks
# GET /api/v1/decks/:id
# POST /api/v1/decks
# PATCH /api/v1/decks/:id
# DELETE /api/v1/decks/:id

class Api::V1::DecksController < ApplicationController
  before_action :set_deck, only: [:show, :update, :destroy]

  # GET /api/v1/decks
  # Returns all decks or filters by user_id if provided
  def index
    @decks = if params[:user_id]
      # Logged in user: only show THEIR decks (public or private)
      Deck.where(user_id: params[:user_id])
    else
      # Not logged in: only show public decks
      Deck.where(is_public: true)
    end

    render :index, formats: :json
  end

  # GET /api/v1/decks/:id
  # Show a specific deck by ID
  def show
    render :show, formats: :json
  end

  # POST /api/v1/decks
  # Create a new deck
  def create
    @deck = Deck.new(deck_params)

    if @deck.save
      render :show, status: :created, formats: :json
    else
      render json: {errors: @deck.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/decks/:id
  # Update an existing deck
  def update
    if @deck.update(deck_params)
      render :show, formats: :json
    else
      render json: {errors: @deck.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/decks/:id
  # Delete a deck
  def destroy
    @deck.destroy
    head :no_content
  end

  private

  # Find deck by ID or return not found error
  def set_deck
    @deck = Deck.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Deck not found"}, status: :not_found
  end

  # Allow only permitted parameters
  def deck_params
    params.require(:deck).permit(:title, :description, :is_public, :user_id)
  end
end

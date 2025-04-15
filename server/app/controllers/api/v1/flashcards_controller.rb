# This controller supports:
# GET    /decks/:deck_id/flashcards
# POST   /decks/:deck_id/flashcards
# PATCH  /flashcards/:id
# DELETE /flashcards/:id

module Api
  module V1
    class FlashcardsController < ApplicationController
      before_action :set_deck, only: [:index, :create]
      before_action :set_flashcard, only: [:update, :destroy]

      # GET /decks/:deck_id/flashcards
      # Returns all flashcards in a given deck
      def index
        @flashcards = @deck.flashcards
        render :index, formats: :json
      end

      # POST /decks/:deck_id/flashcards
      # Creates a new flashcard within a deck
      def create
        @flashcard = @deck.flashcards.build(flashcard_params)

        if @flashcard.save
          render :show, status: :created, formats: :json
        else
          render json: {errors: @flashcard.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /flashcards/:id
      # Updates an existing flashcard
      def update
        if @flashcard.update(flashcard_params)
          render :show, formats: :json
        else
          render json: {errors: @flashcard.errors.full_messages}, status: :unprocessable_entity
        end
      end

      # DELETE /flashcards/:id
      # Deletes a flashcard
      def destroy
        @flashcard.destroy
        head :no_content
      end

      private

      # Find deck by ID from nested route
      def set_deck
        @deck = Deck.find(params[:deck_id])
      end

      # Find flashcard by ID for update/destroy
      def set_flashcard
        @flashcard = Flashcard.find(params[:id])
      end

      # Only permit safe flashcard attributes
      def flashcard_params
        params.require(:flashcard).permit(:front_text, :back_text, :image_url, :audio_url)
      end
    end
  end
end

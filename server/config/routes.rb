Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # --------------------------------------
  # Health Check Endpoint
  # --------------------------------------
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up", to: "rails/health#show", as: :rails_health_check

  # Define root path API welcome message (purely cosmetic and not required)
  root to: "welcome#index"

  # --------------------------------------
  # API v1 Namespace
  # --------------------------------------
  namespace :api do
    namespace :v1 do
      # --------------------------------------
      # MVP ROUTES
      # --------------------------------------

      # Authentication
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/me", to: "users#show_current"

      # Users
      resources :users, only: [:show]

      # Learning Goals
      resources :goals, except: [:new, :edit]

      # Study Sessions (flat for now, optional nested later)
      resources :study_sessions, only: [:index, :create]

      # Decks & Flashcards
      resources :decks, except: [:new, :edit] do
        resources :flashcards, only: [:create]
      end
      resources :flashcards, only: [:update, :destroy]

      # Flashcard Reviews + Review Queue
      resources :flashcard_reviews, only: [:create]
      get "/review_queue", to: "flashcard_reviews#queue"

      # Progress Dashboard
      get "/dashboard", to: "dashboard#show"

      # --------------------------------------
      # TIER 1 – Personalization & Sharing
      # --------------------------------------

      # # User Settings
      # get '/settings', to: 'settings#show'
      # put '/settings', to: 'settings#update'

      # # Tags & Taggings
      # resources :tags, only: [:index, :create, :destroy]
      # resources :taggings, only: [:create, :destroy]

      # # Daily Review Summary
      # get '/daily_review', to: 'daily_review#show'

      # # Public Decks
      # get '/public_decks', to: 'public_decks#index'
      # get '/public_decks/:id', to: 'public_decks#show'

      # # Public Profiles
      # get '/profiles/:id', to: 'profiles#show'

      # --------------------------------------
      # TIER 2 – Social & Engagement
      # --------------------------------------

      # # Followers
      # resources :followings, only: [:create, :destroy]
      # get '/followers', to: 'followings#followers'
      # get '/following', to: 'followings#following'

      # # Reactions (polymorphic)
      # resources :reactions, only: [:create, :destroy]

      # # Activity Feed
      # get '/feed', to: 'feed#index'

      # # XP System
      # get '/xp', to: 'xp#show'
      # get '/xp/history', to: 'xp#history'

      # # Notifications
      # resources :notifications, only: [:index, :update, :destroy]

      # # Badges
      # get '/badges', to: 'badges#index'
      # get '/my_badges', to: 'user_badges#index'

      # --------------------------------------
      # TIER 3 – Advanced Functionality
      # --------------------------------------

      # # Quests / Challenges
      # get '/challenges', to: 'challenges#index'
      # post '/challenges/:id/complete', to: 'user_challenges#create'

      # # Comments (polymorphic)
      # resources :comments, only: [:index, :create, :destroy]

      # # Media Uploads
      # resources :media_uploads, only: [:create, :show]

      # # Reflections / Journaling
      # resources :reflections, only: [:index, :show, :create, :destroy]

      # # Timeline
      # get '/timeline', to: 'timeline#index'

      # # AI Flashcard Generator
      # post '/ai/generate_cards', to: 'ai#generate_cards'
    end
  end
end

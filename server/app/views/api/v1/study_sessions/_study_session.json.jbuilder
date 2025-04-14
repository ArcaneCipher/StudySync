# Defines the structure of a single study session JSON object
# Extracts only the relevant fields for the API response

json.extract! study_session,
  :id,            # Unique ID for the session
  :user_id,       # User who completed the session
  :goal_id,       # Related goal (if applicable)
  :duration_min,  # How long the user studied (in minutes)
  :notes,         # Optional reflection notes
  :created_at,    # Timestamp of session creation (used for streaks)
  :updated_at     # Timestamp of last update

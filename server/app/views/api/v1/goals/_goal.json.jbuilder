# Partial to render a single goal in consistent format
json.extract! goal, :id, :title, :description, :target_hours, :is_public, :created_at, :deck_id
json.user_id goal.user_id

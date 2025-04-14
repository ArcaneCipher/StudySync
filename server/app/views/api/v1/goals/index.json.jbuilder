# Render a list of goals as JSON
# Iterates over each @goal and renders using the _goal partial
json.array! @goals, partial: 'api/v1/goals/goal', as: :goal

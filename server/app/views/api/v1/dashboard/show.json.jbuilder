# JSON structure for the dashboard summary
json.user_id           params[:user_id]
json.total_goals       @total_goals
json.study_minutes     @study_minutes
json.cards_reviewed    @cards_reviewed
json.upcoming_reviews  @upcoming_reviews

if @latest_goal
  json.latest_goal do
    json.id          @latest_goal.id
    json.title       @latest_goal.title
    json.description @latest_goal.description
    json.created_at  @latest_goal.created_at
  end
else
  json.latest_goal nil
end

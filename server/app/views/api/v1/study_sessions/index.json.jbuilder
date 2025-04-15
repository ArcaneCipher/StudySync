# Renders a JSON array of all study session records in @study_sessions
# Uses the _study_session partial to keep things DRY
json.array! @study_sessions do |session|
  json.partial! "api/v1/study_sessions/study_session", study_session: session
end

export const calculateGoalTime = (sessions, goalId) => {
  return sessions
    .filter((session) => session.goalId === goalId) // Filter sessions by goalId
    .reduce((sum, session) => sum + session.durationMin, 0); // Sum the duration of each session
};
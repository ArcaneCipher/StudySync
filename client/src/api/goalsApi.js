import axios from "./axios"; // Configured axios instance

// GET all goals, optionally by user ID
export const getGoals = async (userId = null) => {
  let url = "/api/v1/goals"; // Make a GET request to fetch all goals
  if (userId) {
    url += `?user_id=${userId}`;
  }
  const response = await axios.get(url);
  return response.data; // Return the data from the response
};

// CREATE a new goal
export const createGoal = async (goalData) => {
  const response = await axios.post("/api/v1/goals", goalData); // Make a POST request to create a new goal
  return response.data; // Return the created goal data
};

// UPDATE an existing goal
export const updateGoal = async (goalData) => {
  const response = await axios.put(`/api/v1/goals/${goalData.id}`, goalData); // Make a PUT request to update the goal
  return response.data; // Return the updated goal data
};

// DELETE a goal
export const removeGoal = async (goalId) => {
  await axios.delete(`/api/v1/goals/${goalId}`); // Make a DELETE request to remove the goal
  // No need to return anything as the goal is deleted
};

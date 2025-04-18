import axios from "./axios"; // Configured axios instance

// GET all goals
export const getGoals = async () => {
  const response = await axios.get("/api/v1/goals"); // Make a GET request to fetch all goals
  return response.data; // Return the data from the response
};

// CREATE a new goal
export const createGoal = async (goalData) => {
  const response = await axios.post("/goals", goalData); // Make a POST request to create a new goal
  return response.data; // Return the created goal data
};

// UPDATE an existing goal
export const updateGoal = async (goalData) => {
  const response = await axios.put(`/goals/${goalData.id}`, goalData); // Make a PUT request to update the goal
  return response.data; // Return the updated goal data
};

// DELETE a goal
export const removeGoal = async (goalId) => {
  await axios.delete(`/goals/${goalId}`); // Make a DELETE request to remove the goal
  // No need to return anything as the goal is deleted
};
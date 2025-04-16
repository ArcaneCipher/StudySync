// createAsyncThunk is used for handling asynchronous actions instead of creating async logic manually
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

// Async thunk to fetch goals from the API
export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  const response = await getGoals(); // Call the API to get goals
  return response; // Return the response to store in Redux state
});

// Async Thunk for creating a new goal
export const addGoal = createAsyncThunk("goals/addGoal", async (goalData) => {
  const response = await createGoal(goalData); // API call to create a new goal
  return response; // Return the created goal
});

// Async Thunk for updating an existing goal
export const editGoal = createAsyncThunk("goals/editGoal", async (goalData) => {
  const response = await updateGoal(goalData); // API call to update the goal
  return response; // Return the updated goal
});

// Async Thunk for deleting a goal
export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (goalId) => {
  await removeGoal(goalId); // API call to delete the goal
  return goalId; // Return the ID of the deleted goal
});

// Define the initial state of the goals slice
const initialState = {
  goals: [], // Holds the list of goals
  loading: false, // Indicates if goals are being loaded from the API
  error: null, // Holds error messages if the API call fails
};

// Create a slice of the Redux store for goals
const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    // Action to add the goals in the state
    setGoals: (state, action) => {
      state.goals = action.payload; // Set the goals in the state
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle the fetchGoals action
      
  }
})
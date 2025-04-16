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
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the fetchGoals action
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true; // Set loading to true when fetching goals
        state.error = null; // Reset error
      })
      // Handle the fetchGoals fulfilled action
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetching is done
        state.goals = action.payload; // Set the fetched goals in the state
      })
      // Handle fetch error
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false; // Set loading to false when fetching fails
        state.error = action.error.message; // Set the error message
      })

      // Handle if goal is added successfully
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload); // Add the new goal to the state
      })

      // Handle if goal is updated successfully
      .addCase(editGoal.fulfilled, (state, action) => {
        const updated = action.payload; // Updated goal from backend
        const index = state.goals.findIndex((goal) => goal.id === updated.id); // Find the index of the updated goal
        if (index !== -1) {
          state.goals[index] = updated; // Update the goal in the state
        }
      })

      // Handle if goal is deleted successfully
      .addCase(deleteGoal.fulfilled, (state, action) => {
        const idToRemove = action.payload; // ID of the goal to remove
        state.goals = state.goals.filter((goal) => goal.id !== idToRemove); // Remove the goal from the state
      });
  },
});

export const { setGoals } = goalsSlice.actions; // Export the action to set goals
export default goalsSlice.reducer; // Export the reducer to be used in the store 
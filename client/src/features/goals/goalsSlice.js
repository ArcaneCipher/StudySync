import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGoals,
  createGoal,
  updateGoal,
  removeGoal,
} from "../../api/goalsApi";

// Async thunks

export const fetchGoals = createAsyncThunk(
  "goals/fetchGoals",
  async (userId = null) => {
    let url = "/api/v1/goals";
    if (userId) {
      url += `?user_id=${userId}`;
    }
    const response = await getGoals(url);
    return response;
  }
);

export const addGoal = createAsyncThunk("goals/addGoal", async (goalData) => {
  const response = await createGoal(goalData);
  return response;
});

export const editGoal = createAsyncThunk("goals/editGoal", async (goalData) => {
  const response = await updateGoal(goalData);
  return response;
});

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId) => {
    await removeGoal(goalId);
    return goalId;
  }
);

// Initial state
const initialState = {
  goals: [],
  loading: false,
  error: null,
};

// Slice
const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.goals.findIndex((goal) => goal.id === updated.id);
        if (index !== -1) {
          state.goals[index] = updated;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        const idToRemove = action.payload;
        state.goals = state.goals.filter((goal) => goal.id !== idToRemove);
      });
  },
});

// Exports
export const { setGoals } = goalsSlice.actions;
export default goalsSlice.reducer;

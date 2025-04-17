import { useDispatch, useSelector } from "react-redux";
import {
  fetchGoals,
  addGoal,
  editGoal,
  deleteGoal,
} from "../features/goals/goalsSlice"; // Import AsyncThunks from goalsSlice

// Custom hhok to handle goal-related actions and state
const useGoals = () => {
  const dispatch = useDispatch(); // Dispatch function to trigger Redux actions
  const { goals, loading, error } = useSelector((state) => state.goals); // Select goals state from Redux store

  // Function to fetch goals from the API
  const loadAllGoals = () => {
    dispatch(fetchGoals()); // Dispatch the fetchGoals action
  };

  // Function to add a new goal
  const createNewGoal = (goalData) => {
    dispatch(addGoal(goalData)); // Dispatch the addGoal action with goal data
  };

  // Function to update an existing goal
  const updateExistingGoal = (goalData) => {
    dispatch(editGoal(goalData)); // Dispatch the editGoal action with goal data
  };

  // Function to delete a goal
  const removeGoal = (goalId) => {
    dispatch(deleteGoal(goalId)); // Dispatch the deleteGoal action with goal ID
  };

  return {
    goals, // Current list of goals from the Redux state
    loading, // Loading state from Redux
    error, // Error state from Redux
    loadAllGoals, // Function to fetch goals
    createNewGoal, // Function to add a new goal
    updateExistingGoal, // Function to update an existing goal
    removeGoal, // Function to delete a goal
  };
};

export default useGoals; // Export the custom hook for use in components

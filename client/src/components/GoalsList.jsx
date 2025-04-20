import { useEffect, useState } from "react";
import useGoals from "../hooks/useGoals";
import GoalForm from "./GoalForm";
import Button from "./Button";
import AnimatedCard from "./AnimatedCard";

import "../styles/components/_goalslist.scss"; // Import styles for the GoalsList component

const GoalsList = () => {
  const {
    goals,
    loading,
    error,
    loadAllGoals,
    createNewGoal,
    updateExistingGoal,
    removeGoal,
  } = useGoals(); // Custom hook to manage goals
  
  const [editingGoal, setEditingGoal] = useState(null); // State to manage the goal being edited

  // Load all goals when the component renders
  useEffect(() => {
    loadAllGoals(); // Fetch all goals from the API
  }, []);

  // Handle clicking the Edit button
  const handleEditClick = (goal) => {
    setEditingGoal(goal); // Set the goal to be edited
  };

  // Handle Saving the edited goal
  const handleSaveClick = (goalData) => {
    if (editingGoal) {
      updateExistingGoal({ ...editingGoal, ...goalData.goal }); // Update the goal with new data
    } else {
      createNewGoal(goalData.goal); // Create a new goal if not editing
    }
    setEditingGoal(null); // Reset the editing goal state
  };

  // Handle cancelling the edit
  const handleCancelClick = () => {
    setEditingGoal(null); // Reset the editing goal state
  };

  // Render the list of goals
  return (
    <div>
      <h2>Goals List</h2>
      {/* Conditionally render GoalForm for adding or editing goals */}
      {editingGoal ? (
        <GoalForm goal={editingGoal} onSave={handleSaveClick} onCancel={handleCancelClick} />
      ) : (
        <GoalForm onSave={handleSaveClick} onCancel={handleCancelClick} />
      )}

      {/* Render loading or error messages */}
      {loading && (
        <AnimatedCard key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <p>Loading goals...</p>
        </AnimatedCard>
      )}
      {error && (
        <AnimatedCard key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <p>Error loading goals: {error}</p>
        </AnimatedCard>
      )}

      {/* Render the list of goals */}
      {goals.length === 0 ? (
        <p>No goals available. Start by adding one!</p>
      ) : (
        <ul className="goal-wrapper">
          {goals.map((goal) => {
            return (
            <li key={goal.id} className="goal-card">
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <span>Finish by: {goal.target_hours} minutes</span>
              <div className="edit-overlay">
                <Button variant="primary" onClick={() => handleEditClick(goal)}>Edit</Button>
                <Button variant="danger" onClick={() => removeGoal(goal.id)}>Delete</Button>
              </div>
            </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default GoalsList;
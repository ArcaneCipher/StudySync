import { useEffect, useState } from "react";
import useGoals from "../../hooks/useGoals";
// import GoalForm from "./GoalForm";

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
      updateExistingGoal({ ...editingGoal, ...goalData }); // Update the goal with new data
    } else {
      createNewGoal(goalData); // Create a new goal if not editing
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
      {/* {editingGoal ? (
        <GoalForm goal={editingGoal} onSave={handleSaveClick} onCancel={handleCancelClick} />
      ) : (
        <GoalForm onSave={handleSaveClick} onCancel={handleCancelClick} />
      )} */}

      {/* Render loading or error messages */}
      {loading && <p>Loading goals...</p>}
      {error && <p>Error loading goals: {error}</p>}

      {/* Render the list of goals */}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
              <div className="goal_title">
                <h3>{goal.title}</h3>
              </div>
              <div className="description">
                <p>{goal.description}</p>
              </div>
              <div className="target_hours">
                <span>Finish by: {goal.target_hours} minutes</span>
              </div>
              <div className="buttons">
              <button onClick={() => handleEditClick(goal)}>Edit</button>
              <button onClick={() => removeGoal(goal.id)}>Delete</button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GoalsList;
import { useEffect, useState } from "react";
import useGoals from "../hooks/useGoals";
import GoalForm from "./GoalForm";
import Button from "./Button";
import AnimatedCard from "./AnimatedCard";
import { CirclePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence for animations

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
  
  const [formVisible, setFormVisible] = useState(false); // State to manage the visibility of the form
  const [editingGoal, setEditingGoal] = useState(null); // State to manage the goal being edited

  // Load all goals when the component renders
  useEffect(() => {
    loadAllGoals(); // Fetch all goals from the API
  }, []);

  // Handle clicking the Edit button
  const handleEditClick = (goal) => {
    setEditingGoal(goal); // Set the goal to be edited
    setFormVisible(true); // Show the form for editing
  };

  // Handle Saving the edited goal
  const handleSaveClick = (goalData) => {
    if (editingGoal) {
      updateExistingGoal({ ...editingGoal, ...goalData.goal }); // Update the goal with new data
    } else {
      createNewGoal(goalData.goal); // Create a new goal if not editing
    }
    setEditingGoal(null); // Reset the editing goal state
    setFormVisible(false); // Hide the form after saving
  };

  // Handle cancelling the edit
  const handleCancelClick = () => {
    setEditingGoal(null); // Reset the editing goal state
    setFormVisible(false); // Hide the form
  };

  // Render the list of goals
  return (
    <div>
      {/* Button to add a new goal */}
      {!formVisible && !editingGoal && (
        <div className="btn-create">
          <Button onClick={() => setFormVisible(true)} variant="primary">
            Add New Goal <CirclePlus />
          </Button>
        </div>
      )}

      <AnimatePresence>
        {(formVisible || editingGoal) && (
          <motion.div
            key="goal-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="deck-goal-create"
          >
            <GoalForm
              goal={editingGoal}
              onSave={handleSaveClick}
              onCancel={handleCancelClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
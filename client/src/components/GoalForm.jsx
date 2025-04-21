import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";

import "../styles/components/_goalform.scss"; // Import styles for the GoalForm component

// GoalForm component to add or edit goals
const GoalForm = ({ goal, onSave, onCancel }) => {
  const [title, setTitle] =  useState("");
  const [description, setDescription] = useState("");
  const [targetHours, setTargetHours] = useState("");

  // Pre-fill form fields if editing an existing goal
  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "");
      setDescription(goal.description || "");
      setTargetHours(goal.target_hours || "");
    } else {
      // Clear fields if switching from editing to adding a new goal
      setTitle("");
      setDescription("");
      setTargetHours("");
    }
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const goalData = {
      goal: {
        user_id, // Replace with actual logged-in user ID later
        title,
        description,
        target_hours: Number(targetHours), // Convert target hours to a number
      }
    };
    onSave(goalData); // Call the save function with the goal data
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{goal ? "Edit Goal" : "Add New Goal"}</h3>
      <CircleX className="close-icon" onClick={onCancel} />

      <div className="new_goal_title">
        <label>Title:</label>
        <input 
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
      </div>

      <div className="new_goal_description">
        <label>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />
        <div className="char-count">{description.length} / 200</div>
      </div>

      <div className="new_goal_targetHours">
        <label htmlFor="targetHours">Target Hours:</label>
        <input
          type="number"
          id="targetHours"
          value={targetHours}
          onChange={(e) => setTargetHours(e.target.value)}
          min="0"
        />
      </div>

      <button type="submit">{goal ? "Update" : "Add"} Goal</button>
    </form>
  )
}

export default GoalForm;
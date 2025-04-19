import { useState, useEffect } from "react";

// GoalForm component to add or edit goals
const GoalForm = ({ goal = null, onSave, onCancel }) => {
  const [title, setTitle] =  useState("");
  const [description, setDescription] = useState("");
  const [targetHours, setTargetHours] = useState("");

  // Pre-fill form fields if editing an existing goal
  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "");
      setDescription(goal.description || "");
      setTargetHours(goal.targetHours || "");
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
        user_id: 1, // Replace with actual logged-in user ID later
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

      <div className="new_goal_title">
        <label>Title:</label>
        <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
      </div>

      <div className="new_goal_description">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
      </div>

      <div className="new_goal_targetHours">
        <label>Target Hours:</label>
        <input
          type="number"
          value={targetHours}
          onChange={(e) => setTargetHours(e.target.value)}
          min="0"
        />
      </div>

      <button type="submit">{goal ? "Update" : "Add"} Goal</button>
      {goal && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default GoalForm;
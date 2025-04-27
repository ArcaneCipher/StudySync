import { useState, useEffect } from "react";
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';

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
        user_id: 1, // Replace with actual logged-in user ID later
        title,
        description,
        target_hours: Number(targetHours), // Convert target hours to a number
      }
    };
    onSave(goalData); // Call the save function with the goal data
  };

  return (
    <div className={`goal-form ${goal ? 'edit-form' : 'add-form'}`}>
      <form onSubmit={handleSubmit}>
      <h2>{goal ? "Edit Goal" : "Add New Goal"}</h2>
      

      <Input 
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        label="Title"
      />

      <Textarea 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        id="description"
        label="Description"
      />
      <div className="char-count">{description.length} / 200</div>

      <Input 
        type="number"
        id="targetHours"
        value={targetHours}
        onChange={(e) => setTargetHours(e.target.value)}
        min="0"
        label="Target Hours"
      />
      <div className="btn-row mt20">
        <Button type="submit">{goal ? "Update" : "Create"} Goal</Button>
        <Button variant='secondary' onClick={onCancel}>Cancel</Button>
      </div>
      
    </form>
    </div>
  )
}

export default GoalForm;
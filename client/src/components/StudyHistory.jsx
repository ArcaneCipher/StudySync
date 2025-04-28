import { useSelector } from "react-redux";

const StudyHistory = ({ sessionHistory }) => {
  const decks = useSelector((state) => state.decks.decks);
  const goals = useSelector((state) => state.goals.goals);

  const findDeckTitleFromGoal = (goalId) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return "Unknown Goal";

    const deck = decks.find((d) => d.id === goal.deck_id);
    return deck ? deck.title : "Unknown Deck";
  };

  return (
    <div className="study-history">
      {sessionHistory.length > 0 ? (
        <ul className="space-y-2">
          {sessionHistory.map((sesh, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <div>
                <strong>Deck:</strong> {findDeckTitleFromGoal(sesh.goal_id)}
              </div>
              <div>
                <strong>Duration:</strong> {sesh.duration_min || 0} min
              </div>
              <div>
                <strong>Notes:</strong> {sesh.notes || "None"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions recorded yet.</p>
      )}
    </div>
  );
};

export default StudyHistory;

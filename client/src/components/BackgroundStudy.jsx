import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDecks } from "../features/decks/decksSlice";
import { fetchGoals } from "../features/goals/goalsSlice";

const BackgroundStudy = ({ deckId, goalId }) => {
  const dispatch = useDispatch();

  const { decks, status: decksStatus } = useSelector((state) => state.decks);
  const { goals, loading: goalsLoading } = useSelector((state) => state.goals);

  const deck = decks.find((d) => d.id === Number(deckId));
  const goal = goals.find((g) => g.id === Number(goalId));

  // Fetch decks if needed
  useEffect(() => {
    if (decksStatus === "idle") {
      dispatch(fetchDecks());
    }
  }, [dispatch, decksStatus]);

  // Fetch goals if needed
  useEffect(() => {
    if (goals.length === 0 && !goalsLoading) {
      dispatch(fetchGoals());
    }
  }, [dispatch, goals.length, goalsLoading]);

  const title = goal ? goal.title : deck ? deck.title : "Study Session";

  return (
    <div className="background-study">
      <h2>{title}</h2>
    </div>
  );
};

export default BackgroundStudy;

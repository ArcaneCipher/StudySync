import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BackgroundStudy from "../components/BackgroundStudy";
import ForegroundStudy from "../components/ForegroundStudy";
import StudySession from "../components/StudySession";
import axios from "../api/axios";

const Study = () => {
  const { deckId, goalId } = useParams();
  const [resolvedDeckId, setResolvedDeckId] = useState(null);
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  console.log('FROM:', from); // check here
  useEffect(() => {
    const resolveDeckId = async () => {
      if (goalId) {
        try {
          const response = await axios.get(`/api/v1/goals/${goalId}`);
          const goal = response.data;
          if (goal.deck_id) {
            setResolvedDeckId(goal.deck_id);
          } else {
            console.error("Goal does not have an associated deck_id.");
          }
        } catch (error) {
          console.error("Failed to fetch goal:", error);
        }
      } else if (deckId) {
        setResolvedDeckId(deckId);
      }
    };

    resolveDeckId();
  }, [deckId, goalId]);

  if (!resolvedDeckId) {
    return <p>Loading study session...</p>;
  }

  return (
    <div className="study-page">
      <BackgroundStudy deckId={resolvedDeckId} goalId={goalId} />
      <ForegroundStudy deckId={resolvedDeckId} goalId={goalId} from={from}/>
      {/* {resolvedDeckId && (
        <StudySession deckId={resolvedDeckId} goalId={goalId} />
      )} */}
    </div>
  );
};

export default Study;

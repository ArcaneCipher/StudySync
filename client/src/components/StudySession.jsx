import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startSession,
  endSession,
  addNotes,
  resetSession,
  logSession,
} from "../features/studySessions/studySessionSlice";
import { submitStudySession } from "../features/studySessions/studySessionSlice";
import { CirclePlus, CircleX } from "lucide-react";
import Button from "./Button";
import Textarea from "./Textarea";
import { motion } from "framer-motion";

const StudySession = ({ deckId, goalId }) => {
  // <-- accept both
  const dispatch = useDispatch();
  const session = useSelector((state) => state.studySession);
  const authUser = useSelector((state) => state.auth.user); // Get logged in user
  const [noteInput, setNoteInput] = useState("");
  const [isNote, setIsNote] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);

  useEffect(() => {
    console.log("Current session state:", session);
  }, [session]);

  useEffect(() => {
    if (session?.startTime || session?.deckId) {
      console.log("Resetting session state on mount...");
      dispatch(resetSession());
    }
  }, []);

  const handleStart = () => {
    console.log("Start clicked. Deck ID:", deckId, "Goal ID:", goalId);
    dispatch(startSession({ deckId, goalId })); // <-- both deck and goal
    setStartTimestamp(Date.now());
  };

  const handleEnd = () => {
    if (!startTimestamp) return;

    const end = Date.now();
    const duration = Math.floor((end - startTimestamp) / 60000);
    dispatch(endSession({ endTime: end, duration }));
    dispatch(logSession());

    // Submit to server
    const {
      deckId: currentDeckId,
      goalId: currentGoalId,
      durationMin,
      notes,
    } = session;
    if (durationMin > 0 && currentGoalId) {
      dispatch(
        submitStudySession({
          user_id: authUser?.id,
          goal_id: currentGoalId,
          duration_min: durationMin,
          notes: notes || "",
        })
      );
    }
    setStartTimestamp(null);

    setTimeout(() => dispatch(resetSession()), 120000);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  const handleNoteSubmit = () => {
    dispatch(addNotes(noteInput));
    setNoteInput("");
    setIsNote(false);
  };

  const handleNotes = () => {
    setIsNote((prev) => !prev);
  };

  const isSessionActive = session.startTime && !session.endTime;

  return (
    <div
      className={`${!session.startTime ? "start-session" : "study-session"}`}
    >
      {!session.startTime ? (
        <Button variant="primary" onClick={handleStart}>
          Start Study Session
        </Button>
      ) : isSessionActive ? (
        <>
          <p className="running-session">
            Session started at:{" "}
            {new Date(session.startTime).toLocaleTimeString()}
          </p>
          <Button
            variant="primary"
            className="btn-add-notes"
            onClick={handleNotes}
          >
            Add Notes <CirclePlus />
          </Button>
          {isNote && (
            <div className="notes-modal">
              <Textarea
                value={noteInput}
                label="Notes"
                onChange={handleNoteChange}
                placeholder="Add notes..."
              />
              <Button onClick={handleNoteSubmit}>Save Notes</Button>
              <CircleX onClick={handleNotes} />
            </div>
          )}
          <Button
            variant="primary"
            className="btn-end-session"
            onClick={handleEnd}
          >
            End Study Session
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default StudySession;

// React + Redux imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import session-related actions from Redux slice
import {
  startSession,
  endSession,
  addNotes,
  resetSession,
  logSession,
  submitStudySession,
} from "../features/studySessions/studySessionSlice";

// UI and animations
import { CirclePlus, CircleX } from "lucide-react";
import Button from "./Button";
import Textarea from "./Textarea";
import { motion } from "framer-motion";

// Main StudySession component
const StudySession = ({ deckId, goalId }) => {
  const dispatch = useDispatch();

  // Get current study session state
  const session = useSelector((state) => state.studySession);

  // Get logged-in user (needed for saving a session)
  const authUser = useSelector((state) => state.auth.user);

  // Local state for note input and modal toggle
  const [noteInput, setNoteInput] = useState("");
  const [isNote, setIsNote] = useState(false);

  // Local state to track session start timestamp (for manual duration calculation)
  const [startTimestamp, setStartTimestamp] = useState(null);

  // 🚨 BAD: This nukes the session **every time the component mounts**!
  // 🚫 REMOVE THIS useEffect immediately:
  /*
  useEffect(() => {
    dispatch(resetSession());
  }, [dispatch]);
  */

  // ✅ Correct initialization: Start a session once the deckId (and optionally goalId) are known
  useEffect(() => {
    if (deckId) {
      console.log(
        "Initializing session with deckId:",
        deckId,
        "and goalId:",
        goalId
      );
      dispatch(startSession({ deckId, goalId }));
    }
  }, [deckId, goalId, dispatch]);

  // Debugging - optional, to track session changes
  useEffect(() => {
    console.log("Current session state:", session);
  }, [session]);

  // Handler to manually start session if needed (usually not triggered because auto-start happens)
  const handleStart = () => {
    console.log("Manual Start clicked. Deck ID:", deckId, "Goal ID:", goalId);
    dispatch(startSession({ deckId, goalId }));
    setStartTimestamp(Date.now());
  };

  // Handler to manually end session
  const handleEnd = () => {
    if (!startTimestamp) return; // Prevent ending if session never started

    const end = Date.now();
    const duration = Math.floor((end - startTimestamp) / 60000);

    dispatch(endSession({ endTime: end, duration }));
    dispatch(logSession());

    // Submit session to server if this session is tied to a goal
    if (duration > 0 && goalId) {
      dispatch(
        submitStudySession({
          user_id: authUser?.id,
          goal_id: goalId,
          duration_min: duration,
          notes: session.notes || "",
        })
      );
    }

    // Clear local timestamp
    setStartTimestamp(null);

    // Schedule full reset AFTER a delay, so user sees summary (120 seconds)
    setTimeout(() => dispatch(resetSession()), 120000);
  };

  // Track textarea input for session notes
  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  // Submit notes to Redux state
  const handleNoteSubmit = () => {
    dispatch(addNotes(noteInput));
    setNoteInput("");
    setIsNote(false);
  };

  // Toggle add-note modal open/close
  const handleNotes = () => {
    setIsNote((prev) => !prev);
  };

  // Determine if a session is actively running (started but not ended)
  const isSessionActive = session.startTime && !session.endTime;

  return (
    <div
      className={`${!session.startTime ? "start-session" : "study-session"}`}
    >
      {/* 
        Display "Start Session" button if no session is active.
        Otherwise show the active session UI.
      */}
      {!session.startTime ? (
        <Button variant="primary" onClick={handleStart}>
          Start Study Session
        </Button>
      ) : isSessionActive ? (
        <>
          {/* Show session start time */}
          <p className="running-session">
            Session started at:{" "}
            {new Date(session.startTime).toLocaleTimeString()}
          </p>

          {/* Button to add notes */}
          <Button
            variant="primary"
            className="btn-add-notes"
            onClick={handleNotes}
          >
            Add Notes <CirclePlus />
          </Button>

          {/* Notes modal */}
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

          {/* End Session button */}
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

      {/* Animate background blur if notes modal open */}
      {isNote && (
        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsNote(false)}
        />
      )}
    </div>
  );
};

export default StudySession;

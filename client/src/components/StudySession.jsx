import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startSession, endSession, addNotes, resetSession, logSession } from '../features/studySessions/studySessionSlice';
import { updateFlashcard } from '../features/flashcards/flashcardsSlice';

const StudySession = () => {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const session = useSelector((state) => state.studySession);
  const [noteInput, setNoteInput] = useState('');
  const [startTimestamp, setStartTimestamp] = useState(null);

//debug log session state when it updates
useEffect(() => {
  console.log("Current session state:", session);
}, [session]);

useEffect(() => {
  if (session?.startTime || session?.deckId) {
    console.log("Resetting session state on mount...");
    dispatch({ type: 'studySession/resetSession' });
  }
}, []);


  const handleStart = () => {
    console.log("Start clicked. Deck ID:", deckId);
    dispatch(startSession({ deckId }));
    setStartTimestamp(Date.now());
  };

  const handleEnd = () => {
    if (!startTimestamp) return;

    const end = Date.now();
    const duration = Math.floor((end - startTimestamp) / 60000)
    dispatch(endSession({ endTime: end, duration }));
    dispatch(logSession());
    setStartTimestamp(null);

    //resetting session after 2 minutes so user can see time of study after 2 minutes
    setTimeout(() => dispatch(resetSession()), 120000);
  };

  const handleNoteChange = (e) => {
    setNoteInput(e.target.value);
  };

  const handleNoteSubmit = () => {
    dispatch(addNotes(noteInput));
    setNoteInput('');
  };

  return (
    <div>
      {!session.startTime ? (
        <button onClick={handleStart}>Start Study Session</button>
      ) : (
        <>
          <p>Session started at: {new Date(session.startTime).toLocaleTimeString()}</p>
          <textarea
            value={noteInput}
            onChange={handleNoteChange}
            placeholder="Add notes..."
          />
          <button onClick={handleNoteSubmit}>Save Notes</button>
          <br />
          <button onClick={handleEnd}>End Study Session</button>
          {session.endTime && session.durationMin !== null && (
            <p>Session lasted {session.durationMin} minute{session.durationMin !== 1 ? 's' : ''}</p>
          )}
        </>
      )}
    
    {/*Display session history for verification */}
    {session.sessionHistory.length > 0 && (
        <div>
          <h3>Session History:</h3>
          <ul>
            {session.sessionHistory.map((sesh, index) => (
              <li key={index}>
                Deck: {sesh.deckId || 'N/A'} | Duration: {sesh.durationMin} min | Notes: {sesh.notes || 'None'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudySession;
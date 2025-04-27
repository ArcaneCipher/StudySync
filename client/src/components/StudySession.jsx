import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startSession, endSession, addNotes, resetSession, logSession } from '../features/studySessions/studySessionSlice';
import { CirclePlus, CircleX} from "lucide-react";
import Button from './Button';
import Textarea from './Textarea';
import { motion } from "framer-motion";

const StudySession = () => {
  const dispatch = useDispatch();
  const { deckId } = useParams();
  const session = useSelector((state) => state.studySession);
  const [noteInput, setNoteInput] = useState('');
  const [isNote, setIsNote] = useState(false);
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
    setIsNote(false);
  };

  const handleNotes = () => {
    setIsNote(prev => !prev);
  };

  
  const isSessionActive = session.startTime && !session.endTime;

  return (
    <div className={`${!session.startTime ? 'start-session' : 'study-session' }`}>
      {!session.startTime ? (
        <Button variant='primary' onClick={handleStart}>Start Study Session</Button>
      ) :  isSessionActive ? (
        <>
          <p className='running-session'>Session started at: {new Date(session.startTime).toLocaleTimeString()}</p>
          <Button variant='primary' className='btn-add-notes' onClick={handleNotes}>Add Notes <CirclePlus /></Button>
          {
            isNote && 
            <div className='notes-modal'>
              <Textarea
                value={noteInput} label='Notes'
                onChange={handleNoteChange}
                placeholder="Add notes..."
              />
              <Button onClick={handleNoteSubmit}>Save Notes</Button>
              <CircleX onClick={handleNotes} />
            </div>
          }
          <Button variant='primary' className='btn-end-session' onClick={handleEnd}>End Study Session</Button>          
        </>
      ) : '' }
      {session.endTime && session.durationMin !== null && (
         <p className='session-lasted'>Session lasted {session.durationMin} minute{session.durationMin !== 1 ? 's' : ''}</p>
      )}
    
    {/*Display session history for verification */}
    { session.sessionHistory.length > 0 && (
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

        {isNote && (
            <motion.div 
              className="backdrop" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
              onClick={() => handleNotes(false)}
            />
          )}
    </div>
  );
};

export default StudySession;
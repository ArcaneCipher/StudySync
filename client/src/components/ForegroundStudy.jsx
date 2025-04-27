import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StudySession from '../components/StudySession';
import { fetchFlashcards } from '../features/flashcards/flashcardsSlice';
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import FlashcardStudy from '../components/FlashcardStudy';
import { motion } from "framer-motion";


const ForegroundStudy = () => {
  const session = useSelector((state) => state.studySession);

  const [flippedCards, setFlippedCards] = useState({});
  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleExpand = (id) => {
    setExpandedCardId(prev => {
      // if collapsing, unflip the card too
      if (prev === id) {
        setFlippedCards(flips => ({
          ...flips,
          [id]: false,
        }));
        return null; // collapse
      }
      return id; // expand
    });
  };

  const ref = useRef(null);
  const { deckId } = useParams();
  const dispatch = useDispatch();

  // Select flashcards, status, and error from Redux store for the current deck
  const flashcardData = useSelector((state) => state.flashcards.byDeckId[deckId]);
  const flashcards = flashcardData?.flashcards || [];
 //  const isLoading = flashcardData?.status === 'loading';
  const isLoading = !flashcardData || flashcardData.status === 'loading';
  const error = flashcardData?.error;

  // Fetch flashcards

  useEffect(() => {
    if (deckId) {
      console.log('Fetching flashcards for deck:', deckId);
      dispatch(fetchFlashcards(deckId));
    }
  }, [deckId, dispatch]);
  
  const isSessionActive = session.startTime && !session.endTime;

  return (
    <div className='foreground-study'>
      { session.endTime && <Link className='flex align-items-center gap10 mb1' to="/decks"><ArrowLeft /> Decks</Link>}
      <StudySession deckId={deckId} />
      {/* Conditionally render flashcards once the session has started */}
      {isSessionActive && (
        <div>
          { isLoading ?  (
            <p className='no-flashcards'> </p>
          ) : (
            flashcards.length > 0 ? (
              <div className='flashcards-study' ref={ref}> 
                {flashcards.map(card => (
                  <FlashcardStudy key={card.id}    
                    reference={ref}    
                    flashcard_id={card.id}         
                    front_text={card.front_text}
                    back_text={card.back_text}
                    isFlip={!!flippedCards[card.id]}
                    isExpand={expandedCardId === card.id}
                    onClick={() => handleFlip(card.id)}
                    onExpand={() => handleExpand(card.id)}
                  />
                ))}
              </div>
            ) : (
              <p className='no-flashcards'>No flashcards found for this deck.</p>
            )
          )} 

          {expandedCardId && (
            <motion.div 
              className="backdrop" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedCardId(null)} // Optional: click backdrop to close
            />
          )}
        </div>
      )}



    </div>
  );
};

export default ForegroundStudy;

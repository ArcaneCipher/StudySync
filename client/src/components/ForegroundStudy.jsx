import { useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcards } from "../features/flashcards/flashcardsSlice";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FlashcardStudy from "./FlashcardStudy";
import { motion } from "framer-motion";
import Button from "./Button";

const ForegroundStudy = ({ deckId, goalId, from}) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.studySession);
  const ref = useRef(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [expandedCardId, setExpandedCardId] = useState(null);
  const navigate = useNavigate();


  const handleBack = () => {
    if (from  === 'goals') {
      navigate('/goals');
    } else if (from  === 'decks') {
      navigate('/decks');
    } else {
      navigate('/'); // fallback in case no state is found
    }
  };


  const handleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };

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


  const flashcardData = useSelector(
    (state) => state.flashcards.byDeckId[deckId]
  );
  const flashcards = flashcardData?.flashcards || [];
  const isLoading = !flashcardData || flashcardData.status === "loading";

  useEffect(() => {
    if (deckId) {
      console.log("Fetching flashcards for deck:", deckId);
      dispatch(fetchFlashcards(deckId));
    }
  }, [deckId, dispatch]);

  const isSessionActive = session.startTime && !session.endTime;

  return (
    <div className="foreground-study">
      {/* {session.endTime && ( */}
        {/* <Link className="flex align-items-center gap10 mb1" to="/decks">
          <ArrowLeft /> Back
        </Link> */}
        <Button className="flex align-items-center gap10 mb1 p0" onClick={handleBack} variant="ghost">
          <ArrowLeft /> Back
        </Button>
      {/* )} */}
      {isSessionActive && (
        <div>
          {isLoading ? (
            <p className="no-flashcards"></p>
          ) : flashcards.length > 0 ? (
            <div className="flashcards-study"  ref={ref}>
              {flashcards.map((card) => (
                <FlashcardStudy
                  key={card.id}
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
            <p className="no-flashcards">No flashcards found.</p>
          )}
        </div>
      )}
      {expandedCardId && (
        <motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setExpandedCardId(null)}
        />
      )}
    </div>
  );
};

export default ForegroundStudy;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcards } from "../features/flashcards/flashcardsSlice";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FlashcardStudy from "./FlashcardStudy";
import { motion } from "framer-motion";

const ForegroundStudy = ({ deckId, goalId }) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.studySession);

  const [flippedCards, setFlippedCards] = useState({});
  const [expandedCardId, setExpandedCardId] = useState(null);

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
      {session.endTime && (
        <Link className="flex align-items-center gap10 mb1" to="/decks">
          <ArrowLeft /> Back
        </Link>
      )}
      {isSessionActive && (
        <div>
          {isLoading ? (
            <p className="no-flashcards"></p>
          ) : flashcards.length > 0 ? (
            <div className="flashcards-study">
              {flashcards.map((card) => (
                <FlashcardStudy
                  key={card.id}
                  flashcard_id={card.id}
                  front_text={card.front_text}
                  back_text={card.back_text}
                  isFlip={!!flippedCards[card.id]}
                  isExpand={expandedCardId === card.id}
                  onClick={() =>
                    setFlippedCards((prev) => ({
                      ...prev,
                      [card.id]: !prev[card.id],
                    }))
                  }
                  onExpand={() =>
                    setExpandedCardId((prev) =>
                      prev === card.id ? null : card.id
                    )
                  }
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

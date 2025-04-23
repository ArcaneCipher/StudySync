import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { Expand, CircleX } from 'lucide-react';
import Button from './Button';
import Textarea from './Textarea';
import useIsMobile from '../hooks/useIsMobile';
import { submitFlashcardReview } from '../features/review/flashcardReviewSlice';

const FlashcardStudy = ({ 
  flashcard_id,
  front_text, 
  back_text, 
  reference, 
  onClick, 
  isFlip, 
  onExpand, 
  isExpand 
}) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile(1200);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const user_id = 1;

  const handleRatingClick = async (level) => {
    if (!user_id || !flashcard_id) return;
    setSelectedRating(level);
    const easeMap = { easy: 3, medium: 2, hard: 1 };
    const ease_rating = easeMap[level];
    const reviewed_at = new Date().toISOString();
    const next_due = calculateNextDue(level);

    const reviewData = {
      user_id,
      flashcard_id,
      ease_rating,
      reviewed_at,
      next_due,
    };

    setIsSubmitting(true);
    await dispatch(submitFlashcardReview(reviewData));
    setIsSubmitting(false);
    // onExpand(); // flip back or move to next card
  };

  useEffect(() => {
    if (!isExpand) {
      setSelectedRating(null);
    }
  }, [isExpand]);

  const calculateNextDue = (difficulty) => {
    const today = new Date();
    const daysToAdd = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 2 : 1;
    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString().split('T')[0];
  };

  return (
    <motion.div key={`${isExpand}-${isMobile}`}
      layout drag={!isMobile && !isExpand}
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      className={`flashcard${isFlip ? ' flip' : ''}${isExpand ? ' expand' : ''}`}
    >
      <div className="front">
        <motion.h3>{front_text}</motion.h3>
        {!isExpand && <Expand onClick={onExpand} />}
        {isExpand && (
          <motion.div>
            <CircleX onClick={onExpand} />
            <Textarea rows='10' />
            <Button variant="primary" onClick={onClick}>Verify Answer</Button>
          </motion.div>
        )}
      </div>

      <div className="back">
        {isExpand && <CircleX onClick={onExpand} />}
        <p>{back_text}</p>

        <h4>Difficulty Rating</h4>
        <div className="rating-options">
          {['easy', 'medium', 'hard'].map(level => (
            <Button
              key={level}
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => handleRatingClick(level)}
              className={selectedRating === level ? 'selected' : ''}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>

        <Button variant="primary" onClick={onClick}>Flip</Button>
      </div>
    </motion.div>
  );
};

export default FlashcardStudy;

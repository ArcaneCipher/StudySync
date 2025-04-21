import { useState } from 'react';
import { motion } from "framer-motion";
import { Expand, CircleX } from 'lucide-react';
import Button from './Button';
import Textarea from './Textarea';
import useIsMobile from '../hooks/useIsMobile';

const FlashcardStudy = ({ 
  front_text, 
  back_text, 
  reference, 
  onClick, 
  isFlip, 
  onExpand, 
  isExpand 
}) => {

  const isMobile = useIsMobile(1200);
  const [difficulty, setDifficulty] = useState(null); // null | 'easy' | 'medium' | 'hard'
  return (
    <motion.div key={`${isExpand}-${isMobile}`}
                layout drag={!isMobile && !isExpand}
                transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                dragConstraints={reference}
                whileDrag={{scale:1.2}}
                className={`flashcard${isFlip ? ' flip' : ''}${isExpand ? ' expand' : ''}`} 
    >
        
      <div className="front">
        <motion.h3>{front_text}</motion.h3>
        {!isExpand && <Expand onClick={onExpand}  /> }
        {isExpand && (
          <motion.div>
            <CircleX onClick={onExpand} />
            <Textarea rows='10'/>
            <Button variant="primary" onClick={onClick}>Verify Answer</Button>
          </motion.div>
        )}
      </div>
      <div className="back">
        {isExpand && <CircleX onClick={onExpand} />}
        <p>
          {back_text}
        </p>

        {/* Difficulty Rating */}
        <h4>Difficulty Rating</h4>
        <div className="rating-options">
            {['easy', 'medium', 'hard'].map(level => (
              <Button variant='secondary'
                key={level}
                className={difficulty === level ? 'selected' : ''}
                onClick={() => setDifficulty(level)}
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

import React from 'react';
import { Link } from 'react-router-dom';
import Flashcards from './Flashcard';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import ToggleSwitch from './ToggleSwitch';
import { AnimatePresence, motion } from "framer-motion";
import { CirclePlus, CircleX, SquarePen } from 'lucide-react'; 

const DeckCard = ({
  deck,
  editingDeckId,
  editForm,
  setEditForm,
  setEditingDeckId,
  handleUpdate,
  handleDelete,
  handleEditClick
}) => {
  const isEditing = editingDeckId === deck.id;

  return (
    <>
      <div className='deck-wrapper'>
        <div className="deck-card">
          <CircleX onClick={() => handleDelete(deck.id)}/>
            <h3>{deck.title}</h3>
            <p>{deck.description}</p>
            <Button variant='primary'><Link to={`/study/${deck.id}`}>Study</Link></Button>
            <div className="edit-overlay">
              <SquarePen onClick={() => handleEditClick(deck)}/>       
            </div>
           {/* <p><strong>{deck.is_public ? 'Public' : 'Private'}</strong></p> */}
        </div>
        <div className="flashcards-wrapper">
          <AnimatePresence mode="wait">   
            {isEditing && 
              <motion.div className='deck-edit'
                key="flashcards"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Input
                  type="text"
                  value={editForm.title} label="Title"
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  value={editForm.description} rows={2} label="Description"
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <ToggleSwitch 
                  isPublic={editForm.is_public}  
                  onChange={(newVal) =>
                    setEditForm({ ...editForm, is_public: newVal })
                  } 
                />
                <div className="btn-row">  
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button onClick={() => setEditingDeckId(null)}>Cancel</Button>
                </div>
              </motion.div> 
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {!isEditing && 
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Flashcards deckId={deck.id} />
                </motion.div>
            }       
          </AnimatePresence> 
        </div> 
      </div>
    </>
  );
};

export default DeckCard;

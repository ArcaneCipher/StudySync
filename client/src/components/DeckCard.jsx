import React from 'react';
import { Link } from 'react-router-dom';
import Flashcards from './Flashcard';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import ToggleSwitch from './ToggleSwitch';
import AnimatedCard from './AnimatedCard';
import { AnimatePresence, } from "framer-motion";
import { CircleX, SquarePen, Trash2 } from 'lucide-react'; 

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
          <h3>{deck.title}</h3>
          <p>{deck.description}</p>
          <div className='mobile-btn-row'>
            <Button variant='primary'><Link to={`/study/${deck.id}`}>Study</Link></Button>
            <div className="edit-overlay">
              <SquarePen onClick={() => handleEditClick(deck)}/>  
              <Trash2 onClick={() => handleDelete(deck.id)}/>     
            </div>
          </div>
          <CircleX onClick={() => handleDelete(deck.id)}/>
           {/* <p><strong>{deck.is_public ? 'Public' : 'Private'}</strong></p> */}
        </div>
        <div className="flashcards-wrapper">
          <AnimatePresence mode="wait">   
            {isEditing && 
              <AnimatedCard className='deck-edit'
                key="decks"
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
                  <Button variant='secondary' onClick={() => setEditingDeckId(null)}>Cancel</Button>
                </div>
              </AnimatedCard> 
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {!isEditing && 
              <AnimatedCard
                key="flashcards"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Flashcards deckId={deck.id} />
                </AnimatedCard>
            }       
          </AnimatePresence> 
        </div> 
      </div>
    </>
  );
};

export default DeckCard;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from '../features/flashcards/flashcardsSlice';
import { CirclePlus, CircleX, SquarePen, Trash2 } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';

// Flashcards component for viewing, creating, editing, and deleting flashcards in a given deck
const Flashcards = ({ deckId }) => {
  const dispatch = useDispatch()

  // Select flashcards, status, and error from Redux store for the current deck
  const flashcardData = useSelector((state) => state.flashcards.byDeckId[deckId]);
  const flashcards = flashcardData?.flashcards || [];
  const status = flashcardData?.status === 'loading';
  const error = flashcardData?.error;

  const [newCard, setNewCard] = useState(false); 

  const addNewCard = () => {
    setNewCard((prev) => !prev);
  }
  const closeForm = () => {
    setNewCard(false);
    setEditingId(null);
    setForm({ front_text: '', back_text: '', image_url: null, audio_url: null });
  }
  // Local state for form input and edit mode
  const [form, setForm] = useState({ front_text: '', back_text:'', image_url: null, audio_url: null });
  const [editingId, setEditingId] = useState(null);

  // Fetch flashcards when deckId changes or component mounts
  useEffect(() => {
    if (deckId) {
      dispatch(fetchFlashcards(deckId));
    }
  }, [deckId, dispatch]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission (create or update)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      // Update existing flashcard
      dispatch(updateFlashcard({ id: editingId, flashcardData: form }));
      setEditingId(null);
      setNewCard(false); 
    } else {
      // Create new flashcard
      dispatch(createFlashcard({ deckId, flashcardData: form }));
    }
    // Reset form after submission
    setForm({ front_text: '', back_text: '', image_url: null, audio_url: null });
  }

  // Fill form with selected flashcard data for editing
  const handleEdit = (card) => {
    setForm({
      front_text: card.front_text,
      back_text: card.back_text,
      image_url: card.image_url,
      audio_url: card.audio_url,
    });
    setEditingId(card.id);    
    setNewCard(true);
  }

  // Delete flashcard from the store and database
  const handleDelete = (id) => {
    dispatch(deleteFlashcard({ id: id, deck_id: deckId }));
  }

  return (
    <>

      {/* Show loading and error messages */}
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

  
      {/* List of flashcards */}
      <div className={`flashcards ${newCard ? 'new-card' : ''}`}>
        {flashcards.map((card) => (
          <div key={card.id} className="card">
            <h4>{card.front_text}</h4>
            <div className="edit-overlay">
              <SquarePen onClick={() => handleEdit(card)}/>    
              <Trash2 onClick={() => handleDelete(card.id)}/>      
            </div>
            <CircleX onClick={() => handleDelete(card.id)}/>
          </div>
        ))}
        <div className={`card${newCard ? ' widecard' : ''}`}>
          <CirclePlus onClick={addNewCard} />

          {/* Form for adding or editing flashcards */}
          {
            newCard && 
            <form onSubmit={handleSubmit}>
              <h4>{editingId ? 'Update' : 'Add new'} Flashcard</h4>
              <CircleX onClick={closeForm}/>
              <Input 
                type="text"
                name="front_text"
                label="Question"
                value={form.front_text}
                onChange={handleChange} 
                required 
              />
              <Textarea
                name="back_text"
                label="Answer"
                value={form.back_text}
                onChange={handleChange}
                required />
              <Button type="submit" variant='primary'>
                {editingId ? 'Update' : 'Add'}
              </Button>
            </form>
          }      
        </div>
      </div>
    </>
  )
}

export default Flashcards

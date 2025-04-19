import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} from '../features/decks/decksSlice';
import DeckCard from '../components/DeckCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import ToggleSwitch from '../components/ToggleSwitch';
import { CirclePlus } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion";


const Decks = () => {
  const dispatch = useDispatch();
  const { decks, status, error } = useSelector(state => state.decks);

  const [newDeck, setNewDeck] = useState({
    title: '',
    description: '',
    is_public: false,
    user_id: 1
  });

  const [addNewDeck, setAddNewDeck] = useState(false);

  const [editingDeckId, setEditingDeckId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    is_public: false
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDecks());
    }
  }, [dispatch, status]);

  const handleCreate = () => {
    dispatch(createDeck(newDeck));
    setNewDeck({ title: '', description: '', is_public: false, user_id: 1 });
    setAddNewDeck(false);
  };

  const handleEditClick = (deck) => {
    setEditingDeckId(deck.id);
    setEditForm({
      title: deck.title,
      description: deck.description,
      is_public: deck.is_public,
    });
  };

  const handleUpdate = () => {
    dispatch(updateDeck({ id: editingDeckId, updates: editForm }));
    setEditingDeckId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteDeck(id));
  };

  const handleNewDeck = () => {
    setAddNewDeck((prev) => !prev);
  }

  return (
    <>
      <div className="btn-deck-create">
        <Button variant="primary" onClick={handleNewDeck}>Add New Deck <CirclePlus /></Button>
      </div>
      <AnimatePresence mode="wait">  
      {
        addNewDeck && <motion.div className='deck-create'
        key="decks"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}>
          <h2>Create New Deck</h2>
          <Input
            type="text"
            value={newDeck.title}
            onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })}
            label="Title"
          />
          <Textarea
            value={newDeck.description}
            onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })}
            label="Description"
          />
          <ToggleSwitch 
                  isPublic={newDeck.is_public}  
                  onChange={(newVal) =>
                    setNewDeck({ ...newDeck, is_public: newVal })
                  } 
                />
          <div className="btn-row mt20">
            <Button onClick={handleCreate}>Create Deck</Button>
            <Button variant='secondary' onClick={handleNewDeck}>Cancel</Button>
          </div>
        </motion.div>
      }
      </AnimatePresence>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        decks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            editingDeckId={editingDeckId}
            editForm={editForm}
            setEditForm={setEditForm}
            setEditingDeckId={setEditingDeckId}
            handleEditClick={handleEditClick}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))
      )}

      
    </>
  );
};

export default Decks;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} from '../features/decks/decksSlice';
import DeckCard from '../components/DeckCard';

const Decks = () => {
  const dispatch = useDispatch();
  const { decks, status, error } = useSelector(state => state.decks);

  const [newDeck, setNewDeck] = useState({
    title: '',
    description: '',
    is_public: false,
    user_id: 1
  });

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

  return (
    <>
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

      <h3>Create New Deck</h3>
      <input
        type="text"
        value={newDeck.title}
        onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={newDeck.description}
        onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })}
        placeholder="Description"
      />
      <label>
        <input
          type="checkbox"
          checked={newDeck.is_public}
          onChange={(e) =>
            setNewDeck({ ...newDeck, is_public: e.target.checked })
          }
        />
        Public
      </label>
      <button onClick={handleCreate}>Create Deck</button>
    </>
  );
};

export default Decks;

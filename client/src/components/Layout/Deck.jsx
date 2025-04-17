import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} from '../../features/decks/decksSlice';
import Flashcards from "./Flashcard";

// Deck component manages a list of flashcard decks (CRUD operations) and renders Flashcards for each deck
const Deck = () => {
  const dispatch = useDispatch()

  // Grab deck data, loading status, and any errors from the Redux store
  const { decks, status, error } = useSelector(state => state.decks)

  // State for new deck creation
  const [newDeck, setNewDeck] = useState({
    title: '',
    description: '',
    is_public: false,
    user_id: 1 // assuming user_id is static for now
  })

  // State for deck editing
  const [editingDeckId, setEditingDeckId] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    is_public: false
  })

  // Fetch all decks on first render (if not already fetched)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDecks())
    }
  }, [dispatch, status])

  // Create a new deck and reset form
  const handleCreate = () => {
    dispatch(createDeck(newDeck))
    setNewDeck({ title: '', description: '', is_public: false, user_id: 1 })
  }

  // Enter editing mode for selected deck
  const handleEditClick = (deck) => {
    setEditingDeckId(deck.id)
    setEditForm({
      title: deck.title,
      description: deck.description,
      is_public: deck.is_public,
    })
  }

  // Update the selected deck
  const handleUpdate = () => {
    dispatch(updateDeck({ id: editingDeckId, updates: editForm }))
    setEditingDeckId(null)
  }

  // Delete selected deck
  const handleDelete = (id) => {
    dispatch(deleteDeck(id))
  }

  return (
    <div>
      <h2>Decks</h2>

      {/* Loading state */}
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        // Render each deck
        decks.map((deck) => (
          <div key={deck.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            
            {/* If deck is in edit mode, show editable form */}
            {editingDeckId === deck.id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.is_public}
                    onChange={(e) =>
                      setEditForm({ ...editForm, is_public: e.target.checked })
                    }
                  />
                  Public
                </label>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingDeckId(null)}>Cancel</button>
              </div>
            ) : (
              // Otherwise, display deck info and flashcards
              <div>
                <h3>{deck.title}</h3>
                <p>{deck.description}</p>
                <p>
                  <strong>{deck.is_public ? 'Public' : 'Private'}</strong>
                </p>

                {/* Flashcards component rendered for each deck */}
                <Flashcards deckId={deck.id} />

                {/* Deck controls */}
                <button onClick={() => handleEditClick(deck)}>Edit</button>
                <button onClick={() => handleDelete(deck.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}

      {/* New Deck Creation Form */}
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
    </div>
  )
}

export default Deck;

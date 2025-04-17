import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from '../../features/flashcards/flashcardsSlice'

// Flashcards component for viewing, creating, editing, and deleting flashcards in a given deck
const Flashcards = ({ deckId }) => {
  const dispatch = useDispatch()

  // Select flashcards, status, and error from Redux store for the current deck
  const flashcardData = useSelector((state) => state.flashcards.byDeckId[deckId])
  const flashcards = flashcardData?.flashcards || []
  const status = flashcardData?.status === 'loading'
  const error = flashcardData?.error

  // Local state for form input and edit mode
  const [form, setForm] = useState({ front_text: '', back_text:'', image_url: null, audio_url: null })
  const [editingId, setEditingId] = useState(null)

  // Fetch flashcards when deckId changes or component mounts
  useEffect(() => {
    if (deckId) {
      console.log('Fetching flashcards for deck:', deckId)
      dispatch(fetchFlashcards(deckId))
    }
  }, [deckId, dispatch])

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission (create or update)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      // Update existing flashcard
      dispatch(updateFlashcard({ id: editingId, flashcardData: form }))
      setEditingId(null)
    } else {
      // Create new flashcard
      dispatch(createFlashcard({ deckId, flashcardData: form }))
    }
    // Reset form after submission
    setForm({ front_text: '', back_text: '', image_url: null, audio_url: null })
  }

  // Fill form with selected flashcard data for editing
  const handleEdit = (card) => {
    setForm({
      front_text: card.front_text,
      back_text: card.back_text,
      image_url: card.image_url,
      audio_url: card.audio_url,
    })
    setEditingId(card.id)
  }

  // Delete flashcard from the store and database
  const handleDelete = (id) => {
    dispatch(deleteFlashcard({ id: id, deck_id: deckId }))
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Flashcards</h2>

      {/* Show loading and error messages */}
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form for adding or editing flashcards */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="front_text"
          placeholder="Question"
          value={form.front_text}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="back_text"
          placeholder="Answer"
          value={form.back_text}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* List of flashcards */}
      <ul>
        {flashcards.map((card) => (
          <li key={card.id} className="mb-2">
            <div className="flex items-center justify-between">
              <span>
                <strong>{card.front_text}:</strong> {card.back_text}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(card)}
                  className="text-sm text-yellow-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Flashcards

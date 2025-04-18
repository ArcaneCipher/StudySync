import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// GET flashcards for a deck
export const fetchFlashcards = createAsyncThunk('flashcards/fetchFlashcards', async (deckId) => {
  const res = await axios.get(`/api/v1/decks/${deckId}/flashcards`)
  return { deckId, flashcards: res.data } 
})

// POST a new flashcard
export const createFlashcard = createAsyncThunk('flashcards/createFlashcard', async ({ deckId, flashcardData }) => {
  const res = await axios.post(`/api/v1/decks/${deckId}/flashcards`, { flashcard: flashcardData })
  return res.data
})

// PATCH update a flashcard
export const updateFlashcard = createAsyncThunk('flashcards/updateFlashcard', async ({ id, flashcardData }) => {
  const res = await axios.patch(`/api/v1/flashcards/${id}`, { flashcard: flashcardData })
  return res.data
})

// DELETE a flashcard
export const deleteFlashcard = createAsyncThunk('flashcards/deleteFlashcard', async ({ id }) => {
  await axios.delete(`/api/v1/flashcards/${id}`)
  return id
})

// Initial state
const initialState = {
  byDeckId: {}, // { [deckId]: { flashcards: [], status, error } }
  status: 'idle',
  error: null,
}

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch flashcards
      .addCase(fetchFlashcards.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        const { deckId, flashcards } = action.payload
        state.byDeckId[deckId] = {
          flashcards,
          status: 'succeeded',
          error: null,
        }
        state.status = 'succeeded'
      })
      .addCase(fetchFlashcards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Create flashcard
      .addCase(createFlashcard.fulfilled, (state, action) => {
        const deckId = action.payload.deck_id
        if (!state.byDeckId[deckId]) {
          state.byDeckId[deckId] = {
            flashcards: [],
            status: 'idle',
            error: null,
          }
        }
        state.byDeckId[deckId].flashcards.push(action.payload)
      })

      // Update flashcard
      .addCase(updateFlashcard.fulfilled, (state, action) => {
        const deckId = action.payload.deck_id
        const flashcards = state.byDeckId[deckId]?.flashcards
        if (flashcards) {
          const index = flashcards.findIndex(f => f.id === action.payload.id)
          if (index !== -1) {
            flashcards[index] = action.payload
          }
        }
      })

      // Delete flashcard
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        const { id, deck_id } = action.meta.arg
        const flashcards = state.byDeckId[deck_id]?.flashcards
        if (flashcards) {
          state.byDeckId[deck_id].flashcards = flashcards.filter(f => f.id !== id)
        }
      })
  },
})

export default flashcardsSlice.reducer

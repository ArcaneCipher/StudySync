import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks

export const fetchDecks = createAsyncThunk(
  "decks/fetchDecks",
  async (userId = null) => {
    let url = "/api/v1/decks";
    if (userId) {
      url += `?user_id=${userId}`;
    }
    const res = await axios.get(url);
    return res.data;
  }
);

export const createDeck = createAsyncThunk(
  "decks/createDeck",
  async (deckData) => {
    const res = await axios.post("/api/v1/decks", { deck: deckData });
    return res.data;
  }
);

export const updateDeck = createAsyncThunk(
  "decks/updateDeck",
  async ({ id, updates }) => {
    const res = await axios.patch(`/api/v1/decks/${id}`, { deck: updates });
    return res.data;
  }
);

export const deleteDeck = createAsyncThunk("decks/deleteDeck", async (id) => {
  await axios.delete(`/api/v1/decks/${id}`);
  return id;
});

// Initial state
const initialState = {
  decks: [],
  status: "idle",
  error: null,
};

// Slice
const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDecks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Create
      .addCase(createDeck.fulfilled, (state, action) => {
        state.decks.push(action.payload);
      })
      // Update
      .addCase(updateDeck.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.decks.findIndex((deck) => deck.id === updated.id);
        if (index !== -1) {
          state.decks[index] = updated;
        }
      })
      // Delete
      .addCase(deleteDeck.fulfilled, (state, action) => {
        state.decks = state.decks.filter((deck) => deck.id !== action.payload);
      });
  },
});

// Exports
export default decksSlice.reducer;

// features/review/flashcardReviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET review queue
export const fetchReviewQueue = createAsyncThunk(
  'review/fetchReviewQueue',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/review_queue?user_id=${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// POST review result
export const submitFlashcardReview = createAsyncThunk(
  'review/submitFlashcardReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/flashcard_reviews', {
        flashcard_review: reviewData
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const flashcardReviewSlice = createSlice({
  name: 'review',
  initialState: {
    queue: [],
    status: 'idle',
    error: null,
    submitting: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewQueue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewQueue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.queue = action.payload;
      })
      .addCase(fetchReviewQueue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitFlashcardReview.pending, (state) => {
        state.submitting = true;
      })
      .addCase(submitFlashcardReview.fulfilled, (state, action) => {
        state.submitting = false;
        // Optionally, remove the reviewed flashcard from the queue here
      })
      .addCase(submitFlashcardReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export default flashcardReviewSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deckId: null,
  startTime: null,
  endTime: null,
  durationMin: 0,
  notes: "",
};

const studySessionSlice = createSlice({
  name: "studySession",
  initialState,
  reducers: {
    startSession: (state, action) => {
      state.deckId = action.payload.deckId;
      state.startTime = Date.now();
      state.endTime = null;
      state.durationMin = 0;
      state.notes = "";
    },
    endSession: (state, action) => {
      const { endTime, duration } = action.payload;
      state.endTime = endTime;
      state.durationMin = typeof duration === 'number' ? duration : 0;
    },
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetSession: () => initialState
  }
});

export const { startSession, endSession, addNotes, resetSession } = studySessionSlice.actions;
export default studySessionSlice.reducer;

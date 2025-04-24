import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deckId: null,
  startTime: null,
  endTime: null,
  durationMin: 0,
  notes: "",
  sessionHistory: [],
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
    resetSession: (state) => {
      const history = state.sessionHistory;
      return {
        ...initialState,
        sessionHistory: history
      };
    },
    //Log sessions
    logSession: (state) => {
      const { deckId, startTime, endTime, durationMin, notes } = state;
      if (!startTime || !endTime || durationMin <= 0) return;

      const newLog = {
        deckId,
        startTime, 
        endTime, 
        durationMin, 
        notes,
      };

      state.sessionHistory.push(newLog);
    }
  }
});


export const { startSession, endSession, addNotes, resetSession, logSession } = studySessionSlice.actions;
export default studySessionSlice.reducer;

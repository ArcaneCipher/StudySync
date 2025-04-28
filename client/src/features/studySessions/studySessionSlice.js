import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStudySession } from "../../api/studySessionsApi"; // use your API helper

const initialState = {
  deckId: null,
  goalId: null, // goalId field added to track the goal associated with the session
  startTime: null,
  endTime: null,
  durationMin: 0,
  notes: "",
  sessionHistory: [],
};

// THUNK: submits a finished session to the server
export const submitStudySession = createAsyncThunk(
  "studySession/submit",
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await createStudySession({ study_session: sessionData });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const studySessionSlice = createSlice({
  name: "studySession",
  initialState,
  reducers: {
    startSession: (state, action) => {
      console.log("Starting session for goalId:", action.payload.goalId);

      state.deckId = action.payload.deckId;
      state.goalId = action.payload.goalId; // Payload for tracking goalId and any Goal-Session data
      state.startTime = Date.now();
      state.endTime = null;
      state.durationMin = 0;
      state.notes = "";
    },
    endSession: (state, action) => {
      const { endTime, duration } = action.payload;
      state.endTime = endTime;
      state.durationMin = typeof duration === "number" ? duration : 0;
    },
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetSession: (state) => {
      const history = state.sessionHistory;
      return {
        ...initialState,
        sessionHistory: history,
      };
    },
    //Log sessions
    logSession: (state) => {
      const { deckId, startTime, endTime, durationMin, notes, goalId } = state;
      if (!startTime || !endTime || durationMin <= 0) return;

      const newLog = {
        deckId,
        startTime,
        endTime,
        durationMin,
        notes,
        goalId, // Include goalId in the log
      };

      state.sessionHistory.push(newLog);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitStudySession.pending, (state) => {
        // you can add loading flag later if you want
      })
      .addCase(submitStudySession.fulfilled, (state, action) => {
        console.log("Study session saved successfully:", action.payload);
      })
      .addCase(submitStudySession.rejected, (state, action) => {
        console.error("Failed to save study session:", action.payload);
      });
  },
});

export const { startSession, endSession, addNotes, resetSession, logSession } =
  studySessionSlice.actions;
export default studySessionSlice.reducer;

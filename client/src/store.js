import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import goalsReducer from "./features/goals/goalsSlice";
import authReducer from "./features/auth/authSlice";
import decksSlice from "./features/decks/decksSlice";
import flashcardsSlice from "./features/flashcards/flashcardsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
    auth: authReducer,
    decks: decksSlice,
    flashcards: flashcardsSlice
  },
});

export default store;
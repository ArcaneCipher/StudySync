import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import decksSlice from "./features/decks/decksSlice";
import flashcardsSlice from "./features/flashcards/flashcardsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    decks: decksSlice,
    flashcards: flashcardsSlice
  },
});

export default store;

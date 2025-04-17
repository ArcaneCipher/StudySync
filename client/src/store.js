import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import decksSlice from "./features/decks/decksSlice";
import flashcardsSlice from "./features/flashcards/flashcardsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    decks: decksSlice,
    flashcards: flashcardsSlice
  },
});

export default store;

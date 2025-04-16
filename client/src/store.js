import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import decksSlice from "./features/decks/decksSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    decks: decksSlice
  },
});

export default store;

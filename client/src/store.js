import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import goalsReducer from "./features/goals/goalsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    goals: goalsReducer,
  },
});

export default store;

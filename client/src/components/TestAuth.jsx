import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../features/auth/authSlice";

export default function TestAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

return (
<div>
  <h2>Auth Test</h2>
  <p>User: {user ? user.email : "None"}</p>
  <p>Loading: {loading.toString()}</p>
  <p>Error: {error || "None"}</p>

  <button onClick={() => dispatch(loginStart())}>Login Start</button>
  <button
        onClick={() =>
          dispatch(loginSuccess({ id: 1, email: "test@example.com" }))
        }
      >
        Login Success
      </button>
      <button onClick={() => dispatch(loginFailure("Invalid credentials"))}>
        Login Failure
      </button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}

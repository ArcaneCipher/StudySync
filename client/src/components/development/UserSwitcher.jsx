import api from "../../api/axios";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/auth/authSlice";

// Define known demo user credentials
const demoUsers = [
  {
    email: "alice@studysync.com",
    password: "password",
    username: "Alice Demo",
  },
  {
    email: "bob@studysync.com",
    password: "password",
    username: "Bob Demo",
  },
  {
    email: "carol@studysync.com",
    password: "password",
    username: "Carol Demo",
  },
];

const DevUserSwitcher = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Only render in development mode
  if (import.meta.env.MODE !== "development") return null;

  const handleSwitch = async ({ email, password }) => {
    dispatch(loginStart());

    try {
      const res = await api.post("/api/v1/login", { email, password });
      dispatch(loginSuccess(res.data.user)); // match your backend structure
    } catch (err) {
      dispatch(loginFailure("Failed to log in as user"));
      console.error("Login error:", err);
    }
  };

  return (
    <div className="dev-user-switcher">
      <p style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}>
        <strong>Switch User (Dev)</strong>
      </p>
      <p style={{ fontSize: "0.75rem", marginBottom: "0.5rem", color: "#555" }}>
        Logged in as: <strong>{user?.username || "None"}</strong>
      </p>
      {demoUsers.map((demoUser) => (
        <button
          key={demoUser.email}
          onClick={() => handleSwitch(demoUser)}
          style={{
            fontSize: "0.75rem",
            margin: "2px 0",
            padding: "4px 6px",
            borderRadius: "4px",
            backgroundColor: "#be1b1b",
            border: "1px solid #ccc",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
          }}
        >
          {demoUser.username}
        </button>
      ))}
    </div>
  );
};

export default DevUserSwitcher;

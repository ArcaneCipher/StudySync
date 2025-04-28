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

const DevUserSwitcher = ({toggleCollapse}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Only render in development mode
  if (import.meta.env.MODE !== "development") return null;

  const handleSwitch = async ({ email, password }) => {
    dispatch(loginStart());
    toggleCollapse();
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
      <p style={{ fontSize: "0.75rem", marginBottom: "0.5rem"}}>
        Logged in as: <strong>{user?.username || "None"}</strong>
      </p>
      {demoUsers.map((demoUser) => (
        <Button
          key={demoUser.email}
          onClick={() => handleSwitch(demoUser)}
          variant="red"
        >
          {demoUser.username}
        </Button>
      ))}
    </div>
  );
};

export default DevUserSwitcher;

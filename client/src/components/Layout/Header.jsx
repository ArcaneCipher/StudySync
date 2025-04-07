import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      dispatch(login({ name: "Alice", email: "alice@example.com" }));
    }
  };

  return (
    <header>
      <h1>React on Rails</h1>
      <nav>
        <div>
          <button onClick={handleAuthToggle}>
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
      {isAuthenticated && (
        <p style={{ fontSize: "0.9rem" }}>
          Welcome, {user.name} ({user.email})
        </p>
      )}
    </header>
  );
};

export default Header;

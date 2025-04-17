import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/auth/authSlice";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

const routeTitles = {
  '/': 'Dashboard',
  '/goals': 'Goals',
  '/decks': 'Decks',
  '/study': 'Study',
};

const getFormattedDateParts = () => {
  const today = new Date();

  const weekday = today.toLocaleDateString('en-GB', {
    weekday: 'long',
  });

  const date = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return {
    day: weekday,
    date: date,
  };
};


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
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [isCollapse, setIsCollapse] = useState(true);
  const { day, date } = getFormattedDateParts();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/study')) {
      setTitle('Study');
    } else {
      setTitle(routeTitles[path] || '');
    }
  }, [location]);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  useEffect(() => {
    if (isCollapse) {
      document.body.classList.remove('menu-open');
    } else {
      document.body.classList.add('menu-open');
    }
  }, [isCollapse]);


  return (
    <header>
      <h3>{title}</h3>
      <p><b>{day}</b>, {date}</p>
      <Menu className='menu-collapse' onClick={toggleCollapse} />

      <div className="auth-section">
        <button onClick={handleAuthToggle} className="auth-button">
          {isAuthenticated ? "Logout" : "Login"}
        </button>
        {isAuthenticated && (
          <p className="welcome-text">
            Welcome, {user.name} ({user.email})
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
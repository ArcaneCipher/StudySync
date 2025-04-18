// import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../features/user/userSlice";
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
  // const dispatch = useDispatch();
  // const { user, isAuthenticated } = useSelector((state) => state.user);

  // const handleAuthToggle = () => {
  //   if (isAuthenticated) {
  //     dispatch(logout());
  //   } else {
  //     dispatch(login({ name: "Alice", email: "alice@example.com" }));
  //   }
  // };
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
    // Add or remove the class based on the current value of isCollapse
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

      <Menu className='menu-collapse' onClick={toggleCollapse}/>
      {/* <nav>
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
      )} */}
    </header>
  );
};

export default Header;

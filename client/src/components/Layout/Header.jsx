// import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../features/auth/authSlice";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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


const Header = ({ isCollapse, toggleCollapse }) => {
  
  //const dispatch = useDispatch();
  //const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  //const isAuthPage = location.pathname === "/";

  // const handleAuthToggle = () => {
  //    if (isAuthenticated) {
  //      dispatch(logout());
  //    } else {
  //      dispatch(login({ name: "Alice", email: "alice@example.com" }));
  //    }
  //  };

  const [title, setTitle] = useState('');
  // const [isCollapse, setIsCollapse] = useState(true);
  const { day, date } = getFormattedDateParts();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/study')) {
      setTitle('Study');
    } else {
      setTitle(routeTitles[path] || '');
    }
  }, [location]);

  // const toggleCollapse = () => {
  //   setIsCollapse(!isCollapse)
  // }

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
      
      {isCollapse ? <Menu className='menu-collapse' onClick={toggleCollapse} /> : <X className='menu-collapse' onClick={toggleCollapse} />}
    </header>
  );
};

export default Header;

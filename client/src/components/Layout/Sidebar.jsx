import { Link } from 'react-router-dom';
import studysyncLogo from "../../assets/logo.png";	
import { LayoutDashboard, Target, Library, LogOut } from 'lucide-react';
// import Goals from '../../pages/Goals';
// import Decks from '../../pages/Decks';
// import Study from './pages/Study';

const Sidebar = () => {


  return (
    <div className="sidebar">
      <img src={studysyncLogo} className="logo" alt="StudySync logo" />
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/"><LayoutDashboard /> Dashboard</Link>
          </li>
          <li>
            <Link to="/goals"><Target /> Goals</Link>
          </li>
          <li>
            <Link to="/decks"><Library /> Decks</Link>
          </li>
        </ul>
        <ul className="logout">
          <li>
            <Link to="/logout"><LogOut /> Logout</Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;

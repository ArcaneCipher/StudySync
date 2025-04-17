import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Study from './pages/Study';
import Decks from "./pages/Decks";
import GoalsList from "./components/Layout/GoalsList";
import Auth from "./components/Auth";


function App() {
  return (
    <Router>
      <Layout>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/study/:deckId" element={<Study /> } />
          <Route path="/decks" element={<Decks />} />
          <Route path="/goals" element={<GoalsList />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
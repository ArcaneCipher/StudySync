import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import Decks from "./pages/Decks";
import GoalsList from "./components/Layout/GoalsList";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<GoalsList />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


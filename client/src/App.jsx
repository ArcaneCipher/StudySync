import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TestAuth from "./components/TestAuth"; // ⚠️ Remove when done testing Auth ⚠️
import GoalsList from "./components/Layout/GoalsList";

function App() {
  return (
      <Router>
        <Layout>
          // <h1>StudySync - Auth Test</h1> // ⚠️ Remove when done testing Auth ⚠️
          // <TestAuth /> // ⚠️ Remove when done testing Auth ⚠️
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/goals" element={<GoalsList />} />
            <Route path="/decks" element={<></>} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;

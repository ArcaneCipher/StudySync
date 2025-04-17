import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <Router>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/goals" element={<></>} />
            <Route path="/decks" element={<></>} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;

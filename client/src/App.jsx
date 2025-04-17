import { useEffect, useState } from "react";
import api from "./api/axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/Layout/Layout";
import TestAuth from "./components/TestAuth";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>StudySync - Auth Test</h1>
      <TestAuth />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Layout>
  );
}

export default App;

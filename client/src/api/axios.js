import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // uses .env configuration
  withCredentials: true, // needed for sessions/cookies use
});

export default api;

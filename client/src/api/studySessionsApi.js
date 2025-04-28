import axios from "./axios"; // your configured axios

export const createStudySession = async (sessionData) => {
  const response = await axios.post("/api/v1/study_sessions", sessionData);
  return response.data;
};

// fetch all sessions for current user
export const getStudySessions = async () => {
  const response = await axios.get("/api/v1/study_sessions");
  return response.data;
};

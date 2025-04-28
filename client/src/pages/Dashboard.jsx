import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudySessions } from "../features/studySessions/studySessionSlice";
import { fetchDecks } from "../features/decks/decksSlice"; // fixed import
import { fetchGoals } from "../features/goals/goalsSlice";
import work from "../assets/work.png";
import ReviewQueue from "../components/ReviewQueue";
import { CalendarSync, History } from "lucide-react";
import StudyHistory from "../components/StudyHistory";

export default function HomePage() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.studySession);
  const user_name = useSelector((state) => state.auth.user?.username);
  const authUser = useSelector((state) => state.auth.user);
  const sessions = useSelector((state) => state.studySession.fetchedSessions);

  const userSessions = sessions.filter(
    (session) => session.user_id === authUser?.id
  );

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchDecks(authUser.id));
      dispatch(fetchGoals(authUser.id));
    }
  }, [authUser, dispatch]);

  useEffect(() => {
    dispatch(fetchStudySessions());
  }, [dispatch]);

  return (
    <>
      <div className="welcome-user">
        <h1>Hi, {user_name}</h1>
        <p>Ready to start your day with some decks?</p>
        <img src={work} className="work" alt="StudySync logo" />
      </div>
      <div className="grid-container mt20">
        <div className="grid-col-6 history-grid">
          <div className="row-span-2">
            <h2 className="grid-title">
              <span className="icon peach">
                <History />
              </span>{" "}
              Study History
            </h2>
            <StudyHistory
              sessionHistory={
                userSessions.length > 0 ? userSessions : session.sessionHistory
              }
            />
          </div>
          <div>
            <h2 className="grid-title">
              <span className="icon yellow">
                <CalendarSync />
              </span>{" "}
              Spaced Repetition
            </h2>
            <ReviewQueue />
          </div>
        </div>
        <div className="grid-col-3"></div>
        <div className="grid-col-3"></div>
      </div>
    </>
  );
}

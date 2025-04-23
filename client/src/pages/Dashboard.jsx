
import work from "../assets/work.png";	
import ReviewQueue from '../components/ReviewQueue';
import { CalendarSync } from "lucide-react";
export default function HomePage() {
  return (
    <>
      <div className="welcome-user">
        <h1>Hi, Username</h1>
        <p>Ready to start your day with some decks?</p>
        <img src={work} className="work" alt="StudySync logo" />
      </div>
      <div className="grid-container mt20">
        <div className="grid-col-3">
          <h2 className="grid-title"><span className="icon yellow"><CalendarSync /></span> Spaced Repetition</h2>
          <ReviewQueue />
        </div>
      </div>
    </>
  );
}

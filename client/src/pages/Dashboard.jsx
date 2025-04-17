
import work from "../assets/work.png";	
import UIShowcase from "../components/UIShowcase";
export default function HomePage() {
  return (
    <>
      <div className="welcome-user">
        <h1>Hi, Username</h1>
        <p>Ready to start your day with some decks?</p>
        <img src={work} className="work" alt="StudySync logo" />
      </div>
      <UIShowcase />
    </>
  );
}

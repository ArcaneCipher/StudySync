import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewQueue } from "../features/review/flashcardReviewSlice";
import { Clock, BookOpen, CheckCircle } from "lucide-react";

const DashboardReviewSection = () => {
  const dispatch = useDispatch();
  const reviewQueue = useSelector((state) => state.review.reviewQueue);
  const isLoading = useSelector((state) => state.review.loading);
  const error = useSelector((state) => state.review.error);
  const user_id = useSelector((state) => state.auth.user?.id);
  
  useEffect(() => {
    if (user_id) {
      dispatch(fetchReviewQueue(user_id));
    }
  }, [dispatch, user_id]);

  const totalReviews = reviewQueue?.length || 0;
  const todayReviews = reviewQueue?.filter(
    (r) => new Date(r.next_due).toDateString() === new Date().toDateString()
  );

  return (
    <div className="review-card">
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="summary-row">
            <div className="summary-item">
              <Clock size={30} />
              <span>Today {todayReviews.length}</span>
            </div>
            <div className="summary-item">
              <BookOpen size={30} />
              <span>Total Scheduled {totalReviews}</span>
            </div>
            {/* <div className="summary-item">
              <CheckCircle size={30} />
              <span>Completed 100%</span>
            </div> */}
          </div>

         {todayReviews.length > 0 && (
            <div className="next-up">
              <p className="subheading">Next Due</p>
              <ul className="review-list">
                {todayReviews.slice(0, 3).map((review) => (
                  <li key={review.id}>
                    Flashcard #{review.flashcard_id} –{" "}
                    {new Date(review.next_due).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
         )}
         
        </>
      )}
    </div>
  );
};

export default DashboardReviewSection;

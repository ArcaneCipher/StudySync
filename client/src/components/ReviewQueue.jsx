import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewQueue } from '../features/review/flashcardReviewSlice';
import { login } from "../features/user/userSlice";

const ReviewQueue = () => {
  const dispatch = useDispatch();
  // const user_id = useSelector((state) => state.user.user?.id);
  const reviewQueue = useSelector((state) => state.review.reviewQueue);
  const isLoading = useSelector((state) => state.review.loading);
  const error = useSelector((state) => state.review.error);



  useEffect(() => {
    dispatch(login({ id: 1, name: "Alice", email: "alice@example.com" }));
  }, [dispatch]);

  const user_id = useSelector((state) => state.user.user?.id);

  
console.log(user_id)
  useEffect(() => {
    if (user_id) {
      dispatch(fetchReviewQueue(user_id));
    }
  }, [dispatch, user_id]);

  if (isLoading) return <p>Loading review queue...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

  return (
    <div className="review-queue">
      <h2>Your Review Queue (Spaced Repetition)</h2>
      {reviewQueue.length === 0 ? (
        <p>No reviews due today!</p>
      ) : (
        <ul>
          {reviewQueue.map((review) => (
            <li key={review.id}>
              <strong>Flashcard ID:</strong> {review.flashcard_id} <br />
              <strong>Due on:</strong> {review.next_due}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewQueue;

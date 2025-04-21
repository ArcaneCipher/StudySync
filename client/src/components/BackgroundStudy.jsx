import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDecks } from '../features/decks/decksSlice';

const BackgroundStudy = () => {
  const { deckId } = useParams();
  const dispatch = useDispatch();

  const { decks, status } = useSelector(state => state.decks);
  const deck = decks.find(d => d.id === Number(deckId));

  // Fetch decks

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDecks());
    }
  }, [dispatch, status]);
  
  return (
    <>
      <div className='background-study'>
        <h2>
        {status === 'loading'
          ? 'Loading...'
          : deck
          ? deck.title
          : 'Deck not found'}
        </h2>
      </div> 
    </>
  );
};

export default BackgroundStudy;

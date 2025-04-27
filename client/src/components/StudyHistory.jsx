const StudyHistory = ({ sessionHistory }) => {
  return (
    <div className='study-history'>
      {sessionHistory.length > 0 ? (
        <ul className="space-y-2">
          {sessionHistory.map((sesh, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <div>
                <strong>Deck:</strong> {sesh.deckId || 'N/A'}
              </div>
              <div>
                <strong>Duration:</strong> {sesh.durationMin} min
              </div>
              <div>
                <strong>Notes:</strong> {sesh.notes || 'None'}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions recorded yet.</p>
      )}
    </div>
  );
};

export default StudyHistory;

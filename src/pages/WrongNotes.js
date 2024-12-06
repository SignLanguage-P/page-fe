import React, { useEffect, useState } from 'react';
import '../css/WrongNotes.css';

function WrongNotes() {
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    const storedWrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers')) || [];
    setWrongAnswers(storedWrongAnswers);
  }, []);

  return (
    <div className="wrong-notes-page">
      <h2>오답노트</h2>
      {wrongAnswers.length > 0 ? (
        <ul>
          {wrongAnswers.map((item, index) => (
            <li key={index}>
              <strong>문제:</strong> {item.question} <br />
              <strong>오답:</strong> {item.answer}
            </li>
          ))}
        </ul>
      ) : (
        <p>오답이 없습니다.</p>
      )}
    </div>
  );
}

export default WrongNotes; 
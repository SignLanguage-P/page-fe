import React from 'react';

function QuizControls({ quiz, aiResult, onSubmit }) {
  return (
    <div className="quiz-container">
      {quiz ? (
        <>
          <p>{quiz.question} (난이도: {quiz.difficulty})</p>
          <button onClick={onSubmit}>제출</button>
        </>
      ) : (
        <p>퀴즈를 불러오는 중...</p>
      )}
      {aiResult && <p>AI 결과: {aiResult}</p>}
    </div>
  );
}

export default QuizControls; 
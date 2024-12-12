import React from 'react';

function QuizControls({ quiz, onSubmit, loading }) {
  return (
    <div className="quiz-controls">
      {quiz ? (
        <>
          <p className="quiz-question">{quiz.question}</p>
          <button 
            onClick={onSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? '처리 중...' : '제출'}
          </button>
        </>
      ) : (
        <p>퀴즈를 불러오는 중...</p>
      )}
    </div>
  );
}

export default QuizControls; 
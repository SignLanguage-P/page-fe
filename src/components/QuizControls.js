import React from 'react';

function QuizControls({ 
  quiz, 
  onSubmit, 
  loading, 
  difficulty, 
  category,
  categories = [],
  onDifficultyChange,
  onCategoryChange 
}) {
  return (
    <div className="quiz-controls">
      <div className="quiz-settings">
        <div className="setting-item">
          <label>난이도:</label>
          <select 
            value={difficulty} 
            onChange={(e) => onDifficultyChange(e.target.value)}
            disabled={loading}
          >
            <option value="BEGINNER">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="ADVANCED">고급</option>
          </select>
        </div>
        
        {categories.length > 0 && (
          <div className="setting-item">
            <label>카테고리:</label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={loading}
            >
              <option value="">전체</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

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
import { API_ENDPOINTS } from './apiConfig';

export const quizService = {
  fetchRandomQuiz: async () => {
    const response = await fetch(API_ENDPOINTS.quiz.random);
    if (!response.ok) throw new Error('퀴즈 로딩 실패');
    return response.json();
  },

  submitQuizAnswer: async (quizId, imageData) => {
    const response = await fetch(API_ENDPOINTS.quiz.check, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId, imageData }),
    });
    if (!response.ok) throw new Error('답안 제출 실패');
    return response.json();
  },

  fetchQuizByDifficulty: async (difficulty) => {
    const response = await fetch(API_ENDPOINTS.quiz.byDifficulty(difficulty));
    if (!response.ok) {
      throw new Error('퀴즈 데이터를 가져오는데 실패했습니다.');
    }
    return await response.json();
  }
}; 
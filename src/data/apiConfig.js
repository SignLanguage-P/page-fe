export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  quiz: {
    random: `${API_BASE_URL}/quiz/random`,
    byDifficultyAndCategory: (difficulty, categoryId) => 
      `${API_BASE_URL}/quiz/random?difficulty=${difficulty}&categoryId=${categoryId}`,
    check: `${API_BASE_URL}/quiz/check`,
  },
  categories: `${API_BASE_URL}/categories`
}; 
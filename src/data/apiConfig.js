const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  quiz: {
    random: `${API_BASE_URL}/api/quiz/random`,
    check: `${API_BASE_URL}/api/quiz/check`
  }
}; 
import { API_ENDPOINTS } from './apiConfig';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
const API_TIMEOUT = 10000; // 10초

const fetchWithTimeout = async (url, options) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
};

export const fetchRandomQuiz = async () => {
  try {
    console.log('API 요청 URL:', `${API_BASE_URL}/api/quiz/random`);
    const response = await fetch(`${API_BASE_URL}/api/quiz/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });
    
    // 응답이 HTML이 아닌 JSON인지 확인
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    console.log('API 응답 상태:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API 에러 응답:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('받은 퀴즈 데이터:', data);
    
    // 백엔드 응답 형식에 맞게 데이터 변환
    return {
      id: data.id,
      question: data.question,
      answer: data.answer
    };
  } catch (error) {
    console.error('API 호출 중 에러:', error);
    throw error;
  }
};

export const submitQuizAnswer = async (quizId, answer) => {
  try {
    console.log('답안 제출 요청:', { quizId, answer });
    const response = await fetch(`${API_BASE_URL}/api/quiz/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        quizId: quizId,
        answer: answer
      }),
    });

    console.log('답안 제출 응답 상태:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API 에러 응답:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('답안 제출 결과:', result);
    return result;
  } catch (error) {
    console.error('답안 제출 중 오류:', error);
    throw error;
  }
};
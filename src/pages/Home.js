import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/Home.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {/* 학습 및 퀴즈 연결 버튼 */}
      <h2>환영합니다!</h2>
      <button>학습하기</button>
      <button>퀴즈 풀기</button>
    </div>
  );
}

export default Home;

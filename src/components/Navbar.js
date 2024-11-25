import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/">홈</Link>
      {isLoggedIn ? (
        <>
          <Link to="/mypage">마이페이지</Link>
          <button onClick={onLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

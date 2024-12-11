import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/learning', text: '학습하기' },
    { path: '/quiz', text: '퀴즈풀기' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <img src={logo} alt="로고" className="logo-image" />
        </div>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              {item.text}
            </button>
          ))}
        </div>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <section className="hero-section">
          <div className="hero-content">
            <h1>수어를 쉽고 재미있게 배워보세요</h1>
            <p>인공지능 기반 수어 학습 플랫폼</p>
          </div>
        </section>

        <section className="main-actions">
          <div className="action-buttons">
            <div className="action-card" onClick={() => navigate('/learning')}>
              <div className="card-icon">📚</div>
              <div className="card-content">
                <h2>학습하기</h2>
                <p>단계별 수어 학습을 시작해보세요</p>
              </div>
            </div>

            <div className="action-card" onClick={() => navigate('/quiz')}>
              <div className="card-icon">✏️</div>
              <div className="card-content">
                <h2>퀴즈풀기</h2>
                <p>학습한 내용을 테스트해보세요</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

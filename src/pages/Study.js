import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { videoMap, categoryNames } from '../data/videoData';
import '../css/Study.css';

function Study() {
  const [selectedWord, setSelectedWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('greetings'); // 기본 카테고리 설정

  useEffect(() => {
    if (videoMap[currentCategory] && videoMap[currentCategory].length > 0) {
      const firstVideo = videoMap[currentCategory][0];
      setSelectedWord(firstVideo.word);
    }
  }, [currentCategory]);

  const handleWordSelect = (word) => {
    const category = Object.keys(videoMap).find(cat =>
      videoMap[cat].some(item => item.word === word)
    );
    if (category) {
      const index = videoMap[category].findIndex(item => item.word === word);
      setCurrentCategory(category);
      setCurrentIndex(index);
      setSelectedWord(videoMap[category][index].word);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedWord(videoMap[currentCategory][newIndex].word);
    }
  };

  const handleNext = () => {
    if (currentIndex < videoMap[currentCategory].length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedWord(videoMap[currentCategory][newIndex].word);
    }
  };

  return (
    <div className="study-page">
      <div className="study-content">
        <h2>학습 화면 - {selectedWord}</h2>
        {videoMap[currentCategory] && videoMap[currentCategory][currentIndex] && videoMap[currentCategory][currentIndex].url.startsWith('https://www.youtube.com') ? (
          <iframe
            width="800"
            height="450"
            src={videoMap[currentCategory][currentIndex].url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video src={videoMap[currentCategory][currentIndex]?.url} controls />
        )}
        <div className="navigation-buttons">
          {currentIndex > 0 && (
            <button onClick={handlePrevious}>이전</button>
          )}
          {currentIndex < videoMap[currentCategory].length - 1 && (
            <button onClick={handleNext}>다음</button>
          )}
        </div>
      </div>
      <Sidebar onWordSelect={handleWordSelect} />
    </div>
  );
}

export default Study;
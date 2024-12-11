import React, { useState } from 'react';
import { categories } from '../data/categoryData';
import '../css/Sidebar.css';

function Sidebar({ onWordSelect }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="sidebar">
      <h3>카테고리</h3>
      {categories.map(category => (
        <div key={category.id} className="category">
          <div className="category-header" onClick={() => toggleCategory(category.id)}>
            {category.name}
          </div>
          {openCategory === category.id && (
            <div className="category-items">
              {category.words.map(word => (
                <a key={word} href={`#${word}`} onClick={() => onWordSelect(word)}>
                  {word}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

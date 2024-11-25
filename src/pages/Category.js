import React from 'react';

function Category() {
  return (
    <div>
      <h2>카테고리</h2>
      {/* 드롭 다운 메뉴 */}
      <select>
        <option value="category1">카테고리 1</option>
        <option value="category2">카테고리 2</option>
        {/* 추가 카테고리 */}
      </select>
    </div>
  );
}

export default Category;

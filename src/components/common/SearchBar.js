import React, { useState } from "react";

const SearchBar = ({ searchKeyword, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchKeyword);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="검색 키워드를 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => onSearch(inputValue)}>검색</button>
    </div>
  );
};

export default SearchBar;

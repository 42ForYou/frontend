import React from "react";

const SearchBar = ({ searchKeyword, setSearchKeyword, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="검색 키워드를 입력하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
};

export default SearchBar;

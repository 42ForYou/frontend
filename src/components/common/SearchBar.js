import React, { useState } from "react";

const SearchBar = ({ searchKeyword, placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchKeyword);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  return (
    <div className="SearchBar search-input-container d-flex">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || "검색어를 입력하세요"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btn btn-secondary" onClick={() => onSearch(inputValue)} style={{ width: "150px" }}>
        검색
      </button>
    </div>
  );
};

export default SearchBar;

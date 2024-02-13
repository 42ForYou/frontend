import React, { useState } from "react";

const SearchBar = ({ searchKeyword, placeholder, onSearch, maxLength, alertMessage }) => {
  const [inputValue, setInputValue] = useState(searchKeyword);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  const triggerSearch = () => {
    if (inputValue.length > maxLength) {
      alert(alertMessage);
    } else {
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
      <button className="btn btn-secondary" onClick={triggerSearch} style={{ width: "150px" }}>
        검색
      </button>
    </div>
  );
};

export default SearchBar;

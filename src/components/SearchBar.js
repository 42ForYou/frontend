import React, { useState } from "react";

const searchBarStyle = {
  width: "100%",
  border: "2px solid #000",
};

// todo: 검색창 기능 구체화 (자동완성, 유형 선택 등)
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  if (!onSearch) onSearch = () => console.log("tset");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchText);
      setSearchText("");
      alert("검색 기능 아직 구현 안됨");
    }
  };

  return (
    <div>
      <input
        className="SearchBar mb-3"
        type="text"
        placeholder="검색어를 입력하세요"
        style={searchBarStyle}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;

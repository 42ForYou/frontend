import React, { useEffect, useState } from "react";
import StyledButton from "../common/StyledButton";

const buttonStyle = {
  fontSize: "20px",
  backgroundColor: "#fff",
  border: "2px solid #ccc",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  margin: "0 5px",
  cursor: "pointer",
};

const ListPagination = ({ totalPage, currentPage, onPaginationClick }) => {
  const onPrevClick = () => {
    if (currentPage > 1) {
      onPaginationClick(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (currentPage < totalPage) {
      onPaginationClick(currentPage + 1);
    }
  };

  return (
    <div className="text-center">
      <div className="row justify-content-center">
        {currentPage} / {totalPage}
      </div>
      <div className="row justify-content-center">
        {currentPage > 1 && (
          <button onClick={onPrevClick} style={buttonStyle}>
            &lt;
          </button>
        )}
        {currentPage < totalPage && (
          <button onClick={onNextClick} style={buttonStyle}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ListPagination;

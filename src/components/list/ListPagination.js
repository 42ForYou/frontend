import React, { useEffect, useState } from "react";

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
    <div className="ListPagination text-center pt-3">
      <div className="row justify-content-center">
        {currentPage} / {totalPage}
      </div>
      <div className="row justify-content-center">
        {currentPage > 1 && <button onClick={onPrevClick}>&lt;</button>}
        {currentPage < totalPage && <button onClick={onNextClick}>&gt;</button>}
      </div>
    </div>
  );
};

export default ListPagination;

import React, { useState, useEffect } from "react";
import { get } from "../common/apiBase";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick, rightButton }) => {
  // todo: currentFilter는 다른 스타일 적용
  return (
    <header className="row mt-1 mb-1">
      <div className="col">
        {filterTypes.map((type, index) => (
          <React.Fragment key={type}>
            <button className="btn btn-link" onClick={() => onFilterClick(type)}>
              {type}
            </button>
            {index < filterTypes.length - 1 && " | "}
          </React.Fragment>
        ))}
      </div>
      <div className="col d-flex justify-content-end">{rightButton}</div>
    </header>
  );
};

const ListItems = ({ itemsData, ItemComponent, itemsPerRow }) => {
  // 1차 배열을 행 단위로 나눠 2차 배열로 반환
  const divideArrayInto2DRows = (data, itemsPerRow) => {
    const rows = [];
    if (data) {
      for (let i = 0; i < data.length; i += itemsPerRow) {
        rows.push(data.slice(i, i + itemsPerRow));
      }
    }
    return rows;
  };

  const rows = divideArrayInto2DRows(itemsData, itemsPerRow);

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="row mb-3" key={rowIndex}>
          {row.map((item, itemIndex) => (
            <div className={`col-${12 / itemsPerRow}`} key={itemIndex}>
              <ItemComponent {...item} />
            </div>
          ))}
        </div>
      ))}
      <div className="row mb-3">
        <div className="d-flex justify-content-center align-items-center text-center">
          {!itemsData && "데이터 로드에 실패했습니다."}
          {itemsData && itemsData.length === 0 && "데이터가 없습니다. 텅~"}
        </div>
      </div>
    </div>
  );
};

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
  const [viewPrevButton, setViewPrevButton] = useState(true);
  const [viewNextButton, setViewNextButton] = useState(true);

  const onPrevClick = () => {
    if (currentPage > 1) {
      onPaginationClick(currentPage - 1);
    } else {
      alert("이전 페이지가 존재하지 않습니다.");
      setViewPrevButton(false);
    }
  };
  const onNextClick = () => {
    if (currentPage < totalPage) {
      onPaginationClick(currentPage + 1);
    } else {
      alert("다음 페이지가 존재하지 않습니다.");
      setViewNextButton(false);
    }
  };

  useEffect(() => {
    if (currentPage === 1) setViewPrevButton(false);
    if (currentPage === totalPage) setViewNextButton(false);
  }, [currentPage, totalPage]);

  return (
    <div className="text-center">
      <div className="row justify-content-center">
        {currentPage} / {totalPage}
      </div>
      <div className="row justify-content-center">
        {viewPrevButton && (
          <button onClick={onPrevClick} style={buttonStyle}>
            &lt;
          </button>
        )}
        {viewNextButton && (
          <button onClick={onNextClick} style={buttonStyle}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

const ListBox = ({ apiEndpoint, ItemComponent, filterTypes, additionalButton }) => {
  const [itemsData, setItemsData] = useState(null);
  const [totalPage, setTotalPage] = useState(42);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(filterTypes[0]);
  const itemCountPerPage = 9;
  const itemsPerRow = 3;

  const handleChangeFilter = (changedFilter) => {
    setCurrentFilter(changedFilter);
  };
  const handleChangePage = (changedPage) => {
    setCurrentPage(changedPage);
  };

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const resData = await get(apiEndpoint(currentFilter, currentPage, itemCountPerPage));
        setItemsData(resData.data);
        setTotalPage(resData.pages.total_pages);
      } catch (error) {
        setItemsData(null);
      }
    };
    fetchItemsData();
  }, [apiEndpoint, currentFilter, currentPage]);

  return (
    <div>
      <div className="row">
        <ListFilter filterTypes={filterTypes} onFilterClick={handleChangeFilter} rightButton={additionalButton} />
      </div>
      <div className="row">
        <ListItems itemsData={itemsData} ItemComponent={ItemComponent} itemsPerRow={itemsPerRow} />
      </div>
      {itemsData && (
        <div className="row d-flex flex-column justify-content-center">
          <ListPagination totalPage={totalPage} currentPage={currentPage} onPaginationClick={handleChangePage} />
        </div>
      )}
    </div>
  );
};

export default ListBox;

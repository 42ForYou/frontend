import React, { useState, useEffect } from "react";
import { get } from "../common/apiBase";
import StyledButton from "./StyledButton";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick, rightButton }) => {
  return (
    <header className="row mt-1 mb-1">
      <div className="col">
        {filterTypes.map((type, index) => (
          <React.Fragment key={type.value}>
            <StyledButton
              name={type.label}
              styleType={"link"}
              onClick={() => onFilterClick(type)}
              overrideStyle={currentFilter.value === type.value ? { fontSize: "18px", fontWeight: "bold" } : {}}
            />
            {index < filterTypes.length - 1 && " | "}
          </React.Fragment>
        ))}
      </div>
      <div className="col d-flex justify-content-end">{rightButton}</div>
    </header>
  );
};

const ListItems = ({ itemsData, ItemComponent, itemsPerRow, emptyMsg, onOccurChange }) => {
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
              <ItemComponent {...item} onOccurChange={onOccurChange} />
            </div>
          ))}
        </div>
      ))}
      <div className="row mb-3">
        <div className="d-flex justify-content-center align-items-center text-center">
          {!itemsData && "데이터 로드에 실패했습니다."}
          {itemsData && itemsData.length === 0 && emptyMsg}
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
  const [viewPrevButton, setViewPrevButton] = useState(currentPage > 1);
  const [viewNextButton, setViewNextButton] = useState(currentPage < totalPage);

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

  useEffect(() => {
    setViewPrevButton(currentPage > 1);
    setViewNextButton(currentPage < totalPage);
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

const ListBox = ({ apiEndpoint, ItemComponent, filterTypes, additionalButton, emptyMsg, searchable = false }) => {
  const [itemsData, setItemsData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  // 필터별 페이지 상태를 객체로 관리
  const [currentPage, setCurrentPage] = useState(
    filterTypes?.length ? filterTypes.reduce((acc, filter) => ({ ...acc, [filter.value]: 1 }), {}) : { all: 1 }
  );
  const [currentFilter, setCurrentFilter] = useState(filterTypes[0] || { value: "all" });
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemCountPerPage = 9;
  const itemsPerRow = 3;

  const handleChangeFilter = (changedFilter) => {
    setCurrentFilter(changedFilter);
    // 필터 변경 시 페이지를 리셋하지 않음
  };

  const handleChangePage = (changedPage) => {
    // 현재 필터에 대한 페이지 번호를 업데이트
    setCurrentPage((prev) => ({ ...prev, [currentFilter.value]: changedPage }));
  };

  const fetchItemsData = async () => {
    try {
      const currentPageForFilter = currentPage[currentFilter.value] || 1;
      const resData = await get(
        apiEndpoint(currentFilter.value, currentPageForFilter, itemCountPerPage, searchKeyword)
      );
      setItemsData(resData.data);
      setTotalPage(resData.pages.total_pages);
    } catch (error) {
      setItemsData(null);
      console.error("리스트 조회 실패: ", error);
    }
  };

  useEffect(() => {
    fetchItemsData();
  }, [currentFilter, currentPage[currentFilter.value]]);

  const handleOccurChange = async () => {
    fetchItemsData();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchItemsData();
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-between h-100">
      {searchable && (
        <div className="search-input-container row">
          <input
            type="text"
            placeholder="검색 키워드를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={fetchItemsData}>검색</button>
        </div>
      )}

      <div className="row">
        {filterTypes?.length > 0 && (
          <div className="row">
            <ListFilter
              filterTypes={filterTypes}
              onFilterClick={handleChangeFilter}
              rightButton={additionalButton}
              currentFilter={currentFilter}
            />
          </div>
        )}
        <div className="row">
          <ListItems
            itemsData={itemsData}
            ItemComponent={ItemComponent}
            itemsPerRow={itemsPerRow}
            emptyMsg={emptyMsg}
            onOccurChange={handleOccurChange}
          />
        </div>
      </div>
      {itemsData && (
        <div className="row d-flex flex-column justify-content-center">
          <ListPagination
            totalPage={totalPage}
            currentPage={currentPage[currentFilter?.value] ?? 1}
            onPaginationClick={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default ListBox;

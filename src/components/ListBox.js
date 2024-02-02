import React, { useState, useEffect } from "react";
import { get } from "../common/apiBase";
import PaginationButtons from "./PaginationButtons";

const ListFilter = ({ filterTypes, currentFilter, onFilterClick }) => {
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
      <div className="col d-flex justify-content-end"></div>
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
      {itemsData && itemsData.length === 0 && (
        <div className="row mb-3">
          <div className="col-12 text-center">방 데이터가 없습니다. 텅~</div>
        </div>
      )}
    </div>
  );
};

const ListPagination = ({ totalPage, currentPage, onPaginationClick }) => {
  return (
    <div>
      {currentPage} / {totalPage}
      {
        <PaginationButtons
          onPrevClick={() => onPaginationClick(currentPage - 1)}
          onNextClick={() => onPaginationClick(currentPage + 1)}
        />
      }
    </div>
  );
};

const ListBox = ({ apiEndpoint, ItemComponent, filterTypes }) => {
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
        console.log(`API 요청 ${apiEndpoint(currentFilter, currentPage, itemCountPerPage)}에 실패했습니다.`);
      }
    };
    fetchItemsData();
  }, [apiEndpoint, currentFilter, currentPage]);

  return (
    <div>
      <div className="row">
        <ListFilter filterTypes={filterTypes} onFilterClick={handleChangeFilter} />
      </div>
      <div className="row">
        <ListItems itemsData={itemsData} ItemComponent={ItemComponent} itemsPerRow={itemsPerRow} />
      </div>
      <div className="row">
        <ListPagination totalPage={totalPage} currentPage={currentPage} onPaginationClick={handleChangePage} />
      </div>
    </div>
  );
};

export default ListBox;

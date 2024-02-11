import React from "react";

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
    <div className="ListItems flex-grow-1">
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

export default ListItems;

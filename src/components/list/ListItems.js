import React from "react";

const ListItemRow = ({ itemRow, ItemComponent, onOccurChange }) => (
  <div className="flex-grow-1 d-flex">
    {itemRow.map((item, itemIndex) => (
      <div className="flex-grow-1" key={itemIndex}>
        <ItemComponent {...item} onOccurChange={onOccurChange} />
      </div>
    ))}
  </div>
);

const ListItems = ({ itemsData, ItemComponent, itemsPerRow, emptyMsg, onOccurChange }) => {
  // 데이터를 행 단위로 나누어 2차원 배열로 반환하는 함수
  const createItemRows = (data, itemsPerRow) => {
    const itemRows = [];
    if (data) {
      for (let i = 0; i < data.length; i += itemsPerRow) {
        itemRows.push(data.slice(i, i + itemsPerRow));
      }
    }
    return itemRows;
  };

  const itemRows = createItemRows(itemsData, itemsPerRow);
  const loadFailMsg = "데이터 로드에 실패했습니다.";
  const displayMessage = !itemsData ? loadFailMsg : itemsData.length === 0 ? emptyMsg : null;

  return (
    <div className="ListItems flex-grow-1 d-flex flex-column">
      {itemRows.map((itemRow, rowIndex) => (
        <ListItemRow itemRow={itemRow} ItemComponent={ItemComponent} onOccurChange={onOccurChange} key={rowIndex} />
      ))}
      {displayMessage && (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center">{displayMessage}</div>
      )}
    </div>
  );
};

export default ListItems;

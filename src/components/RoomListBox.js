import React, { useState, useEffect } from "react";

import RoomItem from "./RoomItem";
import PaginationButtons from "./PaginationButtons";
import "../App.css";

const RoomListHeader = ({}) => {
  return (
    <header className="row mt-1 mb-1">
      <div className="col">1vs1 | Tournament</div>
      <div className="col d-flex justify-content-end">필터</div>
    </header>
  );
};

const RoomListFooter = ({ currentPage, totalPages, paginationButtons }) => {
  return (
    <div className="row container-fluid mt-3">
      <div className="col">
        <button>방 생성</button>
      </div>
      <div className="col d-flex justify-content-end">
        {currentPage} / {totalPages}
        {paginationButtons}
      </div>
    </div>
  );
};

const RoomListBody = ({ roomsData }) => {
  // roomsData 배열을 행 단위로 나눠 반환
  const splitDataIntoRows = (data, itemsPerRow) => {
    const rows = [];
    if (data) {
      for (let i = 0; i < data.length; i += itemsPerRow) {
        rows.push(data.slice(i, i + itemsPerRow));
      }
    }
    return rows;
  };

  // roomsData를 2개씩 묶어 행 단위로 나누기
  const rows = splitDataIntoRows(roomsData, 3);

  return (
    <div className="RoomListBody">
      {rows.map((row, rowIndex) => (
        <div className="row mb-3" key={rowIndex}>
          {row.map((room, roomIndex) => (
            // 한 줄에 3개씩 (한 요소당 4/12)
            <div className="col-4" key={roomIndex}>
              <RoomItem {...room} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const generateDummyRoomsData = (count) => {
  const dummyDataArray = [];
  dummyDataArray.push({
    title: "맞장 뜰 1인 구한다",
    host: "yeonhkim",
    nPlayers: 2,
    timeLimit: 77,
    gamePoint: 1,
  });
  dummyDataArray.push({
    title: "맞장 뜰 3인 구한다",
    host: "jgo",
    nPlayers: 4,
    timeLimit: 42,
    gamePoint: 1,
  });
  for (let i = 0; i < count - 2; i++) {
    const room = {
      title: "도리도리 팽도리",
      host: "pengdori",
      nPlayers: 8,
      timeLimit: i + 3,
      gamePoint: 10,
    };
    dummyDataArray.push(room);
  }
  return dummyDataArray;
};

const RoomListBox = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsData, setRoomsData] = useState(null);

  const fetchDataForPage = (page) => {
    console.log(`서버로부터 ${page}페이지에 해당하는 데이터를 갖고 옴`);
    // 서버로부터 페이지에 해당하는 데이터를 갖고오고 roomsData에 세팅
  };

  useEffect(() => {
    fetchDataForPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setRoomsData(generateDummyRoomsData(7));
  }, []);

  const onPrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="RoomListBox bordered-box">
      <div className="row">
        <div className="col">
          <RoomListHeader />
        </div>
      </div>
      <div className="row flex-fill">
        <div className="col">
          <RoomListBody roomsData={roomsData} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <RoomListFooter
            currentPage={currentPage}
            totalPages={totalPages}
            paginationButtons={<PaginationButtons onPrevClick={onPrevPageClick} onNextClick={onNextPageClick} />}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomListBox;

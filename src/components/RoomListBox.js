import React, { useState, useEffect } from "react";

import RoomItem from "./RoomItem";
import PaginationButtons from "./PaginationButtons";
import CreateRoomModal from "./CreateRoomModal";

const RoomListHeader = ({ onFilterClick }) => {
  return (
    <header className="row mt-1 mb-1">
      <div className="col">
        <button className="btn btn-link" onClick={() => onFilterClick("all")}>
          ALL
        </button>{" "}
        |{" "}
        <button className="btn btn-link" onClick={() => onFilterClick("1vs1")}>
          1vs1
        </button>{" "}
        |{" "}
        <button className="btn btn-link" onClick={() => onFilterClick("Tournament")}>
          Tournament
        </button>
      </div>
      <div className="col d-flex justify-content-end"></div>
    </header>
  );
};

const RoomListFooter = ({ currentPage, totalPages, paginationButtons }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="row container-fluid mt-3">
      <div className="col">
        <button onClick={handleShowModal}>방 생성</button>
      </div>
      <div className="col d-flex justify-content-end">
        {currentPage} / {totalPages}
        {paginationButtons}
      </div>
      {showModal && <CreateRoomModal handleClose={handleCloseModal} />}
    </div>
  );
};

const RoomListBody = ({ roomsData }) => {
  // roomsData 배열을 행 단위로 나눠 반환
  const splitDataIntoRows = (data, itemsPerRow) => {
    const rows = [];
    if (data) {
      for (let i = 0; i < Math.min(9, data.length); i += itemsPerRow) {
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
      {roomsData && roomsData.length === 0 && (
        <div className="row mb-3">
          <div className="col-12 text-center">방 데이터가 없습니다. 텅~</div>
        </div>
      )}
    </div>
  );
};

const generateDummyRoomsData = (count) => {
  const dummyDataArray = [];
  if (count === 0) return [];
  dummyDataArray.push({
    title: "맞장 뜰 1인 구한다",
    roomId: 1,
    host: "yeonhkim",
    isTournament: false,
    nPlayers: 2,
    timeLimit: 77,
    gamePoint: 1,
  });
  dummyDataArray.push({
    title: "맞장 뜰 3인 구한다",
    roomId: 2,
    host: "jgo",
    isTournament: true,
    nPlayers: 4,
    timeLimit: 42,
    gamePoint: 1,
  });
  for (let i = 0; i < count - 2; i++) {
    const room = {
      title: "도리도리 팽도리",
      roomId: i + 3,
      host: "pengdori",
      isTournament: true,
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
  const [roomType, setRoomType] = useState("all");

  useEffect(() => {
    fetchDataForPage(currentPage, roomType);
  }, [currentPage, roomType]);

  useEffect(() => {
    setRoomsData(generateDummyRoomsData(12));
  }, []);

  const fetchDataForPage = (page, type) => {
    console.log(`서버로부터 방 타입 ${type}의 ${page}페이지에 해당하는 데이터를 갖고 옴`);
    // 서버로부터 페이지에 해당하는 데이터를 갖고오고 roomsData에 세팅
  };

  const handleFilterClick = (type) => {
    setRoomType(type);
    fetchDataForPage(currentPage, type);
    setCurrentPage(1);
  };

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
          <RoomListHeader onFilterClick={handleFilterClick} />
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

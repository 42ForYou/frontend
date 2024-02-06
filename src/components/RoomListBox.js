import React, { useState, useEffect } from "react";

import RoomItem from "./RoomItem";
import ListBox from "./ListBox";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import CreateRoomModal from "./CreateRoomModal";
import StyledButton from "./StyledButton";

const RoomListBox = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCreateRoomClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const filterTypes = [
    { value: "all", label: "All" },
    { value: "dual", label: "1vs1" },
    { value: "tournament", label: "토너먼트" },
  ];

  return (
    <>
      <ListBox
        apiEndpoint={API_ENDPOINTS.ROOM_LIST}
        ItemComponent={RoomItem}
        filterTypes={filterTypes}
        additionalButton={<StyledButton name={"방 생성"} styleType={"primary"} onClick={handleCreateRoomClick} />}
        emptyMsg={"일치하는 게임 방이 없습니다."}
      />
      {showModal && <CreateRoomModal handleClose={handleCloseModal} />}
    </>
  );
};

export default RoomListBox;

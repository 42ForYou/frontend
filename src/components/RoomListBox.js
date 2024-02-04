import React, { useState, useEffect } from "react";

import RoomItem from "./RoomItem";
import ListBox from "./ListBox";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import CreateRoomModal from "./CreateRoomModal";

const RoomListBox = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCreateRoomClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ListBox
        apiEndpoint={API_ENDPOINTS.ROOM_LIST}
        ItemComponent={RoomItem}
        filterTypes={["All", "1vs1", "Tournament"]}
        additionalButton={
          <button className="btn btn-primary" onClick={handleCreateRoomClick}>
            방 생성
          </button>
        }
      />
      {showModal && <CreateRoomModal handleClose={handleCloseModal} />}
    </>
  );
};

export default RoomListBox;

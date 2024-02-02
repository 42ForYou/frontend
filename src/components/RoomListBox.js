import React, { useState, useEffect } from "react";

import RoomItem from "./RoomItem";
import ListBox from "./ListBox";
import { API_ENDPOINTS } from "../common/apiEndPoints";

const RoomListBox = () => {
  return (
    <>
      <ListBox
        apiEndpoint={API_ENDPOINTS.ROOM_LIST}
        ItemComponent={RoomItem}
        filterTypes={["All", "1vs1", "Tournament"]}
      />
    </>
  );
};

export default RoomListBox;

import React from "react";

import FriendItem from "./FriendItem";
import ListBox from "./ListBox";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const RoomListBox = () => {
  const filterTypes = [
    { value: "my_friend", label: "내 친구" },
    { value: "pending", label: "내게 온 친구요청" },
  ];

  return (
    <>
      <ListBox
        apiEndpoint={API_ENDPOINTS.FRIENDS}
        ItemComponent={FriendItem}
        filterTypes={filterTypes}
        emptyMsg={"친구 데이터가 없습니다."}
      />
    </>
  );
};

export default RoomListBox;

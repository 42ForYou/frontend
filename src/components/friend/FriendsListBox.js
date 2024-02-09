import React from "react";

import FriendItem from "./FriendItem";
import ListBox from "../list/ListBox";
import { API_ENDPOINTS } from "../../common/apiEndpoints";

const FriendsListBox = () => {
  const filterTypes = [
    { value: "friend", label: "나의 친구" },
    { value: "pending", label: "받지 않은 친구요청" },
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

export default FriendsListBox;

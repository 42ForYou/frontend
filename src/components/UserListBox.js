import React from "react";
import ListBox from "./ListBox";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import UserItem from "./UserItem";

const UserListBox = () => {
  const filterTypes = [{ value: "all", label: "All" }];

  return (
    <>
      <ListBox
        apiEndpoint={(_, __, ___, searchKeyword) => API_ENDPOINTS.USER_SEARCH(searchKeyword)}
        ItemComponent={UserItem}
        filterTypes={filterTypes}
        additionalButton={null}
        emptyMsg="검색 결과가 없습니다."
        searchable={true}
      />
    </>
  );
};

export default UserListBox;

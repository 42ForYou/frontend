import React from "react";
import ListBox from "../list/ListBox";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import UserItem from "./UserItem";

const UserListBox = () => {
  const filterTypes = [{ value: "all", label: "All" }];

  return (
    <>
      <ListBox
        apiEndpoint={(_, page, page_size, keyword) => API_ENDPOINTS.USER_SEARCH(page, page_size, keyword)}
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

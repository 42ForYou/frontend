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
        itemsPerPage={6}
        itemsPerRow={3}
        placeholder={"검색할 유저의 닉네임을 입력하세요"}
        maxLength={16}
        alertMessage={"검색어 키워드를 16자 이하로 입력해주세요."}
      />
    </>
  );
};

export default UserListBox;

import React, { useEffect, useReducer } from "react";
import ListFilter from "./ListFilter";
import ListItems from "./ListItems";
import ListPagination from "./ListPagination";
import useFetchItems from "../hooks/useFetchItems";
import SearchBar from "./SearchBar";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return { ...state, currentFilter: action.payload, currentPage: 1 };
    case "CHANGE_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SEARCH_KEYWORD":
      return { ...state, searchKeyword: action.payload, currentPage: 1 };
    default:
      return state;
  }
};

const ListBox = ({ apiEndpoint, ItemComponent, filterTypes, additionalButton, emptyMsg, searchable = false }) => {
  // todo: 페이지 스타일 별 조정
  const itemsPerPage = 9;
  const itemsPerRow = 3;
  const initialState = {
    currentFilter: filterTypes[0],
    currentPage: 1,
    searchKeyword: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { itemsData, totalPage, isLoading, error } = useFetchItems(
    apiEndpoint,
    state.currentFilter,
    state.currentPage,
    state.searchKeyword,
    itemsPerPage
  );

  const handleChangeFilter = (filter) => dispatch({ type: "CHANGE_FILTER", payload: filter });
  const handleChangePage = (page) => dispatch({ type: "CHANGE_PAGE", payload: page });
  const handleSearch = (keyword) => dispatch({ type: "SET_SEARCH_KEYWORD", payload: keyword });

  return (
    <div className="container d-flex flex-column justify-content-between h-100">
      {searchable && <SearchBar searchKeyword={state.searchKeyword} onSearch={handleSearch} />}
      {filterTypes.length >= 2 && (
        <ListFilter
          filterTypes={filterTypes}
          currentFilter={state.currentFilter}
          onFilterClick={handleChangeFilter}
          rightButton={additionalButton}
        />
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ListItems itemsData={itemsData} ItemComponent={ItemComponent} itemsPerRow={itemsPerRow} emptyMsg={emptyMsg} />
      )}
      {itemsData && (
        <ListPagination totalPage={totalPage} currentPage={state.currentPage} onPaginationClick={handleChangePage} />
      )}
    </div>
  );
};

export default ListBox;

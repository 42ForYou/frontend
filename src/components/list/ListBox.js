import React, { useEffect, useReducer } from "react";
import ListFilter from "./ListFilter";
import ListItems from "./ListItems";
import ListPagination from "./ListPagination";
import useFetchListItems from "../../hooks/useFetchListItems";
import SearchBar from "../common/SearchBar";

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

const ListBox = ({
  apiEndpoint,
  ItemComponent,
  filterTypes,
  additionalButton,
  emptyMsg,
  searchable = false,
  itemsPerPage,
  itemsPerRow,
}) => {
  const initState = {
    currentFilter: filterTypes[0],
    currentPage: 1,
    searchKeyword: "",
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const { itemsData, totalPage, isLoading, error, fetchListItems } = useFetchListItems(apiEndpoint, itemsPerPage);

  const reloadListItems = () => {
    fetchListItems(state.currentFilter, state.currentPage, state.searchKeyword);
  };

  useEffect(() => {
    reloadListItems();
  }, [state.currentFilter, state.currentPage, state.searchKeyword]);

  const handleChangeFilter = (filter) => dispatch({ type: "CHANGE_FILTER", payload: filter });
  const handleChangePage = (page) => dispatch({ type: "CHANGE_PAGE", payload: page });
  const handleSearch = (keyword) => dispatch({ type: "SET_SEARCH_KEYWORD", payload: keyword });

  return (
    <div className="ListBox d-flex-column flex-grow-1">
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
      ) : (
        <ListItems
          itemsData={itemsData}
          ItemComponent={ItemComponent}
          itemsPerRow={itemsPerRow}
          emptyMsg={emptyMsg}
          onOccurChange={reloadListItems}
        />
      )}
      {itemsData && (
        <ListPagination totalPage={totalPage} currentPage={state.currentPage} onPaginationClick={handleChangePage} />
      )}
    </div>
  );
};

export default ListBox;

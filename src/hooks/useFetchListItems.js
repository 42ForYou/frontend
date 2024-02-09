import { useState } from "react";
import { get } from "../common/apiBase";

// 필터, 페이지, 키워드를 넘겨받아 API를 호출하고 결과를 반환하는 커스텀 훅
const useFetchListItems = (apiEndpoint, fetchLimit) => {
  const [itemsData, setItemsData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ code: null, msg: null });

  const fetchListItems = async (currentFilter, currentPage, searchKeyword) => {
    setIsLoading(true);
    setError({ code: null, msg: null });
    try {
      const resData = await get(apiEndpoint(currentFilter.value, currentPage, fetchLimit, searchKeyword));
      setItemsData(resData.data);
      setTotalPage(resData.pages.total_pages);
      setIsLoading(false);
    } catch (error) {
      setItemsData(null);
      setError({
        code: error.response?.status,
        msg: error.response?.data.message || error.message,
      });
      setIsLoading(false);
    }
  };

  return { itemsData, totalPage, isLoading, error, fetchListItems };
};

export default useFetchListItems;

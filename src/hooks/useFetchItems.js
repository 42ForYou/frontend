import { useState, useEffect } from "react";
import { get } from "../common/apiBase";

const useFetchItems = (apiEndpoint, currentFilter, currentPage, searchKeyword, fetchLimit) => {
  const [itemsData, setItemsData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const resData = await get(apiEndpoint(currentFilter.value, currentPage, fetchLimit, searchKeyword));
        setItemsData(resData.data);
        setTotalPage(resData.pages.total_pages);
      } catch (error) {
        setItemsData(null);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [apiEndpoint, currentFilter.value, currentPage, searchKeyword]);

  return { itemsData, totalPage, isLoading, error };
};

export default useFetchItems;

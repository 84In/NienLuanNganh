import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

const usePaginationMore = (pageSize = 15, url, addPageSize = 10) => {
  const [data, setData] = useState([]);
  const [currentSize, setCurrentSize] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const fetchMoreData = async (size) => {
    setLoading(true);
    try {
      const response = await axiosConfig({
        method: "GET",
        url: url,
        params: {
          size: size,
        },
      });
      console.log(response);
      const result = response.result;
      console.log(result);
      setData(result.content);
      setTotalElements(result.totalElements);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreData(currentSize);
  }, [currentSize]);

  const loadMore = () => {
    setCurrentSize((prev) => prev + addPageSize); // Add 10 more items
  };

  const hasMore = currentSize < totalElements; // Check if there are more items to load

  return { data, loading, loadMore, hasMore };
};

export default usePaginationMore;

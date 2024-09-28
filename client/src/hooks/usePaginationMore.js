import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

const usePaginationMore = (url, pageSize = 15, addPageSize = 10) => {
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
      const result = response.result;
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
    setCurrentSize((prev) => prev + addPageSize);
  };

  const hasMore = currentSize < totalElements; // Check if there are more items to load

  return { data, loading, loadMore, hasMore };
};

export default usePaginationMore;

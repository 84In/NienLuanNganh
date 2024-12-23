import { useEffect, useState } from "react";
import axiosConfig from "../axiosConfig";

const usePaginationMore = (url, pageSize = 15, addPageSize = 10) => {
  const [data, setData] = useState([]);
  const [currentSize, setCurrentSize] = useState(pageSize);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const fetchMoreData = async (currentSize) => {
    if (!url.includes("//")) {
      setLoading(true);
      new Promise(async (resolve, reject) => {
        try {
          const response = await axiosConfig({
            method: "GET",
            url: url,
            params: {
              size: currentSize,
            },
          });
          resolve(response);
          const result = response?.result;
          setData(result?.content);
          setTotalElements(result?.page?.totalElements);
        } catch (error) {
          console.error("Error fetching more data:", error);
        } finally {
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    fetchMoreData(currentSize);
  }, [url, currentSize]);

  const loadMore = () => {
    setCurrentSize((prev) => prev + addPageSize);
  };

  const hasMore = currentSize < totalElements; // Check if there are more items to load

  return { data, setData, totalElements, loading, loadMore, hasMore };
};

export default usePaginationMore;

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axiosConfig from "../axiosConfig";

const usePagination = (baseUrl, initialPage = 0, size = 15) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPageData = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await axiosConfig({
          method: "GET",
          url: baseUrl,
          params: {
            ...Object.fromEntries(searchParams),
            page: page,
            size: size,
          },
        });
        const result = response?.result;
        setData(result?.content);
        setTotalPages(result?.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, searchParams, size],
  );

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || initialPage;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    fetchPageData(page);
  }, [searchParams, initialPage, fetchPageData]);

  const updatePage = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      updatePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      updatePage(currentPage - 1);
    }
  };

  return {
    data,
    currentPage,
    setCurrentPage: updatePage,
    totalPages,
    loading,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
  };
};

export default usePagination;

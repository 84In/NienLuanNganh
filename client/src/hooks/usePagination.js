import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";

const usePagination = (initialPage = 0, requestPath) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || initialPage;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `${requestPath}?page=${page}`,
      });
      console.log(response);
      const result = response.result;
      setData(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => {
        const next = prev + 1;
        setSearchParams({ page: next });
        return next;
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => {
        const next = prev - 1;
        setSearchParams({ page: next });
        return next;
      });
    }
  };

  useEffect(() => {
    // Sync with the URL whenever the page changes
    if (pageFromUrl !== currentPage) {
      setSearchParams({ page: currentPage });
    }
  }, [currentPage]);

  return {
    data,
    currentPage,
    totalPages,
    loading,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
  };
};

export default usePagination;

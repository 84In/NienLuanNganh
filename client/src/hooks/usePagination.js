import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axiosConfig from "../axiosConfig";

const usePagination = (baseUrl, initialPage = 0, size = 15, useUrlParams = true, idPagination = "pagination") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [internalPage, setInternalPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentParams = useMemo(() => {
    return useUrlParams ? Object.fromEntries(searchParams) : {};
  }, [useUrlParams, searchParams]);

  const getCurrentPage = useCallback(() => {
    return useUrlParams ? parseInt(searchParams.get("page")) || initialPage : internalPage;
  }, [useUrlParams, searchParams, internalPage, initialPage]);

  const fetchPageData = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await axiosConfig({
          method: "GET",
          url: baseUrl,
          params: {
            ...currentParams,
            page: page,
            size: size,
          },
        });
        const result = response?.result;
        setData(result?.content || result || []);
        //Lay sai nen khong hien ben admin (Lay o page?.totalpage)
        setTotalPages(result?.page?.totalPages || result?.reviews?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, currentParams, size],
  );

  useEffect(() => {
    const currentPage = getCurrentPage();
    fetchPageData(currentPage);
  }, [getCurrentPage, fetchPageData, location.search, baseUrl]);

  const scrollToPagination = useCallback(() => {
    const paginationElement = document.getElementById(idPagination);
    if (paginationElement) {
      paginationElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const updatePage = useCallback(
    (newPage) => {
      if (useUrlParams) {
        setSearchParams((prev) => {
          const updatedParams = new URLSearchParams(prev);
          updatedParams.set("page", newPage.toString());
          return updatedParams;
        });
      } else {
        setInternalPage(newPage);
        fetchPageData(newPage);
      }
      scrollToPagination();
    },
    [useUrlParams, setSearchParams, fetchPageData],
  );

  const updateParams = useCallback(
    (newParams) => {
      if (useUrlParams) {
        setSearchParams((prev) => {
          const updatedParams = new URLSearchParams(prev);
          Object.entries(newParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              updatedParams.set(key, value.toString());
            } else {
              updatedParams.delete(key);
            }
          });
          updatedParams.set("page", "0"); // Reset to first page when params change
          return updatedParams;
        });
      } else {
        setInternalPage(0);
        fetchPageData(0);
      }
    },
    [useUrlParams, setSearchParams, fetchPageData],
  );

  const nextPage = useCallback(() => {
    const currentPage = getCurrentPage();
    if (currentPage < totalPages - 1) {
      updatePage(currentPage + 1);
    }
  }, [getCurrentPage, totalPages, updatePage]);

  const prevPage = useCallback(() => {
    const currentPage = getCurrentPage();
    if (currentPage > 0) {
      updatePage(currentPage - 1);
    }
  }, [getCurrentPage, updatePage]);

  return {
    data,
    currentPage: getCurrentPage(),
    updatePage,
    currentParams,
    updateParams,
    totalPages,
    loading,
    nextPage,
    prevPage,
    hasNextPage: getCurrentPage() < totalPages - 1,
    hasPrevPage: getCurrentPage() > 0,
    scrollToPagination,
  };
};

export default usePagination;

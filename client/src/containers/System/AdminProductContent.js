import React, { memo, useEffect, useState } from "react";
import { AdminTable, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";

const AdminProductContent = () => {
  const url = "/api/v1/products";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setValueData(data);
  }, [data]);

  useEffect(() => {
    console.log(totalPages);
  }, [totalPages]);

  useEffect(() => {
    const handlePopState = () => {
      updatePage(currentPage);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AdminTable
      data={valueData}
      setValueData={setValueData}
      setLoading={setIsLoading}
      currentPage={currentPage}
      type={"product"}
      url={url}
      pagination={
        <Grid2 item xs={12}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={updatePage}
            nextPage={nextPage}
            prevPage={prevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </Grid2>
      }
    />
  );
};

export default memo(AdminProductContent);

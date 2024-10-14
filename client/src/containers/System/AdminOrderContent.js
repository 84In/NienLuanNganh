import React, { memo, useState } from "react";
import { AdminTable, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";

const AdminOrderContent = () => {
  const url = "/api/v1/orders";
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url, 0);

  const [valueData, setValueData] = useState(data);
  const [isLoading, setIsLoading] = useState(loading);
  const [totalPage, setTotalPage] = useState(totalPages);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AdminTable
      data={valueData}
      setValueData={setValueData}
      setLoading={setIsLoading}
      setTotalPage={setTotalPage}
      currentPage
      type={"order"}
      url
      pagination={
        <Grid2 item xs={12}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPage}
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

export default memo(AdminOrderContent);

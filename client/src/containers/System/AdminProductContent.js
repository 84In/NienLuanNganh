import React, { useEffect, useState } from "react";
import AdminTable from "../../components/System/Items/AdminTable";
import { Loading, Pagination } from "../../components";
import { usePagination } from "../../hooks";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const AdminUserContent = () => {
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination("/api/v1/products", 0);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminTable
      data={data}
      pagination={
        <Grid2 item xs={12}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
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

export default AdminUserContent;

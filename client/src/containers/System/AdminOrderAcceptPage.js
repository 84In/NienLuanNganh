import React, { useEffect, useState } from "react";
import { usePagination } from "../../hooks";
import { AdminTableOrder, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";

const AdminOrderAcceptPage = () => {
  const url = "/api/v1/orders";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url, 0);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setValueData(data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <AdminTableOrder
      data={valueData}
      setValueData={setValueData}
      setLoading={setIsLoading}
      currentPage={currentPage}
      type={"order"}
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

export default AdminOrderAcceptPage;

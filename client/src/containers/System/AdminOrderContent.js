import React, { memo, useEffect, useState } from "react";
import { AdminTableOrder, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";

const AdminOrderContent = () => {
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
    <div>
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
    </div>
  );
};

export default memo(AdminOrderContent);

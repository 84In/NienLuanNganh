import React, { useEffect, useState } from "react";
import { AdminTable, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";

const AdminBannerContent = () => {
  const url = "/api/v1/banners";
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);
  const [totalPage, setTotalPage] = useState(totalPages);

  useEffect(() => {
    console.log(data);

    setValueData(data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AdminTable
      data={valueData}
      setValueData={setValueData}
      setLoading={setIsLoading}
      setTotalPage={setTotalPage}
      currentPage={currentPage}
      type={"banner"}
      url={url}
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

export default AdminBannerContent;

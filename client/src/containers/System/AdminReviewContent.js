import React, { useEffect, useState } from "react";
import { usePagination } from "../../hooks";
import { AdminTableReview, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";

const AdminReviewContent = () => {
  const url = "/api/v1/reviews/filter";
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [isLoading, setIsLoading] = useState(loading);
  const [totalPage, setTotalPage] = useState(totalPages);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <AdminTableReview
      data={data}
      setLoading={setIsLoading}
      setTotalPage={setTotalPage}
      currentPage={currentPage}
      type={"review"}
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

export default AdminReviewContent;

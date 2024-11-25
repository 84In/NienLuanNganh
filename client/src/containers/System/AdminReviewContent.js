import React, { useEffect, useState } from "react";
import { usePagination } from "../../hooks";
import { AdminTableReview, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";

const AdminReviewContent = () => {
  const url = "/api/v1/reviews/filter";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);
  const [totalPage, setTotalPage] = useState(totalPages);
  useEffect(() => {
    // Cập nhật dữ liệu ban đầu
    setValueData(data);

    // Thiết lập interval để cập nhật dữ liệu mỗi 15 phút (15 * 60 * 1000 ms)
    const intervalId = setInterval(
      () => {
        updatePage(currentPage); // Fetch lại dữ liệu trang hiện tại
      },
      15 * 60 * 1000,
    );

    // Dọn dẹp interval khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [data, currentPage, updatePage]); // Dependency array cập nhật khi data hoặc currentPage thay đổi

  useEffect(() => {
    // Cập nhật lại valueData khi loading hoặc khi dữ liệu thay đổi
    setValueData(data);
    setIsLoading(loading);
  }, [data, loading]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <AdminTableReview
      data={valueData}
      setLoading={setIsLoading}
      setTotalPage={setTotalPage}
      currentPage={currentPage}
      type={"review"}
      url={url}
      pagination={
        <Grid2 item xs={12}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={updatePage}
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

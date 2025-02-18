import React, { useEffect, useState } from "react";
import { AdminTable, AdminTableOrder, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";

const AdminPaymentContent = () => {
  const url = "/api/v1/payment";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

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
    <div>
      <AdminTable
        data={valueData}
        setValueData={setValueData}
        setLoading={setIsLoading}
        currentPage={currentPage}
        type={"payment"}
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

export default AdminPaymentContent;

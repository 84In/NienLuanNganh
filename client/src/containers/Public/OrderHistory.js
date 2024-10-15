import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { GoSearch } from "react-icons/go";
import { OrderItem, Pagination, SearchBar } from "../../components";
import { usePagination } from "../../hooks";

const OrderHistory = () => {
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(`api/v1/orders/current-user`, 0, 5);

  console.log(data);

  return (
    <Grid2
      container
      rowGap={2}
      columnGap={"none"}
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "1rem", height: "100%" }}
    >
      <Grid2
        container
        sx={{
          flexGrow: 1,
          display: "flex",
          p: 2,
          bgcolor: "white",
          borderRadius: "8px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <h1 className="mb-4 text-lg font-semibold">Đơn hàng của tôi</h1>
        <div className="w-full">
          <SearchBar IconBefore={GoSearch} TextContent={"Tra cứu"} Name={"order-search"} />
        </div>
        <div className="w-full space-y-6 px-0 py-4 grid-md:px-4 grid-md:py-4">
          {data?.map((item, index) => (
            <OrderItem product={item} key={index} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          nextPage={nextPage}
          prevPage={prevPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </Grid2>
    </Grid2>
  );
};

export default memo(OrderHistory);

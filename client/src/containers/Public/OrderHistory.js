import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { OrderItem, Pagination, SearchBar } from "../../components";
import { usePagination } from "../../hooks";
import { orderStatusNav } from "../../utils";
import { NavLink, useSearchParams } from "react-router-dom";

const OrderHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [currentStatus, setCurrentStatus] = useState(searchParams.get("status") || "");
  const [search, setSearch] = useState(`api/v1/orders/current-user`);
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(search, 0, 5);

  useEffect(() => {
    const newSearch = currentStatus
      ? `api/v1/orders/current-user?status=${currentStatus}`
      : `api/v1/orders/current-user`;
    setSearch(newSearch);
    currentStatus ? setSearchParams({ status: currentStatus }) : setSearchParams({});
    setCurrentPage(0);
  }, [currentStatus]);

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
        <div className="w-full">
          <h1 className="mb-4 text-lg font-semibold">Đơn hàng của tôi</h1>
        </div>
        <div className="mb-4 flex w-full items-center justify-between rounded-lg border">
          {orderStatusNav.map((item, index) => (
            <button
              key={index}
              className={`h-full w-full p-2 text-sm grid-md:text-base ${currentStatus === item.status ? `border-b-2 border-blue-600 text-blue-600` : "text-gray-500"}`}
              onClick={() => setCurrentStatus(item.status)}
            >
              {item.name}
            </button>
          ))}
        </div>
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

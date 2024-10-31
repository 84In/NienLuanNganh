import { LinearProgress, Rating } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { usePagination } from "../../hooks";
import Pagination from "../Common/Pagination";

const Review = ({ productId }) => {
  const [urlApi, setUrlApi] = useState(`/api/v1/products/${productId}/reviews`);

  const {
    data: reviews,
    currentPage,
    updatePage,
    currentParams,
    updateParams,
    totalPages,
    loading,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(urlApi, 0, 5, false);

  useEffect(() => {
    const baseUrl = `/api/v1/products/${productId}/reviews`;
    setUrlApi(baseUrl);
  }, [productId]);

  return (
    <Grid2 id="pagination" container direction="column" sx={{ gap: 1, width: "100%" }}>
      <Grid2 item container sx={{ width: "100%" }}>
        <Grid2 item xs={12} md={6} className="flex flex-col gap-2 p-2">
          <h1 className="text-lg font-semibold">Tổng quan</h1>
          <div className="flex w-full items-center gap-2">
            <p className="text-5xl font-bold">{reviews?.averageRating ? reviews?.averageRating : 0}</p>
            <Rating value={reviews?.averageRating ? reviews?.averageRating : 0} precision={0.5} size="large" readOnly />
          </div>
          <p className="text-gray-500">({reviews?.totalReviews ? reviews?.totalReviews : 0} đánh giá)</p>
        </Grid2>
        <Grid2
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: { xs: "normal", md: "end" },
            width: "100%",
            p: 1,
          }}
        >
          <div className="w-full">
            {reviews &&
              Array.from({ length: 5 }, (_, index) => {
                const starRating = 5 - index; // 5, 4, 3, 2, 1
                const value = (reviews && reviews.ratingCount && reviews.ratingCount[starRating]) || 0; // Get value or default to 0
                return (
                  <div className="flex items-center" key={starRating}>
                    <div className="min-w-[100px]">
                      <Rating value={starRating} precision={0.5} size="small" readOnly />
                    </div>
                    <div className="w-9/12">
                      <LinearProgress
                        variant="determinate"
                        color="primary"
                        value={reviews?.totalReviews ? (value / reviews.totalReviews) * 100 : 0}
                        sx={{
                          height: "8px",
                          width: "100%",
                          minWidth: "125px",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="ml-4 w-2/12 place-items-start">
                      <p>{value}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </Grid2>
      </Grid2>
      <hr className="mt-4 flex h-[2px] w-full items-center justify-center bg-gray-400 px-4" />
      <Grid2 item sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {reviews?.reviews?.content?.map((item, index) => (
          <ReviewItem review={item} key={index} />
        ))}
      </Grid2>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={updatePage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
      />
    </Grid2>
  );
};

export default memo(Review);

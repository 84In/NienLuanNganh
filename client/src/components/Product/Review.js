import { LinearProgress, Rating } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import ReviewItem from "./ReviewItem";

const Review = () => {
  //Assumed value
  const ratings = [59, 14, 1, 0, 0];
  const totalReviews = ratings.reduce((acc, item) => acc + item, 0);
  const rating = {
    name: "SANS",
    star: 5,
    comment: "Gjob! I am going buy this phone again to give my parent! ",
  };
  const averageRating = 4.8;

  return (
    <Grid2 container direction="column" sx={{ gap: 1, width: "100%" }}>
      <Grid2 item container sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Grid2 item xs={12} md={4} className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Tổng quan</h1>
          <div className="flex w-full items-center gap-2">
            <p className="text-5xl font-bold">{averageRating ? averageRating : 0}</p>
            <Rating value={averageRating ? averageRating : 0} precision={0.5} size="large" readOnly />
          </div>
          <p className="text-gray-500">({totalReviews ? totalReviews : 0} đánh giá)</p>
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
          }}
        >
          <div className="w-full">
            {ratings.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Rating value={5 - index} precision={0.5} size="small" readOnly />
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  value={(item / totalReviews) * 100}
                  sx={{
                    height: "8px",
                    width: "60%",
                    minWidth: "125px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                  }}
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Grid2>
      </Grid2>
      <hr className="mt-4 flex h-[2px] w-full items-center justify-center bg-gray-400 px-4" />
      <Grid2 item sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {ratings.map((item, index) => (
          <ReviewItem rating={rating} key={index} />
        ))}
      </Grid2>
    </Grid2>
  );
};

export default memo(Review);

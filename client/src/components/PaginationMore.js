import React from "react";
import { Button } from "@mui/material";

const PaginationMore = (loadMore, hasMore) => {
  return (
    <div>
      {hasMore && (
        <Button variant="outlined" size="large" color="primary" onClick={loadMore}>
          Xem Thêm
        </Button>
      )}
    </div>
  );
};

export default PaginationMore;

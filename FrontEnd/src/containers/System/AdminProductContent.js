import React, { memo, useEffect, useState } from "react";
import { AdminItemName, AdminTable, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";
import icons from "../../utils/icons";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const StyledTypography = styled.p`
  display: flex;
  text-decoration: underline;
  font-style: italic;
  cursor: default;
  transition: color 0.3s;

  &:hover {
    cursor: pointer;
    color: blue;
  }
`;
const { BiX } = icons;

const AdminProductContent = () => {
  const url = "/api/v1/products/search";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [valueData, setValueData] = useState("");
  const [isLoading, setIsLoading] = useState(loading);
  const [isShowKeyword, setIsShowKeyword] = useState(false);

  const [isKeyword, setIsKeyword] = useState("");
  const navigate = useNavigate();
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

  const handleFilter = (keyword) => {
    const updatedParams = new URLSearchParams();
    // console.log("rating", rating);
    if (keyword && keyword !== "") {
      updatedParams.set("keyword", keyword);
    } else {
      updatedParams.delete("keyword");
    }
    setIsShowKeyword(true);
    navigate(`?${updatedParams.toString()}`);
  };

  const handleKeyword = (e) => {
    setIsKeyword(e.target.value);
  };

  useEffect(() => {
    const handlePopState = () => {
      updatePage(currentPage);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box width={"full"} display="flex" flexDirection="column" gap={2} marginBottom={3}>
      {/* Input tìm kiếm tên sản phẩm */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Ngăn việc reload trang
          handleFilter(isKeyword); // Thực hiện lọc
        }}
        className="flex w-full items-center justify-center gap-4"
      >
        <AdminItemName
          name={isKeyword}
          nameLabel={"Keyword"}
          value={isKeyword || ""}
          handleName={(e) => handleKeyword(e)}
        />
        <Button className="w-1/12" type="submit" variant="contained" color="primary">
          Lọc
        </Button>
      </form>

      {/* Hiển thị giá trị bộ lọc đã chọn */}
      {isShowKeyword && isKeyword && (
        <Box marginTop={2} className={"flex items-center gap-2"}>
          <Typography>
            <strong>Keyword:</strong>
          </Typography>
          <StyledTypography
            onClick={() => {
              setIsKeyword("");
              handleFilter("");
              setIsShowKeyword(false);
            }}
          >
            {isKeyword}
            {<BiX size={24} />}
          </StyledTypography>
        </Box>
      )}
      <Box marginTop={2} className={"flex items-center justify-center"}>
        <AdminTable
          data={valueData}
          type={"product"}
          pagination={
            <Grid2 item xs={12}>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={updatePage}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
              />
            </Grid2>
          }
        />
      </Box>
    </Box>
  );
};

export default memo(AdminProductContent);

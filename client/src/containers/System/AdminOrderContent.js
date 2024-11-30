import React, { memo, useEffect, useState } from "react";
import { AdminItemName, AdminTableOrder, Loading, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import icons from "../../utils/icons";
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

const AdminOrderContent = () => {
  const url = "/api/v1/orders";
  const { data, currentPage, updatePage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url, 0);

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
    const updatedParams = new URLSearchParams(window.location.search);
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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <AdminTableOrder
        data={valueData}
        setValueData={setValueData}
        setLoading={setIsLoading}
        currentPage={currentPage}
        type={"order"}
        url={url}
        setIsShowKeyword={setIsShowKeyword}
        setIsKeyword={setIsKeyword}
        search={
          <>
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
          </>
        }
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

export default memo(AdminOrderContent);

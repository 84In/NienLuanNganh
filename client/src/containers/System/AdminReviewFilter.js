/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, FormControl, InputLabel, MenuItem, Rating, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import icons from "../../utils/icons";
import { AdminItemAutoSelect, AdminTableReview, Pagination } from "../../components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePagination } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { apiSearchProduct, apiSearchUserByKeyword } from "../../services";
import useDebounce from "../../hooks/debounce";

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

const AdminReviewFilter = () => {
  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState("");
  const url = "/api/v1/reviews/filter";
  const { data, currentPage, setCurrentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } =
    usePagination(url);

  const [optionUsers, setOptionUsers] = useState([]);
  const [valueUser, setValueUser] = useState("");
  const [optionProducts, setOptionProducts] = useState([]);
  const [valueProduct, setValueProduct] = useState("");
  const debouncedValueProduct = useDebounce(valueProduct, 300);
  const debouncedValueUser = useDebounce(valueUser, 300);

  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSetValueDefault = (type) => {
    switch (type) {
      case "product":
        setOptionProducts([]);
        setProduct("");
        setValueProduct(null);
        break;
      case "rating":
        setRating("");
        break;
      case "user":
        setOptionUsers([]);
        setUser("");
        setValueUser(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleFilter();
  }, [user, product, rating]);

  useEffect(() => {
    const fetchDataProduct = async (keyword) => {
      const response = await apiSearchProduct(keyword);
      if (response?.code === 0) {
        setOptionProducts(response?.result?.content);
      }
    };

    if (debouncedValueProduct) {
      fetchDataProduct(debouncedValueProduct);
    } else {
      setOptionProducts([]); // Reset options if no input
    }
  }, [debouncedValueProduct]);

  useEffect(() => {
    const fetchDataUser = async (keyword) => {
      const response = await apiSearchUserByKeyword(keyword);
      if (response?.code === 0) {
        setOptionUsers(response?.result?.content);
      }
    };

    if (debouncedValueUser) {
      fetchDataUser(debouncedValueUser);
    } else {
      setOptionUsers([]); // Reset options if no input
    }
  }, [debouncedValueUser]);

  // Hàm lọc (có thể thêm logic cho hàm này)
  const handleFilter = () => {
    const updatedParams = new URLSearchParams();
    console.log("rating", rating);
    if (user && user !== "") {
      updatedParams.set("userId", user?.id);
    } else {
      updatedParams.delete("userId");
    }
    if (product && product !== "") {
      updatedParams.set("productId", product?.id);
    } else {
      updatedParams.delete("productId");
    }
    if (rating && rating !== "") {
      updatedParams.set("rating", rating);
    } else {
      updatedParams.delete("rating");
    }
    navigate(`?${updatedParams.toString()}`);
  };
  return (
    <Box width={"full"} display="flex" flexDirection="column" gap={2} marginBottom={3}>
      <Box display="flex" gap={2} alignItems="center">
        {/* Input tìm kiếm tên sản phẩm */}
        <AdminItemAutoSelect
          label={"Tìm theo tên khách hàng"}
          options={optionUsers}
          value={user}
          setValue={setUser}
          setInputValue={setValueUser}
          type="user"
        />
        <AdminItemAutoSelect
          label={"Tìm theo tên sản phẩm"}
          options={optionProducts}
          value={product}
          setValue={setProduct}
          setInputValue={setValueProduct}
        />
        {/* Rating (1-5) */}
        <FormControl
          variant="outlined"
          className="w-2/3"
          size="small"
          sx={{
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#E2E8F0",
              },
              "&:hover fieldset": {
                borderColor: "#3182CE",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3182CE",
              },
            },
          }}
        >
          <InputLabel>Rating</InputLabel>
          <Select label="Rating" value={rating} onChange={handleRatingChange}>
            <MenuItem value={""}>----------</MenuItem>
            {[1, 2, 3, 4, 5].map((value) => (
              <MenuItem key={value} value={value}>
                <Rating value={value} readOnly />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Button để lọc */}
        {/* <Button variant="contained" color="primary" onClick={handleFilter}>
          Lọc
        </Button> */}
      </Box>
      {/* Hiển thị giá trị bộ lọc đã chọn */}
      {(user !== "" || product !== "" || rating !== "") && (
        <Box marginTop={2} className={"flex items-center gap-2"}>
          <Typography>
            <strong>Bộ lọc:</strong>
          </Typography>
          <StyledTypography onClick={() => handleSetValueDefault("user")}>
            {user ? `${user?.firstName} ${user?.lastName}` : ""}
            {user !== "" && <BiX size={24} />}
          </StyledTypography>
          <StyledTypography onClick={() => handleSetValueDefault("product")}>
            {product ? product?.name : ""}
            {product !== "" && <BiX size={24} />}
          </StyledTypography>

          <StyledTypography onClick={() => handleSetValueDefault("rating")}>
            {rating ? `${rating} sao ` : ""}
            {rating !== "" && <BiX size={24} />}
          </StyledTypography>
        </Box>
      )}
      <Box marginTop={2} className={"flex items-center justify-center"}>
        <AdminTableReview
          data={data}
          pagination={
            <Grid2 item xs={12}>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
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

export default AdminReviewFilter;

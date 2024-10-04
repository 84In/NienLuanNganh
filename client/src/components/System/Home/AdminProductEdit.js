import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiSearchBrandByName } from "../../../services";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const cssField = {
  backgroundColor: "#fff", // Màu nền của Select
  borderRadius: "8px", // Bo góc
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E2E8F0", // Màu viền mặc định
    },
    "&:hover fieldset": {
      borderColor: "#3182CE", // Màu viền khi hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3182CE", // Màu viền khi focus
    },
  },
};

const AdminProductEdit = ({ product }) => {
  const [data, setData] = useState({
    name: null,
    description: null,
    price: null,
    stockQuantity: null,
    images: null,
    category_id: null,
    brand_id: null,
  });
  const [files, setFiles] = useState(null);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorStockQuantity, setErrorStockQuantity] = useState(false);
  const [valueBrand, setValueBrand] = useState("");
  const [options, setOptions] = useState([]);
  const [prevValueBrand, setPrevValueBrand] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product]);
  const validPrice = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setErrorPrice(false);
      setData((prev) => ({
        ...prev,
        price: inputValue,
      }));
    } else {
      setErrorPrice(true); // Hiển thị lỗi nếu nhập ký tự không hợp lệ
    }
  };
  const validStockQuantity = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setErrorStockQuantity(false);
      setData((prev) => ({
        ...prev,
        stockQuantity: inputValue,
      }));
    } else {
      setErrorStockQuantity(true); // Hiển thị lỗi nếu nhập ký tự không hợp lệ
    }
  };

  useEffect(() => {
    if (valueBrand && valueBrand !== prevValueBrand) {
      const fetchBrands = async () => {
        const response = await apiSearchBrandByName(valueBrand);
        if (response?.code === 0) {
          setOptions(response?.result);
        } else {
          setOptions([]); // Xóa danh sách khi không có kết quả
        }
      };

      fetchBrands();
      setPrevValueBrand(valueBrand); // Cập nhật giá trị trước đó
    } else if (!valueBrand) {
      setOptions([]); // Xóa kết quả khi không có giá trị tìm kiếm
    }
  }, [valueBrand]); // Gọi lại khi valueBrand thay đổi

  useEffect(() => {
    console.log(data);
  }, [data]);

  const CSS_HEADING = "font-bold text-2xl";

  const CustomPaper = (props) => (
    <Paper {...props} sx={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", ...props.sx }} />
  );

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-center">
        {product ? (
          <span className={CSS_HEADING}>Cập nhật sản phẩm</span>
        ) : (
          <span className={CSS_HEADING}>Tạo sản phẩm mới</span>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin sản phẩm</span>
          <div>
            <Grid2 container className="pb-6">
              <Grid2
                padding={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={6}
                className="flex flex-col gap-3"
              >
                <div className="flex w-full flex-col items-center justify-end gap-4">
                  <TextField
                    name="nameProduct"
                    type="text"
                    value={data?.name}
                    variant="outlined"
                    size="small" // Đặt kích thước thành small
                    fullWidth
                    className="bg-white"
                    label="Tên sản phẩm"
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "18px", fontWeight: "bold" }, // Chữ lớn và đậm
                    }}
                    required
                    sx={{ backgroundColor: "white", ...cssField }} // Đảm bảo CSS tương ứng
                  />
                </div>
                <div className="flex items-center justify-end gap-4">
                  <div className="flex items-center justify-center">
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "18px",
                          fontWeight: "bold",
                        },
                      }}
                      error={errorPrice} // Đánh dấu trường input bị lỗi
                    >
                      <InputLabel htmlFor="outlined-adornment-amount">Giá</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">VNĐ</InputAdornment>}
                        label="Giá"
                        value={data?.price}
                        onChange={validPrice}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        required
                      />
                      {errorPrice && <FormHelperText>Lỗi: Chỉ được nhập số.</FormHelperText>}
                    </FormControl>
                  </div>
                  <div className="flex items-center justify-center">
                    <FormControl
                      fullWidth
                      sx={{
                        m: 1,
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                          borderRadius: "4px", // Tùy chọn làm tròn góc
                          padding: "8px 14px", // Điều chỉnh padding giống TextField
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "18px",
                          fontWeight: "bold",
                        },
                        "& .MuiInputLabel-shrink": {
                          fontSize: "18px",
                          fontWeight: "bold",
                        },
                      }}
                      error={errorStockQuantity}
                    >
                      <InputLabel htmlFor="outlined-adornment-amount" shrink>
                        Số lượng sản phẩm
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        label="Số lượng sản phẩm"
                        value={data?.stockQuantity}
                        size="small"
                        onChange={validStockQuantity}
                        notched // Tạo khoảng trống cho label khi ở trạng thái thu nhỏ
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        required
                      />
                      {errorStockQuantity && <FormHelperText>Lỗi: Chỉ được nhập số.</FormHelperText>}
                    </FormControl>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-end gap-4">
                  <TextField
                    name="description"
                    type="text"
                    value={data?.description}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className="bg-white"
                    label="Description" // Tên trường
                    multiline // Cho phép nhập nhiều dòng
                    rows={4} // Số dòng hiển thị
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "18px", fontWeight: "bold" },
                    }}
                    required
                  />
                </div>
              </Grid2>
              <Grid2
                display={"flex"}
                className="flex-col gap-2 pb-2 pt-2"
                justifyContent={"start"}
                alignItems={"center"}
                item
                xs={6}
              >
                <div className="flex flex-col items-center justify-center gap-4">1</div>
                <div className="flex w-2/3 items-center justify-center gap-4">
                  <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nhập thương hiệu"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "#f5f5f5", // Màu nền
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
                      />
                    )}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        style={{ padding: "10px", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}
                      >
                        {option.name}
                      </li>
                    )}
                    PaperComponent={CustomPaper}
                    onInputChange={(event, newInputValue) => {
                      setValueBrand(newInputValue);
                      setIsOpen(true); // Mở dropdown khi có input
                    }}
                    onFocus={() => {
                      // Mở dropdown khi người dùng focus vào TextField
                      if (options.length > 0) {
                        setIsOpen(true);
                      }
                    }}
                    onChange={(event, newValue) => {
                      setValueBrand(newValue?.name || ""); // Cập nhật giá trị khi chọn
                      setIsOpen(false); // Đóng dropdown khi chọn
                    }}
                    open={isOpen && options.length > 0} // Mở dropdown khi isOpen là true và có options
                  />
                </div>
                ss
                <div className="flex flex-col items-center justify-center gap-4">1</div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">Thông tin liên hệ</span>
          <div>
            <Grid2 container className="pb-6"></Grid2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;

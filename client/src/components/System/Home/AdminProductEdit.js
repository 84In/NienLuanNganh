import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardMedia,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiSearchBrandByName, apiSearchPromotionsByName } from "../../../services";
import { useSelector } from "react-redux";
import { Box, CloudUploadIcon, DeleteIcon, Grid } from "lucide-react";

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
  const [valuePromotion, setValuePromotion] = useState("");
  const [options, setOptions] = useState([]);
  const [optionsPromotion, setOptionsPromotion] = useState("");
  const [prevValueBrand, setPrevValueBrand] = useState("");
  const [prevValuePromotion, setPrevValuePromotion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPromotion, setIsOpenPromotion] = useState(false);
  const { categories } = useSelector((state) => state.app);

  console.log(categories);

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
  useEffect(() => {
    if (valuePromotion && valuePromotion !== prevValuePromotion) {
      const fetchPromotions = async () => {
        const response = await apiSearchPromotionsByName(valuePromotion);
        if (response?.code === 0) {
          setOptionsPromotion(response?.result);
          console.log(response);
        } else {
          setOptionsPromotion([]); // Xóa danh sách khi không có kết quả
        }
      };

      fetchPromotions();
      setPrevValuePromotion(valueBrand); // Cập nhật giá trị trước đó
    } else if (!valuePromotion) {
      setOptionsPromotion([]); // Xóa kết quả khi không có giá trị tìm kiếm
    }
  }, [valuePromotion]); // Gọi lại khi valueBrand thay đổi

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChangeCategory = (e) => {
    setData((prev) => ({
      ...prev,
      category_id: e.target.value,
    }));
    console.log(data.category_id);
  };
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Lưu file vào state
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleClearAllImages = () => {
    setImages([]);
  };
  const handleDrop = (event, index) => {
    const draggedImageIndex = event.dataTransfer.getData("text/plain");
    const newImages = Array.from(images);

    // Hoán đổi vị trí hình ảnh
    const [movedImage] = newImages.splice(draggedImageIndex, 1);
    newImages.splice(index, 0, movedImage);

    setImages(newImages);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  console.log(images);

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
        <div className="m-2 w-full rounded-md bg-gray-200 p-2 pb-2">
          <span className="mb-2 text-xl font-semibold">Thông tin sản phẩm</span>
          <div className="mt-2">
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
                className="flex-col items-center justify-center gap-4 pb-2 pt-2"
                justifyContent={"start"}
                alignItems={"center"}
                item
                xs={6}
              >
                <div className="mt-5 flex w-2/3 flex-col items-center justify-center gap-4">
                  <FormControl className="relative" fullWidth variant="outlined">
                    <InputLabel id="categories-label" shrink>
                      Loại sản phẩm
                    </InputLabel>
                    <Select
                      labelId="categories-label"
                      id="category-select"
                      value={data.category_id ? data.category_id : ""}
                      size="small"
                      variant="outlined"
                      onChange={handleChangeCategory}
                      label="Loại sản phẩm"
                      notched // Phải thêm label này để kết nối với InputLabel
                      sx={{
                        ...cssField,
                        fontSize: "14px",
                        padding: "8px",
                        height: "40px",
                        borderRadius: "6px",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#115293", // Màu khi hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1976d2", // Màu khi focus
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "16px", // Kích thước chữ cho các item
                          textAlign: "center", // Căn giữa chữ trong MenuItem
                          display: "flex",
                          alignItems: "center", // Căn giữa theo chiều dọc
                        }}
                      >
                        ---------
                      </MenuItem>
                      {categories &&
                        categories?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item?.id}
                              sx={{
                                fontSize: "16px", // Kích thước chữ cho các item
                                textAlign: "center", // Căn giữa chữ trong MenuItem
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                              }}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
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
                <div className="flex w-2/3 flex-col items-center justify-center gap-4">
                  <Autocomplete
                    options={optionsPromotion}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nhập mã giảm giá"
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
                      setValuePromotion(newInputValue);
                      setIsOpenPromotion(true); // Mở dropdown khi có input
                    }}
                    onFocus={() => {
                      // Mở dropdown khi người dùng focus vào TextField
                      if (optionsPromotion.length > 0) {
                        setIsOpenPromotion(true);
                      }
                    }}
                    onChange={(event, newValue) => {
                      setValuePromotion(newValue?.name || ""); // Cập nhật giá trị khi chọn
                      setIsOpenPromotion(false); // Đóng dropdown khi chọn
                    }}
                    open={isOpenPromotion && optionsPromotion.length > 0} // Mở dropdown khi isOpen là true và có options
                  />
                </div>
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">
            Hình ảnh minh hoạ sản phẩm <strong>(*)</strong>
          </span>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {" "}
              {/* Để sắp xếp các hình ảnh theo hàng */}
              {images.map((file, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={(event) => event.preventDefault()} // Ngăn chặn hành vi mặc định
                  onDrop={(event) => handleDrop(event, index)} // Xử lý thả
                  style={{ position: "relative", margin: "10px" }} // Đảm bảo mỗi hình ảnh có khoảng cách
                >
                  <img
                    src={URL.createObjectURL(file)} // Tạo URL tạm thời từ file
                    alt={`Uploaded ${index}`}
                    style={{
                      maxWidth: "300px", // Giới hạn chiều rộng tối đa
                      maxHeight: "200px", // Giới hạn chiều cao tối đa
                      width: "100%", // Chiều rộng sẽ là 100% trong giới hạn tối đa
                      borderRadius: "10px", // Bo góc
                      objectFit: "cover", // Đảm bảo hình ảnh không bị méo
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "5px", // Đặt biểu tượng gần góc trên
                      right: "5px", // Đặt biểu tượng gần góc bên phải
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                    }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>

            <div className="m-2 flex items-center justify-center p-2 pb-4 pt-4">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-button-file"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="upload-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <Button variant="contained" color="error" onClick={handleClearAllImages} style={{ marginLeft: "10px" }}>
                Xóa tất cả ảnh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductEdit;

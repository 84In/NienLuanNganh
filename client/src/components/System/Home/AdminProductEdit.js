import { Button, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import React, { useEffect, useState } from "react";
import { apiSearchBrandByName } from "../../../services";
import { useSelector } from "react-redux";
import icons from "../../../utils/icons";
import * as apis from "../../../services";
import AdminItemName from "../Items/AdminItemName";
import AdminItemCategory from "../Items/AdminItemCategory";
import AdminItemAutoSelect from "../Items/AdminItemAutoSelect";
import AdminItemDescription from "../Items/AdminItemDescription";
import AdminItemInputStock from "../Items/AdminItemInputStock";
import AdminItemInputPrice from "../Items/AdminItemInputPrice";
import Swal from "sweetalert2";
import AdminItemAutoSelectMultiple from "../Items/AdminItemAutoSelectMultiple";

const { BiX } = icons;

const AdminProductEdit = ({ product, isEdit }) => {
  const [data, setData] = useState({
    name: null,
    description: null,
    price: null,
    stockQuantity: null,
    images: null,
    category_id: null,
    brand_id: null,
    promotions: [],
  });
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorStockQuantity, setErrorStockQuantity] = useState(false);
  const [valueBrand, setValueBrand] = useState("");
  const [valuePromotion, setValuePromotion] = useState("");
  const [inputValueBrand, setInputValueBrand] = useState("");
  const [options, setOptions] = useState([]);
  const [prevValueBrand, setPrevValueBrand] = useState("");
  const { categories } = useSelector((state) => state.app);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setData(product);
      setValueBrand(product?.brand || "");
      setValuePromotion(product?.promotions || "");
    }
  }, [product]);

  const handleName = (e) => {
    setData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

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

  const handleDescription = (e) => {
    const inputValue = e.target.value;
    setData((prev) => ({
      ...prev,
      description: inputValue,
    }));
  };

  useEffect(() => {
    if (inputValueBrand && inputValueBrand !== prevValueBrand) {
      const fetchBrands = async () => {
        const response = await apiSearchBrandByName(inputValueBrand);
        if (response?.code === 0) {
          setOptions(response?.result);
        } else {
          setOptions([]); // Xóa danh sách khi không có kết quả
        }
      };
      fetchBrands();
      setPrevValueBrand(inputValueBrand); // Cập nhật giá trị trước đó
    } else if (!valueBrand) {
      setOptions([]); // Xóa kết quả khi không có giá trị tìm kiếm
    }
  }, [inputValueBrand]); // Gọi lại khi valueBrand thay đổi

  const handleChangeCategory = (e) => {
    setData((prev) => ({
      ...prev,
      category_id: e.target.value,
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const validFiles = files.filter((file) => validImageTypes.includes(file.type));

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    } else {
      alert("Vui lòng chỉ tải lên các tệp hình ảnh hợp lệ (jpeg, jpg, png, gif).");
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleDeleteImageText = (index) => {
    setData((prev) => {
      const imagesArray = JSON.parse(prev.images.replace(/'/g, '"'));
      const updatedImagesArray = imagesArray.filter((_, i) => i !== index);
      const updatedImagesJson = JSON.stringify(updatedImagesArray);
      return {
        ...prev,
        images: updatedImagesJson,
      };
    });
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

  valueBrand && console.log(valueBrand.id);
  inputValueBrand && console.log(inputValueBrand);

  useEffect(() => {
    console.log(valuePromotion);
    console.log(product);
  }, [valuePromotion, product]);

  const handleSubmit = async () => {
    const name = data?.name;
    const category_id = data?.category?.id || data?.category_id;
    const price = data?.price;
    const stockQuantity = data?.stockQuantity;
    const description = data?.description;
    var brand_id = valueBrand.id;

    if ((images.length > 0 || data?.images.length > 0) && name && category_id && price && stockQuantity) {
      if (images && images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("files", image); // Thêm từng hình ảnh vào FormData
        });
        const response = await apis.apiUploadProductImages(data.name, formData);
        if (response.code === 0 && response.result && response.result.length > 0) {
          console.log(response);

          setData((prev) => {
            const imagesArray = prev.images ? JSON.parse(prev.images.replace(/'/g, '"')) : [];
            const resultImage = [...imagesArray, ...response.result];
            return {
              ...prev,
              images: JSON.stringify(resultImage),
            };
          });
        }
      }

      // Tạo brand nếu chưa có
      if (inputValueBrand && !valueBrand !== "") {
        const response = await apis.apiCreateBrand({ name: inputValueBrand });
        if (response?.code === 0) {
          brand_id = response?.result?.id;
        }
      }
      if (!isEdit) {
        const response = await apis.apiCreateProduct({
          name,
          description,
          price,
          stockQuantity,
          categoryId: category_id,
          brandId: brand_id,
          images: data?.images,
          promotions: valuePromotion.map((item) => item.id),
        });
        if (response?.code === 0) {
          Swal.fire({
            title: "Đã thêm sản phẩm thành công!",
            text: response?.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.history.back();
          });
        }
      } else {
        const response = await apis.apiUpdateProduct(
          {
            name,
            description,
            price,
            stockQuantity,
            categoryId: category_id,
            brandId: brand_id || valueBrand.id,
            images: data?.images,
            promotions: valuePromotion.map((item) => item.id),
          },
          product?.id,
        );
        if (response?.code === 0) {
          Swal.fire({
            title: "Đã cập nhật sản phẩm thành công!",
            text: response?.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.history.back();
          });
        }
      }
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(valueBrand);
  }, [valueBrand]);

  useEffect(() => {
    console.log(valuePromotion);
  }, [valuePromotion]);
  const CSS_HEADING = "font-bold text-2xl";
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
          <div className="mt-4">
            <Grid2 container className="pb-6">
              <Grid2
                padding={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                className="flex flex-col gap-4"
              >
                <AdminItemName name={data?.name} handleName={handleName} />
                <div className="flex w-full gap-4">
                  <div className="flex w-full flex-col gap-4">
                    <AdminItemCategory
                      categories={categories}
                      category_id={isEdit ? data?.category?.id : data?.category_id}
                      handleChangeCategory={handleChangeCategory}
                    />
                    <AdminItemAutoSelectMultiple
                      label={"Nhập mã giảm giá"}
                      value={valuePromotion}
                      setValue={setValuePromotion}
                    />
                  </div>
                  <div className="flex w-full flex-col items-center justify-end gap-4">
                    <AdminItemInputPrice errorPrice={errorPrice} price={data?.price} validPrice={validPrice} />

                    <div className="flex w-full gap-4">
                      <AdminItemInputStock
                        errorStockQuantity={errorStockQuantity}
                        validStockQuantity={validStockQuantity}
                        stockQuantity={data?.stockQuantity}
                      />
                      <AdminItemAutoSelect
                        label={"Nhập thương thiệu"}
                        value={valueBrand}
                        options={options}
                        setValue={setValueBrand}
                        inputValue={inputValueBrand}
                        setInputValue={setInputValueBrand}
                      />
                    </div>
                  </div>
                </div>
                <AdminItemDescription description={data?.description} handleDescription={handleDescription} />
              </Grid2>
            </Grid2>
          </div>
        </div>
        <div className="m-2 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 text-xl font-semibold">
            Hình ảnh minh hoạ sản phẩm <span className="text-rose-500">(*)</span>
          </span>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {isEdit &&
                data?.images?.length > 0 &&
                JSON.parse(data?.images.replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
                  .map((item, index) => (
                    <div
                      key={index}
                      // draggable
                      // onDragStart={(event) => handleDragStart(event, index)}
                      onDragOver={(event) => event.preventDefault()} // Ngăn chặn hành vi mặc định
                      // onDrop={(event) => handleDrop(event, index)} // Xử lý thả
                      style={{ position: "relative", margin: "10px" }} // Đảm bảo mỗi hình ảnh có khoảng cách
                    >
                      <img
                        src={
                          item.includes("http")
                            ? item
                            : `${
                                process.env.NODE_ENV === "production"
                                  ? process.env.REACT_APP_SERVER_URL_PROD
                                  : process.env.REACT_APP_SERVER_URL_DEV
                              }${item}`
                        }
                        // Tạo URL tạm thời từ file
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
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                        onClick={() => handleDeleteImageText(index)}
                      >
                        <BiX fontSize="small" size={24} color="red" />
                      </IconButton>
                    </div>
                  ))}
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
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <BiX fontSize="small" size={24} color="red" />
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
      <div className="flex w-full items-center justify-center">
        <Button
          type="button" // Đặt thành button, hoặc submit nếu cần submit form
          variant="contained"
          tabIndex={-1}
          onClick={handleSubmit} // Gọi hàm handleSubmit khi click
          sx={{
            backgroundColor: "#5951da", // Màu tùy chỉnh
            color: "#fff", // Màu chữ
            fontSize: "14px", // Kích thước chữ
            padding: "4px", // Tùy chỉnh padding
            width: 250,
            height: 40,
            "&:hover": {
              backgroundColor: "#d32f2f", // Màu khi hover
            },
          }}
        >
          {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </div>
    </div>
  );
};

export default AdminProductEdit;

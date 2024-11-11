import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AdminItemName from "../Items/AdminItemName";

import icons from "../../../utils/icons";
import { apiCreateBanner, apiUploadBannerImages } from "../../../services";
import Swal from "sweetalert2";

const { BiX, BiCamera } = icons;

const CSS_HEADING = "font-bold text-2xl";

const AdminBannerEdit = ({ isEdit, banner }) => {
  const [errorInput, setErrorInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [title, setTitle] = useState(banner?.title || "");
  const [images, setImages] = useState([]);

  const [payload, setPayload] = useState({ title: banner?.title, images: banner?.images } || { images: "" });

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
    setPayload((prev) => ({ ...prev, title: title || e.target.value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const validFiles = files.filter((file) => validImageTypes.includes(file.type));

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    } else {
      setErrorInput("Vui lòng chỉ tải lên các tệp hình ảnh hợp lệ (jpeg, jpg, png, gif).");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleDeleteImageText = (index) => {
    setPayload((prev) => {
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
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Đóng Snackbar
  };
  const handleSubmit = async () => {
    if ((images.length > 0 || payload?.images.length > 0) && payload?.title) {
      if (!isEdit) {
        // Upload ảnh
        if (images && images.length > 0) {
          const formData = new FormData();
          images.forEach((image) => {
            formData.append("files", image); // Thêm từng hình ảnh vào FormData
          });
          const response = await apiUploadBannerImages(title, formData);
          if (response.code === 0 && response.result && response.result.length > 0) {
            setPayload((prev) => {
              const imagesArray = prev.images ? JSON.parse(prev.images.replace(/'/g, '"')) : [];
              const resultImage = [...imagesArray, ...response.result];
              return {
                ...prev,
                images: JSON.stringify(resultImage),
              };
            });
          } else {
            setErrorInput(response?.message);
            setOpenSnackbar(true);
            return;
          }
        }
        // Tạo banner
        if (payload?.title && payload?.images) {
          const response = await apiCreateBanner(payload);
          if (response?.code === 0 && response?.result) {
            Swal.fire({
              title: "Thành công!",
              text: `Banner đã được ${isEdit ? "cập nhật" : "tạo"} thành công.`,
              icon: "success", // Loại thông báo: "success", "error", "warning", "info"
              confirmButtonText: "OK",
            }).then(() => {
              window.history.back(); // Quay lại trang trước
            });
          } else {
            // Hiển thị thông báo lỗi nếu có vấn đề với phản hồi
            Swal.fire({
              title: "Lỗi!",
              text: `Có lỗi xảy ra khi ${isEdit ? "cập nhật" : "tạo"} banner.`,
              icon: "error",
              confirmButtonText: "Thử lại",
            });
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Tự động ẩn sau 3 giây
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top", // Vị trí theo chiều dọc (top là trên cùng)
          horizontal: "center", // Vị trí theo chiều ngang (center là giữa)
        }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {errorInput}
        </Alert>
      </Snackbar>
      <div className="flex w-full items-center justify-center">
        {banner ? (
          <span className={CSS_HEADING}>Cập nhật banner</span>
        ) : (
          <span className={CSS_HEADING}>Tạo banner mới</span>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 w-full rounded-md bg-gray-200 p-2 pb-2">
          <div className="m-2 mt-4">
            <Grid2
              container
              display={"flex"}
              padding={"5px"}
              justifyContent={"center"}
              alignItems={"center"}
              className="pb-6"
              xs={12}
              spacing={2}
            >
              <Grid2 item className="flex flex-col items-start justify-center" xs={6}>
                <span className="mb-4 text-lg font-semibold">
                  Tiêu đề banner <span className="text-rose-500">(*)</span>
                </span>
                <AdminItemName
                  name={title}
                  handleName={handleSetTitle}
                  nameLabel={"Tiêu đề banner"}
                  helpText={"Vui lòng nhập không dấu và cách nhau dấu _. Ví dụ: trang_chu"}
                />
              </Grid2>
              <Grid2 item xs={6}></Grid2>
              <Grid2 item xs={12}>
                <div className="w-full rounded-md bg-gray-200">
                  <span className="mb-2 text-lg font-semibold">
                    Danh sách các hình ảnh của banner <span className="text-rose-500">(*)</span>
                  </span>
                  <div className="mt-4">
                    <div
                      style={{ display: "flex", flexWrap: "wrap" }}
                      className="w-full rounded-md border border-dashed bg-white"
                    >
                      {!(images?.length > 0) && (
                        <span className="flex h-44 w-full items-center justify-center">
                          <BiCamera size={56} />
                        </span>
                      )}
                      {isEdit &&
                        payload?.images?.length > 0 &&
                        JSON.parse(payload?.images.replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleClearAllImages}
                        style={{ marginLeft: "10px" }}
                      >
                        Xóa tất cả ảnh
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid2>
            </Grid2>
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
          {isEdit ? "Cập nhật banner" : "Thêm banner"}
        </Button>
      </div>
    </div>
  );
};

export default AdminBannerEdit;

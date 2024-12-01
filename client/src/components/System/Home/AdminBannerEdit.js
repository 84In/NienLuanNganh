import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AdminItemName from "../Items/AdminItemName";

import icons from "../../../utils/icons";
import { apiCreateBanner, apiUpdateBanner, apiUploadBannerImages } from "../../../services";
import Swal from "sweetalert2";

const { BiX, BiCamera, BiSolidRightArrow, BiSolidLeftArrow } = icons;

const CSS_HEADING = "font-bold text-2xl";

const AdminBannerEdit = ({ isEdit, banner }) => {
  const [errorInput, setErrorInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [title, setTitle] = useState(banner?.title || "");
  const [images, setImages] = useState([]);
  const [payload, setPayload] = useState({ title: banner?.title, images: banner?.images });

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
    setPayload((prev) => ({ ...prev, title: title || e.target.value }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    const validFiles = files.filter((file) => validImageTypes.includes(file.type));

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    } else {
      setErrorInput("Vui lòng chỉ tải lên các tệp hình ảnh hợp lệ (jpeg, jpg, png, gif, webp)");
      setOpenSnackbar(true);
      return;
    }

    let updateJSON;

    const formData = new FormData();
    files.forEach((image) => {
      formData.append("files", image); // Thêm từng hình ảnh vào FormData
    });
    const response = await apiUploadBannerImages(title, formData);
    Swal.fire({
      title: "Đang xử lý...",
      text: "Vui lòng đợi trong giây lát...",
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Hiển thị biểu tượng loading
      },
    });

    if (response && response.code === 0 && response.result && response.result.length > 0) {
      const imagesArray = payload.images ? JSON.parse(payload.images.replace(/'/g, '"')) : [];
      const resultImage = [...imagesArray, ...response.result];
      updateJSON = JSON.stringify(resultImage);
      await updatePayload({
        images: updateJSON,
      });
      Swal.close();
    } else {
      setErrorInput(response?.message);
      setOpenSnackbar(true);
      Swal.close();
      return;
    }
  };

  const handleDeleteImage = (index) => {
    const array = JSON.parse(payload.images.replace(/'/g, '"')) || [];
    const result = JSON.stringify(array.filter((_, idx) => idx !== index));
    updatePayload({
      images: result,
    });
  };
  const handleClearAllImages = () => {
    setPayload((prev) => ({
      ...prev,
      images: "",
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Đóng Snackbar
  };

  const updatePayload = async (updateData) => {
    return new Promise((resolve) => {
      setPayload((prev) => {
        const updated = { ...prev, ...updateData };
        resolve(updated); // Trả về giá trị cập nhật
        return updated;
      });
    });
  };
  const handleMoveImage = (index, direction) => {
    const newImages = [...JSON.parse(payload.images.replace(/'/g, '"'))];
    const [movedImage] = newImages.splice(index, 1);

    const newIndex = direction === "up" ? index - 1 : index + 1;
    newImages.splice(newIndex, 0, movedImage);

    updatePayload({
      images: JSON.stringify(newImages),
    });
  };

  const handleSubmit = async () => {
    if ((images.length > 0 || payload?.images.length > 0) && payload?.title) {
      // Tạo banner and update
      if (payload?.title && payload?.images) {
        const response = !isEdit
          ? await apiCreateBanner(payload)
          : await apiUpdateBanner(banner?.id, {
              title: payload?.title,
              images: payload?.images,
            });
        if (response?.code === 0) {
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
                  disable={true}
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
                      {!(images?.length > 0 || payload?.images) && (
                        <span className="flex h-44 w-full items-center justify-center">
                          <BiCamera size={56} />
                        </span>
                      )}
                      {payload.images &&
                        JSON.parse(payload.images.replace(/'/g, '"')).length > 0 &&
                        JSON.parse(payload.images.replace(/'/g, '"')).map((item, index) => (
                          <div
                            key={index}
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
                              onClick={() => handleDeleteImage(index)}
                            >
                              <BiX fontSize="small" size={24} color="red" />
                            </IconButton>
                            <div className="absolute bottom-[70px] left-0 right-0 flex items-center justify-between px-2">
                              <BiSolidLeftArrow
                                size={24}
                                onClick={() => handleMoveImage(index, "up")}
                                color="#94a3b8"
                                className="flex transform justify-start transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:bg-gray-700 hover:text-blue-600 hover:shadow-lg"
                              />

                              <BiSolidRightArrow
                                size={24}
                                onClick={() => handleMoveImage(index, "down")}
                                color="#94a3b8"
                                className="flex transform justify-end transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:bg-gray-700 hover:text-blue-600 hover:shadow-lg"
                              />
                            </div>
                          </div>
                        ))}
                      {/* Để sắp xếp các hình ảnh theo hàng */}
                      {/* {images.map((file, index) => (
                        <div
                          key={index}
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
                      ))} */}
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

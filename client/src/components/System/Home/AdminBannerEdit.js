import { Alert, Snackbar } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AdminItemName from "../Items/AdminItemName";

import icons from "../../../utils/icons";

const { BiCamera, BiLoader, BiTrash } = icons;

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

const CSS_HEADING = "font-bold text-2xl";

const AdminBannerEdit = ({ isEdit, banner }) => {
  const [errorInput, setErrorInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [title, setTitle] = useState("");
  const [imagesPreview, setImagesPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const validFiles = files.filter((file) => validImageTypes.includes(file.type));

    if (validFiles.length > 0) {
      setImagesPreview((prevImages) => [...prevImages, ...validFiles]);
    } else {
      alert("Vui lòng chỉ tải lên các tệp hình ảnh hợp lệ (jpeg, jpg, png, gif).");
    }
  };
  const handleDeleteImage = (index) => {
    setImagesPreview((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Đóng Snackbar
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
          Vui lòng điền đầy đủ tất cả các trường.
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
          <span className="mb-2 text-xl font-semibold">Thông tin banner</span>
          <div className="mt-4">
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
              <Grid2 item display={"flex"} justifyContent={"center"} alignItems={"center"} xs={6}>
                <AdminItemName
                  name={title}
                  handleName={handleSetTitle}
                  nameLabel={"Tiêu đề banner"}
                  helpText={"Vui lòng nhập không dấu và cách nhau dấu _. Ví dụ: trang_chu"}
                />
              </Grid2>
              <Grid2 item xs={6}></Grid2>
              <Grid2 item xs={12}>
                <div className="w-full">
                  <h2 className="py-4 text-xl font-semibold">Hình ảnh</h2>
                  <small>Cập nhật hình ảnh cho trang web sinh động hơn!</small>
                  <div className="w-full">
                    <label
                      className="my-4 flex h-[200px] w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-gray-400"
                      htmlFor="file"
                      //   onFocus={() => setInvalidFields([])}
                    >
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center">
                          <BiLoader size={50} />
                          Đang tải hình ảnh
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <BiCamera size={50} />
                          Thêm ảnh
                        </div>
                      )}
                    </label>
                    <input onChange={handleImageUpload} hidden type="file" id="file" multiple />
                    <div className="mb-6 w-full">
                      <h3 className="py-4 font-medium">Ảnh đã chọn</h3>
                      <div className="flex w-full flex-wrap items-center gap-4">
                        {imagesPreview &&
                          imagesPreview?.map((item, index) => {
                            return (
                              <div key={index} className="relative h-1/6 w-1/6 rounded-md object-cover">
                                <img
                                  src={URL.createObjectURL(item)}
                                  alt=""
                                  className="h-full w-full rounded-md object-cover"
                                />
                                <span
                                  title="Xoá ảnh"
                                  onClick={() => handleDeleteImage(index)}
                                  className="absolute right-1 top-1 cursor-pointer rounded-full bg-gray-300 p-2 hover:bg-gray-600"
                                >
                                  <BiTrash />
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBannerEdit;

import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AdminItemName from "../Items/AdminItemName";
import { formatString, path } from "../../../utils";
import { Alert, Button } from "@mui/material";
import { CloudUploadIcon } from "lucide-react";
import styled from "styled-components";
import fileUpload from "../../../assets/images/file-upload.png";
import * as actions from "../../../store/actions";

import * as apis from "../../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminCategoryEdit = ({ isEdit, category }) => {
  const CSS_HEADING = "font-bold text-2xl";
  const CSS_GRID = "p-2 pl-4 pr-4";

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
  const [fileImage, setFileImage] = useState(null);
  const [alert, setAlert] = useState("");
  const [payload, setPayload] = useState({
    name: category?.name || "",
    codeName: category?.codeName || "",
    images: category?.images || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setPayload((prev) => ({
      ...prev,
      name: e.target.value,
      codeName: formatString(e.target.value),
    }));
  };

  const handleCategoryChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setAlert("Tập tin hình ảnh không hợp lệ! (JPEG, JPG, PNG & GIF)");
        setTimeout(() => setAlert(""), 5000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        document.querySelector("#category-images").src = e.target.result;
        setFileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async (file) => {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!file || !payload?.name) {
      return null;
    }
    if (!validImageTypes.includes(file.type)) {
      setAlert("Tập tin hình ảnh không hợp lệ! (JPEG, JPG, PNG & GIF)");
      return null;
    }

    const formData = new FormData();
    formData.append("files", file);
    const imageResponse = await apis.apiUploadCategoryImages(payload.name, formData);

    if (imageResponse.code === 0) {
      const imageCategoryPath = imageResponse.result[0];
      setFileImage();
      return imageCategoryPath;
    } else {
      setAlert("Lỗi tải ảnh lên");
    }
    setTimeout(() => setAlert(""), 5000);
    return null;
  };

  const handleSubmit = async () => {
    if (isEdit) {
      if (fileImage !== null) {
        const resultUploadImage = await handleUploadImage(fileImage);
        if (resultUploadImage) {
          const response = await apis.apiUpdateCategory(category?.id, {
            name: payload?.name,
            codeName: payload?.codeName,
            images: resultUploadImage,
          });
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: "Loại sản phẩm đã được cập nhật.",
              timer: 2000, // Hiển thị thông báo trong 2 giây
              showConfirmButton: false,
            }).then(() => {
              // Sau 2 giây chuyển hướng người dùng
              setTimeout(() => {
                navigate(`${path.ADMIN_HOME}/${path.ADMIN_CATEGORY}`); // Thay thế bằng URL đích
              }, 1000); // Chuyển hướng sau 1 giây
            });
          } else {
            setAlert(response?.message);
            setTimeout(() => setAlert(""), 5000);
          }
        }
      } else {
        const response = await apis.apiUpdateCategory(category?.id, payload);
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Loại sản phẩm đã được cập nhật.",
            timer: 2000, // Hiển thị thông báo trong 2 giây
            showConfirmButton: false,
          }).then(() => {
            // Sau 2 giây chuyển hướng người dùng
            setTimeout(() => {
              navigate(`${path.ADMIN_HOME}/${path.ADMIN_CATEGORY}`); // Thay thế bằng URL đích
            }, 1000); // Chuyển hướng sau 1 giây
          });
        } else {
          setAlert(response?.message);
          setTimeout(() => setAlert(""), 5000);
        }
      }
    } else {
      if (!payload?.name || !payload?.codeName || !fileImage) {
        setAlert("Vui lòng nhập đủ thông tin!");
        setTimeout(() => setAlert(""), 5000);
        return;
      } else {
        const resultUploadImage = await handleUploadImage(fileImage);
        if (resultUploadImage) {
          const response = await apis.apiCreateCategory({
            name: payload?.name,
            codeName: payload?.codeName,
            images: resultUploadImage,
          });
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: "Loại sản phẩm đã được thêm.",
              timer: 2000, // Hiển thị thông báo trong 2 giây
              showConfirmButton: false,
            }).then(() => {
              // Sau 2 giây chuyển hướng người dùng
              setTimeout(() => {
                navigate(`${path.ADMIN_HOME}/${path.ADMIN_CATEGORY}`); // Thay thế bằng URL đích
              }, 1000); // Chuyển hướng sau 1 giây
            });
          } else {
            setAlert(response?.message);
            setTimeout(() => setAlert(""), 5000);
          }
        }
      }
    }
    dispatch(actions.getCategories());
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        {isEdit ? (
          <span className={CSS_HEADING}>Cập nhật danh mục sản phẩm</span>
        ) : (
          <span className={CSS_HEADING}>Tạo tài danh mục sản phẩm mới</span>
        )}
        <div>{alert && <Alert severity="error">{alert}</Alert>}</div>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 mt-4 w-full rounded-md bg-gray-200 p-2">
          <span className="mb-2 pb-4 text-xl font-semibold">Loại sản phẩm</span>
          <Grid2 container className="flex items-center justify-center pb-6 pt-4">
            <Grid2 xs={6} className={CSS_GRID}>
              <AdminItemName name={payload?.name} nameLabel={"Tên danh mục"} handleName={handleSetName} />
            </Grid2>
            <Grid2 xs={6} className={CSS_GRID}>
              <div className="flex flex-col items-center justify-end gap-4">
                <img
                  id="category-images"
                  className="h-28 w-28 bg-white p-2"
                  src={
                    category?.images
                      ? (process.env.NODE_ENV === "production"
                          ? process.env.REACT_APP_SERVER_URL_PROD
                          : process.env.REACT_APP_SERVER_URL_DEV) + category?.images
                      : fileUpload
                  }
                  alt="category images"
                />

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: "#5951da",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "4px",
                    width: 150,
                    height: 30,
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                    },
                  }}
                >
                  Tải hình ảnh
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                    multiple
                  />
                </Button>
              </div>
            </Grid2>
          </Grid2>
        </div>
        <div className="flex w-full items-center justify-center p-2">
          <Button
            type="Submit"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#5951da",
              color: "#fff",
              fontSize: "14px",
              padding: "4px ",
              width: 250,
              height: 40,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            {isEdit ? "Cập nhật danh mục sản phẩm" : "Tạo danh mục sản phẩm mới"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryEdit;

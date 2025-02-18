import Grid2 from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AdminItemName from "../Items/AdminItemName";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import AdminItemDescription from "../Items/AdminItemDescription";
import { apiCreatePromotion, apiUpdatePromotion } from "../../../services";
import Swal from "sweetalert2";

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

const AdminPromotionEdit = ({ promotion, isEdit }) => {
  const [payload, setPayload] = useState(
    promotion || {
      code: "",
      name: "",
      description: "",
      discountPercentage: 0,
      startDate: "",
      endDate: "",
    },
  );
  const [errorInput, setErrorInput] = useState("");

  const [discountPercent, setDiscountPercent] = useState(promotion?.discountPercentage || "");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSetName = (e) => {
    setPayload((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleChange = (event) => {
    const value = event.target.value.replace("%", ""); // Loại bỏ dấu % nếu có
    // Chỉ cho phép nhập số từ 0 đến 100
    if (/^\d*\.?\d*$/.test(value)) {
      const numericValue = value;
      // Giới hạn giá trị trong khoảng từ 0 đến 100
      if (!isNaN(numericValue) && numericValue <= 100) {
        setDiscountPercent(numericValue);
        setPayload((prev) => ({
          ...prev,
          discountPercentage: numericValue,
        }));
      } else if (value === "") {
        // Xóa hoàn toàn khi người dùng xóa hết
        setDiscountPercent("");
      }
    }
  };

  const handleSetCode = (e) => {
    const input = e.target.value;
    const convertUpcase = input.toUpperCase();
    const regex = /^([A-Za-z0-9]+)_(\d{4})_(\d{4})$/;
    const match = input.match(regex);

    if (!match) {
      // Nếu không khớp với định dạng
      setErrorInput("Định dạng không hợp lệ. Vui lòng nhập đúng cú pháp 'Tên chương trình_năm bắt đầu_năm kết thúc'.");
    } else {
      setErrorInput("");
    }
    setPayload((prev) => ({
      ...prev,
      code: convertUpcase,
    }));
  };
  const handleSetDescription = (e) => {
    setPayload((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleSetStartDate = (e) => {
    setPayload((prev) => ({
      ...prev,
      startDate: e.target.value,
    }));
  };

  const handleSetEndDate = (e) => {
    setPayload((prev) => ({
      ...prev,
      endDate: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const isValid = Object.values(payload).every((value) => value !== "" && value !== null && value !== undefined);
    if (!isValid) {
      setOpenSnackbar(true); // Hiển thị thông báo lỗi nếu không hợp lệ
      return;
    }

    setPayload((prev) => ({
      ...prev,
      discountPercentage: prev.discountPercentage / 100,
    }));

    const response = isEdit ? await apiUpdatePromotion(payload) : await apiCreatePromotion(payload);

    if (response && response?.code === 0) {
      // Hiển thị thông báo thành công
      Swal.fire({
        title: "Thành công!",
        text: `Mã khuyến mãi đã được ${isEdit ? "cập nhật" : "tạo"} thành công.`,
        icon: "success", // Loại thông báo: "success", "error", "warning", "info"
        confirmButtonText: "OK",
      }).then(() => {
        window.history.back(); // Quay lại trang trước
      });
    } else {
      // Hiển thị thông báo lỗi nếu có vấn đề với phản hồi
      Swal.fire({
        title: "Lỗi!",
        text: `Có lỗi xảy ra khi ${isEdit ? "cập nhật" : "tạo"} mã khuyến mãi.`,
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
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
        {promotion ? (
          <span className={CSS_HEADING}>Cập nhật mã giảm giá</span>
        ) : (
          <span className={CSS_HEADING}>Tạo mã giảm giá</span>
        )}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center p-2">
        <div className="m-2 w-full rounded-md bg-gray-200 p-2 pb-2">
          <span className="mb-2 text-xl font-semibold">Thông tin mã giảm giá</span>
          <div className="mt-4">
            <Grid2 container className="pb-6">
              <Grid2
                padding={"10px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <AdminItemName name={payload?.name} nameLabel={"Tên"} handleName={handleSetName} />
                  <TextField
                    label="Discount Percent"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={discountPercent === "" ? "" : `${discountPercent}`}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontSize: "18px", fontWeight: "bold" },
                    }}
                    required
                    sx={{ backgroundColor: "white", ...cssField }}
                    InputProps={{ inputProps: { inputMode: "numeric" }, endAdornment: "%" }}
                  />
                </div>
                <div className="w-1/3">
                  <AdminItemName
                    name={payload?.code}
                    nameLabel={"Mã giảm giá"}
                    handleName={handleSetCode}
                    disable={isEdit}
                    helpText={"Cú pháp: Tên chương trình_ngày bắt đầu_ngày kết thúc. Ví dụ: MHX_2010_2011"}
                  />
                  {errorInput && <Alert>{errorInput}</Alert>}
                </div>
              </Grid2>
              <Grid2
                padding={"10px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <input
                    type="datetime-local"
                    value={payload?.startDate}
                    onChange={handleSetStartDate}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      padding: "8px",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div className="w-1/3">
                  <input
                    type="datetime-local"
                    value={payload?.endDate}
                    onChange={handleSetEndDate}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      padding: "8px",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </Grid2>
              <Grid2
                padding={"10px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                className="flex gap-4"
              >
                <div className="flex w-3/5">
                  <AdminItemDescription description={payload?.description} handleDescription={handleSetDescription} />
                </div>
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <Button
          type="Submit"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#5951da", // Màu tùy chỉnh
            color: "#fff", // Màu chữ
            fontSize: "14px", // Kích thước chữ
            padding: "4px ", // Tùy chỉnh padding
            width: 250,
            height: 40,
            "&:hover": {
              backgroundColor: "#d32f2f", // Màu khi hover
            },
          }}
        >
          {promotion ? "Cập nhật mã giảm giá" : "Tạo mã giảm giá"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPromotionEdit;

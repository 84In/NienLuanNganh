/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as actions from "../../../store/actions";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import icons from "../../../utils/icons";
import { capitalizeFirstLetterIfNeeded, formatCurrency, formatDate } from "../../../utils/format";
import Swal from "sweetalert2";
import * as apis from "../../../services";
import { isJSON, translateColumn } from "../../../utils";
import { useDispatch } from "react-redux";

const defaultAvatar = require("../../../assets/images/profile.png");
const TYPE_REMOVE = ["product", "category", "promotion"];
const TYPE_CHECK_BOX = ["order", "product"];
const TYPE_NON_EDIT = ["promotion", "user", "payment"];
const TYPE_HIDE_IMAGES = ["product", "banner"];
const KEY_RIGHT_COL = ["amount", "price", "stockQuantity", "sold", "discountPercentage"];

const status = (value) => (value === "Success" ? "#76ff03" : "#ff1744");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
    padding: "4px 8px",
    transition: "all 0.3s ease",
    "&:hover": {
      whiteSpace: "normal",
      overflow: "visible",
      textOverflow: "unset",
      maxWidth: "none",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // Hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  transition: "height 0.3s ease", // Smooth height transition
  "&:hover": {
    height: "auto", // Expand the row height on hover
  },
}));

const AdminTable = ({ data, pagination, type, setValueData, url, currentPage, setLoading, setTotalPage }) => {
  const { BiEdit, BiTrash } = icons;

  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);
  const navigate = useNavigate();

  const handleOpenDialog = (product) => {
    setSelectedImages(product);
    setOpen(true);
  };

  const handleOpenPass = (username) => {
    Swal.fire({
      title: "Đổi mật khẩu",
      html: `
        <input type="password" id="newPassword" class="swal2-input" placeholder="Mật khẩu mới">
        <input type="password" id="confirmPassword" class="swal2-input" placeholder="Xác nhận mật khẩu mới">
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Cập nhật mật khẩu",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        const newPassword = Swal.getPopup().querySelector("#newPassword").value;
        const confirmPassword = Swal.getPopup().querySelector("#confirmPassword").value;

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

        if (!newPassword) {
          Swal.showValidationMessage("Mật khẩu mới không được để trống");
          return false;
        }
        if (!passwordPattern.test(newPassword)) {
          Swal.showValidationMessage("Mật khẩu phải ít nhất 5 ký tự, bao gồm một chữ hoa và một chữ số");
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Mật khẩu xác nhận không khớp");
          return false;
        }

        return { newPassword, confirmPassword };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { newPassword } = result.value;
        const response = apis.apiChangePasswordByAdmin({
          username: username,
          password: newPassword,
        });
        if (response?.code === 0) {
          Swal.fire({
            title: "Thành công!",
            text: "Cập nhật mật khẩu thành công!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedImages(null);
  };

  // Check if data exists
  if (data == null || data.length === 0) {
    return <div>No data available</div>; // Display a message if there's no data
  }

  const sampleData = data[0]; // Get a sample from data to build the columns dynamically

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((dataItem) => dataItem.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const handleRemove = async (value, id) => {
    switch (value) {
      case "category":
        return await apis.apiRemoveCategory(id);
      case "product":
        return await apis.apiDeleteProduct(id);
      case "banner":
        return await apis.apiRemoveBanner(id);
      case "promotion":
        return await apis.apiRemovePromotion(id);
      default:
        return;
    }
  };

  const handleRemoveValue = async (id) => {
    if (TYPE_REMOVE.includes(type)) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắc không?",
        html: `Hành động này sẽ không thể hoàn tác!<br />ID: ${id} sẽ bị xoá vĩnh viễn!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        const response = await handleRemove(type, id);
        if (response?.code === 0) {
          if (type === "category") dispatch(actions.getCategories());
          Swal.fire({
            title: "Thành công!",
            text: "Xoá thành công!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              const updatedParams = new URLSearchParams();
              updatedParams.set("page", currentPage);
              navigate(`?${updatedParams.toString()}`);
            }, 1000);
          });
        }
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {TYPE_CHECK_BOX.includes(type) && (
                <StyledTableCell padding="checkbox" align="left">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                      checked={data.length > 0 && selectedRows.length === data.length}
                      onChange={handleSelectAllClick}
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "blue",
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: "blue",
                        },
                        // mr: 1,
                      }}
                    />
                    {/* <span style={{ whiteSpace: "nowrap" }}>Tất cả</span> */}
                  </Box>
                </StyledTableCell>
              )}
              {Object.keys(sampleData)
                .filter((key) => key !== "id")
                .filter((key) => key !== "category_id")
                .filter((key) => key !== "brand_id")
                .filter((key) => key !== "promotions")
                .filter((key) => key !== "reviewDetail") // Exclude the "id" column
                .map((key, index) => (
                  <StyledTableCell align="center" key={index}>
                    {translateColumn(capitalizeFirstLetterIfNeeded(key))}
                  </StyledTableCell>
                ))}
              {!TYPE_NON_EDIT.includes(type) && <StyledTableCell>Chỉnh sửa</StyledTableCell>}
              {type === "user" && <StyledTableCell>Đổi mật khẩu</StyledTableCell>}
              {TYPE_REMOVE.includes(type) && <StyledTableCell>Xoá</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataItem, index) => (
              <StyledTableRow key={index} selected={isSelected}>
                {TYPE_CHECK_BOX.includes(type) && (
                  <StyledTableCell padding="checkbox">
                    <Checkbox checked={isSelected(dataItem.id)} onChange={(event) => handleClick(event, dataItem.id)} />
                  </StyledTableCell>
                )}
                {Object.keys(dataItem)
                  .filter((key) => key !== "id")
                  .filter((key) => key !== "category_id")
                  .filter((key) => key !== "brand_id")
                  .filter((key) => key !== "promotions")
                  .filter((key) => key !== "reviewDetail")
                  .map((key, index) => (
                    <StyledTableCell
                      key={index}
                      align={KEY_RIGHT_COL.includes(key) ? "right" : "left"}
                      sx={{
                        textAlign: key === "status" ? "center" : KEY_RIGHT_COL.includes(key) ? "right" : "left",
                        color: key === "status" ? status(dataItem[key]) : "inherit",
                      }}
                    >
                      {key === "roles" ? (
                        dataItem[key].map((role) => role.name).join(", ")
                      ) : key === "createdAt" ||
                        key === "updatedAt" ||
                        key === "paymentDate" ||
                        key === "startDate" ||
                        key === "endDate" ? (
                        formatDate(dataItem[key])
                      ) : key === "discountPercentage" ? (
                        `${dataItem[key]} %`
                      ) : key === "dob" ? (
                        formatDate(dataItem[key])
                      ) : key === "amount" || key === "price" ? (
                        formatCurrency(dataItem[key])
                      ) : key === "avatar" ? (
                        dataItem[key] && (
                          <div className="flex items-center justify-center">
                            <img
                              src={
                                dataItem[key]
                                  ? (process.env.NODE_ENV === "production"
                                      ? process.env.REACT_APP_SERVER_URL_PROD
                                      : process.env.REACT_APP_SERVER_URL_DEV) + dataItem[key]
                                  : defaultAvatar
                              }
                              alt={`Avatar`}
                              className="h-10 w-10 rounded-full bg-white"
                            />
                          </div>
                        )
                      ) : key === "address" ? (
                        dataItem[key]?.fullName
                      ) : key === "images" ? (
                        <div
                          className={`group relative flex w-full flex-wrap items-center justify-center gap-1 overflow-hidden`}
                        >
                          {TYPE_HIDE_IMAGES.includes(type) ? (
                            <Button
                              onClick={() =>
                                handleOpenDialog(
                                  dataItem[key] !== null &&
                                    isJSON(dataItem[key].replace(/'/g, '"')) &&
                                    JSON.parse(dataItem[key].replace(/'/g, '"')),
                                )
                              }
                            >
                              Chi tiết
                            </Button>
                          ) : dataItem[key] !== null && isJSON(dataItem[key].replace(/'/g, '"')) ? (
                            JSON.parse(dataItem[key].replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
                              .slice(0, 4) // Hiển thị 4 hình ảnh nhỏ
                              .map((item, idx) => (
                                <div key={idx} className="flex items-center justify-center">
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
                                    alt={`Image ${idx}`}
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </div>
                              ))
                          ) : (
                            <div className="flex items-center justify-center">
                              <img
                                src={`${
                                  process.env.NODE_ENV === "production"
                                    ? process.env.REACT_APP_SERVER_URL_PROD
                                    : process.env.REACT_APP_SERVER_URL_DEV
                                }${dataItem[key]}`}
                                alt={`Image ${dataItem.name}`}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </div>
                          )}
                        </div>
                      ) : key === "category" || key === "brand" ? (
                        dataItem[key].name
                      ) : dataItem[key] != null ? (
                        dataItem[key]
                      ) : (
                        ""
                      )}
                    </StyledTableCell>
                  ))}
                {!TYPE_NON_EDIT.includes(type) && (
                  <StyledTableCell alignItems="center">
                    <NavLink className={"text-primary-color underline-offset-1"} to={`edit/${dataItem.id}`}>
                      <BiEdit size={24} />
                    </NavLink>
                  </StyledTableCell>
                )}
                {type === "user" && (
                  <StyledTableCell alignItems="center">
                    <Button
                      className={"text-primary-color underline-offset-1"}
                      onClick={() => handleOpenPass(dataItem?.username)}
                    >
                      <BiEdit size={24} />
                    </Button>
                  </StyledTableCell>
                )}
                {TYPE_REMOVE.includes(type) && (
                  <StyledTableCell align="left" sx={{ textAlign: "left" }}>
                    <button
                      className={"text-primary-color underline-offset-1"}
                      onClick={() => handleRemoveValue(dataItem.id)}
                    >
                      <BiTrash size={24} />
                    </button>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render the pagination component here */}
      {pagination}
      {selectedImages && (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth={true} maxWidth="lg">
          <DialogTitle>Chi tiết hình ảnh</DialogTitle>
          <DialogContent>
            <div className="flex flex-wrap items-center justify-start gap-2">
              {selectedImages &&
                selectedImages?.map((item, idx) => {
                  return (
                    <img
                      key={idx}
                      src={
                        item.includes("http")
                          ? item
                          : `${
                              process.env.NODE_ENV === "production"
                                ? process.env.REACT_APP_SERVER_URL_PROD
                                : process.env.REACT_APP_SERVER_URL_DEV
                            }${item}`
                      }
                      alt={`Image ${idx}`}
                      style={{ width: "150px", height: "150px" }}
                      className="border-1 border-gray-500 p-2"
                    />
                  );
                })}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AdminTable;

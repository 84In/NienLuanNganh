import React, { useEffect, useState } from "react";
import axiosConfig from "../../../axiosConfig";
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
import { formatCurrency, formatDate, orderStatus } from "../../../utils";
import AdminButtonAccept from "./AdminButtonAccept";
import AdminItemStatus from "./AdminItemStatus";
import * as apis from "../../../services";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const TYPE_CHECK_BOX = ["order", "product"];

const AdminTableOrder = ({ data, pagination, type, setValueData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedProduct !== null) {
      setOpen(true);
    }
  }, [selectedProduct]);

  const handleNavigation = (codeName) => {
    // Lấy địa chỉ hiện tại
    const currentPath = location.pathname;

    // Thêm tham số vào địa chỉ
    const newPath = codeName ? `${currentPath}?codeName=${codeName}` : currentPath;

    // Điều hướng đến địa chỉ mới
    navigate(newPath);
  };

  // Check if data exists
  if (data == null || data.length === 0) {
    return <div>No data available</div>;
  }

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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    transition: "height 0.3s ease",
    "&:hover": {
      height: "auto",
    },
  }));

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

  const handleAcceptOrder = async (orderId) => {
    try {
      const order = data.find((item) => item.id === orderId);
      let newStatus;

      // Xác định trạng thái mới dựa trên trạng thái hiện tại
      if (order.status.codeName === "pending") {
        newStatus = "confirmed";
      } else if (order.status.codeName === "confirmed") {
        newStatus = "completed";
      }

      if (newStatus) {
        const response = await apis.apiChangeOrderStatus(orderId, newStatus);
        if (response?.code === 0) {
          Swal.fire({
            title: `Trạng thái đơn hàng ${orderId} đã được cập nhật thành công!`,
            timer: 2000,
            icon: "success",
          });
          // Cập nhật lại dữ liệu để hiển thị trạng thái mới
          setValueData((prevData) =>
            prevData.map((item) =>
              item.id === orderId ? { ...item, status: { ...item.status, codeName: newStatus } } : item,
            ),
          );
        } else {
          Swal.fire({
            title: `Cập nhật trạng thái đơn hàng ${orderId} không thành công!`,
            timer: 2000,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!",
        timer: 2000,
        icon: "error",
      });
    }
  };

  const handleAcceptMultipleOrders = async () => {
    try {
      for (const id of selectedRows) {
        const order = data.find((item) => item.id === id);
        let newStatus;

        if (order.status.codeName === "pending") {
          newStatus = "comfirmed";
        } else if (order.status.codeName === "comfirmed") {
          newStatus = "completed";
        }

        if (newStatus) {
          const response = await apis.apiChangeOrderStatus(id, newStatus);
          if (response?.code !== 0) {
            Swal.fire({
              title: `Cập nhật trạng thái đơn hàng ${id} không thành công!`,
              timer: 2000,
              icon: "error",
            });
          }
        }
      }

      Swal.fire({
        title: "Cập nhật trạng thái thành công!",
        timer: 2000,
        icon: "success",
      });

      // Reset selected rows after processing
      setSelectedRows([]);
    } catch (error) {
      Swal.fire({
        title: "Cập nhật trạng thái đơn hàng không thành công!",
        timer: 2000,
        icon: "error",
      });
    }
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-2 flex w-full bg-gray-100">
        {/* <div className="flex items-center justify-center p-1">
          <AdminButtonAccept title={"Tổng hợp"} func={() => handleNavigation()} />
        </div> */}
        {orderStatus?.map((item, index) => (
          <div className="flex items-center justify-center p-1">
            <AdminButtonAccept
              key={index}
              title={item?.name}
              color={item?.color}
              func={() => handleNavigation(item?.codeName)}
            />
          </div>
        ))}
      </div>
      {selectedRows.length !== 0 && (
        <Button
          variant="contained"
          onClick={handleAcceptMultipleOrders}
          disabled={selectedRows.length === 0} // Disable if no rows are selected
          sx={{ marginBottom: 2 }}
        >
          Xác nhận các đơn hàng đã chọn
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {TYPE_CHECK_BOX.includes(type) && (
                <StyledTableCell padding="checkbox">
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
                      }}
                    />
                  </Box>
                </StyledTableCell>
              )}
              <StyledTableCell align="center">Mã Đơn Hàng</StyledTableCell>
              <StyledTableCell align="center">Ngày tạo đơn</StyledTableCell>
              <StyledTableCell align="center">Khách hàng</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Địa chỉ</StyledTableCell>
              <StyledTableCell align="center">Sản phẩm</StyledTableCell>
              <StyledTableCell align="center">
                Hình thức <br /> thanh toán
              </StyledTableCell>
              <StyledTableCell align="center">Tổng tiền</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
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
                <StyledTableCell align="left">{dataItem?.id}</StyledTableCell>
                <StyledTableCell align="left">{formatDate(dataItem?.createdAt)}</StyledTableCell>
                <StyledTableCell align="left">{dataItem?.recipient?.fullName}</StyledTableCell>
                <StyledTableCell align="left">{dataItem?.recipient?.phone}</StyledTableCell>
                <StyledTableCell align="left">{dataItem?.recipient?.address}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={() => handleOpenDialog(dataItem?.orderDetails)}>Chi tiết</Button>
                </StyledTableCell>
                <StyledTableCell align="center">{dataItem?.paymentMethod?.name}</StyledTableCell>
                <StyledTableCell align="center">{formatCurrency(dataItem?.totalAmount)}</StyledTableCell>
                <StyledTableCell align="left">
                  <AdminItemStatus
                    color={orderStatus?.find((item) => item?.codeName === dataItem?.status?.codeName)?.color}
                    title={dataItem?.status?.name}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <AdminButtonAccept
                    color={orderStatus?.find((item) => item?.codeName === dataItem?.status?.codeName)?.color}
                    title={orderStatus?.find((item) => item?.codeName === dataItem?.status?.codeName)?.action}
                    func={() => handleAcceptOrder(dataItem.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination}
      {selectedProduct && (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          className="flex items-center justify-center justify-items-center"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <TableContainer sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tên sản phẩm</TableCell>
                    <TableCell align="center">Loại sản phẩm</TableCell>
                    <TableCell align="center">Thương hiệu</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Giá Gốc</TableCell>
                    <TableCell align="center">Giảm giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProduct.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="left">{item?.product?.name}</TableCell>
                      <TableCell align="left">{item?.product?.category?.name}</TableCell>
                      <TableCell align="left">{item?.product?.brand?.name}</TableCell>
                      <TableCell align="center">{item?.quantity}</TableCell>
                      <TableCell align="right">{formatCurrency(item?.product?.price)}</TableCell>
                      <TableCell align="right">{formatCurrency(item?.product?.price - item?.priceAtTime)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={2} />

                    <TableCell colSpan={3} align="left">
                      Thành tiền
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(
                        selectedProduct?.reduce((accumulator, item) => {
                          return accumulator + item?.product?.price;
                        }, 0),
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="left">
                      Tổng tiền giảm
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(
                        selectedProduct?.reduce((accumulator, item) => {
                          return accumulator + (item?.product?.price - item?.priceAtTime);
                        }, 0),
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="left">
                      Tổng thành tiền
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(
                        selectedProduct?.reduce((accumulator, item) => {
                          return accumulator + item?.priceAtTime;
                        }, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </TableContainer>
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

export default AdminTableOrder;

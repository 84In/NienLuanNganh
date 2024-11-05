/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Checkbox,
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
import axiosConfig from "../../../axiosConfig";
import * as actions from "../../../store/actions";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../../utils/icons";
import { capitalizeFirstLetterIfNeeded, formatDate } from "../../../utils/format";
import Swal from "sweetalert2";
import * as apis from "../../../services";
import { isJSON } from "../../../utils";
import { useDispatch } from "react-redux";

const defaultAvatar = require("../../../assets/images/profile.png");
const TYPE_REMOVE = ["product", "category"];
const TYPE_CHECK_BOX = ["order", "product"];

const AdminTable = ({ data, pagination, type, setValueData, url, currentPage, setLoading, setTotalPage }) => {
  const { BiEdit, BiTrash } = icons;

  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  // Check if data exists
  if (data == null || data.length === 0) {
    return <div>No data available</div>; // Display a message if there's no data
  }

  const sampleData = data[0]; // Get a sample from data to build the columns dynamically

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
    // Hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    transition: "height 0.3s ease", // Smooth height transition
    "&:hover": {
      height: "auto", // Expand the row height on hover
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

  const handleRemove = async (value, id) => {
    switch (value) {
      case "category":
        return await apis.apiRemoveCategory(id);
      case "product":
        return await apis.apiDeleteProduct(id);
      default:
        return;
    }
  };

  const handleRemoveValue = async (id) => {
    if (TYPE_REMOVE.includes(type)) {
      Swal.fire({
        title: "Bạn có chắc chắc không?",
        html: `Hành động này sẽ không thể hoàn tác!
        <br />
        ID: ${id} sẽ bị xoá vĩnh viễn!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await handleRemove(type, id);
          if (response?.code === 0) {
            reloadDataPage(currentPage);
            if (type === "category") dispatch(actions.getCategories());
            Swal.fire({
              title: "Thành công!",
              text: "Xoá thành công!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        }
      });
    }
  };

  const reloadDataPage = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axiosConfig({
        method: "GET",
        url: url,
        params: {
          page: currentPage,
        },
      });
      const result = response.result;
      setValueData(result.content);
      setTotalPage(result.totalPages);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
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
                        mr: 2,
                      }}
                    />
                    <span style={{ whiteSpace: "nowrap" }}>Select all</span>
                  </Box>
                </StyledTableCell>
              )}
              {Object.keys(sampleData)
                .filter((key) => key !== "id")
                .filter((key) => key !== "category_id")
                .filter((key) => key !== "brand_id")
                .filter((key) => key !== "promotions") // Exclude the "id" column
                .map((key, index) => (
                  <StyledTableCell align="center" key={index}>
                    {capitalizeFirstLetterIfNeeded(key)}
                  </StyledTableCell>
                ))}
              <StyledTableCell>Edit</StyledTableCell>
              {TYPE_REMOVE.includes(type) && <StyledTableCell>Delete</StyledTableCell>}
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
                    <StyledTableCell key={index} align="left">
                      {key === "roles" ? (
                        dataItem[key].map((role) => role.name).join(", ")
                      ) : key === "createdAt" || key === "updatedAt" ? (
                        formatDate(dataItem[key])
                      ) : key === "dob" ? (
                        formatDate(dataItem[key])
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
                        <div className="group relative flex w-28 flex-wrap items-center justify-center gap-1 overflow-hidden">
                          {/* Chỉ hiển thị 4 hình ảnh nhỏ */}
                          {dataItem[key] !== null && isJSON(dataItem[key].replace(/'/g, '"')) ? (
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

                          {/* Danh sách hình ảnh lớn hiện ra khi hover */}
                          <div className="absolute left-0 top-0 z-10 hidden bg-white p-2 group-hover:block">
                            <div className="flex flex-wrap items-center justify-center gap-1">
                              {dataItem[key] && isJSON(dataItem[key].replace(/'/g, '"')) ? (
                                JSON.parse(dataItem[key].replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
                                  .map((item, idx) => (
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
                                      alt={`Full Image ${idx}`}
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        transition: "transform 0.3s ease", // Mượt mà khi zoom
                                      }}
                                      className="hover:scale-150" // Kích thước hình ảnh lớn hơn
                                    />
                                  ))
                              ) : (
                                <img
                                  src={`${
                                    process.env.NODE_ENV === "production"
                                      ? process.env.REACT_APP_SERVER_URL_PROD
                                      : process.env.REACT_APP_SERVER_URL_DEV
                                  }${dataItem[key]}`}
                                  alt={`Image ${dataItem.name}`}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    transition: "transform 0.3s ease", // Mượt mà khi zoom
                                  }}
                                  className="hover:scale-150" // Phóng to 1.5 lần khi hover
                                />
                              )}
                            </div>
                          </div>
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
                <StyledTableCell align="center">
                  <NavLink className={"text-primary-color underline-offset-1"} to={`edit/${dataItem.id}`}>
                    <BiEdit size={24} />
                  </NavLink>
                </StyledTableCell>
                {TYPE_REMOVE.includes(type) && (
                  <StyledTableCell align="center">
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
    </div>
  );
};

export default AdminTable;

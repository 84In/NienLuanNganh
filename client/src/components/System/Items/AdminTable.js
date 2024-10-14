/* eslint-disable jsx-a11y/img-redundant-alt */
import {
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
import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../../../utils/icons";
import { capitalizeFirstLetterIfNeeded, formatDate } from "../../../utils/format";
import Swal from "sweetalert2";
import * as apis from "../../../services";

const defaultAvatar = require("../../../assets/images/profile.png");
const TYPE_REMOVE = ["product"];

const AdminTable = ({ data, pagination, type, setValueData, url, currentPage, setLoading, setTotalPage }) => {
  const { BiEdit, BiTrash } = icons;

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
  }));

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
          const response = await apis.apiDeleteProduct(id);
          if (response?.code === 0) {
            reloadDataPage(currentPage);
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
              {type !== "user" && <StyledTableCell>Delete</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataItem, index) => (
              <StyledTableRow key={index}>
                {Object.keys(dataItem)
                  .filter((key) => key !== "id")
                  .filter((key) => key !== "category_id")
                  .filter((key) => key !== "brand_id")
                  .filter((key) => key !== "promotions")
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
                              src={dataItem[key] ? process.env.REACT_APP_SERVER_URL + dataItem[key] : defaultAvatar}
                              alt={`Avatar`}
                              className="h-10 w-10 rounded-full bg-white"
                            />
                          </div>
                        )
                      ) : key === "address" ? (
                        dataItem[key]?.fullName
                      ) : key === "images" ? (
                        <div className="flex w-28 flex-wrap justify-around gap-1">
                          {JSON.parse(dataItem[key].replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
                            .map((item, idx) => (
                              <div key={idx}>
                                <img
                                  src={item.includes("http") ? item : `${process.env.REACT_APP_SERVER_URL}${item}`}
                                  alt={`Image ${idx}`}
                                  style={{ width: "50px", height: "50px" }}
                                />
                              </div>
                            ))}
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
                {type !== "user" && (
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

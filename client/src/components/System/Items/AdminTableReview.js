import {
  MenuItem,
  Paper,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { formatDate } from "../../../utils";
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

const AdminTableReview = ({ data, pagination }) => {
  return !data || data.length <= 0 ? (
    <div>No data available</div>
  ) : (
    <div className="flex w-full flex-col items-center justify-center">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Họ tên</StyledTableCell>
              <StyledTableCell align="center">Địa chỉ</StyledTableCell>
              <StyledTableCell align="center">Đánh giá</StyledTableCell>
              <StyledTableCell align="center">Bình luận</StyledTableCell>
              <StyledTableCell align="center">Ngày đánh giá</StyledTableCell>
              <StyledTableCell align="center">Sửa đổi gần đây</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataItem, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{`${dataItem?.user?.firstName} ${dataItem?.user?.lastName}`}</StyledTableCell>
                <StyledTableCell align="left">{dataItem?.user?.address?.fullName}</StyledTableCell>
                <StyledTableCell align="center">
                  <Rating value={dataItem?.rating} readOnly />
                </StyledTableCell>
                <StyledTableCell align="left">{dataItem?.comment}</StyledTableCell>
                <StyledTableCell align="left">{formatDate(dataItem?.createdAt)}</StyledTableCell>
                <StyledTableCell align="left">{formatDate(dataItem?.updatedAt)}</StyledTableCell>
                <StyledTableCell align="center">{dataItem?.status ? "Đạt" : "Vi phạm tiêu chuẩn"}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-2 flex items-center justify-center"> {pagination}</div>
    </div>
  );
};

export default AdminTableReview;

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
import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../../../utils/icons";

const AdminTable = ({ data, pagination }) => {
  const { BiEdit } = icons;

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

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {Object.keys(sampleData)
                .filter((key) => key !== "id")
                .filter((key) => key !== "category_id")
                .filter((key) => key !== "brand_id") // Exclude the "id" column
                .map((key, index) => (
                  <StyledTableCell align="center" key={index}>
                    {key}
                  </StyledTableCell>
                ))}
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <StyledTableRow key={index}>
                {Object.keys(user)
                  .filter((key) => key !== "id")
                  .filter((key) => key !== "category_id")
                  .filter((key) => key !== "brand_id")
                  .map((key, index) => (
                    <StyledTableCell key={index} align="center">
                      {key === "roles" ? (
                        user[key].map((role) => role.name).join(", ")
                      ) : key === "images" ? (
                        <div className="flex flex-wrap-reverse">
                          {JSON.parse(user[key].replace(/'/g, '"')) // Thay thế dấu nháy đơn bằng dấu nháy kép
                            .map((item, idx) => (
                              <div key={idx}>
                                <img src={item} alt={`Image ${idx}`} style={{ width: "50px", height: "50px" }} />
                              </div>
                            ))}
                        </div>
                      ) : user[key] != null ? (
                        user[key]
                      ) : (
                        ""
                      )}
                    </StyledTableCell>
                  ))}
                <StyledTableCell align="center">
                  <NavLink className={"text-primary-color underline-offset-1"} to={`edit/${user.id}`}>
                    <BiEdit size={24} />
                  </NavLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {/* Render the pagination component here */}
      </TableContainer>
      {pagination}
    </div>
  );
};

export default AdminTable;

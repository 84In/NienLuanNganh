import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const AdminButtonAccept = ({ color, func, title, status }) => {
  return (
    title && (
      <Button
        onClick={status ? func : undefined} // Không thực hiện func nếu không được kích hoạt
        variant="contained"
        sx={{
          backgroundColor: color,
          opacity: status ? 1 : 0.5,
          "&:hover": {
            backgroundColor: !status ? color : "primary", // Giữ nguyên màu khi hover
          }, // Giảm độ sáng nếu nút bị vô hiệu hóa
        }}
        // disabled={!status}
        aria-label={title}
      >
        {title}
      </Button>
    )
  );
};

AdminButtonAccept.defaultProps = {
  color: "primary", // Màu mặc định
  status: true, // Mặc định là được kích hoạt
};

AdminButtonAccept.propTypes = {
  color: PropTypes.string,
  func: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool,
};

export default AdminButtonAccept;

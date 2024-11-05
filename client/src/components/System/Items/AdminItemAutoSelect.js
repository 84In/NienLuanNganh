import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const AdminItemAutoSelect = ({ label, options, value, setValue, inputValue, setInputValue, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Cờ để xác định nếu người dùng đang nhập

  const CustomPaper = (props) => (
    <Paper {...props} sx={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", ...props.sx }} />
  );

  // Đóng dropdown khi giá trị value được cập nhật từ ngoài mà không phải do người dùng nhập
  useEffect(() => {
    if (!isTyping) {
      setIsOpen(false);
    }
  }, [value]);

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Autocomplete
        options={options}
        getOptionLabel={type === "user" ? (option) => option?.username || "" : (option) => option?.name || ""}
        fullWidth
        disableClearable
        freeSolo
        value={value ? value : ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#E2E8F0",
                },
                "&:hover fieldset": {
                  borderColor: "#3182CE",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3182CE",
                },
              },
            }}
            onChange={(event) => {
              const newValue = event.target.value;
              setInputValue(newValue); // Cập nhật giá trị nhập vào
              setIsTyping(true); // Người dùng đang nhập
              setIsOpen(true); // Mở dropdown khi có input
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ padding: "10px", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
            {type === "user" ? option.username : option.name}
          </li>
        )}
        PaperComponent={CustomPaper}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setIsTyping(true); // Người dùng đang nhập
          setIsOpen(true); // Mở dropdown khi có input
        }}
        onFocus={() => {
          if (options.length > 0 && isTyping) {
            // Chỉ mở dropdown nếu người dùng đang nhập
            setIsOpen(true);
          }
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue); // Cập nhật giá trị khi chọn
            type === "user" ? setInputValue(newValue.username) : setInputValue(newValue.name); // Cập nhật inputValue để hiển thị tên
          }
          setIsOpen(false); // Đóng dropdown khi chọn
          setIsTyping(false); // Người dùng không còn nhập nữa
        }}
        open={isOpen && options.length > 0} // Mở dropdown khi isOpen là true và có options
        isOptionEqualToValue={(option, value) => option.id === value.id} // Thêm phương thức so sánh
      />
    </div>
  );
};

export default AdminItemAutoSelect;

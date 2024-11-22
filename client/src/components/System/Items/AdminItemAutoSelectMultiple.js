import { Autocomplete, Paper, TextField, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { apiSearchPromotionsByKeyWord } from "../../../services";

const AdminItemAutoSelectMultiple = ({ label, value, setValue }) => {
  const [options, setOptions] = useState([]); // Danh sách tùy chọn
  const [inputValue, setInputValue] = useState(""); // Giá trị input
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  const CustomPaper = (props) => (
    <Paper {...props} sx={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", ...props.sx }} />
  );

  // Hàm debounce để gọi API
  const fetchOptions = debounce(async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]); // Xóa danh sách khi không có input
      return;
    }

    setIsLoading(true); // Hiển thị trạng thái loading

    try {
      const response = await apiSearchPromotionsByKeyWord(searchTerm);
      if (response?.code === 0 && response?.result) {
        setOptions(response?.result); // Cập nhật danh sách options
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  }, 300); // 300ms debounce

  // Lắng nghe khi inputValue thay đổi để gọi API
  useEffect(() => {
    fetchOptions(inputValue);
  }, [inputValue]);

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option?.name}
        fullWidth
        disableClearable
        value={value || []}
        loading={isLoading} // Hiển thị trạng thái loading
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option.name}
              sx={{ margin: "2px", backgroundColor: "#3182CE", color: "#fff" }}
            />
          ))
        }
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
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#3182CE" },
                "&.Mui-focused fieldset": { borderColor: "#3182CE" },
              },
            }}
            onChange={(event) => setInputValue(event.target.value)}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ padding: "10px", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
            {option.name}
          </li>
        )}
        PaperComponent={CustomPaper}
        onChange={(event, newValue) => setValue(newValue || [])} // Cập nhật giá trị
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
      />
    </div>
  );
};

export default AdminItemAutoSelectMultiple;

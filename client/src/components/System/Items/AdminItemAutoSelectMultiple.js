import { Autocomplete, Paper, TextField, Chip, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";

import { apiSearchPromotionsByKeyWord } from "../../../services";
import useDebounce from "../../../hooks/debounce";

const AdminItemAutoSelectMultiple = ({ label, value, setValue }) => {
  const [options, setOptions] = useState([]); // Danh sách tùy chọn
  const [inputValue, setInputValue] = useState(""); // Giá trị input
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Error state

  const CustomPaper = (props) => (
    <Paper {...props} sx={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", ...props.sx }} />
  );

  const debouncedInputValue = useDebounce(inputValue, 700);

  const fetchOptions = async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]); // Clear options if no input
      return;
    }

    setIsLoading(true); // Show loading indicator
    setError(null); // Reset error state

    try {
      const response = await apiSearchPromotionsByKeyWord(searchTerm);
      if (response?.code === 0 && response?.result) {
        setOptions(response?.result); // Update options
      }
    } catch (error) {
      setError("Failed to fetch promotions. Please try again later."); // Set error message
      console.error("Error fetching promotions:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // Fetch options when debounced input value changes
  useEffect(() => {
    fetchOptions(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option?.name || ""}
        fullWidth
        disableClearable
        freeSolo
        value={value || []}
        loading={isLoading} // Show loading state
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
            value={inputValue} // Display the current input value
            onChange={(event) => setInputValue(event.target.value)} // Update input value
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ padding: "10px", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
            {option.name}
          </li>
        )}
        PaperComponent={CustomPaper}
        onChange={(event, newValue) => {
          setValue(newValue || []); // Update selected value
          setInputValue(""); // Clear input value after selection
        }}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
      />

      {/* Error message display */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Loading spinner */}
      {isLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AdminItemAutoSelectMultiple;

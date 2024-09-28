import React, { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CloudUploadIcon, SendIcon } from "lucide-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../services";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 2,
});

const AdminProductCSV = () => {
  const { categories } = useSelector((state) => state.app);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleSetCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSetFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (category && file) {
      const response = await apis.apiUploadCSV(file, category);
      if (response?.code === 0) {
        Swal.fire({
          title: "Submit!",
          text: "Complete data entry",
          type: "success",
          timer: 3000,
        });
        setCategory("");
        setFile(null);
      }
    }
  };

  return (
    <Grid2 container>
      <Grid2 xs={6} className="flex items-center justify-center">
        <FormControl required fullWidth sx={{ m: 1, width: 500 }}>
          <InputLabel
            id="categories-select-label"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "white",
              paddingRight: "8px",
            }}
          >
            Loại sản phẩm
          </InputLabel>
          <Select
            labelId="categories-select-label"
            id="categories-simple-select"
            value={category}
            label="Loại sản phẩm"
            onChange={handleSetCategory}
          >
            <MenuItem value="">------Select------</MenuItem>
            {categories?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 xs={6} className="flex items-center justify-center">
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleSetFile} />
        </Button>
      </Grid2>

      <Grid2 xs={12} className="flex items-center justify-center">
        {file && <p>File đã chọn: {file.name}</p>}
      </Grid2>
      <Grid2 xs={12} className="flex items-center justify-center">
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AdminProductCSV;

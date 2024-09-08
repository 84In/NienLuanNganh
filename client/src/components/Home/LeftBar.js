import { React, memo } from "react";
import ButtonCustom from "../ButtonCustom";
import { iconsLeftBar } from "../../utils/constant";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const LeftBar = () => {
  return (
    <Box
      className="sticky top-4"
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: "white",
        borderRadius: "8px",
        rowGap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      <div className="max-h-80 overflow-y-auto scroll-smooth grid-md:max-h-screen grid-md:scrollbar-hide">
        <h1 className="p-1 text-center text-lg font-semibold">Danh mục</h1>
        <div className="flex flex-col space-y-2">
          {iconsLeftBar.map((item, index) => (
            <Link to={`${item.url}`} key={index}>
              <div>
                <ButtonCustom Image={item.image} TextTitle={item.title} HoverColor={"hover:bg-blue-100"} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default memo(LeftBar);

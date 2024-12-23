import { React, memo } from "react";
import ButtonCustom from "../Common/ButtonCustom";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { categories } = useSelector((state) => state.app);

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
      <div className="custom-scrollbar max-h-80 overflow-y-auto scroll-smooth grid-md:max-h-screen grid-md:scrollbar-hide">
        <h1 className="p-1 text-center text-lg font-semibold">Danh mục</h1>
        <div className="flex flex-col space-y-2">
          {categories?.content &&
            categories?.content.map((item, index) => (
              <Link to={`/search/category/${item.codeName}`} key={index}>
                <div>
                  <ButtonCustom
                    ImageSize={10}
                    Image={
                      (process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_SERVER_URL_PROD
                        : process.env.REACT_APP_SERVER_URL_DEV) + item.images
                    }
                    TextTitle={item.name}
                    HoverColor={"hover:bg-blue-100"}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Box>
  );
};

export default memo(SideBar);

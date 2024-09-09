import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { ButtonCustom, DotAlert, SearchBar } from "../../components";
import icons from "../../utils/icons";

const { GoHomeFill, FaRegCircleUser, FaCartShopping, GoSearch } = icons;

const Header = ({ setIsModelLogin, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        width: "100%",
        height: "fit-content",
        minHeight: "90px",
        maxHeight: "fit-content",
        padding: "16px",
      }}
    >
      <Grid2
        container
        xs={12}
        sx={{ display: "flex", rowGap: "1rem", justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid2 item xs={12} md={2} lg={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to={"/"}>
            <img className="h-[40px] w-[150px] max-w-none object-contain" src={logo} alt="logo" />
          </Link>
        </Grid2>
        <Grid2 item xs={12} md={5} lg={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="w-full pl-2">
            <SearchBar IconBefore={GoSearch} TextContent={"Tìm kiếm"} />
            {/* <div className="flex items-center justify-start">Nav Bar</div> */}
          </div>
        </Grid2>
        <Grid2
          item
          container
          xs={12}
          md={5}
          lg={4}
          sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", textWrap: "nowrap" }}
        >
          <Grid2 item xs={9} className="flex items-center justify-around gap-1 sm:px-3">
            <ButtonCustom
              TypeButton={"button"}
              TextColor={"text-blue-600"}
              TextTitle={"Trang chủ"}
              FontWeight={"font-medium"}
              HoverColor={"hover:bg-blue-100"}
              IconBefore={GoHomeFill}
              ClickButton={() => navigate("/")}
            />
            {isLoggedIn ? (
              <ButtonCustom
                Avatar={
                  "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-1/457408916_1968503646912827_7878531955205968521_n.jpg?stp=dst-jpg_s200x200&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGPrAFDvlOlA5KjAN9naNLsxIwWz75rpsbEjBbPvmumxq3tx54-WL-f38LiONi-rihiP1gF2i1-j4tcfMjrOlzg&_nc_ohc=DRfuFMkJPG8Q7kNvgFQLxhU&_nc_ht=scontent.fsgn5-8.fna&oh=00_AYA1-1lfy7dGof9Fz_sxdjB7MgxsnSrTH5m8OQxiW55MUQ&oe=66E35B85"
                }
                TextTitle={"Tín mập địt đít bự bị gái bắn link lộ hàng"}
              />
            ) : (
              <ButtonCustom
                IconBefore={FaRegCircleUser}
                TypeButton={"button"}
                TextTitle={"Tài khoản"}
                FontWeight={"font-medium"}
                ClickButton={() => setIsModelLogin((prev) => !prev)}
              />
            )}
          </Grid2>
          <Grid2 item xs={1} className="flex items-center justify-center">
            <span className="p-2 text-gray-200">|</span>
          </Grid2>
          <Grid2 item xs={2} className="flex w-1/4 items-center justify-center">
            <ButtonCustom
              TypeButton={"button"}
              IconBefore={FaCartShopping}
              TextColor={"text-blue-600"}
              FontWeight={"font-medium"}
              HoverColor={"hover:bg-blue-100"}
              TextTitle={<DotAlert />}
              ClickButton={() => navigate("/cart")}
            />
          </Grid2>
          {/* <div className="flex items-center justify-center">Giao đến ABC</div> */}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default memo(Header);

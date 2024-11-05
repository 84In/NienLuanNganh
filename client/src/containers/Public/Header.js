import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { memo, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { ButtonCustom, DotAlert, SearchBar } from "../../components";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import { useSelector } from "react-redux";

const { FaRegCircleUser, FaCartShopping, GoSearch } = icons;
const defaultAvatar = require("../../assets/images/profile.png");

const Header = ({ User, cart, setIsModelLogin, isLoggedIn }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("search", searchValue.trim());

    if (window.location.pathname !== path.HOME + path.SEARCH) {
      navigate(`${path.SEARCH}?${queryParams.toString()}`);
      return;
    }
    setSearchParams(queryParams);
    console.log(queryParams);
    console.log(searchParams.get("search"));
  };

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
        p: 2,
      }}
    >
      <Grid2
        container
        xs={12}
        sx={{ display: "flex", rowGap: "1rem", justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid2 item xs={12} md={2} lg={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to={path.HOME}>
            <img className="h-[40px] w-[150px] max-w-none object-contain" src={logo} alt="logo" />
          </Link>
        </Grid2>
        <Grid2
          item
          xs={12}
          md={7}
          lg={7}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }}
        >
          <div className="w-full px-2">
            <SearchBar
              IconBefore={GoSearch}
              TextContent={"Tìm kiếm"}
              Name={"search"}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={handleSearch}
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-around gap-x-4 gap-y-2 px-2 grid-md:justify-start">
            {categories?.content &&
              categories?.content.map((item, index) => (
                <Link to={`/search/category/${item.codeName}`} key={index}>
                  <div className="min-w-12 text-sm text-gray-600 hover:text-primary-color hover:underline grid-md:min-w-0">
                    {item.name}
                  </div>
                </Link>
              ))}
          </div>
        </Grid2>
        <Grid2
          item
          container
          xs={12}
          md={3}
          lg={3}
          sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", textWrap: "nowrap" }}
        >
          <Grid2 item xs={6} md={7} className="flex items-center justify-around gap-1 sm:px-3">
            {isLoggedIn ? (
              <ButtonCustom
                Avatar={
                  User?.avatar
                    ? (process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_SERVER_URL_PROD
                        : process.env.REACT_APP_SERVER_URL_DEV) + User?.avatar
                    : defaultAvatar
                }
                TextTitle={User?.lastName}
                User={User}
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
          <Grid2 item xs={5} md={4} className="flex w-1/4 items-center justify-center">
            <ButtonCustom
              TypeButton={"button"}
              IconBefore={FaCartShopping}
              TextColor={"text-blue-600"}
              FontWeight={"font-medium"}
              HoverColor={"hover:bg-blue-100"}
              TextTitle={<DotAlert number={cart?.cartDetails?.length ? cart?.cartDetails?.length : 0} />}
              ClickButton={() => navigate(path.CART)}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default memo(Header);

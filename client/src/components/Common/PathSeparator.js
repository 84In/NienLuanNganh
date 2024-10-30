import React, { memo } from "react";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { path } from "../../utils/constant";

// Path mapping object for translations and nested routes
const PATH_MAP = {
  // Public routes
  home: { name: "Trang chủ", path: path.HOME },
  cart: { name: "Giỏ hàng", path: path.CART },
  account: {
    name: "Tài khoản",
    path: path.ACCOUNT,
    children: {
      phone: { name: "Số điện thoại", path: path.ACCOUNT_EDIT_PHONE },
      email: { name: "Email", path: path.ACCOUNT_EDIT_EMAIL },
      password: { name: "Mật khẩu", path: path.ACCOUNT_EDIT_PASSWORD },
      address: { name: "Địa chỉ", path: path.ACCOUNT_EDIT_ADDRESS },
    },
  },
  search: {
    name: "Tìm kiếm",
    path: path.SEARCH,
  },
  checkout: { name: "Thanh toán", path: path.CHECKOUT },
  "payment-result": { name: "Kết quả thanh toán", path: path.PAYMENT_RESULT },
  order: {
    name: "Đơn hàng",
    path: path.ORDER_HISTORY,
    children: {
      id: { name: "Chi tiết đơn hàng" },
    },
  },
  product: {
    name: "Sản phẩm",
    path: path.PRODUCT_DETAIL,
  },

  // Admin routes
  //   manager: {
  //     name: "Quản lý",
  //     path: path.ADMIN_HOME,
  //     children: {
  //       user: {
  //         name: "Người dùng",
  //         children: {
  //           "create-user": { name: "Tạo mới" },
  //           edit: { name: "Chỉnh sửa" },
  //         },
  //       },
  //       product: {
  //         name: "Sản phẩm",
  //         children: {
  //           "create-product": { name: "Tạo mới" },
  //           "upload-product": { name: "Nhập CSV" },
  //           edit: { name: "Chỉnh sửa" },
  //         },
  //       },
  //       category: {
  //         name: "Danh mục",
  //         children: {
  //           "create-category": { name: "Tạo mới" },
  //           edit: { name: "Chỉnh sửa" },
  //         },
  //       },
  //       order: {
  //         name: "Đơn hàng",
  //         children: {
  //           statistics: { name: "Thống kê" },
  //           "export-order": { name: "Xuất CSV" },
  //         },
  //       },
  //     },
  //   },
};

const PathSeparator = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((x) => x);

  const generateBreadcrumbs = () => {
    let breadcrumbs = [{ name: "Trang chủ", path: path.HOME }];
    let currentPath = "";
    let currentMap = PATH_MAP;

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Handle dynamic IDs
      if (segment.match(/^\d+$/)) {
        const prevSegment = breadcrumbs[breadcrumbs.length - 1]?.name;
        if (prevSegment === "Sản phẩm") {
          breadcrumbs.push({ name: "Chi tiết sản phẩm", path: currentPath });
        } else if (prevSegment === "Đơn hàng") {
          breadcrumbs.push({ name: "Chi tiết đơn hàng", path: currentPath });
        }
        return;
      }

      // Look up in PATH_MAP
      const pathInfo = currentMap[segment];
      if (pathInfo) {
        breadcrumbs.push({
          name: pathInfo.name,
          path: pathInfo.path || currentPath,
        });

        // Update current map for nested routes
        if (pathInfo.children) {
          currentMap = pathInfo.children;
        }
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Return null if we're on the home page
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full px-4">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography key={item.path || index} color="InfoText">
              {item.name}
            </Typography>
          ) : (
            <MuiLink
              key={item.path || index}
              component={Link}
              to={item.path}
              underline="hover"
              color="inherit"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {item.name}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default memo(PathSeparator);

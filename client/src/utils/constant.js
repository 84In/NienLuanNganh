import banner1 from "../assets/images/banner/banner1.png.webp";
import banner2 from "../assets/images/banner/banner2.png.webp";
import banner3 from "../assets/images/banner/banner3.png.webp";
import banner4 from "../assets/images/banner/banner4.jpg.webp";
import banner5 from "../assets/images/banner/banner5.png.webp";
import banner6 from "../assets/images/banner/banner6.png.webp";
import banner7 from "../assets/images/banner/banner7.png.webp";
import banner8 from "../assets/images/banner/banner8.png.webp";
import banner9 from "../assets/images/banner/banner9.png.webp";
import banner10 from "../assets/images/banner/banner10.png.webp";

import icons from "./icons";

const {
  BiCreditCard,
  BiFile,
  BiGift,
  BiImage,
  BiSolidDashboard,
  BiSolidUserAccount,
  BiBookHeart,
  BiCategory,
  BiMoneyWithdraw,
} = icons;

const widget1 = require("../assets/images/widget/widget1.png");
const widget2 = require("../assets/images/widget/widget2.png");
const widget3 = require("../assets/images/widget/widget3.png");
const widget4 = require("../assets/images/widget/widget4.png");
const widget5 = require("../assets/images/widget/widget5.png");
const widget6 = require("../assets/images/widget/widget6.png");
const widget7 = require("../assets/images/widget/widget7.png");
const widget8 = require("../assets/images/widget/widget8.png");

const paymentMethod1 = require("../assets/images/payment/oncash.png");
const paymentMethod2 = require("../assets/images/payment/vnpay.png");
const paymentMethod3 = require("../assets/images/payment/zalopay.png");

export const path = {
  HOME: "/",
  CART: "cart",
  ACCOUNT: "account",
  ACCOUNT_EDIT_PHONE: "edit/phone",
  ACCOUNT_EDIT_EMAIL: "edit/email",
  ACCOUNT_EDIT_PASSWORD: "edit/password",
  ACCOUNT_EDIT_ADDRESS: "edit/address",
  PRODUCT_DETAIL: "product/id/:productId",
  SEARCH: "search",
  SEARCH_PRODUCT: "search/:type/:name",
  ORDER_HISTORY: "order",
  ORDER_HISTORY_DETAIL: "order/id/:orderId",
  CHECKOUT: "checkout",
  PAYMENT_RESULT: "payment-result",
  ADMIN_HOME: "/manager",
  ADMIN_USER: "user",
  ADMIN_PRODUCT: "product",
  ADMIN_USER_CREATE: "create-user",
  ADMIN_USER_EDIT: "edit/:id",
  ADMIN_PRODUCT_CREATE: "create-product",
  ADMIN_PRODUCT_EDIT: "edit/:id",
  ADMIN_PRODUCT_IMPORT_CSV: "upload-product",
  ADMIN_ORDER: "order",
  ADMIN_ORDER_STATISTICS: "statistics",
  ADMIN_ORDER_EXPORT_CSV: "export-order",
  ADMIN_CATEGORY: "category",
  ADMIN_CATEGORY_CREATE: "create-category",
  ADMIN_CATEGORY_EDIT: "edit/:id",
  ADMIN_REVIEW: "review",
  ADMIN_REVIEW_FILTER: "filter",
  ADMIN_PAYMENT: "payment",
  ADMIN_PROMOTION: "promotion",
  ADMIN_PROMOTION_CREATE: "create",
  ADMIN_PROMOTION_EDIT: "edit/:id",
  ADMIN_BANNER: "banner",
  ADMIN_BANNER_CREATE: "create",
  ADMIN_BANNER_EDIT: "edit/:id",
};

export const adminSideBar = [
  {
    name: "Bảng điều khiển",
    path: "",
    icon: BiSolidDashboard,
  },
  {
    name: "Quản lý người dùng",
    path: "user",
    icon: BiSolidUserAccount,
  },
  {
    name: "Quản lý danh mục",
    path: "category",
    icon: BiCategory,
  },
  {
    name: "Quản lý sản phẩm",
    path: "product",
    icon: BiGift,
  },
  {
    name: "Quản lý đơn hàng",
    path: "order",
    icon: BiFile,
  },
  {
    name: "Quản lý đánh giá",
    path: "review",
    icon: BiBookHeart,
  },
  {
    name: "Quản lý thanh toán",
    path: "payment",
    icon: BiCreditCard,
  },
  {
    name: "Quản lý mã giảm giá",
    path: "promotion",
    icon: BiMoneyWithdraw,
  },
  {
    name: "Banner",
    path: "banner",
    icon: BiImage,
  },
];

export const banner = [
  {
    id: 1,
    image: banner1,
    title: "Banner 1",
  },
  {
    id: 2,
    image: banner2,
    title: "Banner 2",
  },
  {
    id: 3,
    image: banner3,
    title: "Banner 3",
  },
  {
    id: 4,
    image: banner4,
    title: "Banner 4",
  },
  {
    id: 5,
    image: banner5,
    title: "Banner 5",
  },
  {
    id: 6,
    image: banner6,
    title: "Banner 6",
  },
];

export const bannerFilter = [
  {
    id: 1,
    image: banner7,
    title: "Banner 1",
  },
  {
    id: 2,
    image: banner8,
    title: "Banner 2",
  },
  {
    id: 3,
    image: banner9,
    title: "Banner 3",
  },
  {
    id: 4,
    image: banner10,
    title: "Banner 4",
  },
];

export const widgetIcon = [
  {
    icon: widget1,
    text: "TOP DEAL",
    url: "/search/topdeal",
  },
  {
    icon: widget2,
    text: "Trading",
    url: "/search/trading",
  },
  {
    icon: widget3,
    text: "Coupon siêu hot",
    url: "/search/coupon",
  },
  {
    icon: widget4,
    text: "Xả kho nửa giá",
    url: "/search/xa-kho",
  },
  {
    icon: widget5,
    text: "Hàng ngoại giá hot",
    url: "/search/hang-ngoai",
  },
  {
    icon: widget6,
    text: "Cùng mẹ chăm bé",
    url: "/search/cham-be",
  },
  {
    icon: widget7,
    text: "Một sách",
    url: "/search/mot-sach",
  },
  {
    icon: widget8,
    text: "Thế giới công nghệ",
    url: "/search/cong-nghe",
  },
];

export const paymentMethods = [
  {
    image: paymentMethod1,
    title: "Thanh toán tiền mặt",
    name: "cash",
  },
  {
    image: paymentMethod2,
    title: "VNPAY",
    name: "vnpay",
  },
  {
    image: paymentMethod3,
    title: "ZaloPay",
    name: "zalopay",
  },
];

export const orderStatus = [
  { name: "Tất cả", codeName: "" },
  { name: "Chờ xác nhận", codeName: "pending", color: "#2DCCFF", status: true, action: "Xác nhận" },
  { name: "Xác nhận", codeName: "confirmed", color: "#FFB302", status: true, action: "Đã xác nhận" },
  { name: "Đã hủy", codeName: "cancelled", color: "#FF3838", status: false },
  { name: "Hoàn tất", codeName: "completed", color: "#56F000", status: false },
];

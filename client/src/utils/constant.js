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

const { BiCreditCard, BiFile, BiGift, BiImage, BiSolidDashboard, BiSolidUserAccount, BiBookHeart } = icons;

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
  EDIT_PHONE: "edit/phone",
  EDIT_EMAIL: "edit/email",
  EDIT_PASSWORD: "edit/password",
  EDIT_ADDRESS: "edit/address",
  PRODUCT_DETAIL: "product/id/:productId",
  PRODUCT_SEARCH: "search/:type/:name",
  ORDER_HISTORY: "order/history",
  CHECKOUT: "checkout",
  ADMIN_HOME: "/manager",
  ADMIN_USER: "user",
  ADMIN_PRODUCT: "product",
  ADMIN_USER_CREATE: "create-user",
  ADMIN_USER_EDIT: "edit/:id",
  ADMIN_PRODUCT_CREATE: "create-product",
  ADMIN_PRODUCT_EDIT: "edit/:id",
  ADMIN_PRODUCT_IMPORT_CSV: "upload-product",
};

export const adminSideBar = [
  {
    name: "Dashboard",
    path: "",
    icon: BiSolidDashboard,
  },
  {
    name: "User",
    path: "user",
    icon: BiSolidUserAccount,
  },
  {
    name: "Product",
    path: "product",
    icon: BiGift,
  },
  {
    name: "Order",
    path: "order",
    icon: BiFile,
  },
  {
    name: "Review",
    path: "review",
    icon: BiBookHeart,
  },
  {
    name: "Payment",
    path: "payment",
    icon: BiCreditCard,
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
    url: "/product/search/topdeal",
  },
  {
    icon: widget2,
    text: "Trading",
    url: "/product/search/trading",
  },
  {
    icon: widget3,
    text: "Coupon siêu hot",
    url: "/product/search/coupon",
  },
  {
    icon: widget4,
    text: "Xả kho nửa giá",
    url: "/product/search/xa-kho",
  },
  {
    icon: widget5,
    text: "Hàng ngoại giá hot",
    url: "/product/search/hang-ngoai",
  },
  {
    icon: widget6,
    text: "Cùng mẹ chăm bé",
    url: "/product/search/cham-be",
  },
  {
    icon: widget7,
    text: "Một sách",
    url: "/product/search/mot-sach",
  },
  {
    icon: widget8,
    text: "Thế giới công nghệ",
    url: "/product/search/cong-nghe",
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

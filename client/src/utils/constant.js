import {
  BiCreditCard,
  BiFile,
  BiGift,
  BiLogoProductHunt,
  BiSolidDashboard,
  BiSolidUserAccount,
  BiSync,
} from "react-icons/bi";
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

const {} = icons;

const icon1 = require("../assets/images/icons/left-bar-icon1.png.webp");
const icon2 = require("../assets/images/icons/left-bar-icon2.png.webp");
const icon3 = require("../assets/images/icons/left-bar-icon3.png.webp");
const icon4 = require("../assets/images/icons/left-bar-icon4.png.webp");
const icon5 = require("../assets/images/icons/left-bar-icon5.png.webp");
const icon6 = require("../assets/images/icons/left-bar-icon6.png.webp");

const widget1 = require("../assets/images/widget/widget1.png");
const widget2 = require("../assets/images/widget/widget2.png");
const widget3 = require("../assets/images/widget/widget3.png");
const widget4 = require("../assets/images/widget/widget4.png");
const widget5 = require("../assets/images/widget/widget5.png");
const widget6 = require("../assets/images/widget/widget6.png");
const widget7 = require("../assets/images/widget/widget7.png");
const widget8 = require("../assets/images/widget/widget8.png");

const product1 = require("../assets/images/product/product1.png");

export const path = {
  HOME: "/",
  CART: "cart/",
  ACCOUNT: "account/",
  EDIT_PHONE: "edit/phone/",
  EDIT_EMAIL: "edit/email/",
  EDIT_PASSWORD: "edit/password/",
  EDIT_ADDRESS: "edit/address/",
  PRODUCT_DETAIL: "product/id/:productId/",
  PRODUCT_SEARCH: "product/search/",
  ORDER_HISTORY: "order/history/",
  ADMIN_HOME: "/manager/",
  ADMIN_USER: "user/",
  ADMIN_PRODUCT: "product/",
  ADMIN_USER_CREATE: "create-user/",
  ADMIN_USER_EDIT: "edit/:id/",
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
    icon: BiLogoProductHunt,
  },
  {
    name: "Order",
    path: "order",
    icon: BiGift,
  },
  {
    name: "Preview",
    path: "preview",
    icon: BiFile,
  },
  {
    name: "Payment",
    path: "payment",
    icon: BiCreditCard,
  },
  {
    name: "Convert Image",
    path: "convert-image",
    icon: BiSync,
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

export const banner_filter = [
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

export const iconSideBar = [
  {
    image: icon1,
    title: "Sách",
    url: "/product/search?name=book",
  },
  {
    image: icon2,
    title: "Điện thoại",
    url: "/product/search?name=smartphone",
  },
  {
    image: icon3,
    title: "Thiết bị số - Phụ kiện điện tử",
    url: "/product/search?name=digital-device",
  },
  {
    image: icon4,
    title: "Ô tô - Xe máy",
    url: "/product/search?name=motobyte",
  },
  {
    image: icon5,
    title: "Máy tính - Lap top",
    url: "/product/search?name=computer",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product/search?name=shoe",
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

export const products = [
  {
    id: "03adf-12sad-nasd0",
    image: product1,
    description:
      "Là sản phẩm thuộc dòng S cao cấp nhất của hãng Samsung. Chắc chắn rằng sẽ mang đến cho người dùng một trải nghiệm tốt nhất với tấm nền Oled sắc nét, sống động từng khung hình. Bên cạnh đó còn có con chip SnapDragon 1000 mang đến hiệu năng vượt trội trong tầm giá, kết hợp với hệ điều hành được tùy biến bởi nhà sản xuất giúp sản phẩm luôn đáp ứng tối đa trong công việc, tác vụ hằng nhày",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    price: "102000",
    originalPrice: "132000",
    discount: "23",
    origin: "Poland",
    rating: 4.5,
  },
  {
    id: "03adf-12sad-nasd0",
    image: product1,
    description:
      "Là sản phẩm thuộc dòng S cao cấp nhất của hãng Samsung. Chắc chắn rằng sẽ mang đến cho người dùng một trải nghiệm tốt nhất với tấm nền Oled sắc nét, sống động từng khung hình. Bên cạnh đó còn có con chip SnapDragon 1000 mang đến hiệu năng vượt trội trong tầm giá, kết hợp với hệ điều hành được tùy biến bởi nhà sản xuất giúp sản phẩm luôn đáp ứng tối đa trong công việc, tác vụ hằng nhày",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    price: "102000",
    originalPrice: "132000",
    discount: "23",
    origin: "Poland",
    rating: 4.5,
  },
  {
    id: "03adf-12sad-nasd0",
    image: product1,
    description:
      "Là sản phẩm thuộc dòng S cao cấp nhất của hãng Samsung. Chắc chắn rằng sẽ mang đến cho người dùng một trải nghiệm tốt nhất với tấm nền Oled sắc nét, sống động từng khung hình. Bên cạnh đó còn có con chip SnapDragon 1000 mang đến hiệu năng vượt trội trong tầm giá, kết hợp với hệ điều hành được tùy biến bởi nhà sản xuất giúp sản phẩm luôn đáp ứng tối đa trong công việc, tác vụ hằng nhày",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    price: "102000",
    originalPrice: "132000",
    discount: "",
    origin: "Poland",
    rating: 4.5,
  },
  {
    id: "03adf-12sad-nasd0",
    image: product1,
    description:
      "Là sản phẩm thuộc dòng S cao cấp nhất của hãng Samsung. Chắc chắn rằng sẽ mang đến cho người dùng một trải nghiệm tốt nhất với tấm nền Oled sắc nét, sống động từng khung hình. Bên cạnh đó còn có con chip SnapDragon 1000 mang đến hiệu năng vượt trội trong tầm giá, kết hợp với hệ điều hành được tùy biến bởi nhà sản xuất giúp sản phẩm luôn đáp ứng tối đa trong công việc, tác vụ hằng nhày",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    price: "102000",
    originalPrice: "132000",
    discount: "",
    origin: "Poland",
    rating: 4.5,
  },
  {
    id: "03adf-12sad-nasd0",
    image: product1,
    description:
      "Là sản phẩm thuộc dòng S cao cấp nhất của hãng Samsung. Chắc chắn rằng sẽ mang đến cho người dùng một trải nghiệm tốt nhất với tấm nền Oled sắc nét, sống động từng khung hình. Bên cạnh đó còn có con chip SnapDragon 1000 mang đến hiệu năng vượt trội trong tầm giá, kết hợp với hệ điều hành được tùy biến bởi nhà sản xuất giúp sản phẩm luôn đáp ứng tối đa trong công việc, tác vụ hằng nhày",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    price: "102000",
    originalPrice: "132000",
    discount: "23",
    origin: "Poland",
    rating: 4.5,
  },
];

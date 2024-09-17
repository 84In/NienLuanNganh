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
  PRODUCT_DETAIL: "product/:productId/",
  ORDER_HISTORY: "order/history/",
  MANAGER_HOME: "/manager/",
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

export const iconSideBar = [
  {
    image: icon1,
    title: "Sách",
    url: "/product?name=book",
  },
  {
    image: icon2,
    title: "Điện thoại",
    url: "/product?name=smartphone",
  },
  {
    image: icon3,
    title: "Thiết bị số - Phụ kiện điện tử",
    url: "/product?name=digital-device",
  },
  {
    image: icon4,
    title: "Ô tô - Xe máy",
    url: "/product?name=motobyte",
  },
  {
    image: icon5,
    title: "Máy tính - Lap top",
    url: "/product?name=computer",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
  {
    image: icon6,
    title: "Giày - Dép",
    url: "/product?name=shoe",
  },
];

export const widgetIcon = [
  {
    icon: widget1,
    text: "TOP DEAL",
    url: "/product/topdeal",
  },
  {
    icon: widget2,
    text: "Trading",
    url: "/product/trading",
  },
  {
    icon: widget3,
    text: "Coupon siêu hot",
    url: "/product/coupon",
  },
  {
    icon: widget4,
    text: "Xả kho nửa giá",
    url: "/product/xa-kho",
  },
  {
    icon: widget5,
    text: "Hàng ngoại giá hot",
    url: "/product/hang-ngoai",
  },
  {
    icon: widget6,
    text: "Cùng mẹ chăm bé",
    url: "/product/cham-be",
  },
  {
    icon: widget7,
    text: "Một sách",
    url: "/product/mot-sach",
  },
  {
    icon: widget8,
    text: "Thế giới công nghệ",
    url: "/product/cong-nghe",
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

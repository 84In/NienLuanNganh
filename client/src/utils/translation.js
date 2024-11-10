const translationDictionary = {
  CreatedAt: "Ngày Tạo",
  UpdatedAt: "Ngày Cập Nhật",
  Username: "Tên Người Dùng",
  FirstName: "Tên",
  LastName: "Họ",
  Email: "Email",
  Phone: "Số Điện Thoại",
  Dob: "Ngày Sinh",
  Avatar: "Ảnh Đại Diện",
  Address: "Địa Chỉ",
  Roles: "Vai Trò",
  Edit: "Chỉnh Sửa",
  Name: "Tên",
  CodeName: "Mã Tên",
  Images: "Hình Ảnh",
  Description: "Mô Tả",
  Price: "Giá",
  StockQuantity: "Số Lượng Tồn Kho",
  Sold: "Đã Bán",
  Category: "Danh Mục",
  Brand: "Thương Hiệu",
  Code: "Mã giảm giá",
  DiscountPercentage: "Phần trăm giảm giá",
  StartDate: "Ngày bắt đầu",
  EndDate: "Ngày kết thúc",
};

export const translateColumn = (columnName) => {
  return translationDictionary[columnName] || columnName;
};

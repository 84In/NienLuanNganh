import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Nếu là URL không cần token hoặc là yêu cầu tạo mới user (POST)
    if (
      !(
        config.url.startsWith("/api/v1/auth") ||
        (config.url.startsWith("/api/v1/users") && (config.method === "post" || config.method === "POST"))
      )
    ) {
      // Lấy token từ localStorage
      let authData = window.localStorage.getItem("persist:auth");
      let token = authData && JSON.parse(authData)?.token;

      // Kiểm tra nếu token có bao quanh bởi dấu ngoặc kép thì loại bỏ
      if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      // Thêm token vào header nếu tồn tại
      if (token) {
        config.headers = {
          ...config.headers, // Giữ lại các headers khác
          authorization: `Bearer ${token}`,
        };
      }
      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    // Bất kỳ mã trạng thái 2xx sẽ kích hoạt hàm này
    // Làm gì đó với dữ liệu response (ví dụ: refresh token)
    return response.data;
  },
  function (error) {
    // Bất kỳ mã trạng thái nào ngoài 2xx sẽ kích hoạt hàm này
    if (error.response) {
      // Xử lý lỗi 404 và 400

      if (error.response.status === 404 || error.response.status === 400) {
        return error.response.data;
      }

      // Xử lý lỗi 401 (Unauthorized), ví dụ token hết hạn
      if (error.response.status === 401) {
        console.warn("Token đã hết hạn hoặc không hợp lệ, yêu cầu đăng nhập lại.");
        // Bạn có thể thực hiện các hành động như logout hoặc refresh token tại đây
      }
    }

    return Promise.reject(error);
  },
);

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    if (config.url.startsWith("/api/v1/auth") || (config.url.startsWith("/api/v1/users") && config.method === "post")) {
      // Thêm token vào header cho các yêu cầu không phải auth
      return config;
    } else {
      let token =
        window.localStorage.getItem("persist:auth") &&
        JSON.parse(window.localStorage.getItem("persist:auth"))?.token.slice(1, -1); // Hoặc từ một nguồn khác
      if (token) {
        config.headers = {
          authorization: token ? `Bearer ${token}` : null,
        };
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //Refresh token

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && (error.response.status === 404 || error.response.status === 400)) {
      return error.response.data;
    }
  },
);

export default instance;

import axiosConfig from "../axiosConfig";

export const apiUploadCSV = (file, categoryId) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData(); // Tạo một đối tượng FormData
    formData.append("file", file); // Thêm file vào FormData
    // formData.append("categoryId", categoryId); // Thêm categoryId vào FormData

    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/products/upload-csv/${categoryId}`, // URL cho API
        data: formData, // Sử dụng formData
        headers: {
          "Content-Type": "multipart/form-data", // Đặt kiểu nội dung là multipart/form-data
        },
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiGetProductById = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/products/${productId}`,
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/products`,
        data: payload,
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteProduct = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/v1/products/${productId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

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
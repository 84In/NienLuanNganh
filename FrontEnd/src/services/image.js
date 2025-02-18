import axiosConfig from "../axiosConfig";

export const apiUploadAvatar = (username, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/upload/avatar/${username}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadProductImages = (productName, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/upload/product/${productName}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadCategoryImages = (categoryName, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/upload/category/${categoryName}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUploadBannerImages = (titleBanner, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/upload/banner/${titleBanner}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

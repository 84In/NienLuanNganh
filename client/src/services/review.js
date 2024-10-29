import axiosConfig from "../axiosConfig";

export const apiCreateReview = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/reviews`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetReviewByProduct = (productId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/products/${productId}/reviews`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

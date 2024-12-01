import axiosConfig from "../axiosConfig";

export const apiCreatePromotion = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/promotions`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdatePromotion = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/v1/promotions/${payload?.id}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPromotionById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/promotions/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiRemovePromotion = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/v1/promotions/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

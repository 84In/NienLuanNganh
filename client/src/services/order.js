import axiosConfig from "../axiosConfig";

export const apiCreateOrder = (paymentMethod, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/orders/${paymentMethod}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetOrderCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/orders/current-user`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

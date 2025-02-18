import axiosConfig from "../axiosConfig";
export const apiGetPaymentMethod = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/payment-method`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

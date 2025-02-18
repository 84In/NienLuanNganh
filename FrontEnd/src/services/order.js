import axiosConfig from "../axiosConfig";

export const apiCreateOrderWithCash = (paymentMethod, payload) =>
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

export const apiCreateOrderWithVNPay = (paymentMethod, payload, params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/api/v1/orders/${paymentMethod}`,
        params: {
          ...params,
        },
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateOrderWithZaloPay = (paymentMethod, payload) =>
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

export const apiGetOrderDetailById = (orderId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/orders/${orderId}`,
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

export const apiChangeOrderStatus = (orderId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/v1/orders/change-status/${orderId}`,
        params: {
          status: status,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCancelledOrderByAdmin = (orderId, reason) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/v1/orders/canceled/${orderId}`,
        params: {
          reason: reason,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

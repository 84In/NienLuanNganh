import axiosConfig from "../axiosConfig";

export const apiSearchBrandByName = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/search/brand/${name}`,
      });
      // console.log(response);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiSearchPromotionsByKeyWord = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/search/promotion/${keyword}`,
      });
      // console.log(response);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

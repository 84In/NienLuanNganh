import * as apis from "../../services";
import actionTypes from "./actionType";

export const getRoles = () => async (dispatch) => {
  try {
    const response = await apis.apiGetRoles();
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_ROLES,
        roles: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ROLES,
        msg: response.message,
        roles: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ROLES,
      roles: null,
    });
  }
};

export const getProvinces = () => async (dispatch) => {
  try {
    const response = await apis.apiGetProvinces();
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        provinces: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        msg: response.message,
        provinces: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROVINCES,
      provinces: null,
    });
  }
};

export const getDistrictsByProvince = (province) => async (dispatch) => {
  try {
    const response = await apis.apiGetDistrictsByProvince(province);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_DISTRICTS,
        districts: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_DISTRICTS,
        msg: response.message,
        districts: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DISTRICTS,
      districts: null,
    });
  }
};

export const getWardsByDistrict = (district) => async (dispatch) => {
  try {
    const response = await apis.apiGetWardsByDistrict(district);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_WARDS,
        wards: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_WARDS,
        msg: response.message,
        wards: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_WARDS,
      wards: null,
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCategories();

    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        msg: response.message,
        categories: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORIES,
      categories: null,
    });
  }
};
export const getAdminProducts = (page) => async (dispatch) => {
  try {
    const response = await apis.apiGetAdminProduct(page);

    if (response?.code === 0) {
      console.log(response);
      dispatch({
        type: actionTypes.GET_ADMIN_PRODUCTS,
        msg: "", // Có thể thêm thông điệp nếu cần
        adminProducts: {
          currentPage: page,
          totalPages: response?.result.totalPages,
          data: response?.result.content,
        },
      });
    } else {
      dispatch({
        type: actionTypes.GET_ADMIN_PRODUCTS,
        msg: response.message,
        adminProducts: {
          currentPage: 0,
          totalPages: 0,
          data: [],
        },
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ADMIN_PRODUCTS,
      msg: "Có lỗi xảy ra", // Có thể thêm thông điệp lỗi
      adminProducts: {
        currentPage: 0,
        totalPages: 0,
        data: [],
      },
    });
  }
};

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

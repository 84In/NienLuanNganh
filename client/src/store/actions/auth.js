import { apiLogin, apiRegister } from "../../services";
import actionTypes from "./actionType";

export const register = (payload) => async (dispath) => {
  try {
    const response = await apiRegister(payload);
    if (response?.code === 0) {
      dispath({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.result.user,
      });
    } else {
      dispath({
        type: actionTypes.REGISTER_FAIL,
        data: response.message,
      });
    }
  } catch (error) {
    dispath({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};
export const login = (payload) => async (dispatch) => {
  let response = null;

  try {
    response = await apiLogin(payload);

    if (response?.data.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response?.data.code,
      });
    }
  } catch (error) {
    console.log(response);

    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: response?.message,
    });
  }
};

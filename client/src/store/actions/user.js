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
  try {
    const response = await apiLogin(payload);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.result.token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

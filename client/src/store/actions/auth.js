import { apiLogin, apiLogout, apiRegister } from "../../services";
import actionTypes from "./actionType";

export const register = (payload) => async (dispatch) => {
  let response = null;
  try {
    response = await apiRegister(payload);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: response,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  let response = null;
  try {
    response = await apiLogin(payload);

    if (response?.code === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: response,
    });
  }
};

export const logout = (token) => async (dispatch) => {
  let response = null;
  try {
    response = await apiLogout(token);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

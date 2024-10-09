import * as apis from "../../services";
import actionTypes from "./actionType";

export const getUserInfo = (username) => async (dispatch) => {
  let response = null;
  try {
    response = await apis.apiGetUserByUsername(username);
    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_USER_SUCCESS,
        data: response?.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_USER_FAIL,
        data: response?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_FAIL,
      data: response,
    });
  }
};

export const getCart = (username) => async (dispatch) => {
  try {
    const response = await apis.apiGetCartByUsername(username);

    if (response?.code === 0) {
      dispatch({
        type: actionTypes.GET_CART,
        cart: response.result,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CART,
        msg: response.message,
        cart: {},
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CART,
      cart: null,
    });
  }
};

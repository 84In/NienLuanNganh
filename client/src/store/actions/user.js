import { apiGetUserByUsername } from "../../services";
import actionType from "./actionType";

export const getUserInfo = (username) => async (dispatch) => {
  let response = null;
  try {
    response = await apiGetUserByUsername(username);
    if (response?.code === 0) {
      dispatch({
        type: actionType.GET_USER_SUCCESS,
        data: response?.result,
      });
    } else {
      dispatch({
        type: actionType.GET_USER_FAIL,
        data: response?.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_USER_FAIL,
      data: response,
    });
  }
};

import { apiUserInfo } from "../../services";
import actionType from "./actionType";

export const getUserInfo = (username) => async (dispatch) => {
  let response = null;
  try {
    response = await apiUserInfo(username);
    if (response?.data.code === 0) {
      dispatch({
        type: actionType.GET_USER_SUCCESS,
        data: response?.data.result,
      });
    } else {
      dispatch({
        type: actionType.GET_USER_FAIL,
        data: response?.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_USER_FAIL,
      data: response,
    });
  }
};

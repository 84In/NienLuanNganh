import { apiUserInfo } from "../../services";
import actionType from "./actionType";

export const getUserInfo = (username) => async (dispatch) => {
  try {
    const response = await apiUserInfo(username);
    if (response?.data.code === 0) {
      dispatch({
        type: actionType.GET_USER_SUCCESS,
        data: response.data.result,
      });
    } else {
      dispatch({
        type: actionType.GET_USER_FAIL,
        data: response.message,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_USER_FAIL,
      data: null,
    });
  }
};

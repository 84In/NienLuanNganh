import actionTypes from "../actions/actionType";

const initState = {
  userData: null,
  currentData: {},
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        userData: action.data,
      };
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};
export default userReducer;

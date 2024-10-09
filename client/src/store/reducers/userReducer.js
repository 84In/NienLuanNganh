import actionTypes from "../actions/actionType";

const initState = {
  userData: null,
  msg: "",
  cart: {},
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
    case actionTypes.GET_CART:
      return {
        ...state,
        cart: action.cart || {},
        msg: action.msg || "",
      };
    default:
      return state;
  }
};
export default userReducer;

import actionTypes from "../actions/actionType";

const initState = {
  userData: null,
  msg: "",
  cart: {},
  checkout: [],
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
    case actionTypes.GET_CART_FAIL:
      return {
        ...state,
        cart: action.cart || {},
        msg: action.msg || "",
      };
    case actionTypes.CREATE_CHECKOUT:
      return {
        ...state,
        checkout: action.checkout || [],
      };
    case actionTypes.REMOVE_CHECKOUT:
      return {
        ...state,
        checkout: [],
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userData: null,
        cart: {},
      };
    default:
      return state;
  }
};
export default userReducer;

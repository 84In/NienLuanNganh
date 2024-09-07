import actionTypes from "../actions/actionType";
const initState = {
  isLoggedIn: false,
  message: null,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.data.result.authenticated,
        token: action.data.result.token,
        message: action.data.message,
        update: false,
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.data,
        token: null,
        update: !state.update,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        message: "",
      };
    default:
      return state;
  }
};
export default authReducer;

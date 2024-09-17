import actionTypes from "../actions/actionType";
const initState = {
  isLoggedIn: false,
  message: null,
  code: null,
  token: null,
  username: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.data.result.authenticated,
        message: action.data.message,
        token: action.data.result.token,
        code: null,
        username: action.data.result.username,
        update: false,
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.data.message,
        token: null,
        code: action.data.code,
        update: !state.update,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        message: null,
        token: null,
        code: null,
        username: null,
      };
    default:
      return state;
  }
};
export default authReducer;

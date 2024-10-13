import actionTypes from "../actions/actionType";

const initState = {
  msg: "",
  roles: [],
  provinces: [],
  districts: [],
  wards: [],
  categories: [],
  adminProducts: {
    currentPage: 0,
    totalPages: 0,
    data: [],
  },
  adminUsers: {
    currentPage: 0,
    totalPages: 0,
    data: [],
  },
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES:
      return {
        ...state,
        roles: action.roles || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_DISTRICTS:
      return {
        ...state,
        districts: action.districts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_WARDS:
      return {
        ...state,
        wards: action.wards || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ADMIN_PRODUCTS:
      return {
        ...state,
        adminProducts: action.adminProducts || {
          currentPage: 0,
          totalPages: 0,
          data: [],
        },
        msg: action.msg || "",
      };
    default:
      return state;
  }
};
export default appReducer;

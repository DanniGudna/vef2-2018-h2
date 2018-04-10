import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  message: null,
  token: null,
  user: null,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
        message: action.message,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      }
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        token: action.token,
      }
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,        
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        message: action.message,
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,
      }
  default:
    return state;
  }
};

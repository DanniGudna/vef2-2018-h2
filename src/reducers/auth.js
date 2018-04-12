import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  AUTHENTICATE,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  message: null,
  user: null,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        error: action.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        error: action.error,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        error: action.error,
      }
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      }
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        error: action.error,
      }
    
  default:
    return state;
  }
};

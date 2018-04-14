import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  AUTHENTICATE,
  AUTHENTICATE_REQUEST,
} from '../actions/auth';

const initialState = {
  isFetching: true,
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
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        user: action.user,
        error: action.error,
      }
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        user: action.user,
        error: action.error,
      }
    
  default:
    return state;
  }
};

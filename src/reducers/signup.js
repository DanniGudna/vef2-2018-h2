import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../actions/signup';

const initialState = {
  isFetching: false,
  errors: null,
  user: null,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        errors: action.errors,        
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        errors: action.errors,
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        errors: action.errors,
      }
  default:
    return state;
  }
};

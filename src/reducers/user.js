import {
  USER_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
} from '../actions/user';

const initialState = {
  isFetching: true,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.users,
        error: action.error,
      }
    case USER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.users,
        error: action.error,
      }
    case USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        error: action.error,
      }
  
    default:
      return state;
  }
};

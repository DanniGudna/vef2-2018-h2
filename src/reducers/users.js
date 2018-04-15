import {
  USERS_FAILURE,
  USERS_REQUEST,
  USERS_SUCCESS,
} from '../actions/users';

const initialState = {
  isFetching: true,
  users: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      }
    case USERS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      }
    case USERS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      }
  
    default:
      return state;
  }
};

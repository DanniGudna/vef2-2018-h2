import api from '../api';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

function requestUsers() {
  return {
    type: USERS_REQUEST,
    isFetching: true,
    users: null,
    error: null,
  }
}

function usersSuccess(users) {
  return { 
    type: USERS_SUCCESS,
    isFetching: false,
    users,
    error: null,
  }
}

function usersFailure(error) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    users: null,
    error,
  }
}

export const fetchUsers = (page = 0) => {
  return async (dispatch) => {

    dispatch(requestUsers());

    const offset = page * 10;

    const endpoint = `/users?offset=${offset}`;

    let data;

    try {
      data = await api.get(endpoint);
    } catch (error) {
      dispatch(usersFailure('Eitthvað kom uppá'));
    }

    const { result } = data;

    if (result.error) {
      return dispatch(usersFailure(result.error));
    }

    dispatch(usersSuccess(result.items));
  }
}

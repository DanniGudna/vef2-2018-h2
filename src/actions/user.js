import api from '../api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function requestUser() {
  return {
    type: USER_REQUEST,
    isFetching: true,
    user: null,
    error: null,
  }
}

function userSuccess(user) {
  return { 
    type: USER_SUCCESS,
    isFetching: false,
    user,
    error: null,
  }
}

function userFailure(error) {
  return {
    type: USER_FAILURE,
    isFetching: false,
    user: null,
    error,
  }
}

export const fetchUser = (id) => {
  return async (dispatch) => {

    dispatch(requestUser());

    const endpoint = `/users/${id}`;

    let data;

    try {
      data = await api.get(endpoint);
    } catch (error) {
      dispatch(userFailure('Eitthvað kom uppá'));
    }

    const { result } = data;

    if (result.error) {
      return dispatch(userFailure(result.error));
    }

    dispatch(userSuccess(result));
  }
}

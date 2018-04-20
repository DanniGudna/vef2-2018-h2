import api from '../api';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    errors: null,
  }
}

function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    user,
    success: true,
    errors: null,
  }
}

function signupError(errors) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    errors,
  }
}

export const signupUser = (username, password, name) => {
  return async (dispatch) => {
    dispatch(signupRequest());

    const endpoint = '/register';

    let data;

    try {
      data = await api.post(endpoint, {username, password, name})
    } catch (error) {
      return dispatch(signupError([{message: '500 - Eitthvað kom uppá'}]));
    }

    const { errors } = data.result;

    if (errors) {
      return dispatch(signupError(errors));
    }

    const { result } = data;

    dispatch(signupSuccess(result));
  }
}

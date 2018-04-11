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
      dispatch(signupError(error));
    }

    const { errors } = data.result;
    console.info(errors);

    if (errors) {
      return dispatch(signupError(errors));
    }

    const { result } = data;

    dispatch(signupSuccess(result));
  }
}
import api from '../api';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    message: null,
  }
}

function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    user,
    message: null,
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

    let user;

    try {
      user = await api.post(endpoint, {username, password, name})
    } catch (error) {
      dispatch(signupError(error));
    }

    console.info(user.result.errors);

    const { status } = user;

    console.info(status);

    if (!String(status).match(/^2[0-9]{2}/) || !user) {
      const errors = user.result;
      dispatch(signupError(errors));
    }

    dispatch(signupSuccess(user));
  }
}

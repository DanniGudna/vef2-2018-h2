
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}


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

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    message: null,
  }
}


export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    const endpoint = '/login';

    let token;

    try {
      token = await api.post(endpoint, {username, password});
    } catch (error) {
      dispatch(loginError(error));
    }

    console.info(token);

    if (!token) {
      dispatch(loginError('Oh no!'));
    }

    dispatch(loginSuccess(token));
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

    console.info(user);

    if (!user) {
      dispatch(signupError('Oh no!'));
    }

    dispatch(signupSuccess(user));
  }
}

export const logoutUser = () => {

}

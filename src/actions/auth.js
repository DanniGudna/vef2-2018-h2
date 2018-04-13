
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
export const AUTHENTICATE = 'AUTHENTICATE';


function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    error: null,
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    error: null,
  }
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    user: null,
    error,
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

function authenticate(user, isAuthenticated) {
  return {
    type: AUTHENTICATE,
    isAuthenticated,
    user,
    error: null,
  }
}


export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    const endpoint = '/login';

    let data;

    try {
      data = await api.post(endpoint, {username, password});
    } catch (error) {
      return dispatch(loginError(error));
    }

    const { error } = data.result;

    if (error) {
      return dispatch(loginError(error));
    }

    const { token } = data.result;
    window.localStorage.setItem('token', token);
    
    const { user } = data.result;

    window.localStorage.setItem('user', JSON.stringify(user));

    dispatch(loginSuccess(user));
  }
}

export const authenticateUser = (user) => {
  return (dispatch) => {
    const isAuthenticated = user ? true : false;
    dispatch(authenticate(user, isAuthenticated));
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch(logout());
  }
}

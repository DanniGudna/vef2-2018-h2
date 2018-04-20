import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE = 'AUTHENTICATE';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';
export const PHOTO_FAILURE = 'PHOTO_FAILURE';


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

function requestUpdate() {
  return {
    type: UPDATE_REQUEST,
    isFetching: true,
    message: null,
  }
}

function updateSuccess(user, message) {
  return {
    type: UPDATE_SUCCESS,
    isFetching: false,
    user,
    errors: null,
    message,
  }
}

function updateError(errors) {
  return {
    type: UPDATE_FAILURE,
    isFetching: false,
    errors: errors,
    message: null,
  }
}

function photoError(error) {
  return {
    type: PHOTO_FAILURE,
    isFetching: false,
    error,
  }
}

function authenticateRequest() {
  return {
    type: AUTHENTICATE_REQUEST,
    isAuthenticated: false,
    isFetching: true,
    user: null,
    error: null,
  }
}

function authenticate(user, isAuthenticated) {
  return {
    type: AUTHENTICATE,
    isAuthenticated,
    isFetching: false,
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
      return dispatch(loginError('500 - Eitthvað kom uppá'));
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
    dispatch(authenticateRequest());
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

export const updateUser = (field, name, password) => {
  return async (dispatch) => {
    dispatch(requestUpdate());

    const endpoint = '/users/me';

    let data;

    try {
      data = await api.patch(endpoint, {name, password});
    } catch (error) {
      dispatch(updateError(error));
    }

    if (data.status === 500) {
      const { error } = data.result;
      return dispatch(updateError(error));
    }

    const { result } = data;

    if (result.errors) {
      const { errors } = result;
      return dispatch(updateError(errors));
    }

    let message = null;

    if (field === "name") { message = "Nafni var breytt" }
    if (field === "password" ) { message = "Lykilorði var breytt" }

    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(result));

    dispatch(updateSuccess(result, message));
  }
}

export const updatePhoto = (photo) => {
  return async (dispatch) => {
    dispatch(requestUpdate());

    const endpoint = '/users/me/profile';

    let data;

    try {
      data = await api.postImage(endpoint, photo);
    } catch (error) {
      dispatch(updateError([{message: '500 - Eitthvað kom uppá'}]));
    }

    const { error } = data.result;

    if (error) {
      return dispatch(photoError(error));
    }

    const message = 'Mynd var uppfærð';

    const { result } = data;

    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(result));

    dispatch(updateSuccess(result, message));
  }
}

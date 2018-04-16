import api from '../api';

export const READINGS_REQUEST = 'READINGS_REQUEST';
export const READINGS_SUCCESS = 'READINGS_SUCCESS';
export const READINGS_FAILURE = 'READINGS_FAILURE';
export const REACINGS_DELETE = 'REACINGS_DELETE';

function requestReadings() {
  return {
    type: READINGS_REQUEST,
    readings: null,
    error: null,
  }
}

function readingsSuccess(readings) {
  return {
    type: READINGS_SUCCESS,
    readings,
    error: null,
  }
}

function readingsFailure(error) {
  return {
    type: READINGS_FAILURE,
    readings: null,
    error,
  }
}

function  readingsDelete() {
  return {
    type: REACINGS_DELETE,
    readings: null,
    error: null,
  }
}

export const fetchMyReadings = () => {
  return async (dispatch) => {
    dispatch(requestReadings());

    const endpoint = '/users/me/read';

    let data;

    try {
      data = await api.get(endpoint);
    } catch (error) {
      return dispatch(readingsFailure(error));
    }

    const { items } = data.result;

    dispatch(readingsSuccess(items));
  }
}

export const deleteReading = (id) => {
  return async (dispatch) => {
    
    const endpoint = `/users/me/read/${id}`;

    let data;

    try {
      data = await api.mdelete(endpoint);
    } catch (error) {
      dispatch(readingsFailure(error));
    }
  }
}
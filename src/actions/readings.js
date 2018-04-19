import api from '../api';

export const READINGS_REQUEST = 'READINGS_REQUEST';
export const READINGS_SUCCESS = 'READINGS_SUCCESS';
export const READINGS_FAILURE = 'READINGS_FAILURE';
export const REACINGS_DELETE = 'REACINGS_DELETE';

function requestReadings() {
  return {
    type: READINGS_REQUEST,
    fetchingReads: true,
    readings: null,
    error: null,
  }
}

function readingsSuccess(readings) {
  return {
    type: READINGS_SUCCESS,
    fetchingReads: false,
    readings,
    error: null,
  }
}

function readingsFailure(error) {
  return {
    type: READINGS_FAILURE,
    fetchingReads: false,
    readings: null,
    error,
  }
}

export const fetchReadings = (id, page = 0) => {
  return async (dispatch) => {
    dispatch(requestReadings());

    const offset = page * 10;

    const endpoint = `/users/${id}/read?offset=${offset}`;

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

    dispatch(requestReadings());
    
    const endpoint = `/users/me/read/${id}`;
    const bookpoint = '/users/me/read'

    let data;

    try {
      await api.mdelete(endpoint);
      data = await api.get(bookpoint);
      const { items } = data.result;
      dispatch(readingsSuccess(items));
    } catch (error) {
      dispatch(readingsFailure('Eitthvað kom uppá'));
    }
  }
}
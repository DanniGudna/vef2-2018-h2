import {
  READINGS_REQUEST,
  READINGS_SUCCESS,
  READINGS_FAILURE,
} from '../actions/readings';

const initialState = {
  fetchingReads: true,
  readings: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case READINGS_REQUEST:
      return {
        ...state,
        readings: action.readings,
        fetchingReads: action.fetchingReads,
        error: action.error,
      }
    case READINGS_SUCCESS:
      return {
        ...state,
        readings: action.readings,
        fetchingReads: action.fetchingReads,
        error: action.error,
      }
    case READINGS_FAILURE:
      return {
        ...state,
        readings: action.readings,
        fetchingReads: action.fetchingReads,
        error: action.error,
      }
    default:
      return state;
  }
};

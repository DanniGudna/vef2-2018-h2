import {
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_ERROR,
} from '../actions/review';

const initialState = {
  isFetching: false,
  errors: null,
  received: false,
}

export default (state = initialState, action) => {

  switch (action.type) {
    case REVIEW_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        errors: action.errors,
        received: action.received,
      }
    case REVIEW_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        errors: action.errors,
        received: action.received,
      }
    case REVIEW_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        errors: action.errors,
        received: action.received,
      }
    default:
      return state;
  }
};

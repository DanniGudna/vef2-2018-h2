import api from '../api';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_ERROR = 'REVIEW_ERROR';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';

function requestReview() {
  return {
    type: REVIEW_REQUEST,
    isFetching: true,
    errors: null,
    received: false,
  }
}

function reviewError(errors) {
  return {
    type: REVIEW_ERROR,
    isFetching: false,
    errors,
    received: false,
  }
}

function reviewSuccess() {
  return {
    type: REVIEW_SUCCESS,
    isFetching: false,
    errors: null,
    received: true,
  }
}

export const submitReview = (bookId, rating, review) => {
  return async (dispatch) => {
    dispatch(requestReview());

    console.info(bookId,rating,review);

    const endpoint = '/users/me/read';

    let data;

    try {
      data = await api.post(endpoint, {bookId, rating: Number(rating), review});
    } catch (error) {
      dispatch(reviewError([{message: 'Eitthvað kom uppá'}]));
    }

    const { errors } = data.result;

    if (errors) {
      dispatch(reviewError(errors));
    }

    dispatch(reviewSuccess());
  }
}

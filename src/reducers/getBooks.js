import {
  BOOKS_REQUEST,
  BOOKS_SUCCESS,
  BOOKS_FAILURE
} from '../actions/getBooks';

const initialState = {
  isFetching: false,
  books: null,
}

export default (state = initialState, action) => {

  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        page: action.page,
      };
    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
      }
    case BOOKS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,
      }
    default:
      return state;
  }
};

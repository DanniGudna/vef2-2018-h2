import {
  BOOKS_REQUEST,
  BOOKS_SUCCESS,
  BOOKS_FAILURE,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE

} from '../actions/newBook';

const initialState = {
  isFetching: false,
  books: null,
  categories: null,
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
      case CATEGORIES_REQUEST:
        return {
          ...state,
          isFetching: action.isFetching,
          page: action.page,
        };
      case CATEGORIES_SUCCESS:
        return {
          ...state,
          isFetching: action.isFetching,
          books: action.books,
          categories: action.categories,
        }
      case CATEGORIES_FAILURE:
        return {
          ...state,
          isFetching: action.isFetching,
          message: action.message,
        }
    default:
      return state;
  }
};

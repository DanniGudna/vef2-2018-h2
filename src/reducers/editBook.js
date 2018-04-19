import {
  BOOKCATEGORIES_REQUEST,
  BOOKCATEGORIES_SUCCESS,
  BOOKCATEGORIES_FAILURE,


} from '../actions/editBook';

const initialState = {
  isFetching: false,
  message: null,
  books: null,
  categories: null,
  success: false,
}

export default (state = initialState, action) => {

  switch (action.type) {
    case BOOKCATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        page: action.page,
      };
    case BOOKCATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        categories: action.categories,
        success: action.success,
      }
    case BOOKCATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,
        categories: action.categories,
        books: action.books,
        success: action.success,
      }

    default:
      return state;
  }
};

import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

function requestBooks(page) {
  return {
    type: BOOKS_REQUEST,
    isFetching: true,
    page,
  }
}

function receiveBooks(books) {
  return {
    type: BOOKS_SUCCESS,
    isFetching: false,
    books,
  }
}

function booksError(message) {
  return {
    type: BOOKS_FAILURE,
    isFetching: false,
    message,
  }
}

function requestCategories() {
  return {
    type: CATEGORIES_REQUEST,
    isFetching: true,
  }
}

function receiveCategories(categories) {
  return {
    type: CATEGORIES_SUCCESS,
    isFetching: false,
    categories,
  }
}

function categoriesError(message) {
  return {
    type: BOOKS_FAILURE,
    isFetching: false,
    message,
  }
}


export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(requestCategories());
    const endpoint = '/categories';
    let categories
    try {
      categories = await api.get(endpoint);

    } catch (error) {
      dispatch(categoriesError(error));
    }

    if (categories.status !== 200 || !categories) {
      dispatch(categoriesError('Oh no!'))
    }

    dispatch(receiveCategories(categories));
  }
}

export const newBook = (book) => {
  return async (dispatch) => {
    dispatch(requestBooks());
      const endpoint = '/books';

      let books;
    try {
      books = await api.post(endpoint, book);


    } catch (error) {
      dispatch(booksError('Eitthvað kom uppá'));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks(books));
  }
}

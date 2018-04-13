import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const CATEGORIES_REQUEST = 'BOOKS_REQUEST';
export const CATEGORIES_SUCCESS = 'BOOKS_SUCCESS';
export const CATEGORIES_FAILURE = 'BOOKS_FAILURE';

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

function receiveCategories(books) {
  return {
    type: CATEGORIES_SUCCESS,
    isFetching: false,
    books,
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
      console.log('damn');
      dispatch(categoriesError(error));
    }

    if (categories.status !== 200 || !categories) {
      dispatch(categoriesError('Oh no!'))
    }

    dispatch(receiveCategories(categories));
  }
}

export const newBook = (book) => {
  console.log('BOOK', book)
  return async (dispatch) => {
    dispatch(requestBooks());

      const endpoint = '/books';

      let books;
    try {
      // TODO : baeta vid body
      books = await api.post(endpoint, book);
      console.log('BOOKS', books)


    } catch (error) {
      dispatch(booksError(error));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks(books));
  }
}

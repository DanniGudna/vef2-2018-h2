import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

function requestBooks() {
  return {
    type: BOOKS_REQUEST,
    isFetching: true,
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

export const fetchBooks = (offset = 0, limit = 10) => {
  return async (dispatch) => {
    const endpoint = `/books?offset=${offset}&limit=${limit}`;
    
    let books;
    try {
      books = await api.get(endpoint);
    } catch (error) {
      dispatch(booksError(error));
    }

    if (books.status !== 200) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks);
  }
}

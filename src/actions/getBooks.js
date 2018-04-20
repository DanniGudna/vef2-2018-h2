import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';

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

function receiveSearchBooks(books) {
  return {
    type: SEARCH_BOOKS_SUCCESS,
    isFetching: false,
    search: true,
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

export const fetchBooks = (page = 1, search = false) => {
  return async (dispatch) => {

    dispatch(requestBooks());
    const offset = (page - 1) * 10;

    let endpoint = `/books?offset=${offset}&limit=10`;

    if(search){
      endpoint = endpoint + `&search=${search}`;
    }

    let books;
    try {
      books = await api.get(endpoint);
    } catch (error) {
      dispatch(booksError(error));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks(books));
  }
}

export const fetchBooksFromSearch = ( search = false, history) => {

  return async (dispatch) => {
    dispatch(requestBooks());


    let endpoint = `/books?search=`;

    if(search){
      endpoint = endpoint + `${search}`;
    }
    const newUrl = endpoint;
    history.push(newUrl);

    let books;
    try {
      books = await api.get(endpoint);
    } catch (error) {
      dispatch(booksError(error));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveSearchBooks(books));
  }
}

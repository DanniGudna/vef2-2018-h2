import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';

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

export const fetchBooks = (page = 0, search = false) => {
  return async (dispatch) => {

    dispatch(requestBooks(page));

    const offset = page * 10;

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
    dispatch(requestBooks(0));


    let endpoint = `/books?search=`;

    console.log('SEARCH', search)
    if(search){
      console.log('CONDITION PASSED')
      endpoint = endpoint + `${search}`;
    }
    const newUrl = endpoint;
    console.log('NEWURL', newUrl)
    history.push(newUrl);

    //this.props.history.push(newUrl);


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

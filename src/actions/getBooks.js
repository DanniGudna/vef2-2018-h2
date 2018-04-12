import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

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

export const fetchBooks = (page = 0, search = false) => {
  return async (dispatch) => {
    console.log("page í fetch", page);
    console.log("search í fetch", search);
    dispatch(requestBooks(page));

    const offset = page * 10;

    let endpoint = `/books?offset=${offset}&limit=10`;

    console.log('SEARCH', search)
    if(search){
      console.log('CONDITION PASSED');
      endpoint = endpoint + `&search=${search}`;
      console.log('ENDPOINT', endpoint);
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

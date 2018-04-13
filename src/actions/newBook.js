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

export const newBook = ({book}) => {
  return async (dispatch) => {
    dispatch(requestBooks());


  //  let endpoint = `/books?offset=${offset}&limit=10`;


  const {
      title,
      author,
      description,
      isbn10,
      isbn13,
      category,
      published,
      pagecount,
      language, } = book;

      const endpoint = '/books/new';

      let books;
    try {
      // TODO : baeta vid body
      books = await api.post(endpoint, book)

    } catch (error) {
      dispatch(booksError(error));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks(books));
  }
}

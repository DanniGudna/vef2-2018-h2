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
    dispatch(requestBooks());
    const endpoint = '/categories';
    let categories
    try {
      // TODO : baeta vid body
      categories = await api.get(endpoint);
      console.log('CATEGORIES', categories)


    } catch (error) {
      console.log('damn');
      dispatch(booksError(error));
    }

    if (categories.status !== 200 || !categories) {
      dispatch(booksError('Oh no!'))
    }

    dispatch(receiveBooks(categories));
  }
}

export const newBook = (book) => {
  console.log('BOOK', book)
  return async (dispatch) => {
    dispatch(requestBooks());
    console.log('newBook');


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

      const endpoint = '/books';

      let books;
    try {
      // TODO : baeta vid body
      books = await api.post(endpoint, book);
      console.log('BOOKS', books)


    } catch (error) {
      console.log('damn');
      dispatch(booksError(error));
    }

    if (books.status !== 200 || !books) {
      dispatch(booksError('Oh no!'))
    }

    // dispatch(receiveBooks(books));
  }
}

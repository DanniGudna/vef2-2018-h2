import api from '../api';

export const BOOKCATEGORIES_REQUEST = 'BOOKCATEGORIES_REQUEST';
export const BOOKCATEGORIES_SUCCESS = 'BOOKCATEGORIES_SUCCESS';
export const BOOKCATEGORIES_FAILURE = 'BOOKCATEGORIES_FAILURE';

function requestBookCategories(page) {
  return {
    type: BOOKCATEGORIES_REQUEST,
    isFetching: true,
    page,
  }
}

function receiveBookCategories(books, categories) {
  return {
    type: BOOKCATEGORIES_SUCCESS,
    isFetching: false,
    books,
    categories,
  }
}

function bookCategoriesError(message, book, categories) {
  return {
    type: BOOKCATEGORIES_FAILURE,
    isFetching: false,
    success: false,
    message,
    book,
    categories,
  }
}

function receiveBooks(books, categories, status) {
  let suc = false;
  if(status === 201){
    suc = true;
  }
  return {
    type: BOOKCATEGORIES_SUCCESS,
    isFetching: false,
    success: suc,
    books,
    categories,
  }
}

export const fetchBookIdCategories = (id = 0) => {
  return async (dispatch) => {

    dispatch(requestBookCategories());

    const bookEndpoint = `/books/${id}`;
   // TODO: finna betri lausn, nvm oli sagdi ad thetta vaeri cool
    const categoryEndpoint = '/categories?limit=1000';

    let books;
    let categories;
    try {
      books = await api.get(bookEndpoint);
      categories = await api.get(categoryEndpoint);
    } catch (error) {
      dispatch(bookCategoriesError(error));
    }

    if (books.status !== 200 || !books || categories.status !== 200 || !categories) {
      dispatch(bookCategoriesError('Oh no!'))
    }

    dispatch(receiveBookCategories(books, categories));
  }
}


export const patchBook = (book, id, categories) => {

  return async (dispatch) => {
    dispatch(requestBookCategories());

      const endpoint = `/books/${id}`;
      book.pageCount = book.pagecount;
      delete book.pagecount;


      let books;
    try {
      books = await api.patch(endpoint, book);


    } catch (error) {
      dispatch(bookCategoriesError(error, book, categories));
    }

    if (books.status !== 200 || !books) {
      dispatch(bookCategoriesError('Oh no!', book, categories))
    }

    dispatch(receiveBooks(books, categories, books.status))


  }
}

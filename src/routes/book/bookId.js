import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooksId } from '../../actions/getBookId';

import BookReview from '../../components/book-review';

class bookId extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchBooksId(id));
  }

  render() {
    const { isFetching, books, page } = this.props;

    if (isFetching || !books) {
      return (
        <div>
          Sæki bók...
        </div>
      );
    }

    const result = books.result;

    return (
      <div>
        <h2>
          Bók!
        </h2>
          <div>
            <h3>{result.title}</h3>
            <p>Eftir {result.author}</p>
            <p>{result.isbn13}</p>
            <p>{result.categorytitle}</p>
            <p>{result.description}</p>
            <p>{result.pagecount} Síður</p>
            <p>Gefin út {result.published} </p>
            <p>Tungumál: {result.language}</p>
            <p>hérna vantar breyta bók takka, TODO!!</p>
          </div>
          <BookReview id={result.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    isFetching: state.getBooks.isFetching,
    books: state.getBooks.books,
    message: state.getBooks.message,
    page: state.getBooks.page,
  };
}

export default connect(mapStateToProps)(bookId);

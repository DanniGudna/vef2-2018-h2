import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../actions/getBookId';
import PageFlipper from '../../components/page-flipper';

class Books extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
    page: 0,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;

    dispatch(fetchBooks(page));
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

    const { result: { items } } = books;

    return (
      <div>
        <h2>
          Bók!
        </h2>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Eftir {item.author}</p>
            <p>{item.isbn13}</p>
            <p>{item.categorytitle}</p>
            <p>{item.description}</p>
            <p>{item.pagecount} Síður</p>
            <p>Gefin út {item.published} </p>
            <p>Tungumál: {item.language}</p>
            <p>hérna vantar breyta bók takka, TODO!!</p>
          </div>
        ))}
        <div>
          <PageFlipper page={page} />
        </div>
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

export default connect(mapStateToProps)(Books);

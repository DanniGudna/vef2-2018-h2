import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../actions/getBooks';

class Books extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
    page: 1,
  }  

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.state;

    console.info(page);

    dispatch(fetchBooks());
  }

  render() {
    const { isFetching, books } = this.props;

    if (isFetching || !books) {
      return (
        <div>
          Sæki bækur...
        </div>
      );
    }

    const { result: { items } } = books;

    return (
      <div>
        <h2>
          Bækur!
        </h2>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Eftir {item.author}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.getBooks.isFetching,
    books: state.getBooks.books,
    message: state.getBooks.message,
  };
}

export default connect(mapStateToProps)(Books);

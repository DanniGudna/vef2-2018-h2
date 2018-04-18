import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooksId } from '../../actions/getBookId';
import Button from '../../components/button';

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

  onClick = (e) => {
    console.log('ping');
    const { id } = this.props.match.params;
    this.props.history.push({
      pathname: `/books/${id}/edit`,
      state: this.state,
     });
  }


  render() {
    const { isFetching, books, page } = this.props;
    const { id } = this.props.match.params;

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
            <Button onClick={this.onClick}>oirkur</Button>
          </div>
      </div>
    );
  }
}
// TODO: gera rudecer og route fyrir getBookId
const mapStateToProps = (state) => {
  return {
    ...state,
    isFetching: state.getBookId.isFetching,
    books: state.getBookId.books,
    message: state.getBookId.message,
    page: state.getBookId.page,
  };
}

export default connect(mapStateToProps)(bookId);

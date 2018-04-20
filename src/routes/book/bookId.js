import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBooksId } from '../../actions/getBookId';
import BookInfo from '../../components/bookInfo';
import Button from '../../components/button';

import BookReview from '../../components/book-review';

class bookId extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
  }

  static propTypes = {
    isFetching: PropTypes.bool,
    books: PropTypes.object,
    page: PropTypes.string,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchBooksId(id));
  }

  onClick = (e) => {;
    const { id } = this.props.match.params;
    this.props.history.push({
      pathname: `/books/${id}/edit`,
      state: this.state,
     });
  }

  onBackClick = (e) => {
    this.props.history.goBack();
  }

  render() {
    const { isFetching, books } = this.props;

    if (isFetching || !books) {
      return (
        <div>
          Sæki bók...
        </div>
      );
    }

    const result = books.result;

    if(result.error){
      return (
        <div>
          Bók er ekki til
        </div>
      )
    }

    return (
      <div>
        <div>
          <BookInfo
            title={result.title}
            author={result.author}
            isbn13={result.isbn13}
            category={result.categorytitle}
            description={result.description}
            pagecount={result.pagecount}
            published={result.published}
            language={result.language}
            onClick={this.onClick}
          />
            <BookReview id={result.id} />
        </div>
        <Button
          className="button__back"
          onClick={this.onBackClick}
        >
          Til Baka
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.getBookId.isFetching,
    books: state.getBookId.books,
    message: state.getBookId.message,
    page: state.getBookId.page,
  };
}

export default connect(mapStateToProps)(bookId);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooksId } from '../../actions/getBookId';
import Button from '../../components/button';
import BookInfo from '../../components/bookInfo';

class bookId extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    console.log(typeof(id));

    dispatch(fetchBooksId(id));
  }

  onClick = (e) => {;
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
    console.log('RESULT', result.error)

    if(result.error){
      return (
        <div>
          Bók er ekki til
        </div>
      )
    }

    return (
      <div>
        <h2>
          Bók!
        </h2>
        <div>
          <BookInfo
            title={result.title}
            author={result.author}
            ISBN13={result.isbn13}
            category={result.categoryTitle}
            description={result.description}
            pagecount={result.pagecount}
            published={result.published}
            language={result.language}
            onClick={this.onClick}/>
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

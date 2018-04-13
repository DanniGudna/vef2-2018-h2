import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../actions/getBooks';
import PageFlipper from '../../components/page-flipper';
const querystring = require('querystring');

class Books extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
    page: 0,
    search: null,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;
    let search  = this.props.location.search;
    const { limit } = this.props.location;
    if( search.charAt( 0 ) === '?' ){
      search = search.slice( 1 );
    }
    search = querystring.parse(search);


    dispatch(fetchBooks(search.page, search.search));
  }

  render() {
    const { isFetching, books, page } = this.props;

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

            <h3><Link to={`/books/${item.id}`}>{item.title}</Link></h3>

            <p>Eftir {item.author}</p>
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

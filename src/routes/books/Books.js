import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../actions/getBooks';
import PageFlipper from '../../components/page-flipper';
import querystring from 'querystring';
import createHistory from 'history/createBrowserHistory';

class Books extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
    page: 1,
    search: null,
  }

  onLeftClick = (e) => {
    e.preventDefault();    
    const { page } = this.state;
    this.setState({ page: page - 1 });
    const { dispatch } = this.props;
    const history = createHistory();
    history.push(`?page=${page-1}`)
    dispatch(fetchBooks(page - 1));
  }

  onRightClick = (e) => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const { dispatch } = this.props;
    const history = createHistory();
    history.push(`?page=${page+1}`)
    dispatch(fetchBooks(page + 1));
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;
    let search  = this.props.location.search;
    const { limit } = this.props.location;
    if (search.charAt(0) === '?') {
      search = search.slice(1);
    }
    search = querystring.parse(search);

    dispatch(fetchBooks(search.page, search.search));
  }

  render() {
    const { isFetching, books } = this.props;
    let page;

    const history = createHistory();
    let { search } = history.location;
    if (search) {
      search = search.slice(6);
      page = Number(search);
    } else {
      page = this.state.page;
    }

    if (isFetching || !books) {
      return (
        <div>
          Sæki bækur...
        </div>
      );
    }
    const { result: { items } } = books;
    if(!items){
      return(
        <div>
          <h2>Bækur finnast ekki, vinsamlegast reyndu aftur</h2>
        </div>
      )
    }

    return (
      <div>
        {search
          ? <h2>Bækur</h2>
          : <h2>Bókaleit: {search}</h2>}
        {items.map((item) => (
          <div key={item.id}>

            <h3><Link to={`/books/${item.id}`}>{item.title}</Link></h3>

            <p>Eftir {item.author}</p>
          </div>
        ))}
        <div>
          <PageFlipper
            page={page}
            onLeftClick={this.onLeftClick}
            onRightClick={this.onRightClick}
          />
        </div>
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

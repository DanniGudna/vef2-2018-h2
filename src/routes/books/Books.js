import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchBooks } from '../../actions/getBooks';
import PageFlipper from '../../components/page-flipper';
import querystring from 'querystring';
import createHistory from 'history/createBrowserHistory';
import Helmet from 'react-helmet';

class Books extends Component {
  state = {
    isFetching: false,
    books: null,
    message: null,
    page: 1,
    search: null,
  }

  static propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    books: PropTypes.object,
    message: PropTypes.object,
  }

  onLeftClick = (e) => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page - 1 });
    const { dispatch } = this.props;
    const history = createHistory();
    history.push(`?page=${page-1}`)
    dispatch(fetchBooks(page - 1, this.state.search));
  }

  onRightClick = (e) => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const { dispatch } = this.props;
    const history = createHistory();
    history.push(`?page=${page+1}`)
    dispatch(fetchBooks(page + 1, this.state.search));
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    let search  = this.props.location.search;
    if (search.charAt(0) === '?') {
      search = search.slice(1);
    }
    search = querystring.parse(search);
    this.setState({
      search: search.search
    });

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


    if(isNaN(page)){
      page = 1;
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
      <Helmet title={`Bókasafn bls: ${page}`} />
        {this.state.search
          ? <h2>Bókaleit: {this.state.search}</h2>
          : <h2>Bækur</h2>}
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
            size={items.length}
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

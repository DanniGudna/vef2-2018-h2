import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Field from '../field';
import Button from '../button';
import SearchBar from '../searchBar';
import { fetchBooksFromSearch } from '../../actions/getBooks';

import createHistory from 'history/createBrowserHistory'

import './Header.css';

import querystring from 'querystring';

class Header extends Component {
  state = {
    user: null,
    search: '',
  }

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  onClick = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    if (name) {
      this.setState({
        [name]: value
      });
    }
  }

  onSubmit = async (e) => {
    //e.preventDefault();
    let value = this.state.searchValue;
    value = 'search=' + value;
    value = querystring.parse(value);
    const { dispatch } = this.props;

    const history = createHistory()


    dispatch(fetchBooksFromSearch( value.search, history));
  }

  logout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {

    const { user } = this.props;
    const { searchValue } = this.state;

    let imageUrl = "/profile.jpg";

    if (user) {
      const { image } = user;
      if (image) {
        imageUrl = image;
      }
    }

    const history = createHistory()

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        <SearchBar
          onChange={this.onClick}
          onSubmit={this.onSubmit}
          searchValue={searchValue}
          origPath={history.location.pathname}
        />
        <div className="user-info">
          {user
            ? <div className="header__user">
                <img alt="" src={imageUrl} className="photo" />
                <div>
                  <h4 className="header__username">
                    <Link to="/profile">
                      {user.name}
                    </Link>
                  </h4>
                  <Button onClick={this.logout}>
                    Útskráning
                  </Button>
                </div>
              </div>
            : <Link to="/login">
                Innskráning
              </Link>
          }
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Header);

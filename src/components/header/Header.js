import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    searchValue: '',
  }


  onClick = (e) => {
    const target = e.target;
     const value = target.value;
     const name = target.name;
     if(name){
       this.setState({
       [name]: value
        });
      }
  }

  onSubmit = async (e) => {
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
    const {
        searchValue,
       } = this.state;


    const authRoute = user ? "/" : "/login";

    const authRouteMsg = user ? "Útskráning" : "Innskráning";
    let imageUrl = "/profile.jpg";

    if (user) {
      const { image } = user;
      if (image) {
        imageUrl = image;
      }
    }

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <SearchBar
          onChange={this.onClick}
          onSubmit={this.onSubmit}
          searchValue={searchValue}
          />

        {user &&
        <div>
          <img alt="" src={imageUrl} className="photo" />
          <h4>
            <Link to="/profile">
              {user.name}
            </Link>
          </h4>
        </div>
        }
        <Link onClick={this.logout} to={authRoute}>
          {authRouteMsg}
        </Link>
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

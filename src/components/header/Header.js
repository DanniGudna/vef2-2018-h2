import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Field from '../field';
import Button from '../button';
import SearchBar from '../searchBar';
import { fetchBooksFromSearch } from '../../actions/getBooks';

import './Header.css';

const querystring = require('querystring');

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
    console.log('VALUE', value)
    const { dispatch } = this.props;


    dispatch(fetchBooksFromSearch( value.search));


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

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <SearchBar
          onChange={this.onClick}
          onSubmit={this.onSubmit}
          searchValue={searchValue}
          />
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

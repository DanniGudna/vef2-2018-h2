import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Button from '../button';

import './Header.css';

class Header extends Component {
  state = {
    user: null,
  }

  onClick = (e) => {
    console.log('leita');
  }

  logout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {

    const { user } = this.props;

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

        <Button onClick={this.onClick}>Leita</Button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Books from './routes/books';
import Register from './routes/register';

import { authenticateUser } from './actions/auth';

import './App.css';

class App extends Component {
  state = {
    isAuthenticated: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const user = JSON.parse(String(window.localStorage.getItem('user')));
    dispatch(authenticateUser(user));
  }

  render() {
    const { isAuthenticated } = this.props.auth; /* vita hvort notandi sé innskráður */

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/books" exact component={Books} />
            <Route path="/register" exact component={Register} />
            <UserRoute path="/profile" isAuthenticated={isAuthenticated} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default withRouter(connect(mapStateToProps)(App));

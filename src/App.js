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
import Book from './routes/book';
import Register from './routes/register';
import NewBook from './routes/newBook';
import EditBook from './routes/editBook';
import Users from './routes/users';
import User from './routes/user';

import { authenticateUser } from './actions/auth';

import './App.css';

class App extends Component {

  componentDidMount() {

    const { dispatch } = this.props;
    const user = JSON.parse(String(window.localStorage.getItem('user')));
    dispatch(authenticateUser(user));
  }

  render() {
    const { isAuthenticated, isFetching } = this.props;

    if (isFetching) {
      return (
        <main className="main">
          <Header />
          <h1>Augnablik...</h1>
        </main>
      )
    }

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/books" exact component={Books} />
            <UserRoute path="/books/new" isAuthenticated={isAuthenticated} exact component={NewBook} />
            <UserRoute path="/books/:id" isAuthenticated={isAuthenticated} exact component={Book} />
            <UserRoute path="/books/:id/edit" isAuthenticated={isAuthenticated} exact component={EditBook} />
            <Route path="/register" exact component={Register} />
            <UserRoute path="/users" isAuthenticated={isAuthenticated} exact component={Users} />
            <UserRoute path="/users/:id" isAuthenticated={isAuthenticated} exact component={User} />
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
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    error: state.auth.error,
  };
}

export default withRouter(connect(mapStateToProps)(App));

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

import './App.css';

class App extends Component {

  render() {
    const authenticated = false; /* vita hvort notandi sé innskráður */

    // console.info(this.props.match);

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/books" exact component={Books} />
            <UserRoute path="/profile" authenticated={authenticated} component={Profile} />
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
  };
}

export default withRouter(connect(mapStateToProps)(App));

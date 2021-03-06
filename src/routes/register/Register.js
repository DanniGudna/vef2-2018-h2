import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Field from '../../components/field';
import Button from '../../components/button';

import { signupUser } from '../../actions/signup';

import './Register.css';

class Register extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    isFetching: false,
    user: null,
    errors: null,
  }

  static propTypes = {
    isFetching: PropTypes.bool,
    user: PropTypes.object,
    success: PropTypes.bool,
    errors: PropTypes.array,
    dispatch: PropTypes.func,
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, name } = this.state;

    dispatch(signupUser(username, password, name));
  }


  render() {
    const { username, password, name } = this.state;
    const { isFetching, user, errors, success } = this.props;



    if (user) {
      return (
        <Redirect to={{pathname: '/'}} />
      )
    }

    if (success) {
      return (
        <Redirect to={{pathname: '/login'}} />
      )
    }

    return (
      <div className="login__container">
        <Helmet title={`Nýskráning`} />
        <h1 className="login__header">Nýskráning</h1>
        {errors &&(
          <ul>
            {errors.map((error, i) =>
              <li key={i}>{error.message}</li>
            )}
          </ul>
        )}
        <form className="form__default" onSubmit={this.handleSubmit}>
          <Field
            name="username"
            value={username}
            type="text"
            label="Notendanafn"
            onChange={this.handleInputChange}
          />
          <Field
            name="password"
            value={password}
            type="password"
            label="Lykilorð"
            onChange={this.handleInputChange}
          />
          <Field
            name="name"
            value={name}
            type="text"
            label="Nafn"
            onChange={this.handleInputChange}
          />
          <div className="button__container">
            <Button disabled={isFetching}>Nýskrá</Button>
          </div>
        </form>
        <div>
          <Link to="/login">Innskráning</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.signup.isFetching,
    user: state.auth.user,
    success: state.signup.success,
    errors: state.signup.errors,
  }
}

export default connect(mapStateToProps)(Register);

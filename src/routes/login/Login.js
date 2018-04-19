import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Field from '../../components/field';
import Button from '../../components/button';

import { loginUser } from '../../actions/auth';

import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    isFetching: false,
    errors: null,
    user: null,
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
    const { username, password } = this.state;

    dispatch(loginUser(username, password));
  }

  render() {
    const { username, password } = this.state;
    const { isFetching, error, user } = this.props;

    if(user) {
      this.props.history.push('/');
    }

    return (
      <div className="login__container">
        <h1 className="login__header">Innskráning</h1>
        <div>{error}</div>
        <form className="form__default" onSubmit={this.handleSubmit}>
          <Field
            name="username"
            value={username}
            type="text"
            label="Notendanafn:"
            onChange={this.handleInputChange}
          />
          <Field
            name="password"
            value={password}
            type="password"
            label="Lykilorð:"
            onChange={this.handleInputChange}
          />
          <div className="button__container">
            <Button><strong>Innskrá</strong></Button>
          </div>
        </form>
        <div>
          <Link to="/register">Nýskráning</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    error: state.auth.error,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Login);

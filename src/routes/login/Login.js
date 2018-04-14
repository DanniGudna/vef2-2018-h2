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
      <div>
        <h1>Innskráning</h1>
        <div>{error}</div>
        <form onSubmit={this.handleSubmit}>
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
          <Button>Innskrá</Button>
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
    ...state,
    isFetching: state.auth.isFetching,
    error: state.auth.error,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Login);

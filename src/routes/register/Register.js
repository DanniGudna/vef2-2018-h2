import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const { isFetching, user, errors } = this.props.signup;

    if (user) {
      this.props.history.push('/login');
    }

    return (
      <div>
        <h1>Nýskráning</h1>
        {errors &&(
          <ul>
            {errors.map((error, i) =>
              <li key={i}>{error.message}</li>
            )}
          </ul>
        )}
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
          <Field
            name="name"
            value={name}
            type="text"
            label="Nafn"
            onChange={this.handleInputChange}
          />
          <Button disabled={isFetching}>Nýskrá</Button>
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
    ...state,
    isFetching: state.signup.isFetching,
    user: state.signup.user,
    errors: state.signup.errors,
  }
}

export default connect(mapStateToProps)(Register);

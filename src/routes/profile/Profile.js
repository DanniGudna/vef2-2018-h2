import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../components/button';
import Field from '../../components/field';
import { updateUser, updatePhoto } from '../../actions/auth';

import './Profile.css';
import ReadingList from '../../components/reading-list/ReadingList';

class Profile extends Component {
  state = {
    name: '',
    password: '',
    passwordAgain: '',
    errors: null,
    img: null,
    page: 1,
  }

  static propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    errors: PropTypes.array,
    error: PropTypes.string,
    user: PropTypes.object,
    message: PropTypes.string,
    readings: PropTypes.array,
  }

  handleFileChange = (e) => {
    const { files } = e.target;
    this.setState({
      img: files[0],
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleFileSubmit = (e) => {
    e.preventDefault();
    const { img } = this.state;
    const { dispatch } = this.props;

    dispatch(updatePhoto(img));
  }

  handleNameSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { name } = this.state;

    dispatch(updateUser("name", name));
  }

  handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { password } = this.state;

    dispatch(updateUser("password", null, password));
  }

  render() {
    const { img, name, password, passwordAgain, page } = this.state;
    const {
      isFetching,
      message,
      errors,
      error,
      user: { id },
    } = this.props;

    if (isFetching) {
      return (
        <h2>
          Augnablik...
        </h2>
      )
    }

    return (
      <div>
        <h1>Upplýsingar</h1>
        <p>{error}</p>
        <form className="profile__imageform" onSubmit={this.handleFileSubmit}>
          <div className="profile__imageform_container" >
            <input
              type="file"
              onChange={this.handleFileChange}
            />
            <Button disabled={!img}>Uppfæra mynd</Button>
          </div>
        </form>
        {message &&
        <p>{message}</p>}
        {errors &&
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error.message}</li>
          ))}
        </ul>
        }
        <form className="form__default" onSubmit={this.handleNameSubmit}>
          <Field
            name="name"
            label="Nafn"
            value={name}
            type="text"
            onChange={this.handleInputChange}
          />
          <div className="button__container">
            <Button>Uppfæra nafn</Button>
          </div>
        </form>
        {password !== passwordAgain &&
        <div>Lykilorð verða að vera eins</div>
        }
        <form className="form__default" onSubmit={this.handlePasswordSubmit}>
          <Field
            name="password"
            label="Lykilorð"
            value={password}
            type="password"
            onChange={this.handleInputChange}
          />
          <Field
            name="passwordAgain"
            label="Lykilorð aftur"
            value={passwordAgain}
            type="password"
            onChange={this.handleInputChange}
          />
          <div className="button__container">          
            <Button disabled={password !== passwordAgain}>Uppfæra lykilorð</Button>
          </div>
        </form>
        <ReadingList
            userId={id}
            me={true}
            className="danger"
            page={page}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    errors: state.auth.errors,
    user: state.auth.user,
    message: state.auth.message,
    error: state.auth.error,
  }
}

export default connect(mapStateToProps)(Profile);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/button';
import Field from '../../components/field';
import { Link } from 'react-router-dom';
import { updateUser, updatePhoto } from '../../actions/auth';
import { fetchMyReadings, deleteReading } from '../../actions/readings';

class Profile extends Component {
  state = {
    name: '',
    password: '',
    passwordAgain: '',
    errors: null,
    img: null,
  }

  async componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMyReadings());
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

    dispatch(updateUser(name));
  }

  handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { password } = this.state;

    dispatch(updateUser(null, password));
  }

  handleDelete = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const readingId = e.target.children[1].id;

    dispatch(deleteReading(readingId));
    dispatch(fetchMyReadings());
  }

  render() {
    const { img, name, password, passwordAgain } = this.state;
    const { isFetching, errors, readings } = this.props;

    if (isFetching) {
      return (
        <div>
          Augnablik...
        </div>
      )
    }

    return (
      <div>
        <h1>Upplýsingar</h1>
        <form onSubmit={this.handleFileSubmit}>
          <div>
            <input
              type="file"
              onChange={this.handleFileChange}
            />
            <Button>Uppfæra mynd</Button>
          </div>
        </form>
        {errors &&
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error.message}</li>
          ))}
        </ul>
        }
        <form onSubmit={this.handleNameSubmit}>
          <Field
            name="name"
            label="Nafn"
            value={name}
            type="text"
            onChange={this.handleInputChange}
          />
          <Button>Uppfæra nafn</Button>
        </form>
        {password !== passwordAgain &&
        <div>Lykilorð verða að vera eins</div>
        }
        <form onSubmit={this.handlePasswordSubmit}>
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
          <Button disabled={password !== passwordAgain}>Uppfæra lykilorð</Button>
        </form>
        <h1>Lesnar bækur</h1>
        {readings
          ? readings.length > 0
            ? <ul>
                {readings.map((book, i) => (
                  <li key={i}>
                    <form onSubmit={this.handleDelete}>
                      <Link to={`/books/${book.id}`}>
                        <h3>{book.title}</h3>
                      </Link>
                      <h3 id={book.id}>Einkunn: {book.rating}. {book.review}</h3>
                      <Button>Eyða</Button>
                    </form>
                  </li>
                ))}
              </ul>
            : <div>
                Engar bækur lesnar
              </div>
          : <div>
              Næ í bækur...
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    errors: state.auth.errors,
    readings: state.readings.readings,
  }
}

export default connect(mapStateToProps)(Profile);

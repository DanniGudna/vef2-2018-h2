import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user';

import ReadingList from '../../components/reading-list';

import './User.css';

class User extends Component {
  state = {
    user: null,
    isFetching: true,
    error: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchUser(id));
  }

  render() {

    const { user, isFetching, error } = this.props;
    let imageUrl = "/profile.jpg";
    if (user) {
      const { image } = user;
      if (image) {
        imageUrl = image;
      }
    }

    if (isFetching) {
      return (
        <h1>
          Sæki gögn...
        </h1>
      )
    }

    if (error) {
      return (
        <h1>
          {error}
        </h1>
      )
    }

    return (
      <div>
        <img className="photo" src={imageUrl} />
        <h1>{user.name}</h1>
        <ReadingList userId={user.id} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isFetching: state.user.isFetching,
    error: state.user.error,
  }
}

export default connect(mapStateToProps)(User);

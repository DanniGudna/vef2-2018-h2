import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';

import PageFlipper from '../../components/page-flipper';

class Users extends Component {
  state = {
    page: 1,
    users: null,
    error: null,
    isFetching: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;
    this.setState({ page });

    dispatch(fetchUsers(page));
  }

  render() {
    const { users, errors, isFetching } = this.props;
    const { page } = this.state;
    
    if (isFetching) {
      return (
        <h1>Sæki gögn</h1>
      );
    }

    return (
      <div>
        <h1>Notendur</h1>
        {users.map((user, i) => (
            <div key={i}>
              <h3>
                <Link user={user} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </h3>
            </div>
          ))}
        <div>
          <PageFlipper page={page} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    users: state.users.users,
    error: state.users.error,
  }
}

export default connect(mapStateToProps)(Users);

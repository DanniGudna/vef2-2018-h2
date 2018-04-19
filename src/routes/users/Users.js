import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';

import PageFlipper from '../../components/page-flipper';

class Users extends Component {
  state = {
    page: 0,
    users: null,
    error: null,
    isFetching: false,
  };

  onLeftClick = (e) => {
    e.preventDefault();    
    const { page } = this.state;
    this.setState({ page: page - 1 });
    const { dispatch } = this.props;
    dispatch(fetchUsers(page - 1));
  }

  onRightClick = (e) => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const { dispatch } = this.props;
    dispatch(fetchUsers(page + 1));
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    let { page } = this.props.match.params;
    
    if (!page) {
      page = 0;
    }

    this.setState({ page });
    dispatch(fetchUsers(page));
  }

  render() {
    const { users, errors, isFetching } = this.props;
    const { page } = this.state || this.props.match.params;
    

    if (isFetching) {
      return (
        <h1>Sæki gögn</h1>
      );
    }

    return (
      <div>
        <h1 className="global__bottom-margin">Notendur</h1>
        {users.map((user, i) => (
            <div key={i}>
              <h3 className="global__bottom-margin">
                <Link user={user} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </h3>
            </div>
          ))}
        <div>
          <PageFlipper
            page={page}
            onLeftClick={this.onLeftClick}
            onRightClick={this.onRightClick}
            size={users.length}
          />
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

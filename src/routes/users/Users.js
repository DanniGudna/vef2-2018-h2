import React, { Component } from 'react';
import { connect } from 'react-redux';

class Users extends Component {
  state = {};

  render() {

    return (
      <div>
        Notendur
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(Users);

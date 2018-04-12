import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    user: null,
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h2>Velkomin á bókasafnið&nbsp;{user && user.name}</h2>
        <p>
          Til að njóta bókasafnsins til fullnustu mælum við með að&nbsp;
          <Link to="/login">
            skrá sig inn
          </Link>.
          Þangað til getur þú skoðað&nbsp;
          <Link to="/books">
            allar bækurnar
          </Link>.
        </p>
        <Link to="profile">profile</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home);

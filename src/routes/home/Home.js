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
        {user
          ? <p>
              Þú er skráður notandi og getur því&nbsp;
              <Link to="/books/new">skráð bækur</Link>
              &nbsp;og breytt&nbsp;
              <Link to="/books/edit">þeim sem til eru</Link>.
            </p>
          : <p>
              Til að njóta bókasafnsins til fullnustu mælum við með að&nbsp;
              <Link to="/login">
              skrá sig inn
              </Link>.
              Þangað til getur þú skoðað&nbsp;
              <Link to="/books">
              allar bækurnar
              </Link>.
            </p>
        }
        {user &&
        <p>
          Einnig getur þú skoðað&nbsp;
          <Link to="/users">
            aðra notendur
          </Link>.
        </p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home);

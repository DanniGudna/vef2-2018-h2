import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

    return (
      <div>
        <h2>Velkomin á bókasafnið</h2>
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
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;

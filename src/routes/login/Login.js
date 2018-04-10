import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Field from '../../components/field';
import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  render() {
    return (
      <div>
        <h1>Innskráning</h1>
        <form>
          <Field label="Notendanafn" />
          <Field label="Lykilorð"/>
        </form>
        <div>
          <Button>Innskrá</Button>
        </div>
        <div>
          <Link to="/register">Nýskráning</Link>
        </div>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Field from '../../components/field';
import Button from '../../components/button';

import './Register.css';

class Register extends Component {

  render() {
    return (
      <div>
        <h1>Nýskráning</h1>
        <form>
          <Field label="Notendanafn" />
          <Field label="Lykilorð" />
          <Field label="Nafn" />
        </form>
        <div>
          <Button>Nýskrá</Button>
        </div>
        <div>
          <Link to="/login">Innskráning</Link>        
        </div>
      </div>
    );
  }
}

export default Register;

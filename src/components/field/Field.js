import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Field.css';

class Field extends Component {
  
  
  render() {
    const { label } = this.props;
    
    return (
      <div>
        <label>{label}</label>
        <input></input>
      </div>
    );
  }
}

export default Field;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Field.css';

class Field extends Component {
  
  
  render() {
    const { label, name, value, type, onChange } = this.props;
    
    return (
      <div>
        <label>{label}</label>
        <input
          name={name}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Field;

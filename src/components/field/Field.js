import React, { Component } from 'react';

import './Field.css';

class Field extends Component {
  
  
  render() {
    const { label, name, value, type, onChange, inputClass, placeHolder } = this.props;
    
    return (
      <div>
        <label>{label}</label>
        <input
          className={inputClass}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeHolder}
        />
      </div>
    );
  }
}

export default Field;

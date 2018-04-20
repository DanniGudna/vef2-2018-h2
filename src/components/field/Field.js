import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Field.css';

class Field extends Component {

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    inputClass: PropTypes.string,
  }
  
  render() {
    const {
      label,
      name,
      value,
      type,
      onChange,
      placeHolder
    } = this.props;
    let { inputClass } = this.props;

    if (!inputClass) {
      inputClass = "field__input";
    }

    return (
      <div className="field__container">
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

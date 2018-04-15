import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from '../field';
import Button from '../button';

import './SearchBar.css';

class SearchBar extends Component {




  onClick = (e) => {
       const value = e.target.value;

     }

  render() {
    const { endpoint } = this.props;

    const {
        onChange,
        onSubmit,
        searchValue,

   } = this.props;

    return (
      <div className="searchbar">
        <Field
          name="searchValue"
          value={searchValue}
          type="text"
          label=""
          onChange={onChange}
          placeHolder="Bókaleit"
          inputClass="searchinput"
        />
        <Button onClick={onSubmit} to={searchValue}>Leita</Button>
      </div>
    );
  }
}

export default SearchBar;

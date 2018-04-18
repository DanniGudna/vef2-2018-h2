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
    const {
        onChange,
        onSubmit,
        searchValue,
        endpoint
   } = this.props;
console.log('SEARCHVALUE', searchValue)
    return (
      <form onSubmit={onSubmit}>
        <Field
          name="searchValue"
          value={searchValue}
          type="text"
          label=""
          onChange={onChange}
          placeHolder="Bókaleit"
          inputClass="searchinput"
        />
        <Button>Leita</Button>
      </form>
    );
  }
}

export default SearchBar;

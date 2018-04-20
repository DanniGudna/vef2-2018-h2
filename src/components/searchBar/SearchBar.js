import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from '../field';
import Button from '../button';

import './SearchBar.css';

class SearchBar extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    searchValue: PropTypes.string,
  }

  render() {
    const {
      onChange,
      onSubmit,
      searchValue,
    } = this.props;
    return (
      <form className="searchbar" onSubmit={onSubmit}>
        <Field
          name="search"
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

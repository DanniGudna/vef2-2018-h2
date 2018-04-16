import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from '../field';
import Button from '../button';

//import './Field.css';

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
      <form>
        <Field
          name="searchValue"
          value={searchValue}
          type="text"
          label=""
          onChange={onChange}
        />

        <Button onClick={onSubmit} to={searchValue}>Leita</Button>
      </form>
    );
  }
}

export default SearchBar;

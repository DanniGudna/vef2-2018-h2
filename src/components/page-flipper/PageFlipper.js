import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../button';

import './PageFlipper.css';

import { fetchBooks } from '../../actions/getBooks';

class PageFlipper extends Component {
  
  render() {
    const { page, onLeftClick, onRightClick } = this.props;
    let { size } = this.props;

    if (!size) {
      size = Infinity;
    }

    return (
      <div className="pageFlipper">
        <div className="button__container">
          <Button disabled={page <= 0} onClick={onLeftClick}>
            &lt; Fyrri síða
          </Button>
          </div>
        <div>Síða {Number(page + 1)}</div>
        <div className="button__container">
          <Button disabled={size < 10} onClick={onRightClick}>
            Næsta síða >
          </Button>
        </div>
      </div>
    );
  }
}

export default PageFlipper;

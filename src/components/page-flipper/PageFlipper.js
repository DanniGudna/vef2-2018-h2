import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../button';

import './PageFlipper';
import { fetchBooks } from '../../actions/getBooks';

class PageFlipper extends Component {
  
  render() {
    const { page, onLeftClick, onRightClick } = this.props;
    let { size } = this.props;

    if (!size) {
      size = Infinity;
    }

    return (
      <div>
        {page > 0 &&
          <Button onClick={onLeftClick}>
            &lt; Fyrri síða
          </Button>
        }
        Síða {Number(page + 1)}
        {size >= 10 &&
        <Button onClick={onRightClick}>
          Næsta síða >
        </Button>}
      </div>
    );
  }
}

export default PageFlipper;

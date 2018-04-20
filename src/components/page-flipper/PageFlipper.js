import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import './PageFlipper.css';

class PageFlipper extends Component {

  static propTypes = {
    page: PropTypes.number,
    onLeftClick: PropTypes.func,
    onRightClick: PropTypes.func,
    size: PropTypes.number,
  }

  render() {
    const { page, onLeftClick, onRightClick } = this.props;
    let { size } = this.props;

    if (!size) {
      size = Infinity;
    }

    return (
      <div className="pageFlipper">
        <div className="button__container">
          <Button disabled={page <= 1} onClick={onLeftClick}>
            &lt; Fyrri síða
          </Button>
          </div>
        <div>Síða {Number(page)}</div>
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

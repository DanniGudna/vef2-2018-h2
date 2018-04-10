import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../button';

import './PageFlipper';
import { fetchBooks } from '../../actions/getBooks';

class PageFlipper extends Component {
  
  onLeftClick = (e) => {
    const { dispatch, page } = this.props;
    dispatch(fetchBooks(page - 1));
  }

  onRightClick = (e) => {
    const { dispatch, page } = this.props;
    dispatch(fetchBooks(page + 1));
  }
  
  render() {
    const { page } = this.props;

    return (
      <div>
        {page > 0 &&
          <Button onClick={this.onLeftClick}>
            &lt; Fyrri síða
          </Button>
        }
        Síða {page}
        <Button onClick={this.onRightClick}>
          Næsta síða >
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(PageFlipper);

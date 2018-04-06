import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../actions/getBooks';

class Books extends Component {
  state = {
    books: null,
  }  

  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchBooks());
  }

  render() {
    return (
      <div>
        cool books
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.info(state);
  return {

  };
}

export default connect(mapStateToProps)(Books);

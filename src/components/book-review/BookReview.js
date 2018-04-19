import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../button';

import { submitReview } from '../../actions/review';

import './BookReview.css';

class BookReview extends Component {
  state = {
    reviewing: false,
    reviewText: undefined,
    grade: 5,
    received: false,
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { grade, reviewText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(submitReview(id, grade, reviewText));
  }

  handleBeginReviewClick = (e) => {
    e.preventDefault();
    this.setState({ reviewing: true });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ reviewing: false });
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { reviewing, reviewText, grade } = this.state;
    const { id, received, isFetching, errors } = this.props

    if (received) {
      return (
        <div>Lestur mótekinn</div>
      )
    }

    if (isFetching) {
      return (
        <div>Skrái lestur</div>
      )
    }

    if (!reviewing) {
      return (
        <div>
          <Button onClick={this.handleBeginReviewClick}>
            Gefa einkunn
          </Button>
        </div>
      )
    }

    return (
      <div>
        {errors &&
        <ul>
          {errors.map((error, i) => 
            <li key={i}>{error.message}</li>
          )}
        </ul>}
        <form onSubmit={this.handleSubmit}>
          <h5>Um bók:</h5>
          <textarea
            onChange={this.handleInputChange}
            name="reviewText"
            value={reviewText}
            type="text"
            rows="10"
            cols="80"
          />
          <div>Einkunn</div>
          <select
            onChange={this.handleInputChange}
            name="grade"
            value={grade}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Button>Vista</Button>
          <Button onClick={this.handleCancel} className="danger">Hætta við</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.review.isFetching,
    errors: state.review.errors,
    received: state.review.received,
  }
}

export default connect(mapStateToProps)(BookReview);
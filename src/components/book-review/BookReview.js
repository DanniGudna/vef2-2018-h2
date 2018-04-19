import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../button';

import './BookReview.css';

class BookReview extends Component {
  state = {
    reviewing: true, // muna að breyta í false
    reviewText: undefined,
    grade: 5,
  }

  componentDidMount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { grade, reviewText } = this.state;
    console.info(grade, reviewText);

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
    const { id } = this.props

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

export default BookReview;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';

import './Reading.css';

class Reading extends Component {

  render() {
    const { onSubmit, book, className, me } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>
          <Link to={`/books/${book.id}`}>
            <h3>{book.title}</h3>
          </Link>
          <h3 id={book.id}>Einkunn: {book.rating}. {book.review}</h3>
          {me && <Button className={className}>Eyða</Button>}
        </form>
      </div>
    );
  }
}

export default Reading;

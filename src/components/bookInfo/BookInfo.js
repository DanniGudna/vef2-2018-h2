import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import './Field.css';

class BookInfo extends Component {

  render() {
    const {
        title,
        author,
        description,
        isbn13,
        category,
        published,
        pagecount,
        language,
        onClick,
      onClickButton } = this.props;

        return (
          <div>
            <div>
              <h3>{title}</h3>
              <p>Eftir {author}</p>
              <p>ISBN13 {isbn13}</p>
              <p>{category}</p>
              <p>{description}</p>
              <p>{pagecount} Síður</p>
              <p>Gefin út {published} </p>
              <p>Tungumál: {language}</p>
              <a onClick={onClick}>Breyta Bók</a>
            </div>
          </div>
        );
      }
}

export default BookInfo;
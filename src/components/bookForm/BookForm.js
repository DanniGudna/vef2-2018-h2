import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Field from '../field';
import Button from '../button';

// import './Field.css';

class BookForm extends Component {

  render() {
    const {
      errors,
      books,
      title,
      author,
      description,
      isbn10,
      isbn13,
      category,
      published,
      pagecount,
      language,
      submit,
      change,
      buttonLabel,
      isFetching } = this.props;

    const { result: { items } } = books;

    return (
      <div>
        <h2>
          {buttonLabel}
        </h2>

        <form onSubmit={submit}>
          <Field
            name="title"
            value={title}
            type="text"
            label="Title"
            onChange={change}
          />
          <Field
            name="author"
            value={author}
            type="text"
            label="Author"
            onChange={change}
          />
          Um bók
          <div>
            <textarea name="description" value={description} onChange={change}></textarea>
          </div>
          Flokkur:
          <select name="category" onChange={change} value={category}>
            {items.map((item) => (
              <option key={item.id} value={item.id} >{item.title}</option>
            ))}
          </select>

          <Field
            name="isbn10"
            value={isbn10}
            type="text"
            label="ISBN10"
            onChange={change}
          />
          <Field
            name="isbn13"
            value={isbn13}
            type="text"
            label="ISBN13"
            onChange={change}
          />
          <Field
            name="published"
            value={published}
            type="text"
            label="Útgefin"
            onChange={change}
          />
          <Field
            name="pagecount"
            value={pagecount}
            type="number"
            label="fjoldi sida"
            onChange={change}
          />
          <Field
            name="language"
            value={language}
            type="text"
            label="tungumal"
            onChange={change}
          />
          <Button disabled={isFetching}>{buttonLabel}</Button>
        </form>
      </div>
    );
  }
}

BookForm.propTypes = {
  errors: PropTypes.array,
  books: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  isbn10: PropTypes.string,
  isbn13: PropTypes.string,
  category: PropTypes.string,
  published: PropTypes.number,
  pagecount: PropTypes.number,
  language: PropTypes.string,
  submit: PropTypes.func,
  change: PropTypes.func,
  buttonLabel: PropTypes.string,
  isFetching: PropTypes.string,
}

export default BookForm;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from '../field';
import Button from '../button';

import './BookForm.css';

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
          <div className="bookForm__container">
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
                <textarea name="description" className="bookForm__textarea" value={description} onChange={change}></textarea>
              </div>

              <div className="bookForm__field_container">
                Flokkur:
                <select name="category" onChange={change} value={category} className="bookForm__rating">
                  {!category &&
                    <option key={''}>veldu Category</option>
                  }
                  {items.map((item) => (
                    <option key={item.id} value={item.id} >{item.title}</option>
                  ))}
                </select>
              </div>


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
                label="Fjöldi síða"
                onChange={change}
              />
              <Field
                name="language"
                value={language}
                type="text"
                label="Tungumál"
                onChange={change}
              />
              <Button disabled={isFetching}>{buttonLabel}</Button>
            </form>

BookForm.propTypes = {
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

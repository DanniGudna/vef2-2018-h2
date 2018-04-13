import React, { Component } from 'react';
import { connect } from 'react-redux';

// import './Field.css';

class BookForm extends Component {


  render() {
    const { isFetching, books,categories, message } = this.props;
    const {
        title,
        author,
        description,
        isbn10,
        isbn13,
        category,
        published,
        pagecount,
        language, } = this.state;
        const { result: { items } } = books;
        console.log('BOOKS', books)

        return (
          <div>
            <h2>
              Bæta við bók
            </h2>

            <form onSubmit={this.handleSubmit}>
              <Field
                name="title"
                value={title}
                type="text"
                label="Title"
                onChange={this.handleInputChange}
              />
              <Field
                name="author"
                value={author}
                type="text"
                label="Author"
                onChange={this.handleInputChange}
              />
              <div>
                <textarea name="description" value={description} onChange={this.handleInputChange}></textarea>
              </div>
              Flokkur:
              <select name="category" onChange={this.handleInputChange}>
                {items.map((item) => (
                  <option key={item.id} value={item.id}  >{item.title}</option>
                ))}
              </select>


              <Field
                name="isbn10"
                value={isbn10}
                type="text"
                label="ISBN10"
                onChange={this.handleInputChange}
              />
              <Field
                name="isbn13"
                value={isbn13}
                type="text"
                label="ISBN13"
                onChange={this.handleInputChange}
              />
              <Field
                name="published"
                value={published}
                type="text"
                label="Útgefin"
                onChange={this.handleInputChange}
              />
              <Field
                name="pagecount"
                value={pagecount}
                type="number"
                label="fjoldi sida"
                onChange={this.handleInputChange}
              />
              <Field
                name="language"
                value={language}
                type="text"
                label="tungumal"
                onChange={this.handleInputChange}
              />
              <Button disabled={isFetching}>bua til bok</Button>
            </form>

          </div>
        );
      }
}

export default BookForm;

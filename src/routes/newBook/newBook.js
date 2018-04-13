import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newBook, fetchCategories } from '../../actions/newBook';
import PageFlipper from '../../components/page-flipper';
import Field from '../../components/field';
import Button from '../../components/button';

class NewBook extends Component {
   state = {
    isFetching: false,
    books: true,
    message: null,
    page: 0,
    search: null,
    title: '',
    author: '',
    description: '',
    isbn10: '',
    isbn13: '',
    category: '',
    published: '',
    pagecount: '',
    language: '',
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;

     dispatch(fetchCategories());
  }

  handleInputChange = (event) => {
    const target = event.target;
     const value = target.value;
     const name = target.name;
     if(name){
     this.setState({
       [name]: value
     });
   }

}

handleSubmit = async (e) => {
  e.preventDefault();

  const { dispatch } = this.props;
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
    const book = {
        title,
        author,
        description,
        isbn10,
        isbn13,
        category,
        published,
        pagecount,
        language,
      };
      console.log('BOOK', book)


  dispatch(newBook(book));
}

  render() {
    console.log("thisprops", this.props);
    console.log("thisstate", this.state);
    const { isFetching, books } = this.props;
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

    if (isFetching || !books) {
      return (
        <div>
          Sæki categories...
        </div>
      );
    }

    const { result: { items } } = books;
    console.log('ITEMS', items)


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
          <select>
            {items.map((item) => (
              <option value={item.id} name="category" onChange={this.handleInputChange}>{item.title}</option>
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

const mapStateToProps = (state) => {
  return {
    ...state,
    isFetching: state.getBooks.isFetching,
    books: state.getBooks.books,
    message: state.getBooks.message,
    page: state.getBooks.page,
  };
}

export default connect(mapStateToProps)(NewBook);

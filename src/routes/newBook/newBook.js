import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newBook, fetchCategories } from '../../actions/newBook';
import PageFlipper from '../../components/page-flipper';
import Field from '../../components/field';
import BookForm from '../../components/bookForm';
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

  dispatch(newBook(book));


}

  render() {

    const { isFetching, books,categories, message } = this.props;
    //TODO: ath hvort thetta se annar stadar
    let errors = null;
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


        if(this.props.books){
           errors = this.props.books.result.errors;
        }

    if (isFetching || !categories) {
      return (
        <div>
          Sæki categories...
        </div>
      );
    }


      return (

        <div>
          {errors &&
        <ul>
          {errors.map((item, el) => (
            <li key={el} >{item.message}</li>
          ))}

        </ul>}
        <BookForm
          errors={errors}
          books={categories}
          title={title}
          author={author}
          description={description}
          isbn10={isbn10}
          isbn13={isbn13}
          category={category}
          published={published}
          pagecount={pagecount}
          language={language}
          submit={this.handleSubmit}
          change={this.handleInputChange}
          isFetching={isFetching}
        />
      </div>
        );
      }

  }


const mapStateToProps = (state) => {
  return {
    ...state,
    isFetching: state.newBook.isFetching,
    books: state.getBooks.books,
    message: state.newBook.message,
    page: state.newBook.page,
    categories: state.newBook.categories
  };
}

export default connect(mapStateToProps)(NewBook);

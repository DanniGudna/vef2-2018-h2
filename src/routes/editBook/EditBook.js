import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookIdCategories, patchBook } from '../../actions/editBook';
import Field from '../../components/field';
import BookForm from '../../components/bookForm';
import Button from '../../components/button';

/*/books/:id
PATCH uppfærir bók */

class EditBook extends Component {
  state = {
    isFetching: false,
    books: null,
    errors: null,
    categories: null,
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
    success: false,
  }


  async componentWillMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(fetchBookIdCategories(id));

  }

  componentWillReceiveProps(props) {
    if(props.books){
       this.setState({    title: props.books.result.title,
           author: props.books.result.author,
           description: props.books.result.description,
           isbn10: props.books.result.isbn10,
           isbn13: props.books.result.isbn13,
           category: props.books.result.category,
           published: props.books.result.published,
           pagecount: props.books.result.pagecount,
           language: props.books.result.language,});
         }
   }

  /* componentWillUpdate(nextState, prevState){
     if(this.props.books){
       if(this.props.books.result.errors){
        // TODO: gera thetta betur ef thetta virkar
        this.state.author = prevState.author;

     }
   }


 }*/

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
  const { id } = this.props.match.params;
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
  dispatch(patchBook(book, id, this.props.categories));
  console.log(this.props);
  console.log(this.state);
  if (!this.props.books.errors){
  }



}

  render() {
    const { isFetching, books, page, categories } = this.props;
    let errors = null;

    if (isFetching || !books) {
      return (
        <div>
          Sæki bók
        </div>
      );
    }


    if(this.props.books){
       errors = books.result.errors;

    }

    if (isFetching || !categories) {
      return (
        <div>
          Sæki categories...
        </div>
      );
    }

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
    isFetching: state.editBook.isFetching,
    books: state.editBook.books,
    categories: state.editBook.categories
  };
}

export default connect(mapStateToProps)(EditBook);

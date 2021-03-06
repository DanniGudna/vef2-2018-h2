import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { newBook, fetchCategories } from '../../actions/newBook';
import BookForm from '../../components/bookForm';
import Helmet from 'react-helmet';

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

  static propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    books: PropTypes.object,
    message: PropTypes.string,
    number: PropTypes.number,
    categories: PropTypes.any,
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
    language,
  } = this.state;

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

    const { isFetching, categories } = this.props;
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
      language,
    } = this.state;


    if (this.props.books) {
        errors = this.props.books.result.errors;
    }

    if (isFetching || !categories) {
      return (
        <div>
          Sæki categories...
        </div>
      );
    }


  if(this.props.books && !errors) {
    return (
      <Redirect to={{pathname: `/books/${this.props.books.result.id}`}} />
    )
  }

    return (
      <div>
        <Helmet title='Búa til bók'/>
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
          buttonLabel='Búa til bók'
          isFetching={isFetching}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: state.newBook.isFetching,
    books: state.getBooks.books,
    message: state.newBook.message,
    page: state.newBook.page,
    categories: state.newBook.categories
  };
}

export default connect(mapStateToProps)(NewBook);

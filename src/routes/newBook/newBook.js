import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newBook } from '../../actions/newBook';
import PageFlipper from '../../components/page-flipper';
import Field from '../../components/field';
import Button from '../../components/button';

class NewBook extends Component {
  //constructor(props) {
   //super(props);
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

  //this.handleInputChange = this.handleInputChange.bind(this);
//}

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.props.match.params;


    // TODO :
    // dispatch(fetchBooks());
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

  dispatch(newBook(
    title,
    author,
    description,
    isbn10,
    isbn13,
    category,
    published,
    pagecount,
    language));
}

  render() {
    console.log("ping");
    const { isFetching, books, page } = this.props;
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

    /*if (isFetching || !books) {
      return (
        <div>
          Sæki bækur...
        </div>
      );
    }
*/
    //const { result: { items } } = books;

    return (
      <div>
        <h2>
          Bæta við bók
        </h2>
        <form>
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

        <div>
          <PageFlipper page={page} />
        </div>
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

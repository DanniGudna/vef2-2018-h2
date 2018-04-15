import { combineReducers } from 'redux'
import auth from './auth'
import getBooks from './getBooks';
import signup from './signup';
import newBook from './newBook';
import users from './users';

export default combineReducers({
  auth, getBooks, signup, newBook, users,
})

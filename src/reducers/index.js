import { combineReducers } from 'redux'
import auth from './auth'
import getBooks from './getBooks';
import signup from './signup';
import newBook from './newBook';
import editBook from './editBook';
import users from './users';
import user from './user';

export default combineReducers({
  auth, getBooks, signup, newBook, users, user,
})

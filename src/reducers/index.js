import { combineReducers } from 'redux'
import auth from './auth'
import getBooks from './getBooks';

export default combineReducers({
  auth, getBooks,
})

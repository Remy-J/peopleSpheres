import { combineReducers } from 'redux';
import { categories } from './categories';
import { products } from './products';
import { global } from './global';

export default combineReducers({
  categories,
  products,
  global,
});

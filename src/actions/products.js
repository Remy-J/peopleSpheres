import isEmpty from 'lodash/isEmpty';
import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_LOADING_CREATE_PRODUCT = 'SET_LOADING_CREATE_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  productId: id,
});

export const updateProduct = (id, data) => {
  console.log('id', id)
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    data,
  }
};

export const createProduct = (data) => ({
  type: CREATE_PRODUCT,
  data,
});

export const setLoadingCreateProduct = (isLoading) => ({
  type: SET_LOADING_CREATE_PRODUCT,
  loading: isLoading,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
};

export const updateProductForm = (id, data) => (dispatch, getState, {history}) => {
  dispatch(setLoadingCreateProduct(true))
  Promise.resolve().then(() => {
        if(isEmpty(data.name) || isEmpty(data.categories)){
          throw new Error('Required fields must be filled in!');
        } else {
          setTimeout(() => {
            dispatch(updateProduct(id, data));
            dispatch(setLoadingCreateProduct(false))
            history.push('/');
          }, 2000)
        }
      }
  ).catch(error => {
    alert(error);
    dispatch(setLoadingCreateProduct(false));
  })

}

export const createProductForm = (data) => (dispatch, getState, {history}) => {
  dispatch(setLoadingCreateProduct(true))
   Promise.resolve().then(() => {
        if(isEmpty(data.name) || isEmpty(data.categories)){
          throw new Error('Required fields must be filled in!');
        } else {
          setTimeout(() => {
            dispatch(createProduct(data))
            dispatch(setLoadingCreateProduct(false))
            history.push('/');
          }, 2000)
        }
   }
  ).catch(error => {
    alert(error);
    dispatch(setLoadingCreateProduct(false));
  })
}

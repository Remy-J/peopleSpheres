import * as productsActions from '../actions/products';


export function global(state = [], action) {
    switch (action.type) {
        case productsActions.SET_LOADING_CREATE_PRODUCT:
            return {...state, loading: action.loading}
        default:
            return state;
    }
}

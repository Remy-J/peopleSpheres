import {CREATE_PRODUCT, createProductForm, UPDATE_PRODUCT, updateProductForm, SET_LOADING_CREATE_PRODUCT} from '../products';

describe('products', () => {
	let dispatch;
	const history = {};
	const deps = {history}

	describe('updateProductForm', () => {
		beforeEach(() => {
			dispatch = jest.fn();
			history.push = jest.fn();
		})

		it('update a product without errors', done => {
			const data = {name: 'iphone', categories: ['phone']};
			updateProductForm('1', data)(dispatch, undefined, deps);
			setTimeout(() => {
				expect(dispatch).toHaveBeenCalled();
				expect(dispatch.mock.calls[0][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[0][0].loading).toBeTruthy();
				expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_PRODUCT);
				expect(dispatch.mock.calls[1][0].data).toMatchObject(data);
				expect(dispatch.mock.calls[2][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[2][0].loading).toBeFalsy();
				done()
			}, 2200)
		})

		it('update a product with errors', done => {
			const data = {name: 'iphone', categories: []};
			updateProductForm('1', data)(dispatch, undefined, deps);
			setTimeout(() => {
				expect(dispatch).toHaveBeenCalled();
				expect(dispatch.mock.calls[0][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[0][0].loading).toBeTruthy();
				expect(dispatch.mock.calls[1][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[1][0].loading).toBeFalsy();
				done()
			}, 2200)
		})

		it('redirects to home page', done => {
			updateProductForm('1', {name: 'iphone', categories: ['phone']})(dispatch, undefined, deps);
			setTimeout(() => {
				expect(history.push).toHaveBeenCalled();
				expect(history.push.mock.calls[0][0]).toBe('/');
				done()
			}, 2200)
		})
	})

	describe('createProductForm', () => {
		beforeEach(() => {
			dispatch = jest.fn();
			history.push = jest.fn();
		})

		it('create a product without errors', done => {
			const data = {name: 'iphone', categories: ['phone']};
			createProductForm(data)(dispatch, undefined, deps);
			setTimeout(() => {
				expect(dispatch).toHaveBeenCalled();
				expect(dispatch.mock.calls[0][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[0][0].loading).toBeTruthy();
				expect(dispatch.mock.calls[1][0].type).toBe(CREATE_PRODUCT);
				expect(dispatch.mock.calls[1][0].data).toMatchObject(data);
				expect(dispatch.mock.calls[2][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[2][0].loading).toBeFalsy();
				done()
			}, 2200)
		})

		it('create a product with errors', done => {
			const data = {name: 'iphone', categories: []};
			createProductForm(data)(dispatch, undefined, deps);
			setTimeout(() => {
				expect(dispatch).toHaveBeenCalled();
				expect(dispatch.mock.calls[0][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[0][0].loading).toBeTruthy();
				expect(dispatch.mock.calls[1][0].type).toBe(SET_LOADING_CREATE_PRODUCT);
				expect(dispatch.mock.calls[1][0].loading).toBeFalsy();
				done()
			}, 2200)
		})

		it('redirects to home page', done => {
			createProductForm( {name: 'iphone', categories: ['phone']})(dispatch, undefined, deps);
			setTimeout(() => {
				expect(history.push).toHaveBeenCalled();
				expect(history.push.mock.calls[0][0]).toBe('/');
				done()
			}, 2200)
		})
	})
});

import {global} from '../global';
import {setLoadingCreateProduct} from '../../actions/products';

describe('global', () => {
	it('set loading product', () => {
		const result = global({}, setLoadingCreateProduct(true));
		expect(result.loading).toBeTruthy();
	});
})

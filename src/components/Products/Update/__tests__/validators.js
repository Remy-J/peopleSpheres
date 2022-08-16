import {isNameValid, isCategoriesValid, isExpirationDateValid} from '../validators'
import {categoryApi} from "../../../../gateways/CategoryApi";
describe('validators', () => {
	it('isNameValid', () => {
		expect(isNameValid('')).toBeFalsy();
		expect(isNameValid('test name')).toBeTruthy();
	})

	it('isCategoriesValid', () => {
		const categories = categoryApi.getCategories()
		expect(isCategoriesValid([])).toBeFalsy();
		expect(isCategoriesValid(categories.map(category => category.name))).toBeFalsy();
		expect(isCategoriesValid(['phone'])).toBeTruthy();
	})

	it('isExpirationDateValid', () => {
		expect(isExpirationDateValid('', '2022/08/08')).toBeTruthy();
		expect(isExpirationDateValid('2022/08/08', '')).toBeTruthy();
		expect(isExpirationDateValid('2022/08/08', '2022/08/09')).toBeFalsy();
		expect(isExpirationDateValid('2022/08/08', '2022/09/09')).toBeTruthy();
	})
});

import moment from "moment";
import {isEmpty} from "lodash";

export const isNameValid = (value) => {
	return value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
	return value.length > 0 && value.length <= 5;
}

export const isExpirationDateValid = (receiptValue, expirationValue) => {
	const minExpirationDate = receiptValue ? moment(receiptValue).add(30, 'days') : null;
	return isEmpty(receiptValue) || isEmpty(expirationValue) ? true : moment(expirationValue).isAfter(minExpirationDate.format())
};

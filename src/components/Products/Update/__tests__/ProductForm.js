import React from "react";
import { render, fireEvent, getByTestId } from '@testing-library/react';
import ProductForm from '../ProductForm';
import {categoryApi} from "../../../../gateways/CategoryApi";

describe('ProductForm', () => {
    test('change name', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const nameInput = getByTestId(container, "name");
        fireEvent.change(nameInput, {target: {value: 'test'}});
        expect(nameInput.value).toEqual('test');
    });

    test('change brand', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const brandInput = getByTestId(container, "brand");
        fireEvent.change(brandInput, {target: {value: 'new brand'}});
        expect(brandInput.value).toEqual('new brand');
    });

    test('change rating', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const ratingInput = getByTestId(container, "rating");
        fireEvent.change(ratingInput, {target: {value: 1}});
        expect(ratingInput.value).toEqual('1');
    });

    test('change categories', () => {
        const onSave = jest.fn()
        const categories = categoryApi.getCategories()
        const { container } = render(<ProductForm categories={categories} onSave={onSave} />);
        const categoriesInput = getByTestId(container, "categories");
        fireEvent.change(categoriesInput, {target: {value: 1}});
        expect(categoriesInput.value).toEqual('1');
    });

    test('change itemsInStock', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const itemsInStockInput = getByTestId(container, "itemsInStock");
        fireEvent.change(itemsInStockInput, {target: {value: 1}});
        expect(itemsInStockInput.value).toEqual('1');
    });

    test('change expirationDate', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const expirationDateInput = getByTestId(container, "expirationDate");
        fireEvent.change(expirationDateInput, {target: {value: '2022-08-16'}});
        expect(expirationDateInput.value).toEqual('2022-08-16');
    });

    test('change receiptDate', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const receiptDateInput = getByTestId(container, "receiptDate");
        fireEvent.change(receiptDateInput, {target: {value: '2022-08-16'}});
        expect(receiptDateInput.value).toEqual('2022-08-16');
    });

    test('change featured', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const featuredInput = getByTestId(container, "featured");
        fireEvent.change(featuredInput, {target: {checked: true}});
        expect(featuredInput.checked).toEqual(true);
    });

    test('onSave should be called', () => {
        const onSave = jest.fn()
        const { container } = render(<ProductForm categories={[]} onSave={onSave} />);
        const submitButton = getByTestId(container, "submitButton");
        fireEvent.click(submitButton);
        expect(onSave).toBeCalled();
    });
});

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import {getMultiSelected, repeat} from '../../../utils';
import {isCategoriesValid, isExpirationDateValid, isNameValid} from './validators';

const ProductForm = (props) => {
    const {product = {}} = props;
    const [name, setName] = useState(product.name || '');
    const [brand, setBrand] = useState(product.brand || '');
    const [rating, setRating] = useState(product.rating || 0);
    const [categories, setCategories] = useState(product.categories || []);
    const [itemsInStock, setItemsInStock] = useState(product.itemsInStock || 0);
    const [receiptDate, setReceiptDate] = useState(product.receiptDate || '');
    const [expirationDate, setExpirationDate] = useState(product.expirationDate || '');
    const [featured, setFeatured] = useState(product.featured || false);

    const onSubmit = (e) => {
        e.preventDefault();
        props.onSave({
            name,
            brand,
            rating,
            categories,
            itemsInStock,
            receiptDate,
            expirationDate,
            featured,
        });
    }

    const onChangeRating = (ratingValue) => {
        setRating(ratingValue)
        if(ratingValue > 8){
            setFeatured(true)
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                    data-testid='name'
                    invalid={!isNameValid(name)}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={name}
                    onChange={({target}) => setName(target.value)}
                />
                <FormFeedback>Name is required, the length must not be greater than 200</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='brand'>Brand</Label>
                <Input
                    type='text'
                    data-testid='brand'
                    name='brand'
                    id='brand'
                    placeholder='Brand'
                    value={brand}
                    onChange={({target}) => setBrand(target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="rating">Rating</Label>
                <Input
                    type="select"
                    data-testid='rating'
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={({target}) => onChangeRating(target.value)}
                >
                    {repeat(11).map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="categories">Categories</Label>
                <Input
                    invalid={!isCategoriesValid(categories)}
                    data-testid='categories'
                    type="select"
                    name="categories"
                    id="categories"
                    multiple
                    value={categories}
                    onChange={({target}) => setCategories(getMultiSelected(target))}
                >
                    {props.categories.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Input>
                <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="itemsInStock">Items In Stock</Label>
                <Input type="number"  data-testid='itemsInStock' name="itemsInStock" id="itemsInStock" value={itemsInStock} min={0}
                       onChange={({target}) => setItemsInStock(target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="expirationDate">Expiration date</Label>
                <Input
                    invalid={!isExpirationDateValid(receiptDate, expirationDate)}
                    type="date"
                    data-testid='expirationDate'
                    name="expirationDate"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={({target}) => setExpirationDate(target.value)}
                />
                <FormFeedback>If a product has an expiration date it must expire not less than 30 days since
                    now</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="receiptDate">Receipt date</Label>
                <Input type="date" name="receiptDate" data-testid='receiptDate' id="receiptDate" value={receiptDate}
                       onChange={({target}) => setReceiptDate(target.value)}
                />
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" data-testid='featured' checked={featured}
                           onChange={({target}) => setFeatured(target.checked)}
                    />{' '}
                    Featured
                </Label>
            </FormGroup>
            <Button data-testid='submitButton'>{!props.isLoading ? 'Submit' : 'Loading...'}</Button>
        </Form>
    );
}

ProductForm.propTypes = {
    product: PropTypes.object,
    categories: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default ProductForm;

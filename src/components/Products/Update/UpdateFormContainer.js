import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getProductById} from '../../../reducers/products';
import ProductForm from './ProductForm';
import {Link} from 'react-router-dom';
import {updateProductForm} from '../../../actions/products';

class UpdateFormContainer extends Component {
    render() {
        const {product, categories, onSave, isLoading} = this.props;

        if (!product) {
            return null;
        }

        return (
            <>
                <Link to='/'>Home</Link>
                <ProductForm
                    onSave={onSave}
                    product={product}
                    categories={categories}
                    isLoading={isLoading}
                />
            </>
        );
    }
}

UpdateFormContainer.propTypes = {
    product: PropTypes.object,
    categories: PropTypes.array,
    history: PropTypes.object,
    onSave: PropTypes.func,
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state, {productId}) => {
    return {
        product: getProductById(state, productId),
        categories: state.categories,
        isLoading: state.global.loading
    }
};

const mapDispatchToProps = (dispatch,  {productId}) => ({
    onSave: (data) => dispatch(updateProductForm(productId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFormContainer);

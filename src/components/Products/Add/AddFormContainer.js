import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProductForm from '../Update/ProductForm';
import {createProductForm} from '../../../actions/products';

class AddFormContainer extends Component {
    render() {
        const {categories, onSave, isLoading} = this.props;
        return (
            <>
                <Link to='/'>Home</Link>
                <ProductForm
                    onSave={onSave}
                    categories={categories}
                    isLoading={isLoading}
                />
            </>
        );
    }
}

AddFormContainer.propTypes = {
    categories: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        isLoading: state.global.loading
    }
};

const mapDispatchToProps = dispatch => ({
    onSave: (data) => dispatch(createProductForm(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);

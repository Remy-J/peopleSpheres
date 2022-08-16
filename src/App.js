import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NotFound from './components/NotFound/NotFound'
import UpdateFormContainer from './components/Products/Update/UpdateFormContainer';
import AddFormContainer from './components/Products/Add/AddFormContainer';
import {connect} from "react-redux";

class App extends Component {
	render() {
		const {productsId} = this.props;
		return (
			<Main>
				<Switch>
					<Route exact path="/" component={ProductsContainer}/>,
					<Route
						path="/edit/:productId"
						render={({match}) => {
							 return productsId.includes(parseInt(match.params.productId)) ? (<UpdateFormContainer productId={parseInt(match.params.productId)}/>) : (<NotFound/>);
						}}
					/>,
					<Route path="/add" component={AddFormContainer}/>,
					<Route path="*" component={NotFound}/>,
				</Switch>
			</Main>
		)
	}
}

App.propTypes = {
	productsId: PropTypes.array,
};


const mapStateToProps = (state) => {
	return {
		productsId: state.products.map(product => product.id),
	}
};

export default connect(mapStateToProps)(App);

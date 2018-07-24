import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../store';
import ProductCard from './productCard'


class ProductList extends Component {

    componentDidMount() {
        this.props.loadProducts();
    }

    render() {
        return (
            <div>
                <h1>AlL Books</h1>
                <div>
                    {this.props.products.map(product => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </div>

            </div>


        );
    }


}


const mapDispatchToProps = function (dispatch) {
    return {
        loadCampuses: () => dispatch(loadProducts())
    };
};

const mapStateToProps = state => ({
    products: state.products.products
});


const ConnectProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ConnectProductList;

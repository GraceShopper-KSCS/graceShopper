import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadProducts, getSelectCat} from '../store/products'
import ProductCard from './productCard'

class ProductList extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    let filteredCategory = []
    if (this.props.selectCategory !== '') {
      filteredCategory = this.props.products.filter(product => {
        return (
          product.category.toUpperCase() ===
          this.props.selectCategory.toUpperCase()
        )
      })
    }

    return this.props.selectCategory === '' ? (
      <div>
        <h1>All Books</h1>
        <div>
          {this.props.products.map(product => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      </div>
    ) : (
      <div>
        <h1>{this.props.selectCategory} Books</h1>
        <div>
          {filteredCategory.map(product => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    loadProducts: () => dispatch(loadProducts()),
    getSelectCat: val => dispatch(getSelectCat(val))
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  category: state.products.category,
  selectCategory: state.products.selectCategory
})

const ConnectProductList = connect(mapStateToProps, mapDispatchToProps)(
  ProductList
)
export default ConnectProductList

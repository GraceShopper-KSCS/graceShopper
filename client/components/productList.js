import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadProducts} from '../store/products'
import ProductCard from './productCard'

class ProductList extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const filteredCategory = this.props.products.filter(product => {
      return product.category === this.props.category
    })
    return this.props.category === '' ? (
      <div>
        <h1>AlL Books</h1>
        <div>
          {this.props.products.map(product => {
            return <ProductCard key={product.id} product={product} />
          })}
        </div>
      </div>
    ) : (
      <div>
        <h1>{this.props.category}</h1>
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
    loadProducts: () => dispatch(loadProducts())
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  category: state.products.category
})

const ConnectProductList = connect(mapStateToProps, mapDispatchToProps)(
  ProductList
)
export default ConnectProductList

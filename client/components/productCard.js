import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './addToCartButton'

class ProductCard extends Component {
  constructor() {
    super()
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <Link to={`/books/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <Link to={`/books/${product.id}`}>
          <img src={product.imageUrl} />
        </Link>
        <AddToCart />
      </div>
    )
  }
}

export default ProductCard

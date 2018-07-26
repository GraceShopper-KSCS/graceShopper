import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {addToCartThunk, removeFromCartThunk} from '../store/cart'
import {connect} from 'react-redux'

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
        {!this.props.location.pathname.includes('cart') ? (
          <button
            type="button"
            onClick={() => this.props.addToCartThunk(product)}
          >
            Add To Cart
          </button>
        ) : (
          <button
            type="button"
            onClick={() => this.props.removeFromCartThunk(product.id)}
          >
            Remove from cart
          </button>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    addToCartThunk: product => dispatch(addToCartThunk(product)),
    removeFromCartThunk: productId => dispatch(removeFromCartThunk(productId))
  }
}

const ConnectProductCard = withRouter(
  connect(null, mapDispatchToProps)(ProductCard)
)

export default ConnectProductCard

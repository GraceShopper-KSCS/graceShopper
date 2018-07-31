import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Quantity from './quantity'
import {addToCartThunk, removeFromCartThunk} from '../store/cart'
import {connect} from 'react-redux'

class ProductCard extends Component {
  constructor() {
    super()
  }

  render() {
    const product = this.props.product

    return (
      <div className="card">
        <div className="card-body">
          <Link to={`/books/${product.id}`}>
            <h5 className="card-title">{product.title}</h5>
          </Link>
          <Link to={`/books/${product.id}`}>
            <img className="card-img-top" src={product.imageUrl} />
          </Link>
          {!this.props.location.pathname.includes('cart') ? (
            <button
              type="button"
              onClick={async () => await this.props.addToCartThunk(product)}
              className="btn btn-outline-info"
            >
              Add To Cart
            </button>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => this.props.removeFromCartThunk(product.id)}
                className="btn btn-outline-info"
              >
                Remove Item
              </button>
              <Quantity product={product} />
            </div>
          )}
        </div>
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

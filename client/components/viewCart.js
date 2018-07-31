import React, {Component} from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchCart, emptyCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'

class ViewCart extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.fetchCart()
  }
  render() {
    if (!this.props.cart.length) {
      return (
        <div>
          <h1>Your cart is empty!</h1>
        </div>
      )
    } else {
      return (
        // <StripeProvider apiKey="pk_test_FWLSZzdWrAYHVOtT0uWNPivM">
        <div>
          <div>
            <button>Checkout</button>
            <button type="button" onClick={() => this.props.emptyCartThunk()}>
              Empty Cart
            </button>
            {this.props.cart.map(book => {
              return <ProductCard key={book.id} product={book} />
            })}
          </div>
          <div>
            <button>Checkout Cart</button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    emptyCartThunk: () => dispatch(emptyCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)

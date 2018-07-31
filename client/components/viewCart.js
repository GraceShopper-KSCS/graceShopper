import React, {Component} from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchCart, emptyCartThunk} from '../store/cart'
import {getHistoryThunk} from '../store/history'
import {Link} from 'react-router-dom'

class ViewCart extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    const cart = await this.props.fetchCart()
    console.log('======>', this.props.cart)
  }
  render() {
    const user = this.props.user
    let totalPrice = 0
    if (!this.props.cart.length) {
      return (
        <div>
          <h1>Your cart is empty!</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <button>Checkout</button>
            <button type="button" onClick={() => this.props.emptyCartThunk()}>
              Empty Cart
            </button>
            {this.props.cart.map(book => {
              console.log('USER', user)
              user && user.id
                ? (totalPrice += book.price * book.productorder.quantity)
                : (totalPrice += book.price * book.quantity)
              return <ProductCard key={book.id} product={book} />
            })}
          </div>
          <div>
            <h3>Total: {totalPrice}</h3>
            <Link to="/checkout">
              <button>Checkout Cart</button>
            </Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    emptyCartThunk: () => dispatch(emptyCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)

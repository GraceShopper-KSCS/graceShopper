import React, {Component} from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchCart, emptyCartThunk} from '../store/cart'
import {getHistoryThunk} from '../store/history'
import {Link, Redirect} from 'react-router-dom'

class ViewCart extends Component {
  constructor() {
    super()
    this.loginPropmp = this.loginPropmp.bind(this)
  }
  async componentDidMount() {
    const cart = await this.props.fetchCart()
  }

  loginPropmp = () => {
    //const login = confirm('Please log in')
    if (window.confirm('Please log in')) {
      console.log('User cliked OK')
      this.props.history.push('/login')
    } else {
      console.log('User clicked cancel')
    }
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
              totalPrice += book.totalprice
              return <ProductCard key={book.id} product={book} />
            })}
          </div>
          <div>
            {this.props.user.id ? (
              <div>
                <h3>Total: {totalPrice}</h3>
                <Link to="/checkout">
                  <button>Checkout Cart</button>
                </Link>
              </div>
            ) : (
              <div>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={() => this.loginPropmp()}>
                  Checkout Cart
                </button>
              </div>
            )}
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

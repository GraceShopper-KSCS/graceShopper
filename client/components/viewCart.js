import React, {Component} from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchCart, emptyCartThunk, fetchTotalSum} from '../store/cart'
import {getHistoryThunk} from '../store/history'
import axios from 'axios'

import {Link, Redirect} from 'react-router-dom'

class ViewCart extends Component {
  constructor() {
    super()
    this.state = {
      totalorderprice: 0
    }
    this.loginPropmp = this.loginPropmp.bind(this)
  }
  async componentDidMount() {
    const cart = await this.props.fetchCart()
    if (this.props.cart[0].productorder) {
      this.props.fetchTotalSum()
    }
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
    console.log('total', this.state.totalorderprice)
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
            <button className="btn btn-outline-info">Checkout</button>
            <button
              type="button"
              onClick={() => this.props.emptyCartThunk()}
              className="btn btn-outline-info"
            >
              Empty Cart
            </button>

            <div className="card-deck">
              {this.props.cart.map(book => {
                if (!this.props.cart[0].productorder) {
                  totalPrice += book.totalprice
                }
                return <ProductCard key={book.id} product={book} />
              })}
            </div>
            {this.props.cart[0].productorder ? (
              <h3 className="total">Total: ${this.props.totalPrice / 100}</h3>
            ) : (
              <h3 className="total">Total: ${totalPrice.toFixed(2)}</h3>
            )}

            <div>
              {this.props.user.id ? (
                <div>
                  <Link to="/checkout">
                    <button className="btn btn-outline-info">
                      Checkout Cart
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => this.loginPropmp()}
                    className="btn btn-outline-info"
                  >
                    Checkout Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    totalPrice: state.cart.totalPrice,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    emptyCartThunk: () => dispatch(emptyCartThunk()),
    fetchTotalSum: () => dispatch(fetchTotalSum())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)

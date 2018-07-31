import React, { Component } from 'react'
import ProductCard from './productCard'
import { connect } from 'react-redux'
import { fetchCart, emptyCartThunk, fetchTotalSum } from '../store/cart'
import { getHistoryThunk } from '../store/history'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ViewCart extends Component {
  constructor() {
    super()
    this.state = {
      totalorderprice: 0
    }
  }
  async componentDidMount() {
    const cart = await this.props.fetchCart()
    if (this.props.cart[0].productorder) {
      this.props.fetchTotalSum()
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
            <button>Checkout</button>
            <button type="button" onClick={() => this.props.emptyCartThunk()}>
              Empty Cart
            </button>
            {this.props.cart.map(book => {
              if (!this.props.cart[0].productorder) {

                totalPrice += book.totalprice
              }
              return <ProductCard key={book.id} product={book} />
            })}
            {(this.props.cart[0].productorder)
              ? <h3>Total: ${this.props.totalPrice / 100}</h3>
              : <h3>Total: ${totalPrice.toFixed(2)}</h3>
            }


            <Link to="/checkout">
              <button>Checkout Cart</button>
            </Link>
          </div>
        </div >
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
    totalPrice: state.cart.totalPrice
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

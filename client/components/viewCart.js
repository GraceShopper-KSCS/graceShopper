import React, { Component } from 'react'
import ProductCard from './productCard'
import { connect } from 'react-redux'
import { fetchCart, emptyCartThunk } from '../store/cart'
import { getHistoryThunk } from '../store/history'
import { Link } from 'react-router-dom'


class ViewCart extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    const cart = await this.props.fetchCart()
    console.log('======>', this.props.cart)
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
        <div>
          <button type="button" onClick={() => this.props.emptyCartThunk()}>
            Empty Cart
          </button>
          {this.props.cart.map(book => {
            return <ProductCard key={book.id} product={book} />
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    emptyCartThunk: () => dispatch(emptyCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)

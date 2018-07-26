import React, {Component} from 'react'
import ProductCard from './productCard'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class ViewCart extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.fetchCart()
  }
  render() {
    if (this.props.cart.length) {
      return this.props.cart.map(book => {
        return <ProductCard key={book.id} product={book} />
      })
    } else return <h1>Your cart is empty!</h1>
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)

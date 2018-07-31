import React, {Component} from 'react'
import checkoutForm from './checkoutForm'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './checkoutForm'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {fetchCart, emptyCartThunk} from '../store/cart'

const payForm = injectStripe(CheckoutForm)

class CheckoutFormWrapper extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await this.props.fetchCart()
  }

  render() {
    console.log('from wrapper------->', this.props.cart)
    return (
      <div>
        <StripeProvider apiKey="pk_test_FWLSZzdWrAYHVOtT0uWNPivM">
          <div>
            <Elements>
              <CheckoutForm
                user={this.props.user}
                cartItems={this.props.cart}
              />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutFormWrapper)

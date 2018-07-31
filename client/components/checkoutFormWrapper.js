import React, {Component} from 'react'
import checkoutForm from './checkoutForm'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './checkoutForm'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'

const payForm = injectStripe(CheckoutForm)

class CheckoutFormWrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_FWLSZzdWrAYHVOtT0uWNPivM">
          <div>
            <Elements>
              <CheckoutForm user={this.props.user} />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(CheckoutFormWrapper)

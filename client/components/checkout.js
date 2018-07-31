import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {submitOrderThunk} from '../store/history'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

// import keyPublishable from '../constantsStripe'
const keyPublishable = 'pk_test_FWLSZzdWrAYHVOtT0uWNPivM'

const CURRENCY = 'EUR'

const fromEuroToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, history, submitOrder) => token =>
  axios
    .post('/charge', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .then(submitOrder())
    .then(history.push('/books'))
    .catch(errorPayment)

const Checkout = ({
  email,
  description,
  amount,
  history,
  submitOrder
} = props) => (
  <div>
    <h3>Component Below</h3>
    <StripeCheckout
      email={name}
      // description={description}
      // amount={fromEuroToCent(amount)}
      token={onToken(amount, description, history, submitOrder)}
      currency={CURRENCY}
      stripeKey={keyPublishable}
    />
  </div>
)

// const mapStateToProps = state => {
//   return {
//     totalPrice: state.cart.totalPrice
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     submitOrderThunk: () => dispatch(submitOrderThunk)
//   }
// }

// connect(mapStateToProps, mapDispatchToProps)(successPrompt)

export default withRouter(Checkout)

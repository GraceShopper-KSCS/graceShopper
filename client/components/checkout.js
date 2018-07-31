import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

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

const onToken = (amount, description) => token =>
  axios
    .post('/charge', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({email, description, amount} = props) => (
  <div>
    <StripeCheckout
      email={name}
      // description={description}
      // amount={fromEuroToCent(amount)}
      token={onToken(amount, description)}
      currency={CURRENCY}
      stripeKey={keyPublishable}
    />
  </div>
)

export default Checkout

import Checkout from './checkout'

import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import StripeCheckout from 'react-stripe-checkout'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) console.log('Purchase Complete!')
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    console.log(this.props, '<----------')
    return (
      <div className="checkout">
        <div>
          <input type="text" placeholder="First Name" name="firstName" />
          <input type="text" placeholder="Last Name" name="lastName" />
          <input type="text" placeholder="Addrss" name="address" />
          <input type="text" placeholder="Country" name="country" />
          <input type="text" placeholder="Zip Code" name="zipCode" />
        </div>

        <Checkout />
      </div>
    )
  }
}

export default CheckoutForm

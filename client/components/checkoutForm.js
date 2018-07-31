import Checkout from './checkout'

import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import StripeCheckout from 'react-stripe-checkout'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      zipCode: ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async handleChange(event) {
    await this.setState({[event.target.name]: event.target.value})
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
    const {firstName, lastName, address, country, zipCode} = this.state
    return (
      <div className="checkout">
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Addrss"
            name="address"
            value={address}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            value={zipCode}
            onChange={this.handleChange}
          />
        </div>

        <Checkout />
      </div>
    )
  }
}

export default CheckoutForm

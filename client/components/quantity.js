import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Quantity extends Component {
  constructor() {
    super()
    this.state = {
      clicks: 0
    }
    this.IncrementItem = this.IncrementItem.bind(this)
    this.DecreaseItem = this.DecreaseItem.bind(this)
  }
  componentDidMount() {
    if (this.props.product.productorder) {
      this.setState({clicks: this.props.product.productorder.quantity})
    } else {
      this.setState({clicks: this.props.product.quantity})
    }
  }

  async IncrementItem() {
    this.setState({clicks: this.state.clicks + 1})
    const res = await axios.put(
      `/api/cart/incquantity/${this.props.product.id}`
    )
    this.setState({clicks: res.data})
    this.props.fetchCart()
  }

  async DecreaseItem() {
    this.setState({clicks: this.state.clicks - 1})
    const res = await axios.put(
      `/api/cart/decquantity/${this.props.product.id}`
    )
    this.setState({clicks: res.data})
    this.props.fetchCart()
  }

  render() {
    return (
      <div>
        <button onClick={this.IncrementItem}>+</button>
        <button disabled={this.state.clicks <= 1} onClick={this.DecreaseItem}>
          -
        </button>
        <h2>{this.state.clicks}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

const ConnectQuantity = connect(mapStateToProps, mapDispatchToProps)(Quantity)

export default ConnectQuantity

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from './order'
import {getHistoryThunk} from '../store/history'

class OrderHistory extends Component {
  async componentDidMount() {
    await this.props.getHistoryThunk()
  }
  render() {
    const OrderList = this.props.history
    console.log(OrderList)
    if (!this.props.history) {
      return <h4>Your order history is empty</h4>
    }
    return (
      <div>
        <h3>Order History</h3>
        {OrderList.map(order => (
          <div key={order.id}>
            <Order order={order} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  history: state.history.history
})

const mapDispatchToProps = function(dispatch) {
  return {
    getHistoryThunk: () => dispatch(getHistoryThunk())
  }
}
const ConnectOrderHistory = connect(mapStateToProps, mapDispatchToProps)(
  OrderHistory
)

export default ConnectOrderHistory

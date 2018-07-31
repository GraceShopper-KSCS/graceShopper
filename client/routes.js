import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import ProductList from './components/productList'
import Navbar from './components/navbar'
import AddReviews from './components/addReview'
import AddProduct from './components/addProduct'
import {me} from './store'
import SingleBook from './components/singleBook'
import viewCart from './components/viewCart'
import OrderHistory from './components/orderHistory'
import CheckoutFormWrapper from './components/checkoutFormWrapper'
import CheckoutForm from './components/checkoutForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render(props) {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/books" component={ProductList} />
          <Route path="/books/:id" component={SingleBook} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={viewCart} />
          <Route path="/orders/history" component={OrderHistory} />
          <Route path="/addReviews" component={AddReviews} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              {isAdmin ? <Route path="/add" component={AddProduct} /> : null}
              <Route path="/checkout" component={CheckoutFormWrapper} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          {/* <Redirect to="/books" /> */}
          {/* <Route component={Login} /> */}
          <Redirect from="/" to="/books" />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

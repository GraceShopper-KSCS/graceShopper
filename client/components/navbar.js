import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import SelectCategory from './selectCatagory'



import { getSelectCat } from '../store/products'
import { fetchCart, mergeCartThunk } from '../store/cart'

import { getHistoryThunk } from '../store/history'




import {getHistoryThunk} from '../store/history'

const Navbar = ({
  handleClick,
  isLoggedIn,
  getSelectCat,
  fetchCart,
  mergeCartThunk
}) => (
  <div>
    <h1>Codebrary</h1>
    <nav>
      <Link
        to="/books"
        onClick={() => {
          getSelectCat('')
          setFilteredThunk()
        }}
      >
        All books
      </Link>

      <Link to="/cart" onClick={() => fetchCart()}>
        View Cart{' '}
      </Link>

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/orders/history">
            <button type="button" onClick={() => this.props.getHistoryThunk()}>
              See Order History
            </button>
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>

          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    filtered: state.products.filtered
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getSelectCat: val => dispatch(getSelectCat(val)),

    fetchCart: () => dispatch(fetchCart()),



    getHistoryThunk: () => dispatch(getHistoryThunk()),



    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

// import {
//   getSelectCat,
//   fetchCategories,
//   fetchFiltered,
//   setFilteredThunk
// } from '../store/products'

// const Navbar = ({
//   handleClick,
//   isLoggedIn,
//   getSelectCat,
//   fetchFiltered,
//   setFilteredThunk,
//   filtered
// }) => (

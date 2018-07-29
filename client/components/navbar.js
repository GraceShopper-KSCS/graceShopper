import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SelectCategory from './selectCatagory'

import {
  getSelectCat,
  fetchCategories,
  fetchFiltered,
  setFilteredThunk
} from '../store/products'

import {getCart} from '../store/products'

const Navbar = ({
  handleClick,
  isLoggedIn,
  getSelectCat,
  fetchFiltered,
  setFilteredThunk,
  filtered
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
      <Link to="/cart" onClick={() => getCart()}>
        View Cart{' '}
      </Link>

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
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
    fetchFiltered: category => dispatch(fetchFiltered(category)),
    setFilteredThunk: () => dispatch(setFilteredThunk())
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

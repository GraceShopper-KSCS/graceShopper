import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import SelectCategory from './selectCatagory'
import {getSelectCat, setFilteredThunk} from '../store/products'
import {fetchCart, mergeCartThunk} from '../store/cart'
import {getHistoryThunk} from '../store/history'

{
  /* <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul> */
}

const Navbar = ({
  handleClick,
  isLoggedIn,
  getSelectCat,
  fetchCart,
  mergeCartThunk,
  setFilteredThunk,
  getHistoryThunk
}) => (
  <div className="header">
    {/* <h1 className="heading">Codebrary</h1> */}

    <nav className="flex-container">
      <h1>Codebrary</h1>
      <ul className="nav justify-content-end">
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
            <Link to="/home" className="active">
              Home
            </Link>
            <Link to="/orders/history">See Order History</Link>
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
      </ul>
    </nav>
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

    me: () => dispatch(me()),
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

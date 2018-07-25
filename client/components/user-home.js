import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AddProduct from '../components/addProduct'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, admin} = props
  return (
    <div>
      {admin ? <Link to="/add">Add Product </Link> : null}
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    admin: state.user.admin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

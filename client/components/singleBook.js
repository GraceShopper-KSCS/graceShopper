import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


export const SingleBook = props => {
  const {title, author, description, imageUrl, price} = props

  return (
    <div>
      <h3>{title}</h3>
      <h5>By: {author}</h5>
      <h5>Price: {price}</h5>
      <div>
        <div className='bigPicture'>{imageUrl}</div>
        <p>{description}</p>
        <div>Reviews: {/*map over rviews*/}</div>
      </div>
    </div>
  )
}


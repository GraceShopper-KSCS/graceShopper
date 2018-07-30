import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const CREATE_REVIEWS = 'CREATE_REVIEWS'
const DELETE_REVIEWS = 'DELETE_REVIEWS'
/**
 * INITIAL STATE
 */
const initialState = {
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
export const getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})
export const createReview = reviews => ({
  type: CREATE_REVIEWS,
  reviews
})
export const deleteReview = reviews => ({
  type: DELETE_REVIEWS,
  reviews
})
/**
 * THUNK CREATORS
 */
export const fetchReviews = id => async dispatch => {
  console.log('Inside fetchReviews')
  try {
    const res = await axios.get(`/api/reviews/${id}`)
    console.log('res.data', res.data)
    dispatch(getReviews(res.data))
  } catch (err) {
    console.error('Fetching reviews unsuccessful', err)
  }
}

export const addReview = reviews => async dispatch => {
  try {
    const res = await axios.post('/api/reviews', reviews)
    dispatch(createReview(res.data))
  } catch (err) {
    console.error(`Creating reviews: ${reviews} unsuccessful`, err)
  }
}

export const removeReview = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/reviews/${id}`)
    dispatch(deleteReview(res.data))
  } catch (err) {
    console.error(`Removing review: ${id} unsuccessful`, err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS: {
      return {...state, reviewForProduct: action.reviews}
    }
    case CREATE_REVIEWS: {
      return {...state, review: action.reviews}
    }
    case DELETE_REVIEWS: {
      return {...state.filter(review => review.id !== action.review.id)}
    }
    default:
      return state
  }
}

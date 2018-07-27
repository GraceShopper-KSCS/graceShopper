//client/store/products

import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const WRITE_CATEGORY = 'WRITE_CATEGORY'
const GET_SELECTCAT = 'GET_SELECTCAT'
const GET_FILTERED = 'GET_FILTERED'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_CART = 'GET_CART'
const GET_REVIEWS = 'GET_REVIEWS'
const CREATE_REVIEWS = 'CREATE_REVIEWS'
const DELETE_REVIEWS = 'DELETE_REVIEWS'

/**
 * INITIAL STATE
 */

const defaultProducts = {
  products: [],
  selectedProduct: {},
  category: '',
  selectCategory: '',
  filtered: [],
  cart: [],
  review: []
}

/**
 * ACTION CREATORS
 */

export const getSelectCat = val => ({type: GET_SELECTCAT, val})
const getProducts = products => ({type: GET_PRODUCTS, products})
export const writeCategory = val => ({type: WRITE_CATEGORY, val})
export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const getFiltered = filtered => ({
  type: GET_FILTERED,
  filtered
})

export const getCart = cart => ({
  type: GET_CART,
  cart
})
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
export const loadProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/books')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const setProduct = product => async dispatch => {
  try {
    const res = await axios.post('/api/books', product)
    dispatch(addProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchProductById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchFilteredProducts = category => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${category}`)
    dispatch(getFiltered(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchReviews = id => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${id}`)
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
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}

    case GET_SINGLE_PRODUCT: {
      return {...state, selectedProduct: action.product}
    }
    case WRITE_CATEGORY:
      return {...state, category: action.val}
    case GET_SELECTCAT:
      return {...state, selectCategory: action.val}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case GET_CART:
      return {...state, cart: action.cart}
    case GET_REVIEWS: {
      return {...state, review: action.reviews}
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

// /**
//  * REDUCER
//  */
// export default function (state = defaultProducts, action) {
//   switch (action.type) {
//     case GET_PRODUCTS:
//       return { ...state, products: action.products }
//     case WRITE_CATEGORY:
//       return { ...state, category: action.val }
//     case GET_SELECTCAT:
//       return { ...state, selectCategory: action.val }
//     default:
//       return state;

//   }
// }

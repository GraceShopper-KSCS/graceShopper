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
const GET_CATEGORIES = 'GET_CATEGORIES'
const SET_FILTERED = 'SET_FILTERED'

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
  categories: []
}

/**
 * ACTION CREATORS
 */

export const getSelectCat = val => ({type: GET_SELECTCAT, val})
export const getProducts = products => ({type: GET_PRODUCTS, products})
export const writeCategory = val => ({type: WRITE_CATEGORY, val})
export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const getfiltered = filtered => ({
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
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const setFiltered = () => ({
  type: SET_FILTERED,
  filtered: []
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

export const fetchFiltered = categoryName => async dispatch => {
  try {
    const res = await axios.get(`api/books/filter/${categoryName}`)
    console.log('filtered data**233', res.data[0].products)
    dispatch(getfiltered(res.data[0].products))

    // export const fetchFilteredProducts = category => async dispatch => {
    //   try {
    //     const res = await axios.get(`/api/books/${category}`)
    //     dispatch(getFiltered(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const setFilteredThunk = () => dispatch => {
  try {
    dispatch(setFiltered())
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(getCart(res.data))
export const fetchCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/books/categories')
    dispatch(getCategories(res.data))
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
    case GET_FILTERED:
      return {...state, filtered: action.filtered}
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case SET_FILTERED:
      return {
        ...state,
        filtered: []
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

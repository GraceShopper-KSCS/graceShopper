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

/**
 * INITIAL STATE
 */

const defaultProducts = {
  products: [],
  selectedProduct: {},
  category: '',
  selectCategory: '',
  filtered: [],
  cart: []
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
      return {
        ...state,
        cart: action.cart
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

//client/store/products

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
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

export const fetchProductById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.errpr(err)
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
    default:
      return state
  }
}

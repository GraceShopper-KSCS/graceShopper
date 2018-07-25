//client/store/products

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const WRITE_CATEGORY = 'WRITE_CATEGORY'
const GET_SELECTCAT = 'GET_SELECTCAT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  selectedProduct: {},
  category: '',
  selectCategory: ''
}

/**
 * ACTION CREATORS
 */

const getProducts = products => ({type: GET_PRODUCTS, products})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const getSelectCat = val => ({type: GET_SELECTCAT, val})

export const writeCategory = val => ({type: WRITE_CATEGORY, val})

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

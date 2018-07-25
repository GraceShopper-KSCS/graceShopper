import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const WRITE_CATEGORY = 'WRITE_CATEGORY'
const GET_SELECTCAT = 'GET_SELECTCAT'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  category: '',
  selectCategory: ''
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

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case WRITE_CATEGORY:
      return {...state, category: action.val}
    case GET_SELECTCAT:
      return {...state, selectCategory: action.val}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    default:
      return state
  }
}

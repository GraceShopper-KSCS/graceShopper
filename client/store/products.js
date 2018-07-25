import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const WRITE_CATEGORY = 'WRITE_CATEGORY'
const GET_SELECTCAT = 'GET_SELECTCAT'

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
export const getSelectCat = (val) => ({ type: GET_SELECTCAT, val })
const getProducts = products => ({ type: GET_PRODUCTS, products })
export const writeCategory = val => ({ type: WRITE_CATEGORY, val })
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

/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case WRITE_CATEGORY:
      return { ...state, category: action.val }
    case GET_SELECTCAT:
      return { ...state, selectCategory: action.val }
    default:
      return state;
  }
}

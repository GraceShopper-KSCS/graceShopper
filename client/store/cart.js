import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cart: [],
  selectedProduct: {}
}

/**
 * ACTION CREATORS
 */
export const getCart = cart => ({
  type: GET_CART,
  cart
})

/**
 * THUNK CREATORS
 */

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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}

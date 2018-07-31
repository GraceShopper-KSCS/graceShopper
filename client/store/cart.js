import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'



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


export const addToCart = product => ({ type: ADD_TO_CART, product })

export const removeFromCart = updatedCart => ({
  type: REMOVE_FROM_CART,
  updatedCart
})

export const emptyCart = () => ({
  type: EMPTY_CART
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

export const addToCartThunk = product => async dispatch => {
  try {
    const res = await axios.post('/api/cart', product)
    dispatch(addToCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCartThunk = productId => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/${productId}`)
    dispatch(removeFromCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const emptyCartThunk = () => async dispatch => {
  try {
    await axios.delete('/api/cart')
    dispatch(emptyCart())
  } catch (err) {
    console.error(err)
  }
}

export const mergeCartThunk = () => async dispatch => {
  try {
    await axios.put('/api/cart')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case ADD_TO_CART: {
      const product = state.cart.find(product => product.id === action.product.id)
      if (product) {
        const newcart = state.cart.filter(item => item.id !== product.id)
        if (product.productorder) {
          product.productorder.quantity++
        }
        else {

          product.quantity++
        }
        return { ...state, cart: [...newcart, product] }

      }
      else {
        return { ...state, cart: [...state.cart, action.product] }
      }
    }
    case REMOVE_FROM_CART: {
      return { ...state, cart: action.updatedCart }
    }
    case EMPTY_CART: {
      return { ...state, cart: [] }
    }

    default:
      return state
  }
}

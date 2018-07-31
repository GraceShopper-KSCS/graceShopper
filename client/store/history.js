import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_HISTORY = 'GET_HISTORY'
const SUBMIT_ORDER = 'SUBMIT_ORDER'

/**
 * INITIAL STATE
 */
const defaultHistory = {
  history: []
}

/**
 * ACTION CREATORS
 */
export const getHistory = orders => ({type: GET_HISTORY, orders})
export const submitOrder = order => ({type: SUBMIT_ORDER, order})
/**
 * THUNK CREATORS
 */
export const getHistoryThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/history')
    dispatch(getHistory(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const submitOrderThunk = () => async dispatch => {
  try {
    const res = await axios.put('/api/orders')
    dispatch(submitOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY: {
      return {history: action.orders}
    }
    case SUBMIT_ORDER: {
      return {
        history: [...state.history, action.order]
      }
    }
    default:
      return state
  }
}

import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const defaultHistory = {
  history: []
}

/**
 * ACTION CREATORS
 */
export const getHistory = products => ({type: GET_HISTORY, products})

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

/**
 * REDUCER
 */

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY: {
      return {history: action.products}
    }
    default:
      return state
  }
}

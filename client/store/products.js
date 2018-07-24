import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'


/**
 * INITIAL STATE
 */
const defaultProducts = {
    products: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })

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
            return action.products
        default:
            return state
    }
}

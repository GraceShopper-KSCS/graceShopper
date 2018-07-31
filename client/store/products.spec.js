import {expect} from 'chai'
import {loadProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('products', () => {
    it('load all products', () => {
      const fakeProduct = [{title: 'HTML and CSS'}]
      mockAxios.onGet('/api/books').replyOnce(200, fakeProduct)
      return store.dispatch(loadProducts()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_PRODUCTS')
        expect(actions[0].products).to.be.deep.equal(fakeProduct)
      })
    })
  })
})

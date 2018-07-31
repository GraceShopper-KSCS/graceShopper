import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  loadProducts,
  getSelectCat,
  fetchFiltered,
  setFilteredThunk,
  writeCategory
} from '../store/products'
import ProductCard from './productCard'
import SelectCategory from './selectCatagory'

class ProductList extends Component {
  //bind submit function
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadProducts()
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      console.log('CATA__', this.props.category)
      const category = this.props.getSelectCat(this.props.category)
      const filtered = await this.props.fetchFiltered(category.val)
      console.log('***FILTERED***', filtered)
      await this.props.writeCategory('')
    } catch (err) {
      console.error(err)
    }
  }

  //handleChange
  //handleSubmit

  render() {
    if (this.props.products && this.props.products.length) {
      if (this.props.filtered && this.props.filtered.length) {
        return (
          <div>
            <h1> {this.props.selectCategory} Books</h1>
            <div className="container">
              <SelectCategory handleSubmit={this.handleSubmit} />
              <div className="card-deck">
                {this.props.filtered.map(product => {
                  return (
                    <ProductCard
                      product={product}
                      key={product.id}
                      handleSubmit={this.handleSubmit}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <h1 className="h1-default">All Books</h1>
            <div>
              <SelectCategory handleSubmit={this.handleSubmit} />
              <div className="card-deck">
                {this.props.products.map(product => {
                  return <ProductCard key={product.id} product={product} />
                })}
              </div>
            </div>
          </div>
        )
      }
    } else return null
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    loadProducts: () => dispatch(loadProducts()),
    getSelectCat: val => dispatch(getSelectCat(val)),
    fetchFiltered: category => dispatch(fetchFiltered(category)),
    setFilteredThunk: () => dispatch(setFilteredThunk()),
    writeCategory: val => dispatch(writeCategory(val))
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  category: state.products.category,
  selectCategory: state.products.selectCategory,
  filtered: state.products.filtered
})

const ConnectProductList = connect(mapStateToProps, mapDispatchToProps)(
  ProductList
)
export default ConnectProductList

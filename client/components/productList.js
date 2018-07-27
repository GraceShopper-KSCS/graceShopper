import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadProducts, getSelectCat, fetchFiltered} from '../store/products'
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
    evt.preventDefault()
    const category = this.props.getSelectCat(this.props.category)
    const filtered = await this.props.fetchFiltered(category.val)
    console.log(filtered)
    // this.props.history.push('
  }

  //handleChange
  //handleSubmit

  render() {
    if (this.props.products && this.props.products.length) {
      if (this.props.filtered && this.props.filtered.length) {
        return (
          <div>
            <h1> {this.props.selectCategory} Books</h1>
            <div>
              <SelectCategory handleSubmit={this.handleSubmit} />
              {this.props.filtered.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleSubmit={this.handleSubmit}
                  />
                )
              })}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <h1>All Books</h1>
            <div>
              <SelectCategory handleSubmit={this.handleSubmit} />
              {this.props.products.map(product => {
                return <ProductCard key={product.id} product={product} />
              })}
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

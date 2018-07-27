import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  writeCategory,
  getSelectCat,
  loadProducts,
  fetchFiltered,
  fetchCategories
} from '../store/products'
import {withRouter} from 'react-router-dom'
import {runInNewContext} from 'vm'

class SelectCategory extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.loadProducts()
      const cats = await this.props.fetchCategories()
      console.log(cats)
    } catch (err) {
      console.error(err)
    }
  }

  handleChange(event) {
    this.props.writeCategory(event.target.value)
  }

  render() {
    const category = this.props.category

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>Choose category</label>
          <select name="category" onChange={this.handleChange} value={category}>
            <option value="">Choose Category</option>
            {/* {this.props.categories
              ? this.props.categories.map(cat => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name.toUpperCase()}
                    </option>
                  )
                })
              : null} */}
            <option value="html">HTML</option>
            <option value="javascript">Javascript</option>
          </select>
          <button type="submit">Choose Category</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  category: state.products.category
})
const mapDispatchToProps = function(dispatch) {
  return {
    writeCategory: val => dispatch(writeCategory(val)),
    getSelectCat: val => dispatch(getSelectCat(val)),
    loadProducts: () => dispatch(loadProducts()),
    fetchFiltered: category => dispatch(fetchFiltered(category)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}
const ConnectSelectCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
)
export default ConnectSelectCategory

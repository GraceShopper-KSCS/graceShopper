import React, { Component } from 'react'
import { connect } from 'react-redux'
import { writeCategory, getSelectCat } from '../store/products'
import { withRouter } from 'react-router-dom'

class SelectCategory extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.props.writeCategory(event.target.value)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.getSelectCat(this.props.category)
    // this.props.history.push('/books')
  }
  render() {
    const category = this.props.category
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Choose category</label>
          <select name="category" onChange={this.handleChange} value={category}>
            <option value="">Choose Category</option>

            <option value="HTML">HTML</option>
            <option value="css">CSS</option>
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
const mapDispatchToProps = function (dispatch) {
  return {
    writeCategory: val => dispatch(writeCategory(val)),
    getSelectCat: (val) => dispatch(getSelectCat(val))
  }
}
const ConnectSelectCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
)
export default ConnectSelectCategory

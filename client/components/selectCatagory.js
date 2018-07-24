import React, {Component} from 'react'
import {connect} from 'react-redux'
import writeCategory from '../store/products'
import {withRouter} from 'react-router-dom'
class SelectCategory extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    console.log('inside handlechange', event.target.value)
    this.props.writeCategory(event.target.value)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.history.push('/books')
  }
  render() {
    const category = this.props.category
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <lable>Choose category</lable>
          <select name="category" onChange={this.handleChange} value={category}>
            <option value="">Choose Category</option>

            <option value="html">HTML</option>
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
const mapDispatchToProps = function(dispatch) {
  return {
    writeCategory: val => dispatch(writeCategory(val))
  }
}
const ConnectSelectCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelectCategory)
)
export default ConnectSelectCategory

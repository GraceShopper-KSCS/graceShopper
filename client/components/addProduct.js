import React, {Component} from 'react'
import ProductForm from './productForm'
import {addProduct} from '../store/products'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      description: '',
      price: 0,
      imageUrl: '',
      inventory: 0,
      category: '',
      hasSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      console.log('submitted!')
      await this.props.addProduct(this.state)
      this.setState({hasSubmitted: true})
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return this.state.hasSubmitted ? (
      <Redirect to="/books" />
    ) : (
      <ProductForm
        state={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)

//does this component need to be aware of anything from store state??

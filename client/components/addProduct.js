import React, { Component } from 'react'
import ProductForm from './productForm'
import { setProduct } from '../store/products'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      description: '',
      price: '',
      imageUrl: '',
      inventory: '',
      category: '',
      hasSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      if (this.state.imageUrl === '') {
        const state = this.state
        await this.props.setProduct({
          title: state.title,
          author: state.author,
          description: state.description,
          price: state.price,
          inventory: state.inventory,
          category: state.category
        })
      } else {
        await this.props.setProduct(this.state)
      }
      this.setState({ hasSubmitted: true })
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
    setProduct: product => dispatch(setProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)

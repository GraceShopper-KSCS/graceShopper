import React, {Component} from 'react'
import {connect} from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import {addReview} from '../store/review'
class AddReviews extends Component {
  constructor() {
    super()

    this.state = {
      rating: 1,
      title: '',
      content: '',
      productId: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue})
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
    this.setState({
      productId: this.props.selectedProduct.id
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log('Saving Customer Review')
    console.log('Product Id is ' + this.props.selectedProduct.id)

    let review = this.state
    //review.setProduct1(this.props.selectedProduct)
    await this.props.addReview(review)
    this.props.history.push(`/books/${this.props.selectedProduct.id}`)
  }

  render() {
    const {rating} = this.state
    return (
      <div className="w3-display-middle">
        <h3>AddReviews</h3>
        <h3> Product Title: {this.props.selectedProduct.title}</h3>
        <form className="w3-container w3-center" onSubmit={this.handleSubmit}>
          <label htmlFor="name" className="w3-xlarge w3-text-teal">
            Title :
          </label>
          <input
            className=""
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <br />
          <label htmlFor="name" className="w3-xlarge w3-text-teal">
            Description:
          </label>
          <input
            type="textarea"
            name="content"
            onChange={this.handleChange}
            value={this.state.content}
          />
          <br />
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
          <button
            className="w3-display-bottomcenter w3-blue w3-btn w3-small"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addReview: reviews => dispatch(addReview(reviews))
  }
}
const mapStateToProps = state => ({
  selectedProduct: state.products.selectedProduct
})

export default connect(mapStateToProps, mapDispatchToProps)(AddReviews)

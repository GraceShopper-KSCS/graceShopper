import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductById} from '../store/products'
import {addToCartThunk} from '../store/cart'

class SingleBook extends Component {
  componentDidMount() {
    this.props.fetchProductById(this.props.match.params.id)
  }

  render() {
    const {
      title,
      author,
      description,
      imageUrl,
      price
    } = this.props.selectedProduct

    return (
      <div>
        <h3>{title}</h3>
        <h5>By: {author}</h5>
        <h5>Price: {price}</h5>
        <div>
          <button
            type="button"
            onClick={() =>
              this.props.addToCartThunk(this.props.selectedProduct)
            }
          >
            Add To Cart
          </button>

          <div className="bigPicture">
            <img src={imageUrl} />
          </div>
          <p>{description}</p>
          <div>Reviews: {/*map over rviews*/}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedProduct
})

const mapDispatchToProps = function(dispatch) {
  return {
    fetchProductById: id => dispatch(fetchProductById(id)),
    addToCartThunk: product => dispatch(addToCartThunk(product))
  }
}

const ConnectedSingleBook = connect(mapStateToProps, mapDispatchToProps)(
  SingleBook
)

export default ConnectedSingleBook

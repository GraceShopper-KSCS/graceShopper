import React, {Component} from 'react'
import Rating from 'react-rating'
class Reviews extends Component {
  constructor() {
    super()
    this.makeStars = this.makeStars.bind(this)
  }
  makeStars(rating) {
    let stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<span key={i} />)
      else stars.push(<span key={i} />)
    }
    return stars
  }
  render() {
    console.log('stars', this.makeStars(1))
    return (
      <div>
        {this.props.reviews &&
          this.props.reviews.map(review => (
            <div key={review.id}>
              <h5>
                {/* <Rater rating={review.rating} total={5} /> */}

                <span>
                  Rating: <Rating initialRating={review.rating} readonly />
                </span>
              </h5>
              <h5>
                <span>Title: {review.title}</span>
              </h5>
              <h5>
                <span>Comment: {review.content}</span>
              </h5>
            </div>
          ))}
      </div>
    )
  }
}

export default Reviews

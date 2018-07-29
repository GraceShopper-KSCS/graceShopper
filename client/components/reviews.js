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
    if (this.props.reviews != 'undefined') {
      return (
        <div>
          {this.props.reviews &&
            this.props.reviews.map(review1 => (
              <div key={review1.id}>
                <h5>
                  {/* <Rater rating={review.rating} total={5} /> */}

                  <span>
                    Rating: <Rating initialRating={review1.rating} readonly />
                  </span>
                </h5>
                <h5>
                  <span>Title: {review1.title}</span>
                </h5>
                <h6>By:{review1.user.email}</h6>
                <h5>
                  <span>Comment: {review1.content}</span>
                </h5>
              </div>
            ))}
        </div>
      )
    } else {
      return <div> Reviews Still Renedering ....</div>
    }
  }
}

export default Reviews

const router = require('express').Router()
const Review = require('../db/models/review')

module.exports = router
// const dummyReview = [
//   {
//     title: 'Enjoyed this Code Book',
//     content:
//       'Okay I have read a lot of development and code books and while there are a lot of good ones out there, I would say this has been one of my favorites. The author has done very well in explaining conceptually and with practical application and use of the development process and understanding syntax of HTML and CSS. Love it!',
//     rating: 5
//   },
//   {
//     title:
//       'Yes, for beginners: Large font and illustrations make for easy reading',
//     content: 'Just as the subtitle describes "for complete beginners',
//     rating: 3
//   },
//   {
//     title: 'Love the book but needs an update',
//     content:
//       'I absolutely loved this book, so well-written and and such a nice print.',
//     rating: 4
//   }
// ]
// get all reviews (user only)
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    // const reviews = await [dummyReview]
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const reviews = await Review.findAll({
      where: {
        productId: id
      },
      include: [{all: true, nested: true}]
    })
    // const reviews = await [dummyReview]
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
//updates a review
router.put('/:reviewId', async (req, res, next) => {
  try {
    const id = req.params.reviewId
    const review = await Review.findById(id)
    const updatedReview = await review.update(req.body)
    res.json(updatedReview)
  } catch (err) {
    next(err)
  }
})
//delete a review
router.delete('/:reviewId', async (req, res, next) => {
  try {
    const id = req.params.reviewId
    await Review.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// add a new review
router.post('/:productId', async (req, res, next) => {
  try {
    if (req.product) {
      const newReview = await Review.create(req.body)
      newReview.setProduct(req.params.productId)
      res.status(201).json(newReview)
    } else {
      res.status(404).send('You are not authorized')
    }
  } catch (err) {
    next(err)
  }
})
